import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Domain from '../models/domain.model';
import Requirement from '../models/requirement.model';
import User from '../models/user.model';
import {OrmService} from '../services/orm.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  private domain: Domain;
  private requirements: Requirement[];

  constructor(private db: OrmService,
              private router: Router) { 
    this.db.userChanged.subscribe((user) => {
      this.set_variables(user);
    });
  }

  ngOnInit() {
    this.set_variables(this.db.get_current_user());
  }

  set_variables(user:User) {
    console.log("user",user);
    if(user) {
      this.db.read_query<Domain>('domain', '?_id='+user.domain).subscribe(
       res => {
        console.log("domain",res);
        this.domain = res[0];
        this.requirements = this.domain.requirements;
       });
    } else {
      this.domain = undefined;
      this.requirements = undefined;
    }
  }

  onNext() {
    this.router.navigate(['/code']);
  }
}
