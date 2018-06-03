//import {EventEmitter, Output} from '@angular/core';
import { pipe, Observable } from 'rxjs/Rx';
//import { tap } from 'rxjs/operators';

import Annotation from './annotation.model';
import Phase from './phase.model';
import { OrmService } from '../services/orm.service';

class User {
  _id:         string;
  email:       string;
  code:        string;
  domain:      string;
  phases:      Phase[];
  annotations: Annotation[];
  group:    	 string;

	constructor(email: any, group?: string, domain_id?: string){
  	if (typeof email == "object") {
  		const user = email;
	  	this._id = user._id;
	  	this.email = user.email;
	  	this.code = user.code;
	  	this.domain = user.domain;
	  	this.phases = user.phases;
	  	this.annotations = user.annotations;
	  	this.group = user.group;
  	} else {
  	  this.email = email;
	    this.group = group;
	    this.domain = domain_id;
	  }
	}
  
  /*addPhase(OrmService orm, emitter: EventEmitter<User>, name: string) {
  	this.phases.push({name:name, done:true, _id:undefined});
  	this.save(orm);
  }*/
  
  setCode(orm: OrmService, code:string): Observable<User> {
  	if(this.code) {
  		throw new Error('Cannot set code for a user with a code');
  	}
  	this.code = code;
  	return this.save(orm);
  }
  
  private save(orm: OrmService): Observable<User> {
  	return orm.update<User>("user", this);
  }
}

export default User;