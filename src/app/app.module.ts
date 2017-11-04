import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { StitchService } from './services/stitch.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TaskService,
    StitchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
