import { HttpClient, HttpClientModule } from '@angular/common/http';
import {OrmService} from './services/orm.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { DomainComponent } from './domain/domain.component';
import { CodeComponent } from './code/code.component';
import { AnnotateComponent } from './annotate/annotate.component';
import { RequirementsComponent } from './domain/requirements/requirements.component';
import { DoneComponent } from './done/done.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { AnnotatorDirective } from './annotate/annotator/annotator.directive';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'domain', canActivate: [AuthGuard], component: DomainComponent },
  { path: 'code', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: CodeComponent },
  { path: 'annotate/:id', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: AnnotateComponent }, /*, children: [
    {path: ':id', canActivate: [AuthGuard], component: CodeAnnotationComponent},
   ] },*/
  { path: 'user', component: UserComponent },
  { path: 'done', component: DoneComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    InstructionsComponent,
    DomainComponent,
    CodeComponent,
    AnnotateComponent,
    RequirementsComponent,
    DoneComponent,
    SidebarComponent,
    AnnotatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [OrmService, AuthService, AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
