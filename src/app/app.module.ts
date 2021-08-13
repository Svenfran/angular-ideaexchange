import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { IdeaCategoryMenuComponent } from './components/idea-category-menu/idea-category-menu.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { IdeaDetailsComponent } from './components/idea-details/idea-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Routes = [
  { path: 'categories/:id/ideas', component: IdeaListComponent },
  { path: 'ideas/:id', component: IdeaDetailsComponent },
  { path: 'ideas/delete/:id', component: IdeaDetailsComponent },
  { path: 'ideas', component: IdeaListComponent },
  { path: 'search/:query', component: IdeaListComponent },
  { path: '', redirectTo: '/ideas', pathMatch: 'full'},
  { path: '**', redirectTo: '/ideas', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent,
    IdeaCategoryMenuComponent,
    TopNavbarComponent,
    IdeaDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
