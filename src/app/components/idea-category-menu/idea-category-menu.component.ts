import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-category-menu',
  templateUrl: './idea-category-menu.component.html',
  styleUrls: ['./idea-category-menu.component.css']
})
export class IdeaCategoryMenuComponent implements OnInit {

  ideaCategories: Category[];
  @ViewChild('queryInput') inputName;


  constructor(private ideaService: IdeaService, private router: Router) { }

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

  doSearch(value: string) {
    console.log("value= " + value);
     // Route the data to our "search" route. It will be handled by the IdeaListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }
  
  handleClear() {
    this.inputName.nativeElement.value = "";
  }
}
