import { NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { IdeaCategoryMenuComponent } from './components/idea-category-menu/idea-category-menu.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { IdeaDetailsComponent } from './components/idea-details/idea-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CbCheckedDirective } from './directives/cb-checked.directive';
import { RemoveAllCbCheckedDirective } from './directives/remove-all-cb-checked.directive';

const routes: Routes = [
  { path: 'categories/:id/ideas', component: IdeaListComponent },
  { path: 'ideas/:id', component: IdeaDetailsComponent },
  { path: 'ideas/delete/:id', component: IdeaDetailsComponent },
  { path: 'ideas', component: IdeaListComponent },
  { path: 'filter/isIdea/:isIdea', component: IdeaListComponent },
  { path: 'filter/:categoryIds/:isIdea', component: IdeaListComponent },
  { path: 'filter/:categoryIds', component: IdeaListComponent },
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
    IdeaDetailsComponent,
    CbCheckedDirective,
    RemoveAllCbCheckedDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
