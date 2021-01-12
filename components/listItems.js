import {LitElement,html} from 'lit-element';
import './toDoItem';
class ListItems extends LitElement{
    static get properties(){
        return {
            todos:{type:Array}
        };
    }

    constructor(){
        super();
        this.todos = [];
    }
    
    render(){
        return html`<ul>
        ${this.todos.map((todo)=>html`<to-do-item .todoItem=${todo}></to-do-item>`)}
        </ul>`;
    }
 
}

customElements.define('list-items',ListItems);