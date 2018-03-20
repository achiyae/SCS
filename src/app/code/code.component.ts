import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Domain, OrmService, Requirement, User} from '../shared/orm.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  @Input() user: User;
  constructor(private orm: OrmService, private router: Router) { }

  ngOnInit() {
    this.user = this.orm.user;
    this.orm.domainChanged.subscribe(function(domain) {
      this.domain = domain;
      this.requirements = Object.values(this.domain.requirements);
    });
  }

  onNext() {
    this.orm.setUserCode(this.)
    this.router.navigate(['/annotate/0']);
  }
}
