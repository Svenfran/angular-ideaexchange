import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idea } from 'src/app/common/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {

  idea: Idea = new Idea();

  constructor(private ideaService: IdeaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.showIdeaDetails();
    });
  }

  showIdeaDetails() {
    const theIdeaId: number = +this.route.snapshot.paramMap.get('id');

    this.ideaService.getIdea(theIdeaId).subscribe(
      data => {
        this.idea = data;
        console.log(this.idea);
      }
    );
  }

}
