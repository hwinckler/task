import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { StitchService } from './services/stitch.service';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    TaskService,
    StitchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
