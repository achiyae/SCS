import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import PopulatedUser from '../models/populatedUser.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, CanComponentDeactivate {
	private allowEdit = false;
  private code: string;
	private user: PopulatedUser;
	private domain: Domain;

  constructor(private db: OrmService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const comp: CodeComponent = this;
    this.db.userChanged.subscribe(function(user) {
    	comp.setParams(user);
    });

    this.setParams(this.db.getCurrentUser());
  }

  setParams(user:PopulatedUser) {
		this.user = user;
		if(user) {
			this.code = user.getUser().code;
			this.domain = user.getDomain();
			if (user.getUser().code) {
				this.allowEdit = false;
			} else {
				this.allowEdit = true;
			}
		} else {
			this.domain = undefined;
			this.allowEdit = false;
		}
	}

  onSave() {
  	//TODO: add are you sure message.
  	this.user.setCode(this.code).subscribe(
  		res => {
  			this.allowEdit = false;
  			//add note that it was saved successfully
  		},
  		err => {
  			console.error("could not save code", err);
  			this.user.getUser().code = undefined;
  			//add error note
  		}
  	);
  }

  onNext() {
    this.router.navigate(['/annotate/0']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.allowEdit && this.code !== this.user.getUser().code) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  onEdit() {
    this.allowEdit = true;
  }
}
