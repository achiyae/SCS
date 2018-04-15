import {EventEmitter, Injectable, Output} from '@angular/core';
import {isNewline} from 'codelyzer/angular/styles/cssLexer';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';

import 'rxjs/add/operator/map';

import Annotation from '../models/annotation.model';
import Domain from '../models/domain.model';
import Group from '../models/group.model';
import Phase from '../models/phase.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';

@Injectable()
export class OrmService {
  private api_url = 'http://localhost:3000/api/';
  public user: User;
  @Output() domains: {[name: string]: Domain};
  @Output() userChanged = new EventEmitter<User>();
  @Output() domainChanged = new EventEmitter<Domain>();

  constructor(private http: HttpClient) { }

  create(type:String, data:any): Observable<any> {
    //returns the observable of http post request 
    return this.http.post(`${this.api_url+type}`, data);
  }

  read_query<T>(type:String, query:String): Observable<T[]> {
    return this.http.get(this.api_url+type+"/"+query)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"].docs as T[];
    })
  }

  read_all<T>(type:String): Observable<T[]> {
    return this.http.get(this.api_url+type)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"].docs as T[];
    })
  }

  update(type:String, data:any) {
    //returns the observable of http put request 
    return this.http.put(`${this.api_url+type}`, data);
  }

  delete(type:String, id:string):any {
    //Delete the object by the id
    return this.http.delete(`${this.api_url}/${type}/${id}`)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}