import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { IgxListModule, IgxAvatarModule, IgxGridModule, IgxSimpleComboModule, IgxSelectModule, IgxComboModule, IgxInputGroupModule, IgxCardModule, IgxButtonModule, IgxRippleModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { ComboDetailsComponent } from './combo-details/combo-details.component';
import { SelectDetailsComponent } from './select-details/select-details.component';
import { IteratorLocalComponent } from './iterator-local/iterator-local.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListDetailsComponent,
    ComboDetailsComponent,
    SelectDetailsComponent,
    IteratorLocalComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxListModule,
    IgxAvatarModule,
    IgxGridModule,
    FormsModule,
    IgxSimpleComboModule,
    IgxSelectModule,
    IgxComboModule,
    IgxInputGroupModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
