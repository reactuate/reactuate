export default class Domain {

  constructor(prefix) {
    this.prefix = prefix || ""
  }

  withPrefix(name) {
    return (this.prefix == "" ? "" : this.prefix + "/") + name
  }

  withoutPrefix(name) {
    return name.replace(new RegExp(`^${this.prefix}\/`),'')
  }

  register(type, name, value) {
    this[type] = this[type] || {}
    if(name in this[type]) {
      throw `Reactuate error: in ${this.prefix} domain you already registered a "${name}" ${type}`
    }
    this[type][name] = value
  }

  get(type) {
    return this[type] || {}
  }
}
