import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../services/orm.service';
import {Router} from '@angular/router';

import User from '../models/user.model';
import Domain from '../models/domain.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private email: string = '';
  private next_disabled = true;

  constructor(private db: OrmService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
  	this.db.login(this.email, "").subscribe(
      res => { 
      	this.authService.login();
      	this.router.navigate(['/domain']);
      },
      err => { console.error(err); }
	  );
  }
}
