import {EventEmitter, Injectable, Output} from '@angular/core';
import {isNewline} from 'codelyzer/angular/styles/cssLexer';
import { tap, map, first } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';

import Annotation from '../models/annotation.model';
import Domain from '../models/domain.model';
import Group from '../models/group.model';
import Phase from '../models/phase.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';
import PopulatedUser from '../models/populatedUser.model';

@Injectable()
export class OrmService {
  private api_url = 'http://localhost:3000/api/';
  private user: PopulatedUser;
  private usersGroup: Group;
  private domains: {[key: string]: Domain} = {};
  private groups: {[key: string]: Group} = {};
  @Output() userChanged = new EventEmitter<PopulatedUser>();

  constructor(private http: HttpClient) { 
    this.read_all<Domain>("domain").subscribe(
      res => {
				res.forEach(r => { this.domains[r._id] = r; });
      }, err => {
        console.error('Error retrieving domains');
      });
    this.read_all<Group>("group").subscribe(
      res => {
				res.forEach(r => { 
					this.groups[r._id] = r;
					if(r.name === "USERS") {
						this.usersGroup = r;
					}
				});
      }, err => {
        console.error('Error retrieving groups');
      });
  }

  // can be called only from PopulatedUser
  setUser(user: PopulatedUser): PopulatedUser {
    this.user = user;
    this.userChanged.emit(user);
    return user;
  }

  getCurrentUser(): PopulatedUser {
    return this.user;
  }
  
  getDomain(id: string): Domain {
  	return this.domains[id];
  }
  
  getGroup(id: string): Group {
  	return this.groups[id];
  }

  createPopulatedUser(email:string):PopulatedUser {
    return new PopulatedUser(this, this.createUser(email));
  }
  
  createUser(email:string):User {
    const keys = Object.keys(this.domains);
    const randomDomain: string = keys[Math.floor(Math.random() * keys.length)];
    return new User(email, this.usersGroup._id, randomDomain);
  }
  
  create<T>(type:string, data:T): Observable<T> {
    //returns the observable of http post request 
    return this.http.post(`${this.api_url+type}`, data) as Observable<T>;
  }

  read_query<T>(type:string, query:string): Observable<T[]> {
    return this.http.get(this.api_url+type+"/"+query)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"] as T[];
    })
  }

  read_one<T>(type:string, id:string): Observable<T> {
    return this.http.get(this.api_url+type+"/"+id)
    .map(res => { return res["data"] as T; })    
  }

  read_all<T>(type:string): Observable<T[]> {
    return this.http.get(this.api_url+type)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"] as T[];
    })
  }

  update<T>(type:string, data:T): Observable<T> {
    //returns the observable of http put request 
    // console.log("data is ", data);
    return this.http.put(`${this.api_url+type}/${data["_id"]}`, data) as Observable<T>;
  }

  delete<T>(type:string, data:string): Observable<T> {
    //Delete the object by the id
    return this.http.delete(`${this.api_url+type}/${data["_id"]}`) as Observable<T>;
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}