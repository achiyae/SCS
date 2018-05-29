import { EventEmitter, Output } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs/Rx';

import User from './user.model';
import Domain from './domain.model';
import Group from './group.model';
import { OrmService } from '../services/orm.service';

class PopulatedUser extends User {
	@Output() userUpdated = new EventEmitter<PopulatedUser>();
	private domainO: Domain;
	private groupO: Group;
	private orm: OrmService;
	
	constructor(orm: OrmService, user: User) {
		super(user);
		this.orm = orm;
		this.domainO = orm.getDomain(user.domain);	
		this.groupO = orm.getGroup(user.group);
	}
	
	getDomain(): Domain {
		return this.domainO;
	}
	
	getGroup(): Group {
		return this.groupO;
	}
	
	setCode(code: string): Observable<PopulatedUser> {
		return this.setCodeO(this.orm, code).pipe(
			map(u => this),
			tap(
			  res => { this.userUpdated.emit(this); },
      	err => { console.error("error saving user",this); }
     	)
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
}

export default PopulatedUser;