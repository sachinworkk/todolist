import {html,render} from 'lit-html';

const template = html `
            <style>
            ul{
                margin-top: 50px;
                padding-left: 0;
                min-width: 40%;
                list-style: none;
            }
            input,button{
                padding: 0.4rem;
                font-size: 1.6rem;
                background: white;
            }
            button{
                color: #c065c0;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            form button:hover{
                background: #c065c0;
                color: white;
            }
            </style>
            <div class="toDoList">
            <input type="text"  placeholder="Enter a to do"></input>
            <button>Add</button>
            <h2> To Do's </h2>
            <ul>

            </ul>
            </div>  
        `;
class ToDoApp extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this.todosList = this._shadowRoot.querySelector('ul');
        this.addButton = this._shadowRoot.querySelector('button');
        this.input= this._shadowRoot.querySelector('input');
        this.todos = [];
        render(template,this._shadowRoot);
    } 
    toggleTodo(e) {
        const todo = this.todos[e.detail];
        this.todos[e.detail] = Object.assign({}, todo, {
            checked: !todo.checked
        });
        this.displayToDos();
    }
    displayToDos(){
        this.todosList.innerHTML = '';

        this.todos.forEach((todo, index) => {
            let todoItem = document.createElement('to-do-item');
            todoItem.setAttribute('text',todo.text);

            if(todo.checked) {
                todoItem.setAttribute('checked', '');                
            }
            todoItem.setAttribute('index', index);
            todoItem.addEventListener('onToggle',this.toggleTodo.bind(this));
            todoItem.addEventListener('onRemove',this.removeTodo.bind(this));
            this.todosList.appendChild(todoItem);
        });
    }

    connectedCallback(){
       this.addButton.addEventListener('click',()=>this.addTodos());
    }

    addTodos() {
        if(this.input.value.length > 0){
            this.todos.push({ text: this.input.value, checked: false })
            this.displayToDos();
            this.input.value = '';
        }
    }
   
    removeTodo(e) {
        this.todos.splice(e.detail, 1);
        this.displayToDos();
    }
}


window.customElements.define('to-do-app',ToDoApp);