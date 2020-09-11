import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import { Task } from '../model/Task';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOImpl} from '../data/dao/impl/TaskDAOImpl';
import {CategoryDAOImpl} from '../data/dao/impl/CategoryDAOImpl';
import {Priority} from '../model/Priority';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private tasksDaoImpl = new TaskDAOImpl();
  private categoriesDaoImpl = new CategoryDAOImpl();

  constructor() {
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.tasksDaoImpl.search(category, searchText, status, priority);
  }

  getAllTasks(): Observable<Task[]> {
    return this.tasksDaoImpl.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoriesDaoImpl.getAll();
  }
}
