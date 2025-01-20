import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveFormComponent } from './releve-form.component';

describe('ReleveFormComponent', () => {
  let component: ReleveFormComponent;
  let fixture: ComponentFixture<ReleveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
