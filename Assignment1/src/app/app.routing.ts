import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppHomeComponent} from './app.home';
import {AppManageComponent} from './app.manage';
import {AppCreateComponent} from './app.create';
import {AppEditComponent} from './app.edit';

const appRoutes: Routes = [
  {path: 'manage', component: AppManageComponent},
  {path: 'create', component: AppCreateComponent},
  {path: 'edit', component: AppEditComponent},
  {path: 'edit/:id', component: AppEditComponent},
  {path: '', component: AppHomeComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  {path: '**', component: AppHomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
