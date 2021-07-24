import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ideas/:id/categories', component: IdeaListComponent },
  { path: 'ideas/:id', component: IdeaListComponent },
  { path: 'ideas', component: IdeaListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IdeaListComponent
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
