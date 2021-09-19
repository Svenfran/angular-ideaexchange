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
    const hasIsIeea: boolean = this.route.snapshot.paramMap.has('isIdea');
    
    if (hasCategoryId) {
      this.listIdeasByCategory();
    } else if (hasQuery) {
      this.handleSearchIdeas();
    } else if (hasCategoryIds || hasIsIeea) {
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
    const hasCategoryIds: boolean = this.route.snapshot.paramMap.has('categoryIds');
    const boolIsIdea: string = this.route.snapshot.paramMap.get('isIdea');
    const hasIsIdea: boolean = this.route.snapshot.paramMap.has('isIdea');
    
    if (hasIsIdea && hasCategoryIds) {
      this.ideaService.filterIdeasByCategoryIdsAndIdea(theCategoryIds, boolIsIdea).subscribe(this.processResult());
    } else if (hasCategoryIds && !hasIsIdea){
      this.ideaService.filterIdeasByCategoryIds(theCategoryIds).subscribe(this.processResult());
    } else {
      this.ideaService.filterIdeasByIsIdea(boolIsIdea).subscribe(this.processResult());
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
    };
  }

}
