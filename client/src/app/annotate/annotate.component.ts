import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CanComponentDeactivate } from '../services/can-deactivate-guard.service';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import PopulatedUser from '../models/populatedUser.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit, CanComponentDeactivate {
  private requirement_id: string;
  @Input() requirements: Requirement[];
  @Input() user: PopulatedUser;
  @Input() domain: Domain;

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
    
    this.requirement_id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.requirement_id = params['id'];
      }
    );
  }

  onNext() {
    this.router.navigate(['/annotate', this.requirement_id + 1]);
  }
  
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  	return true;
    /*if (this.allowEdit && this.code !== this.user.code) {
		  return confirm('Do you want to discard the changes?');
    } else {
    	return true;
  	}*/
	}
}
