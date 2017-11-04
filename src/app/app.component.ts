import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formTasks: any[] = [];
  tasks: any[] = [];

  constructor(private taskService: TaskService){
    this.createNewTask();
    this.getAll();
  }

  getAll(){
    this.taskService.getAll().then(t =>{
      this.tasks = t;
    }); 
  }

  rem(index: any){
    this.formTasks.splice(index, 1);
  }

  del(task: any){
    this.taskService.delete(task).then(() =>{
      var index = this.tasks.indexOf(task);
      if(index >= 0){
        this.tasks.splice(index, 1);
      }
    })
  }  

  add(){
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
    this.formTasks.map(ft => {
      ft.hours = this.getHours(ft.start, ft.end);
      ft.date = new Date(moment(ft.date, 'DD/MM/YYYY').format());
    });
    this.taskService.insert(this.formTasks).then(t => {
      this.getAll();
      this.createNewTask();
    });
  }

  createNewTask(){
    this.formTasks = [];
    this.add();
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

  formatDate(d:any):string{
    return moment(d).format('DD/MM/YYYY');
  }
}
