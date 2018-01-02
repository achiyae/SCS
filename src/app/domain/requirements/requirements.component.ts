import {Component, Input, OnInit} from '@angular/core';
import {Requirement} from '../../shared/orm.service';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.css']
})
export class RequirementsComponent implements OnInit {
  @Input() requirement: Requirement;
  constructor() { }

  ngOnInit() {
  }

}
