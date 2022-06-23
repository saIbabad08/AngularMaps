import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaplayoutComponent } from './maplayout.component';

describe('MaplayoutComponent', () => {
  let component: MaplayoutComponent;
  let fixture: ComponentFixture<MaplayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaplayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaplayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
