import { ResponseBody } from './../auth.models';
import { ListsService } from './../lists.service';
import { Task } from './../app.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'Tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit {

  @Input() task: Task;
  constructor(private ls: ListsService) { }

  ngOnInit() {
  }

  finishEditingTask(task: Task) {
    task.editable = false;
    this.ls.updateTaskInList(task.parent._id, task._id, task.description).subscribe((res: ResponseBody) => {
      console.log(res);
    });
  }

  deleteTask(task: Task) {
    this.ls.deleteTaskInList(task.parent._id, task._id).subscribe((res: ResponseBody) => {
      task.parent.tasks.splice(task.parent.tasks.indexOf(task), 1);
    });
  }

  startEditingTask(task: Task) {
    task.editable = true;
  }

  toggleTaskCompletion(task: Task) {
    // this.ls.updateTaskInList(task.parent._id, task._id, { done: !task.done }).subscribe(() => {
    task.done = !task.done;
    // })
  }
}
