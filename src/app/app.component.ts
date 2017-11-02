import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formTasks: any[] = [];
  tasks: any[] = [];

  constructor(){
    this.createNewTask();
  }

  rem(e: Event, index: any){
    //console.log(e);
    //console.log(t);
    //let index = this.tasks.indexOf(t);
    //console.log(index);
    this.formTasks.splice(index, 1);
  }

  del(e: Event, index: any){
    //console.log(e);
    //console.log(t);
    //let index = this.tasks.indexOf(t);
    //console.log(index);
    this.tasks.splice(index, 1);
  }  

  add(e: Event){
    //console.log(e);
    this.formTasks.push({
      date: '12/12/2012',
      start: '',
      end: '',
      desc: '',
      opt: ''
    });
  }

  save(f: NgForm){
    //console.log(f.form.controls);
    //Object.keys(f.form.controls).forEach(key => {
      //console.log(f.form.get(key).value());
      //console.log(f.form.get(key).value);
    //});

    this.formTasks.map(ft => {
      ft.hours = 4;
      this.tasks.push(ft);
    });

    console.log(this.tasks);
    this.createNewTask();
  }

  createNewTask(){
    this.formTasks = [];
    this.formTasks.push({
      date: '12/12/2012',
      start: '',
      end: '',
      desc: '',
      opt: ''
    });
  }
}
