import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteurFormComponent } from './compteur-form.component';

describe('CompteurFormComponent', () => {
  let component: CompteurFormComponent;
  let fixture: ComponentFixture<CompteurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteurFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
