import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ComboDetailsComponent } from './combo-details/combo-details.component';
import { SelectDetailsComponent } from './select-details/select-details.component';
import { IteratorLocalComponent } from './iterator-local/iterator-local.component';

export const routes: Routes = [
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'list-details', component: ListDetailsComponent, data: { text: 'List + details' } },
  { path: 'combo-details', component: ComboDetailsComponent, data: { text: 'Combo + details' } },
  { path: 'select-details', component: SelectDetailsComponent, data: { text: 'select+ details' } },
  { path: 'iterator-local', component: IteratorLocalComponent, data: { text: 'iterator local' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
