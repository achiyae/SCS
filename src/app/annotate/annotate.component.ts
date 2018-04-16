import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Domain, OrmService, Requirement, User} from '../shared/orm.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  private requirement_id: string;
  a: string;
  requirements: Requirement[];
  @Input() user: User;
  private domain: Domain;

  constructor(private orm: OrmService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.a = this.orm.getUserCode();
    this.user = this.orm.user;
    this.domain = this.user.domain;
    this.requirements = Object.values(this.domain.requirements);
    this.orm.domainChanged.subscribe(function(domain) {
      this.domain = domain;
      this.requirements = Object.values(this.domain.requirements);
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
