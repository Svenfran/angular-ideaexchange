import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../common/idea';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private baseUrl = 'http://localhost:8080/api/ideas';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private httpClient: HttpClient) { }

  // getIdeaList(): Observable<Idea[]> {
  //   return this.httpClient.get<GetResponseIdeas>(this.baseUrl).pipe(
  //     map(response => response._embedded.ideas)
  //   );
  // }

  // what is the difference between those methodes? => above is needed when using spirng.rest?!

  getIdeaList(): Observable<Idea[]> {
    return this.httpClient.get<Idea[]>(this.baseUrl);
  }

  getIdea(theIdeaId: number): Observable<Idea> {
    const ideaUrl = `${this.baseUrl}/${theIdeaId}`;
    return this.httpClient.get<Idea>(ideaUrl);
  }

  getIdeaCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }

  getIdeasByCategory(theCategoryId: number): Observable<Idea[]> {
    const ideaByCatUrl = `${this.categoryUrl}/${theCategoryId}/ideas`;
    return this.httpClient.get<Idea[]>(ideaByCatUrl);
  }

  deleteIdea(theIdeaId: number): Observable<void> {
    const deleteIdeaUrl = `${this.baseUrl}/delete/${theIdeaId}`;
    return this.httpClient.delete<void>(deleteIdeaUrl);
  }


}