import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea } from 'src/app/common/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {

  idea: Idea = new Idea();

  constructor(private ideaService: IdeaService, private route: ActivatedRoute, private router: Router) { }

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
        // console.log(this.idea);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onDeleteIdea(theIdeaId: number, theIdeaName: string): void {

    if (confirm(`Delete Idea with Title: ${theIdeaName}?`)) {
      this.ideaService.deleteIdea(theIdeaId).subscribe(
        (data: void) => {
          // console.log(data);
          this.ideaService.getIdeaList();
          this.router.navigate(["/ideas"]);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

  }


  onOpenModal(idea: Idea, mode: string): void {
    const container = document.getElementById("main-container")
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "edit") {
      this.idea = idea;
      button.setAttribute("data-target", "#updateIdeaModal");
    }
    if (mode === "delete") {
      this.idea = idea;
      button.setAttribute("data-target", "#deleteIdeaModal");
    }
    container.appendChild(button);
    button.click();
  }
}
