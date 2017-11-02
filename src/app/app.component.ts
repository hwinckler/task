import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

const EIGHT_HOURS:number = 28800000;

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
      date: moment().format("DD/MM/YYYY"),
      start: '',
      end: '',
      desc: '',
      comp: "",
      opt: false
    });
  }

  save(f: NgForm){
    //console.log(f.form.controls);
    //Object.keys(f.form.controls).forEach(key => {
      //console.log(f.form.get(key).value());
      //console.log(f.form.get(key).value);
    //});

    this.formTasks.map(ft => {
      ft.hours = this.getHours(ft.start, ft.end);
      this.tasks.push(ft);
    });

    console.log(this.tasks);
    this.createNewTask();
  }

  createNewTask(){
    this.formTasks = [];
    this.add(null);
  }


  getHours(start: string, end: string): number{
    return moment.duration(moment(end, "HH:mm").diff(moment(start, "HH:mm"))).asMilliseconds();
  }

  getTotal(): string {
    var sum: number = 0;
    this.tasks.filter(t => !t.opt).map(t => {
      sum = sum + t.hours;
    })
    return moment.utc(sum).format('HH:mm');;
  }
}
