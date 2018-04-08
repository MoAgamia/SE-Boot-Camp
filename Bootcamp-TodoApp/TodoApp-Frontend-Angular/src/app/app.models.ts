export class Todo {
    name: string;
    _id: string;
    tasks: Array<Task>;
    editable: boolean;
    completed: boolean
    newTaskDescription: string;
    constructor(name: string) {
        this.name = name;
        this.tasks = [];
        this.editable = false;
        this.completed = false;
    }
}

export class Task {
    done: boolean;
    _id: string;
    editable: boolean;
    description: string;
    parent: Todo;

    constructor(description: string, parent: Todo, _id: string) {
        this.description = description;
        this._id = _id;
        this.done = false;
        this.editable = false;
        this.parent = parent;
    }

}


export class TodoList {
    items: Array<Todo>;
    visibleItems: Array<Todo>;

    constructor() {
        this.items = [];
    }
    addTodo(todo: Todo) {
        this.items.push(todo);
    }

    removeTodo(todo: Todo) {
        this.items.splice(this.items.indexOf(todo), 1);
    }

}