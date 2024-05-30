import { TodoListItem } from "./ToDoListItem";

interface TodoListProps{
    title:string;
    todos:TodoListItem[];
    renderListItem:(todo: TodoListItem) => JSX.Element
}
export interface TodoListItem{
    subject:string;
    description:string;
    isCompleted:boolean;
}


export function TodoList({title, todos, renderListItem}:TodoListProps){
    return(
        <div className="todo-list">
            <div>Yapılacaklar Listesi</div>
            <ul>
                {todos.map(renderListItem)}
            </ul>
        </div>
    )
}