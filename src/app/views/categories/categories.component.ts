import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private _categories: Category[];

  private _selectCategory = new EventEmitter<Category>();

  private _selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {
  }

  showTasksByCategory(category: Category) {
    if (this._selectedCategory === category) {
      return;
    }

    this._selectedCategory = category;
    this._selectCategory.emit(this._selectedCategory);
  }

  get categories(): Category[] {
    return this._categories;
  }

  @Input()
  set categories(value: Category[]) {
    this._categories = value;
  }

  get selectedCategory(): Category {
    return this._selectedCategory;
  }

  get selectCategory(): EventEmitter<Category> {
    return this._selectCategory;
  }

  @Output()
  set selectCategory(value: EventEmitter<Category>) {
    this._selectCategory = value;
  }
}
