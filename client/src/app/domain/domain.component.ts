import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';
import { OrmService } from '../services/orm.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  private domain: Domain;
  private requirements: Requirement[];

  constructor(private db: OrmService, private router: Router) { }

  ngOnInit() {
  	this.db.userChanged.subscribe((user) => {
    	//console.log("domain page:user",user);
    	//console.log("triggered");
      this.set_variables(user);
    });
    this.set_variables(this.db.get_current_user());
  }

  set_variables(user:User) {
    if(user) {
      this.domain = this.db.get_current_user_domain();
      this.requirements = this.domain.requirements;
    } else {
    	this.domain = undefined;
      this.requirements = undefined;
    }
  }

  onNext() {
    this.router.navigate(['/code']);
  }
}
