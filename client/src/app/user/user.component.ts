import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../services/orm.service';
import {Router} from '@angular/router';

import PopulatedUser from '../models/populatedUser.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private email: string = '';
  private next_disabled = true;

  constructor(private orm: OrmService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
  	PopulatedUser.login(this.orm, this.email, "").subscribe(
      res => { 
      	this.authService.login();
      	this.router.navigate(['/domain']);
      },
      err => { console.error(err); }
	  );
  }
}
