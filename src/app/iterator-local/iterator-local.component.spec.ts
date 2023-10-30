import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IgxComboModule, IgxInputGroupModule, IgxCardModule, IgxButtonModule, IgxRippleModule, IgxGridModule } from '@infragistics/igniteui-angular';
import { IteratorLocalComponent } from './iterator-local.component';

describe('IteratorLocalComponent', () => {
  let component: IteratorLocalComponent;
  let fixture: ComponentFixture<IteratorLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IteratorLocalComponent ],
      imports: [ NoopAnimationsModule, FormsModule, HttpClientTestingModule, IgxComboModule, IgxInputGroupModule, IgxCardModule, IgxButtonModule, IgxRippleModule, IgxGridModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IteratorLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
