import { Component } from '@angular/core';
import {OrmService} from './services/orm.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [OrmService]
})
export class AppComponent {
  constructor(private db: OrmService) { }
}
