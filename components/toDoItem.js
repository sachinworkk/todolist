const template=document.createElement('template');
template.innerHTML = `
    <style>
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
        <input type="checkbox">
        <label></label>
        <button>❌</button>
    </li>
`;

class ToDoItem extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot= this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.item = this._shadowRoot.querySelector('.item');
        this.label = this._shadowRoot.querySelector('label');
        this.deleteButton = this._shadowRoot.querySelector('button');
        this.checkbox = this._shadowRoot.querySelector('input');
        this.deleteButton.addEventListener('click', (e) => {
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
        });
        this.checkbox.addEventListener('click',(e)=>{
            this.dispatchEvent(new CustomEvent('onToggle',{detail:this.index}))
        });
    } 

    connectedCallback(){    
      this.renderToDoItem();
     }

     renderToDoItem(){
       
        if (this.hasAttribute('checked')){
            this.label.classList.add('completed');
            this.checkbox.setAttribute('checked', '');
        } else {
            this.item.classList.remove('completed');
            this.checkbox.removeAttribute('checked');
        }
         this.label.innerHTML=this.text;
         
     }
     
     static get observedAttributes() {
        return ['text','index'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name){
            case 'text':
                this.text = newValue;
                break;
            case 'index':
                this.index = parseInt(newValue);
                break;    
        }
    }  
    
}


window.customElements.define('to-do-item',ToDoItem);