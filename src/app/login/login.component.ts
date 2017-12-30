import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrmService} from '../shared/orm.service';
import * as orm from 'orm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() email: string;
  @Output() userChanged = new EventEmitter<orm.model>();

  constructor(private db: OrmService) { }

  ngOnInit() {
  }

  onLogin() {
    let user = this.db.getUser(this.email);
    if (!user) {
      user = this.db.addUser(this.email);
    }
    this.userChanged.emit(user);
  }
}
