import CreateTodo from "@/components/todolist/CreateTodo";
import TodoList from "@/components/todolist/TodoList";

const TodoPage = () => {
    return (
        <div>
            <TodoList />
            <CreateTodo />
        </div>
    );
};

export default TodoPage;
