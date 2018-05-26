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

@Injectable()
export class OrmService {
  private api_url = 'http://localhost:3000/api/';
  private user: User;
  private users_group: Group;
  private domains: {[key: string]: Domain} = {};
  @Output() userChanged = new EventEmitter<User>();

  constructor(private http: HttpClient) { 
    this.read_query<Group>("group","?name=USERS").subscribe(
      res => {
        this.users_group = res[0];
      }, err => {
        console.error('Error retrieving USERS group');
      });
    this.read_all<Domain>("domain").subscribe(
      res => {
				res.forEach(r => { this.domains[r._id] = r; });
      }, err => {
        console.error('Error retrieving domains');
      });
  }

  private set_user(user:User) {
    this.user = user;
    this.userChanged.emit(user);
  }

  get_current_user() {
    return this.user;
  }
  
  get_current_user_domain() {
  	return this.domains[this.user.domain];
  }

  create_user(email:string) {
    const keys = Object.keys(this.domains);
    const random_domain_id: string = keys[Math.floor(Math.random() * keys.length)];
    return new User(email, this.users_group, random_domain_id);
  }

  login(email: string, password: string): Observable<any> {
	    return this.read_query<User>('user', '?email='+email).pipe(
	    	tap(
	    		res => {
	    			if(res.length >0) {
	    				// console.log("logged-in",res);
	    				this.set_user(res[0]);
		    			return res;
	    			} else {
	    				throw new Error("No such user or bad password");
	    			}
	    		}
	    	)
	    );
	}

  create<T>(type:String, data:T): Observable<T> {
    //returns the observable of http post request 
    return this.http.post(`${this.api_url+type}`, data) as Observable<T>;
  }

  read_query<T>(type:String, query:String): Observable<T[]> {
    return this.http.get(this.api_url+type+"/"+query)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"] as T[];
    })
  }

  read_one<T>(type:String, id:string): Observable<T> {
    return this.http.get(this.api_url+type+"/"+id)
    .map(res => { return res["data"] as T; })    
  }

  read_all<T>(type:String): Observable<T[]> {
    return this.http.get(this.api_url+type)
    .map(res  => {
      //Maps the response object sent from the server
      return res["data"] as T[];
    })
  }

  update<T>(type:String, data:T): Observable<T> {
    //returns the observable of http put request 
    console.log("data is ", data);
    return this.http.put(`${this.api_url+type}`, data) as Observable<T>;
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