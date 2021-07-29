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
    
    if (hasCategoryId) {
      this.listIdeasByCategory();
    } else {
      this.listAllIdeas();
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
      console.log(this.ideas);
    };
  }

}
