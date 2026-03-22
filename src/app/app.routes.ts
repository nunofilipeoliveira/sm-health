import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddRunComponent } from './pages/add-run/add-run.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddRunComponent },
  { path: '**', redirectTo: '' }
];
