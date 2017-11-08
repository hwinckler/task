import { Component, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import 'moment-duration-format';
import { TaskService } from '../services/task.service';

const HOURS_DAY:number = 8;

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
  workingDays: number = 20;
  hoursMonth: number = (this.workingDays * HOURS_DAY);
  workingHours: number = 0;
  hoursLeft: number = 0;
  hoursFormatted: string = '';


  constructor(private taskService: TaskService, public route: ActivatedRoute, public router: Router){
    this.route.params.subscribe(params => {

      if(params['year'] == null && params['month'] == null){
        this.year = parseInt(moment().format('YYYY'));
        this.month = parseInt(moment().format('MM'));
        this.router.navigate([`/task/years/${this.year}/months/${this.month}`]);
      }
      else{
        this.year = parseInt(params['year']);
        this.month = parseInt(params['month']);
        this.createNewTask();
        this.getAll();
      }
    });
  }

  getAll(){
    this.taskService.getAll(this.month, this.year).then(t =>{
      this.tasks = t;
    }).then(() => {
      var sum: number = 0;
      this.tasks.filter(t => !t.opt).map(t => {
        sum = sum + t.hours;
      })
      this.workingHours = (sum / 3600000);
      this.hoursLeft = ((((this.hoursMonth) * 3600000) - sum) / 3600000);
      this.hoursFormatted = this.formata(this.workingHours) + ' (remaining: ' + this.formata(this.hoursLeft) + ' / ' + this.formata(this.hoursMonth) + ')';

    }); 
  }

  formata(value){
    return moment.duration(value, "hours").format("h:mm");
  }

  rem(index: any){
    this.formTasks.splice(index, 1);
  }

  del(task: any){
    this.taskService.delete(task._id).then(() =>{
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
    //var sum: number = 0;
   // this.tasks.filter(t => !t.opt).map(t => {
      //sum = sum + t.hours;
    //})
    //var total = ((((this.workingDays * HOURS_DAY) * 60 * 60 * 1000) - sum) / 3600000);
    //this.formata((((this.workingDays * HOURS_DAY) * 60 * 60 * 1000) - sum));

    //console.log(moment.duration((sum / 3600000) , "minutes").format());

    //return (sum / 3600000) + ' (' + total + ' / ' + (this.workingDays * HOURS_DAY) + ')';
    return '';
  }


  formatDate(d:any):string{
    return moment(d).format('DD/MM/YYYY');
  }
}
