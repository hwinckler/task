import { Component, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  formTasks: any[] = [];
  tasks: any[] = [];
  month: number;
  year: number;

  constructor(private taskService: TaskService, public route: ActivatedRoute, public router: Router){
    this.route.params.subscribe(params => {
      this.year = parseInt(params['year']);
      this.month = parseInt(params['month']);

      if(this.year == null && this.month == null){
        this.year = parseInt(moment().format('YYYY'));
        this.month = parseInt(moment().format('MM'));
        this.router.navigate([`/task/years/${this.year}/months/${this.month}`]);
      }
      else{
        this.createNewTask();
        this.getAll();
      }
    });
  }

  getAll(){
    this.taskService.getAll(this.month, this.year).then(t =>{
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
      ft.order = this.formatOrder(ft.start);
    });
    this.taskService.insert(this.formTasks).then(t => {
      this.getAll();
      this.createNewTask();
    });
  }

  formatOrder(start){
    var parts = start.split(":");
    return parseInt(parts[0] + '' + parts[1]);
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
