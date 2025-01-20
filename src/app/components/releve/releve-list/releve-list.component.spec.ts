import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveListComponent } from './releve-list.component';

describe('ReleveListComponent', () => {
  let component: ReleveListComponent;
  let fixture: ComponentFixture<ReleveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleveListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
