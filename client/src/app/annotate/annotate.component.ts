import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import PopulatedUser from '../models/populatedUser.model';
import Annotation from '../models/annotation.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit, CanComponentDeactivate {
	private rPositionInArray: number = 0;
  @Input() r_id: string;
  @Input() requirements: Requirement[];
  @Input() user: PopulatedUser;
  @Input() domain: Domain;
  private annotationsBeforeEdit:Annotation[];
  annotationsAfterEdit:Annotation[];

  constructor(private orm: OrmService,
              private route: ActivatedRoute,
              private router: Router) { }

	setParams(user:PopulatedUser) {
		this.user = user;
    this.domain = user.getDomain();
    this.requirements = this.domain.requirements;
	}

  ngOnInit() {
  	this.orm.userChanged.subscribe(function(user) {
  		this.setParams(user);
    });
    this.setParams(this.orm.getCurrentUser());
    
//    console.log("route", this.route.snapshot.params['id']);
//    this.updateCurrentRequirement(this.route.snapshot.params['id']);
    
    this.route.params.subscribe(
      (params: Params) => {
//      	console.log("router", params);
//      	this.rPositionInArray = params['id'];
      	this.updateCurrentRequirement(params['id']);
      }
    );
  }
  
  private updateCurrentRequirement(position: string) {
  	this.rPositionInArray = +position;
  	if(this.rPositionInArray > 0) {
	  	this.r_id = this.requirements[this.rPositionInArray-1]._id;
	  	this.annotationsBeforeEdit = this.user.getAnnotations(this.r_id);
	    this.annotationsAfterEdit = this.annotationsBeforeEdit.slice();
	  } else {
	  	this.r_id = null;
	  	this.annotationsAfterEdit = [];
	  	this.annotationsBeforeEdit = [];
	  }
	  //console.log("pos", position);
	  //console.log("rPos", this.rPositionInArray);
	  console.log("r_id", this.r_id);
  }

  getRequirement(): Requirement {
  	return this.requirements[this.rPositionInArray-1];
  }
  
  onNext() {
//  	console.log("rpa", this.rPositionInArray);
  	this.rPositionInArray += 1;
    this.router.navigate(['/annotate', this.rPositionInArray]);
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  	console.log("annotations", this.annotationsAfterEdit);
  	return true;
    /*if (this.allowEdit && this.code !== this.user.code) {
		  return confirm('Do you want to discard the changes?');
    } else {
    	return true;
  	}*/
	}
}
