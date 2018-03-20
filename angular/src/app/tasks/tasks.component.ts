import { Task } from './../app.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'Tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit {

  @Input() task: Task;
  constructor() { }

  ngOnInit() {
  }

  createTask() {
    //TODO: create task
  }

}
