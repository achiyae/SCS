import { EventEmitter, Output } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs/Rx';

import User from './user.model';
import Domain from './domain.model';
import Group from './group.model';
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
	
	getDomain(): Domain {
		return this.domain;
	}
	
	getGroup(): Group {
		return this.group;
	}
	
	getUser(): User {
		return this.user;
	}
	
	getCode(): String {
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
  
  static login(orm: OrmService, email: string, password: string): Observable<any> {
    return orm.read_query<User>('user', '?email='+email).pipe(
  		tap(
        res => {
          if(res.length >0) {
          	return orm.setUser(new PopulatedUser(orm, res[0]));
          } else {
             throw new Error("No such user or bad password");
          }
        }
      ));
  }
  
  static register(orm: OrmService, email: string, password: string): Observable<any> {
    return orm.create<User>('user', orm.createUser(email));
  }
}

export default PopulatedUser;