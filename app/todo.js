var state = {
    todos: [
        {id: 1, task: 'Gym',status:true},
        {id: 2, task: 'Shopping',status:false},
        {id: 3, task: 'Be happy',status: false}
      ] 
};

var todoInput = document.getElementById("todo");
var todoList = document.getElementById("todos");

var todoApp = {
    addTodo: function () {
        let todo = todoInput.value;
        let newTodo = {
            id: state.todos.length + 1,  // This should come from the database
            task: todo,
            status: false
        };

        //state.todos.push(newTodo);
        state.todos = [...state.todos, newTodo];
        this.render();
    },

    toggleTodos: function (el) {
        let todoId = el.parentNode.id;

        let todos = state.todos.map((todo) => {
            if (todo.id == todoId) {
                todo.status = !todo.status;
            }
            return todo;
        });

        state.todos = [...todos];
        this.render();
    },

    removeTodo: function (el) {
        let todoId = el.parentNode.id;
        let todos = state.todos.filter((todo) => {
           return todo.id != todoId;
        });

        state.todos = [...todos];

        this.render();

    },

    render: function () {
        let html = "";

        if (state.todos.length === 0) {
            todoList.innerHTML = "No todos yet! Be awesome and create some todos!!";
            return;
        }

        let btnText = "complete";
        let bntUndoRedo = "";
        let btnDelete = `
            <button type='button' 
                onclick='todoApp.removeTodo(this)' 
                class='btn'>remove
            </button>
        `;

        for (let i = 0;i < state.todos.length; i++) {
            let todo = state.todos[i];
            let todoItemStyle = "";
            let buttonUndoRedoText = "complete";

            if (todo.status === true) {
                todoItemStyle = "todo-completed";
                buttonUndoRedoText = "undo";
            }

            // Use Backtick-> found near <esc> key on most keyboards
            btnUndoRedo = `
                <button type='button' onclick='todoApp.toggleTodos(this)' 
                     class='btn'>${buttonUndoRedoText}</button>`;

            html += `
                <li id=${todo.id} class=${todoItemStyle}>
                    ${state.todos[i].task}${btnUndoRedo}${btnDelete}
                 </li>
             `;
        }
        todoList.innerHTML = html;
    }
};

todoApp.render();