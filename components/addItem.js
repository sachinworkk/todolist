import {LitElement,html} from 'lit-element';

class AddItem extends LitElement{
    static get properties(){
        return{
            todos:Array ,
            todoItem:String
        }
    }

    constructor(){
        super();
        this.todoItem='';
    }

    inputKeypress(e){
        if(e.keyCode==13){
            this.onAddItem();
        }
        else{
            this.todoItem = e.target.value;
        }
        
    }
    onAddItem(){
        if(this.todoItem.length>0){
        let storedToDoList = JSON.parse(localStorage.getItem('todos'));
        storedToDoList = storedToDoList === null ? [] : storedToDoList;
        storedToDoList.push({
                id : new Date().valueOf(),
                item : this.todoItem,
                checked: false
        })
        
        localStorage.setItem('todos',JSON.stringify(storedToDoList));
        this.dispatchEvent(new CustomEvent('addItem',
        {
        detail:{
            todos: storedToDoList
        }, 
        bubbles:true,
        composed:true}
        ))
        this.todoItem = '';
    }
    }

    render(){
        return html
        `<input type="text" @keyup="${(e)=>this.inputKeypress(e)}"
        placeholder="Enter a to do"></input>
        <button @click="${()=>this.onAddItem()}">Add</button>
        <h2> To Do's </h2>
        `;
    }

}

customElements.define('add-item',AddItem);