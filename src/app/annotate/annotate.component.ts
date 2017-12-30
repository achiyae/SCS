import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  requirement: { id: number, description: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.requirement = {
      id: this.route.snapshot.params['id'],
      description: ''
    };
    this.route.params.subscribe(
      (params: Params) => {
        this.requirement.id = params['id'];
      }
    );
  }

}
