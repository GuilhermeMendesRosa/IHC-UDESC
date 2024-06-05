import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondWizardComponent } from './second-wizard.component';

describe('SecondWizardComponent', () => {
  let component: SecondWizardComponent;
  let fixture: ComponentFixture<SecondWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
