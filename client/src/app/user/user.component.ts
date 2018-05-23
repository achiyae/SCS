import {Component, Input, OnInit} from '@angular/core';
import {OrmService} from '../services/orm.service';
import {Router} from '@angular/router';
import User from '../models/user.model';
import Domain from '../models/domain.model';

@Component({
  selector: 'app-login',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email: string = '';
  private next_disabled = true;

  constructor(private db: OrmService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.db.read_query<User>('user', '?email='+this.email).subscribe(
      res => {
        if(res && res.length > 0) {
	  this.route(res[0]);
	} else {
	  const u = this.db.create_user(this.email);
	  console.log("u=",u);
 	  this.db.create<User>('user', u).subscribe(
            res => {
	    this.route(res[0]);
          }, err => {
            console.error('could not create user ' + err);
	  });
	}
      }, err => {
        console.error('error reading users');
      });
  }

  route(user: User) {
    this.db.change_user(user);
//    console.log("dbuser",user);
    this.router.navigate(['/domain']);
  }
}
