import {Component, Input, OnInit} from '@angular/core';

//import {Requirement} from '../../shared/orm.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {
  @Input() requirement_id: string;

  constructor() { }

  ngOnInit() { }

}
