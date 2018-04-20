import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { List } from '../shared/item';

@Injectable()
export class ItemService {
  constructor(private http: Http) {
  }

  /**
   * Load item from mock api.
   *
   * @return {Observable<List[]>} A list of all items.
   */
  getItems(): Observable<List[]> {
    return this.http.get('http://www.mocky.io/v2/5ad819a03000006c00e585e9')
      .map(res => res.json())
  }
}
