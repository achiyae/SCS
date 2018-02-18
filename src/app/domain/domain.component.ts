import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Domain, OrmService, Requirement, User} from '../shared/orm.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  @Input() user: User;
  private domain: Domain;
  private requirements: Requirement[];

  constructor(private orm: OrmService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.orm.user;
    this.domain = this.user.domain;
    this.requirements = Object.values(this.domain.requirements);
    this.orm.domainChanged.subscribe(function(domain) {
      this.domain = domain;
      this.requirements = Object.values(this.domain.requirements);
    });
  }

  onNext() {
    this.router.navigate(['/code']);
  }
}
