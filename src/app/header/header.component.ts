import { Component, OnInit } from '@angular/core';
import {Domain, OrmService} from '../shared/orm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  domain: Domain;

  constructor(private orm: OrmService) {
    this.domain = this.orm.domain;
    this.orm.domainChanged.subscribe((domain) => {
      this.domain = domain;
    });
  }

  ngOnInit() {
  }

  onLoginAction() {}
}
