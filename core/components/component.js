export default class Component {
  constructor({ template, selector, ...props }) {
    this.template = null;
    this.mnode = document.querySelector(`[data-${selector}]`);
    this.initTemplate(template);
    this.init({ ...props, selector });
  }

  get node() {
    return this.template.content;
  }

  get _node() {
    return this.mnode;
  }

  initTemplate(template) {
    this.template = document.createElement("template");
    this.template.innerHTML = template;
  }

  init({ state = {}, events = {}, attributes = {}, isList = false, table = null, selector }) {
    Object.entries(state).forEach(([key, value]) => {
      const element = this.template.content.querySelector(`[data-${key}]`);
      
      if(element) 
        element.textContent = value;
    })

    Object.entries(events).forEach(([key, _events]) => {
      const element = this.template.content.querySelector(`[data-${key}]`);

      if(element) 
        Object.entries(_events).forEach(([eventname, fn]) => {
          element[eventname] = (e) => fn(e, this);
        })
    })

    Object.entries(attributes).forEach(([key, attrs]) => {
      const element = this.template.content.querySelector(`[data-${key}]`);
      
      if(element) {    
        Object.entries(attrs).forEach(([attributename, value]) => {
          const type = typeof value;
          element.setAttribute(attributename, type === "function" ? value(this) : value);
        })
      }
    })

    if(isList) {
      table.append(this.template.content);
      this.mnode = document.querySelector(`[data-${selector}]`);
    } else {
      this.mnode.replaceWith(this.template.content);
      this.mnode = document.querySelector(`[data-${selector}]`);
    }
  }

  set({ key, value, attribute = false, attributename = "", events = null }) {
    const element = this._node.querySelector(`[data-${key}]`);
    const _events = Array.from(Object.entries(events || []));

    if(attribute) {
      element.setAttribute(attributename || key, value);
    } else if(events) {
      _events.forEach(([name, fn]) => {
        // confirm fn is a function...
        element[name] = fn;
      })
    } else {
      element.textContent = value;
    }
  }

  get(key, value) {
    return this._node.querySelector(`[data-${key}]`)[value];
  }
}
