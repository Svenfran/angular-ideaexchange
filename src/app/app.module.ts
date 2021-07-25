import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { IdeaCategoryMenuComponent } from './components/idea-category-menu/idea-category-menu.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';

const routes: Routes = [
  { path: 'ideas/:id/categories', component: IdeaListComponent },
  { path: 'ideas/:id', component: IdeaListComponent },
  { path: 'ideas', component: IdeaListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent,
    IdeaCategoryMenuComponent,
    TopNavbarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
