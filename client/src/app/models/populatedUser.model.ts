import { EventEmitter, Output } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs/Rx';

import User from './user.model';
import Domain from './domain.model';
import Group from './group.model';
import Annotation from './annotation.model';
import { OrmService } from '../services/orm.service';

class PopulatedUser {
	@Output() userUpdated = new EventEmitter<PopulatedUser>();
	private domain: Domain;
	private group: Group;
	private user: User;
	private orm: OrmService;
	
	constructor(orm: OrmService, user: User) {
		this.user = user;
		this.orm = orm;
		this.domain = orm.getDomain(user.domain);	
		this.group = orm.getGroup(user.group);
	}
	
	getAnnotations(r_id: string): Annotation[] {
		//console.log("r_id", r_id);
		//console.log("user", this.user);
		return this.user.getAnnotations(r_id);
	}
	
	getDomain(): Domain {
		return this.domain;
	}
	
	getGroup(): Group {
		return this.group;
	}
	
	getUser(): User {
		return this.user;
	}
	
	getUserCopy(): User {
		return new User().deserialize(this.user);
	}
	
	getCode(): string {
		return this.user.code;
	}
	
	setCode(code: string): Observable<PopulatedUser> {
		return new User(this.user).setCode(this.orm, code).pipe(
			tap(
			  res => { 
			  	this.user = res;
			  	this.userUpdated.emit(this); 
			  },
      	err => { console.error("error saving user",this); }
     	),
     	map(val => this)
    );
  }
  
  updateAnnotations(added: Annotation[], removed: Annotation[]): Observable<PopulatedUser> {
  	var u = new User(this.user);
  	for(let a of added) {
  		u.annotations.push(a);
  	}
  	for(let a of removed) {
  		u.annotations = u.annotations.filter(o => !o.equals(a));
  	}
  	return u.save(this.orm).pipe(
			tap(
			  res => { 
			  	this.user = res;
			  	this.userUpdated.emit(this); 
			  },
      	err => { console.error("error saving user",this); }
     	),
     	map(val => this)
    );
  }
  
  static login(orm: OrmService, email: string, password: string): Observable<any> {
    return orm.read_query<User>('user', '?email='+email).pipe(
  		tap(
        res => {
          if(res.length >0) {
          	return orm.setUser(new PopulatedUser(orm, new User().deserialize(res[0])));
          } else {
             throw new Error("No such user or bad password");
          }
        }
      ));
  }
  
  static register(orm: OrmService, email: string, password: string): Observable<any> {
    return orm.create<User>('user', orm.createUser(email)).pipe(
    	tap(
    		res => {
    			if(res.length>0) {
    				return new User().deserialize(res);
    			} else {
             throw new Error("No such user or bad password");
          }
        }
    ));
  }
}

export default PopulatedUser;