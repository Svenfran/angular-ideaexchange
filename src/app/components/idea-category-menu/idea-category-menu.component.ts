import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { IdeaService } from 'src/app/services/idea.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ɵNgNoValidate } from '@angular/forms';

@Component({
  selector: 'app-idea-category-menu',
  templateUrl: './idea-category-menu.component.html',
  styleUrls: ['./idea-category-menu.component.css']
})

export class IdeaCategoryMenuComponent implements OnInit {

  ideaCategories: Category[];
  filterForm: FormGroup;
  @ViewChild('queryInput') inputName;
  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef>;

  constructor(private ideaService: IdeaService, private router: Router, private fb: FormBuilder) { 
    this.filterForm = this.fb.group({
      checkCategoryArray: this.fb.array([]),
      checkIdeaArray: this.fb.array([])
    })
  }
  
  ngOnInit(): void {
    this.listIdeaCategories();
  }

  onCategoryCheckboxChange(e) {
    const checkCategoryArray: FormArray = this.filterForm.get('checkCategoryArray') as FormArray;
    if (e.target.checked) {
      checkCategoryArray.push(new FormControl(e.target.value));
    } else { 
      this.removeItem(checkCategoryArray, e);
    };
  }

  onIdeaCheckboxChange(e) {
    const checkIdeaArray: FormArray = this.filterForm.get('checkIdeaArray') as FormArray;
    if (e.target.checked) {
      checkIdeaArray.push(new FormControl(e.target.value));
    } else {
      this.removeItem(checkIdeaArray, e);
    };
  }

  removeItem(array: FormArray, e: any) {
    let i: number = 0;
      array.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          array.removeAt(i);
          return;
        }
        i++;
      });
  }

  uncheckAll() {
    const checkedList: FormArray = this.filterForm.get('checkCategoryArray') as FormArray;
    const checkedIdeaList: FormArray = this.filterForm.get('checkIdeaArray') as FormArray;
    checkedList.clear();
    checkedIdeaList.clear();

    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });

    const cbChecked = document.querySelectorAll('.cb-checked');
    cbChecked.forEach(cb => {
      cb.classList.remove('cb-checked');
    });

    this.router.navigateByUrl('/ideas');
  }

  submitForm() {
    const categoryIdsArray = this.filterForm.value['checkCategoryArray'];
    const isIdeaArray = this.filterForm.value['checkIdeaArray'];
    const urlCategoriesAndIdea: string = `/filter/${categoryIdsArray}/${isIdeaArray}`;
    const urlCategories: string = `/filter/${categoryIdsArray}`;
    const urlIsIdea: string = `/filter/isIdea/${isIdeaArray}`;

    //TODO: change path naming!!

    if (isIdeaArray.length != 1 && categoryIdsArray.length == 0) {
      this.router.navigateByUrl('/ideas');
    } else if (isIdeaArray.length != 1 ) {
      this.router.navigateByUrl(urlCategories);
    } else if (isIdeaArray.length == 1 && categoryIdsArray == 0) {
      this.router.navigateByUrl(urlIsIdea);
    } else {
      this.router.navigateByUrl(urlCategoriesAndIdea);
    }
  }

  listIdeaCategories() {
    this.ideaService.getIdeaCategories().subscribe(
      data => {
        this.ideaCategories = data;
      }
    );
  }

  doSearch(value: string) {
    // Route the data to our "search" route. It will be handled by the IdeaListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }
  
  handleClear() {
    this.inputName.nativeElement.value = "";
  }
}
