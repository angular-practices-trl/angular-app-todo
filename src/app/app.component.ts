import {Component, OnInit} from '@angular/core';
import { Task } from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _title = 'angular-app-todo';
  private _tasks: Task[];
  private _categories: Category[];
  private _selectedCategory: Category = null;

  constructor(private _dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this._tasks = tasks);
    this._dataHandler.getAllCategories().subscribe(categories => this._categories = categories);
    this.onSelectCategory(null);
  }

  private onSelectCategory(category: Category) {

    this._selectedCategory = category;

    this._dataHandler.searchTasks(
      this._selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this._tasks = tasks;
    });

  }

  private onUpdateTask(task: Task): void {
    console.log(task);
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  get categories(): Category[] {
    return this._categories;
  }
}
