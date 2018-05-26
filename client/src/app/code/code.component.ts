import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, CanComponentDeactivate {
	private allowEdit = false;
  code: string;
	private user: User;
	private domain: Domain;
  
  constructor(private db: OrmService, private route: ActivatedRoute, private router: Router) { }

	setParams() {
		this.user = this.db.get_current_user();
		if(this.user) {
			this.domain = this.db.get_current_user_domain();
			if (this.user.code) {
				this.allowEdit = false;
			} else {
				this.allowEdit = true;
			}
		} else {
			this.domain = undefined;
			this.allowEdit = true;
		}
	}

  ngOnInit() {
    this.db.userChanged.subscribe(function(user) {
      this.setParams();
    });
    
    this.setParams();
  }
  
  onSave() {
  	//TODO: add are you sure message.
  	console.log("code", this.code);
  	console.log("user", this.user);
  	this.user.code = this.code;
  	
  	this.db.update<User>('user', this.user).subscribe(
  		res => {
  			this.allowEdit = false;
  		},
  		err => { 
  			console.error("could not save code", err);
  			this.user.code = undefined;
  		}
  	);
  }

  onNext() {
    this.router.navigate(['/annotate/0']);
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit && this.code !== this.user.code) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}