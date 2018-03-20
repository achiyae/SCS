import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../shared/orm.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() email: string;

  constructor(private db: OrmService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.db.setUserEmail(this.email);
    this.router.navigate(['/domain']);
  }

}
