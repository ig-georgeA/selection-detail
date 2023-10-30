import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxAvatarModule, IgxSelectModule, IgxGridModule } from '@infragistics/igniteui-angular';
import { SelectDetailsComponent } from './select-details.component';

describe('SelectDetailsComponent', () => {
  let component: SelectDetailsComponent;
  let fixture: ComponentFixture<SelectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDetailsComponent ],
      imports: [ NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxAvatarModule, IgxSelectModule, IgxGridModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
