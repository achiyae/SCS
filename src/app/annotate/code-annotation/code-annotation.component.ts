import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../../shared/orm.service';

@Component({
  selector: 'app-code-annotation',
  templateUrl: './code-annotation.component.html',
  styleUrls: ['./code-annotation.component.css']
})
export class CodeAnnotationComponent implements OnInit {
  @Input() requirement_id: string;
  @Input() index: number;

  constructor(private orm: OrmService) { }

  ngOnInit() {
  }

}
