import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InitTrackerList} from './init-tracker-list';

describe('InitTrackerList', () => {
  let component: InitTrackerList;
  let fixture: ComponentFixture<InitTrackerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitTrackerList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InitTrackerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
