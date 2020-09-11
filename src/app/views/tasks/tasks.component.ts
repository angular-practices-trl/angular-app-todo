import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  private _displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  private _dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static: false}) private _paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private _sort: MatSort;

  private _tasks: Task[];

  private _updateTask = new EventEmitter<Task>();

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this._dataSource = new MatTableDataSource();
    this.fillTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  private getPriorityColor(task: Task): string {

    if (task.completed) {
      return '#F8F9FA';                     // TODO: Refactoring this. (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';                          // TODO: Refactoring this. (magic strings, magic numbers)
  }

  private fillTable(): void {

    if (this._dataSource == null) {
      return;
    }

    this._dataSource.data = this._tasks;

    this.addTableObjects();

    // @ts-ignore
    this._dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };

  }

  private addTableObjects(): void {
    this._dataSource.sort = this._sort;
    this._dataSource.paginator = this._paginator;
  }

  private onClickTask(task: Task): void {
    this.updateTask.emit(task);
  }

  get tasks(): Task[] {
    return this._tasks;
  }

  @Input('setTasks')
  set tasks(value: Task[]) {
    this._tasks = value;
    this.fillTable();
  }

  @Output()
  set updateTask(value: EventEmitter<Task>) {
    this._updateTask = value;
  }
}
