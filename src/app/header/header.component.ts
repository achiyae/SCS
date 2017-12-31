import {Component, Input, OnInit} from '@angular/core';
import {Domain, OrmService, Requirement} from '../shared/orm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private domain: Domain;
  private requirements: string[];

  constructor(private orm: OrmService) {
    this.domain = this.orm.domain;
    this.requirements = Object.keys(this.domain.requirements);
    this.orm.domainChanged.subscribe((domain) => {
      this.domain = domain;
      this.requirements = Object.keys(this.domain.requirements);
    });
  }

  ngOnInit() {
  }
}
