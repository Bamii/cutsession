export default class Model {
  constructor(rules) {
    // check rules for correctness
    this.rules = rules;
  }

  validate(values) {
    const that = this;
    try {
      const errors = Object.entries(values).reduce((acc, [key, value]) => {
        const rule = that.rules[key]
        if(rule) {
          const { fn, message } = rule;
          if (!fn(value))
            return [...acc, message];
        }
        return acc;
      }, []);

      if(errors.length !== 0)
        throw new Error(`${errors[0]}.`)
  
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}