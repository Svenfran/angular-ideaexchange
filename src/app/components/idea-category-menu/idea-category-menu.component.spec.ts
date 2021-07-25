import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaCategoryMenuComponent } from './idea-category-menu.component';

describe('IdeaCategoryMenuComponent', () => {
  let component: IdeaCategoryMenuComponent;
  let fixture: ComponentFixture<IdeaCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
