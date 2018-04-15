import {Component, Input, OnInit} from '@angular/core';
import {OrmService, Requirement, User} from '../../shared/orm.service';

@Component({
  selector: 'app-code-annotation',
  templateUrl: './code-annotation.component.html',
  styleUrls: ['./code-annotation.component.css']
})
export class CodeAnnotationComponent implements OnInit {
  @Input() requirement: Requirement;
  @Input() user: User;
  a: string;

  constructor(private orm: OrmService) { }

  ngOnInit() {
    this.user = this.orm.user;
    console.log(this.orm.getUserCode());
    this.a = this.orm.getUserCode();
    console.log(this.a);
  }

}
