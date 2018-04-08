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

  // get task from parent component
  @Input() task: Task;

  constructor(private ls: ListsService) { }

  ngOnInit() {
  }

  // called to update a task after the user is done editing it
  finishEditingTask(task: Task) {
    // make task no longer editable
    task.editable = false;

    // update task in the backend
    this.ls.updateTaskInList(task.parent._id, task._id, task.description, task.done).subscribe((res: ResponseBody) => {
      // print result
      console.log(res);
    });
  }


  deleteTask(task: Task) {
    // delete the task in the backend
    this.ls.deleteTaskInList(task.parent._id, task._id).subscribe((res: ResponseBody) => {
      // when backend is done, remove it from the view
      task.parent.tasks.splice(task.parent.tasks.indexOf(task), 1);
    });
  }

  startEditingTask(task: Task) {
    // makes task editable
    task.editable = true;
  }

  toggleTaskCompletion(task: Task) {
    // switch task between done and not done
    this.ls.updateTaskInList(task.parent._id, task._id, task.description, !task.done).subscribe((res: ResponseBody) => {
      // set frontend
      task.done = !task.done;

    });

  }
}
