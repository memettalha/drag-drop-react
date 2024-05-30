export function TodoListItem(todo: TodoListItemProps){
    return(
        <div>
             <li className="todo-list-item">
                <div className="title"><span>{todo.subject}</span></div>
                <div className="subject">{todo.description}</div>
                <div className="status">Tamamlandı mı: {todo.isCompleted ? "Evet" : "Hayır"}</div>
            </li>
        </div>
    )
}