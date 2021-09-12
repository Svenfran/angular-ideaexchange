import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { IdeaService } from 'src/app/services/idea.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ɵNgNoValidate } from '@angular/forms';
import { element } from 'protractor';

@Component({
  selector: 'app-idea-category-menu',
  templateUrl: './idea-category-menu.component.html',
  styleUrls: ['./idea-category-menu.component.css']
})
export class IdeaCategoryMenuComponent implements OnInit {

  ideaCategories: Category[];
  form: FormGroup;
  @ViewChild('queryInput') inputName;
  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef>;


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

  uncheckAll() {
    const checkedList: FormArray = this.form.get('checkArray') as FormArray;
    let i: number = 0;

    while (checkedList.length > 0) {
      checkedList.removeAt(i);
    }
    
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });

    this.router.navigateByUrl('/ideas');
    console.log(checkedList.value);
  }

  submitForm() {
    console.log(this.form.value['checkArray'])
    this.router.navigateByUrl(`/search/${this.form.value['checkArray']}/true`)
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
