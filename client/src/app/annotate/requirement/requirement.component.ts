import {Component, Input, OnInit} from '@angular/core';

import {OrmService} from '../../services/orm.service';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent implements OnInit {
  @Input() requirement_id: string;
  @Input() index: number;

  constructor(private orm: OrmService) { }

  ngOnInit() {
  }

}
