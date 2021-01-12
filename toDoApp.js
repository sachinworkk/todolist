import {LitElement,html} from 'lit-element';
import './components/addItem.js';
import './components/listItems.js';

class ToDoApp extends LitElement{
    static get properties(){
        return{
            todos:{type:Array}
        };
    }
    constructor(){
        super();
        let list = localStorage.getItem('todos');
        this.todos = list === null ? []:list;
    } 

    firstUpdated(){
        this.addEventListener('addItem',(e)=>{
            this.todos = JSON.stringify(e.detail.todos);
        })

        this.addEventListener('removeItem',(e)=>{
         let todosList =JSON.parse(this.todos).filter(function(item) {
            return item.id != e.detail.todoItemId;
        });
         this.todos = JSON.stringify(todosList);
         localStorage.setItem('todos',this.todos);
        })

        this.addEventListener('checkItem',(e)=>{
            this.todos = JSON.parse(this.todos);
            let index = this.todos.map(function(item){
                return item.id
            }).indexOf(e.detail.todoItemId);
            this.todos[index].checked = ! this.todos[index].checked ;
            this.todos = JSON.stringify(this.todos);
            localStorage.setItem('todos',this.todos);
        })
    }

    

    render(){
        return html `
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
           
           <add-item></add-item>
           <list-items todos=${this.todos}></list-items>
        </div>
    `;
    }
    // toggleTodo(e) {
    //     const todo = this.todos[e.detail];
    //     this.todos[e.detail] = Object.assign({}, todo, {
    //         checked: !todo.checked
    //     });
    //     this.displayToDos();
    // }
    // displayToDos(){
    //     this.todosList.innerHTML = '';

    //     this.todos.forEach((todo, index) => {
    //         let todoItem = document.createElement('to-do-item');
    //         todoItem.setAttribute('text',todo.text);

    //         if(todo.checked) {
    //             todoItem.setAttribute('checked', '');                
    //         }
    //         todoItem.setAttribute('index', index);
    //         todoItem.addEventListener('onToggle',this.toggleTodo.bind(this));
    //         todoItem.addEventListener('onRemove',this.removeTodo.bind(this));
    //         this.todosList.appendChild(todoItem);
    //     });
    // }

    // connectedCallback(){
    //    this.addButton.addEventListener('click',()=>this.addTodos());
    // }
    // inputKeypress(e){
    //     if(e.keyCode == 13){

    //     }else{
    //         this.todoItem = e.target.value;
    //     }
    // }
    // addTodos() {
    //     if(this.input.value.length > 0){
    //         this.todos.push({ text: this.input.value, checked: false })
    //         this.displayToDos();
    //         this.input.value = '';
    //     }
    // }
   
    // removeTodo(e) {
    //     this.todos.splice(e.detail, 1);
    //     this.displayToDos();
    // }
}


window.customElements.define('to-do-app',ToDoApp);