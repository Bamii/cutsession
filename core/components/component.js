export default class Component {
  constructor({ template, ...props }) {
    this.template = null;
    this.initTemplate(template);
    this.init(props);
  }

  get node() {
    return this.template.content;
  }

  initTemplate(template) {
    this.template = document.createElement("template");
    this.template.innerHTML = template;
  }

  init({ state = {}, events = {}, attributes = {} }) {
    console.log(state, events, attributes);
    Object.entries(state).forEach(([key, value]) => {
      const element = this.node.querySelector(`[data-${key}]`);
      element.textContent = value;
    })

    Object.entries(events).forEach(([key, _events]) => {
      const element = this.node.querySelector(`[data-${key}]`);
      Object.entries(_events).forEach(([eventname, fn]) => {
        element[eventname] = fn;
      })
    })

    Object.entries(attributes).forEach(([key, attrs]) => {
      const element = this.node.querySelector(`[data-${key}]`);
      Object.entries(attrs).forEach(([attributename, value]) => {
        element.setAttribute(attributename, value);
      })
    })
  }

  set({ key, value, attribute = false, inners = {}, events = null }) {
    const element = this.node.querySelector(`[data-${key}]`);
    const _events = Array.from(Object.entries(events || []));
    const _inners = Array.from(Object.entries(inners || []));

    if(attribute) {
      element.setAttribute(key, value);
    } else if(events) {
      _events.forEach(([name, fn]) => {
        // confirm fn is a function...
        element[name] = (e) => fn(e, );
      })
    } else {
      element.textContent = value;
    }
  }
}
