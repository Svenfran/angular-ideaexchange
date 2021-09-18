import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idea } from 'src/app/common/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.css']
})
export class IdeaListComponent implements OnInit {

  ideas: Idea[] = [];

  constructor(private ideaService: IdeaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listIdeas();
    });
  }

  listIdeas() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const hasQuery: boolean = this.route.snapshot.paramMap.has('query');
    const hasCategoryIds: boolean = this.route.snapshot.paramMap.has('categoryIds');
    
    if (hasCategoryId) {
      this.listIdeasByCategory();
    } else if (hasQuery) {
      this.handleSearchIdeas();
    } else if (hasCategoryIds) {
      this.handleFilterIdeas();
    } else {
      this.listAllIdeas();
    }
  }

  handleSearchIdeas() {
    const theQuery: string = this.route.snapshot.paramMap.get('query');
    this.ideaService.searchIdeas(theQuery).subscribe(this.processResult());
  }
  
  handleFilterIdeas() {
    const theCategoryIds: string = this.route.snapshot.paramMap.get('categoryIds');
    const boolIsIdea: string = this.route.snapshot.paramMap.get('isIdea');
    const hasIsIdea: boolean = this.route.snapshot.paramMap.has('isIdea');
    console.log("handleFilterIdeas Url has isIdea: " + hasIsIdea);
    if (hasIsIdea) {
      this.ideaService.filterIdeasByCategoryIdsAndIdea(theCategoryIds, boolIsIdea).subscribe(this.processResult());
    } else {
      this.ideaService.filterIdeasByCategoryIds(theCategoryIds).subscribe(this.processResult());
    }
  }

  listIdeasByCategory() { 
    const categoryId = +this.route.snapshot.paramMap.get('id');
    this.ideaService.getIdeasByCategory(categoryId).subscribe(this.processResult());
  }

  listAllIdeas() {
   this.ideaService.getIdeaList().subscribe(this.processResult());
  }

  processResult() {
    return data => {
      this.ideas = data;
      // console.log(this.ideas);
    };
  }

}
