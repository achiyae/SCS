import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrmService, Requirement} from '../shared/orm.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  private requirement_id: string;
  @Output()  requirements: string[];

  constructor(private orm: OrmService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.requirements = Object.keys(this.orm.domain.requirements);
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
