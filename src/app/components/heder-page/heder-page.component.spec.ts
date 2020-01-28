import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HederPageComponent } from './heder-page.component';

describe('HederPageComponent', () => {
  let component: HederPageComponent;
  let fixture: ComponentFixture<HederPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HederPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HederPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
