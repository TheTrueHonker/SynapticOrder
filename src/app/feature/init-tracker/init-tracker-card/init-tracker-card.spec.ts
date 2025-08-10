import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InitTrackerCard} from './init-tracker-card';

describe('InitTrackerCard', () => {
  let component: InitTrackerCard;
  let fixture: ComponentFixture<InitTrackerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitTrackerCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InitTrackerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
