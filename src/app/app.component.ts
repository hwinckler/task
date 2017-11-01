import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tasks: any[] = [];

  constructor(){
    this.tasks.push({
      date: '12/12/2012',
      start: '08:00',
      end: '12:30',
      desc: 'card 123',
      opt: ''
    });
  }

  del(e: Event, index: any){
    //console.log(e);
    //console.log(t);
    //let index = this.tasks.indexOf(t);
    //console.log(index);
    this.tasks.splice(index, 1);
  }

  add(e: Event){
    console.log(e);
    this.tasks.push({
      date: '12/12/2012',
      start: '',
      end: '',
      desc: '',
      opt: ''
    });
  }

  save(f: NgForm){
    //console.log(f.form.controls);
    Object.keys(f.form.controls).forEach(key => {
      //console.log(f.form.get(key).value());
      console.log(f.form.get(key).value);
    });
    
  }
}
