import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-category-menu',
  templateUrl: './idea-category-menu.component.html',
  styleUrls: ['./idea-category-menu.component.css']
})
export class IdeaCategoryMenuComponent implements OnInit {

  ideaCategories: Category[];
  
  constructor(private ideaService: IdeaService) { }

  ngOnInit(): void {
    this.listIdeaCategories();
  }

  listIdeaCategories() {
    this.ideaService.getIdeaCategories().subscribe(
      data => {
        this.ideaCategories = data;
        console.log(this.ideaCategories);
      }
    );
  }

  

}
