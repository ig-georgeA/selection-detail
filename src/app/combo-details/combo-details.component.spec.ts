import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxAvatarModule, IgxSimpleComboModule, IgxGridModule } from '@infragistics/igniteui-angular';
import { ComboDetailsComponent } from './combo-details.component';

describe('ComboDetailsComponent', () => {
  let component: ComboDetailsComponent;
  let fixture: ComponentFixture<ComboDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboDetailsComponent ],
      imports: [ NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxAvatarModule, IgxSimpleComboModule, IgxGridModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
