import { HttpClient, HttpClientModule } from '@angular/common/http';
import {OrmService} from './services/orm.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { DomainComponent } from './domain/domain.component';
import { CodeComponent } from './code/code.component';
import { AnnotateComponent } from './annotate/annotate.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { AnnotationsComponent } from './header/annotations/annotations.component';
import { CodeAnnotationComponent } from './annotate/code-annotation/code-annotation.component';
import { RequirementComponent } from './annotate/requirement/requirement.component';
import { RequirementsComponent } from './domain/requirements/requirements.component';
import { DoneComponent } from './done/done.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'domain', canActivate: [AuthGuard], component: DomainComponent },
  { path: 'code', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: CodeComponent },
  { path: 'annotate', canActivate: [AuthGuard], component: AnnotateComponent, children: [
    {path: ':id', component: CodeAnnotationComponent},
   ] },
  { path: 'user', component: UserComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    InstructionsComponent,
    DomainComponent,
    CodeComponent,
    AnnotateComponent,
    DropdownDirective,
    AnnotationsComponent,
    CodeAnnotationComponent,
    RequirementComponent,
    RequirementsComponent,
    DoneComponent,
    SidebarComponent,
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
