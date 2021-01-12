import {LitElement,html} from 'lit-element';


class ToDoItem extends LitElement{
    
    static get properties(){
        return {
           todoItem : {type:Object,attribute: false}
        }
    }
    onRemove(id){
        this.dispatchEvent(new CustomEvent('removeItem',
        {
        detail:{
            todoItemId: id
        }, 
        bubbles:true,
        composed:true}
        ))
    }

    onChecked(id){
        this.dispatchEvent(new CustomEvent('checkItem',
        {
        detail:{
            todoItemId: id
        }, 
        bubbles:true,
        composed:true}
        ))
        this.requestUpdate();
    }

    constructor(){
        super();
        this.todoItem = {};
       
    } 
     render(){
         
         return html`<style>
         :host {
         display: block;
         cursor: pointer;
         position: relative;
         padding: 12px 8px 12px 40px;
         background: #eee;
         font-size: 1.6rem;
         transition: 0.2s;
         list-style:none;
         }
         .completed {
         text-decoration: line-through;
         }
       
         button {
         border: none;
         cursor: pointer;
         }
     </style>
     <li class="item">
         <input type="checkbox" @click=${()=>this.onChecked(this.todoItem.id)} 
         ?checked=${this.todoItem.checked} > 
         <label>${this.todoItem.item}</label>
         <button @click=${()=>this.onRemove(this.todoItem.id)}>❌</button>
     </li>`;
     }
   
}


window.customElements.define('to-do-item',ToDoItem);