import CreateTodo from "@components/todolist/CreateTodo";
import TodoList from "@components/todolist/TodoList";

const TodoPage = () => {
    return (
        <>
            <TodoList/>
            <CreateTodo/>
        </>
    );
};

export default TodoPage;
