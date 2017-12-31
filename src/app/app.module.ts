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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'domain', component: DomainComponent },
  { path: 'code', component: CodeComponent },
  { path: 'annotate/:id', component: AnnotateComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    HomeComponent,
    InstructionsComponent,
    DomainComponent,
    CodeComponent,
    AnnotateComponent,
    DropdownDirective,
    AnnotationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
