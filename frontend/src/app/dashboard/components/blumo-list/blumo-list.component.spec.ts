import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlumoListComponent } from './blumo-list.component';

describe('BlumoListComponent', () => {
  let component: BlumoListComponent;
  let fixture: ComponentFixture<BlumoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlumoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlumoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
