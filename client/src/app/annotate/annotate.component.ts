import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import PopulatedUser from '../models/populatedUser.model';
import User from '../models/user.model';
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
  @Input() resetHighlights;
  @Input() code: string;
  private requirements: Requirement[];
  private user: PopulatedUser;
  private domain: Domain;
  private deletedAnnotations: Annotation[];
  private addedAnnotations: Annotation[];
  private changed: boolean = false;
  annotations: Annotation[];

  constructor(private orm: OrmService,
              private route: ActivatedRoute,
              private router: Router) { }

	setParams(user:PopulatedUser) {
		this.user = user;
		this.user.userUpdated.subscribe(function(u) {
			// no need for this update as the object changes itself
			//this.updateCurrentRequirement(this.rPositionInArray);
		});
		this.code = user.getCode();
    this.domain = user.getDomain();
    this.requirements = this.domain.requirements;
	}

  ngOnInit() {
  	this.setParams(this.orm.getCurrentUser());
  	this.orm.userChanged.subscribe(function(user) {
  		this.setParams(user);
    });
        
    this.route.params.subscribe(
      (params: Params) => {
      	this.updateCurrentRequirement(params['id']);
      }
    );
  }
  
  private updateCurrentRequirement(position: string) {
  	this.rPositionInArray = +position;
  	this.deletedAnnotations = [];
	  this.addedAnnotations = [];
	  //this.code = '';
	  this.code = this.user.getCode();
	  this.changed = false;
  	if(this.rPositionInArray > 0) {
	  	this.r_id = this.requirements[this.rPositionInArray-1]._id;
	  	this.annotations = this.user.getUserCopy().getAnnotations(this.r_id);
	  	//console.log("extracted annotations", this.r_id);
	  } else {
	  	this.r_id = null;
	  	this.annotations = [];
	  	
	  }
  }

  getRequirement(): Requirement {
  	return this.requirements[this.rPositionInArray-1];
  }
  
  onNext() {
  	//console.log("code", this.user.getCode());
    this.router.navigate(['/annotate', this.rPositionInArray + 1]);
  }
  
  onAnnotationAdded(a) {
  	this.addedAnnotations.push(a);
  	this.changed = true;
  }
  
  onAnnotationDeleted(a) {
  	this.addedAnnotations = this.addedAnnotations.filter(o => !o.equals(a));
  	if(a._id != null) {
	  	this.deletedAnnotations.push(a);
	  }
	  if(this.deletedAnnotations.length === 0 && this.addedAnnotations.length === 0) {
	  	this.changed = false;
	  } else {
	  	this.changed = true;
	  }
  }
  
  onSave() {
  	this.user.updateAnnotations(this.addedAnnotations,this.deletedAnnotations).subscribe(
  		res => {
  			this.changed = false;
  			this.updateCurrentRequirement(String(this.rPositionInArray));
  		},
  		err => {
  			console.error("could not save code", err);
  		}
  	);
  }	
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if(this.changed) {
		  return confirm('Annotations were not saved, do you wish to discard the changes?');
    } else {
    	return true;
  	}
	}
}