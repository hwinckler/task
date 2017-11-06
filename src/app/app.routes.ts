import {RouterModule, Routes} from '@angular/router';
import { TaskComponent } from './task/task.component';
import { AppComponent } from './app.component';

const appRoutes: Routes  = [
  { path: 'task', component: TaskComponent },
  { path: 'task/years/:year/months/:month', component: TaskComponent },
  { path: '**', redirectTo: 'task'}
];

export const routing = RouterModule.forRoot(appRoutes);