import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  private requirement_id: string;
  @Input() requirements: Requirement[];
  @Input() user: User;
  @Input() domain: Domain;

  constructor(private orm: OrmService,
              private route: ActivatedRoute,
              private router: Router) { }

	setParams() {
		this.user = this.orm.get_current_user();
    this.domain = this.orm.get_current_user_domain();
    this.requirements = this.domain.requirements;    
	}

  ngOnInit() {
  	this.orm.userChanged.subscribe(function(user) {
  		this.setParams();
    });
    
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
}
