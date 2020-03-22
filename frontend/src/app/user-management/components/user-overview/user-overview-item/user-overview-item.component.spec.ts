import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewItemComponent } from './user-overview-item.component';

describe('UserOverviewItemComponent', () => {
  let component: UserOverviewItemComponent;
  let fixture: ComponentFixture<UserOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOverviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
