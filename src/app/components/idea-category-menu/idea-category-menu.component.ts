import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { IdeaService } from 'src/app/services/idea.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-idea-category-menu',
  templateUrl: './idea-category-menu.component.html',
  styleUrls: ['./idea-category-menu.component.css']
})
export class IdeaCategoryMenuComponent implements OnInit {

  ideaCategories: Category[];
  form: FormGroup;
  @ViewChild('queryInput') inputName;


  constructor(private ideaService: IdeaService, private router: Router, private fb: FormBuilder) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.listIdeaCategories();
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() {
    console.log(this.form.value)
  }

  listIdeaCategories() {
    this.ideaService.getIdeaCategories().subscribe(
      data => {
        this.ideaCategories = data;
        // console.log(this.ideaCategories);
      }
    );
  }

  doSearch(value: string) {
    // console.log("value= " + value);
    // Route the data to our "search" route. It will be handled by the IdeaListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }
  
  handleClear() {
    this.inputName.nativeElement.value = "";
  }
}
