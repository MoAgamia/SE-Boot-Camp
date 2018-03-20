export class Todo {
    title: string;
    tasks: Array<Task>;
    editable: boolean;
    completed: boolean
    newTaskDescription: string;
    constructor(title: string) {
        this.title = title;
        this.tasks = [];
        this.editable = false;
        this.completed = false;
    }
    createTask() {
        if (this.newTaskDescription === "") return;
        let task = new Task(this.newTaskDescription, this);
        this.addTask(task);
        this.newTaskDescription = ""
    }
    addTask(task: Task) {
        this.tasks.push(task);
    }
    edit() {
        this.editable = true;
    }
    finishEditing() {
        this.editable = false;
    }
    removeTask(task: Task) {
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }
    checkIfDone() {
        let completedTasks = this.tasks.filter(task => task.completed);
        if (completedTasks.length === this.tasks.length) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }
}

export class Task {
    completed: boolean;
    editable: boolean;
    description: string;
    parent: Todo;

    constructor(description: string, parent: Todo) {
        this.description = description;
        this.completed = false;
        this.editable = false;
        this.parent = parent;
    }
    edit() {
        this.editable = true;
    }
    finishEditing() {
        this.editable = false;
    }
    setCompletion(value: boolean) {
        this.completed = value;
        this.parent.checkIfDone();
    }

}

export enum FilterMode {
    All,
    Done,
    Undone
}

export class TodoList {
    items: Array<Todo>;
    visibleItems: Array<Todo>;
    filterMode: FilterMode;

    constructor() {
        this.items = [];
        this.filterMode = FilterMode.All
        this.filter();
    }
    addTodo(todo: Todo) {
        this.items.push(todo);
        this.filter();

    }

    removeTodo(todo: Todo) {
        this.items.splice(this.items.indexOf(todo), 1);
        this.filter();
    }

    filter() {
        switch (this.filterMode) {
            case FilterMode.All:
                this.visibleItems = this.items;
                break;
            case FilterMode.Done:
                this.visibleItems = this.items.filter(todo => todo.completed);
                break;
            case FilterMode.Undone:
                this.visibleItems = this.items.filter(todo => !todo.completed);
                break;
            default:
                this.visibleItems = this.items;
                break;
        }
    }

    changeFilter(filterMode: FilterMode) {
        this.filterMode = filterMode;
        this.filter();
    }
    getTodoIndex(todo: Todo) {
        return this.visibleItems.indexOf(todo);
    }
    moveUp(index: number) {
        let todo: Todo = this.visibleItems[index];
        if (index === 0) return;
        let newIndex = index - 1;
        let todoInPlace = this.visibleItems[newIndex];
        this.visibleItems[index] = todoInPlace;
        this.visibleItems[newIndex] = todo;
        this.items[index] = todoInPlace;
        this.items[newIndex] = todo;
    }
    moveDown(index: number) {
        let todo: Todo = this.visibleItems[index];
        if (index === this.visibleItems.length - 1) return;
        let newIndex = index + 1;
        let todoInPlace = this.visibleItems[newIndex];
        this.visibleItems[index] = todoInPlace;
        this.visibleItems[newIndex] = todo;
        this.items[index] = todoInPlace;
        this.items[newIndex] = todo;
    }


    sort() {
        this.items = this.items.sort((a: Todo, b: Todo) => {
            let x: string = a.title
            let y: string = b.title
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
        this.filter();
    }



}