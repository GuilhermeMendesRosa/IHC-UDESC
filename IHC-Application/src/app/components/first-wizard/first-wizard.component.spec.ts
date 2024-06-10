import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstWizardComponent } from './first-wizard.component';

describe('WizardComponent', () => {
  let component: FirstWizardComponent;
  let fixture: ComponentFixture<FirstWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
