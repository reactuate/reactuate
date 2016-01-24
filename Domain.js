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
    this[type][name] = value
  }

  get(type) {
    return this[type] || {}
  }
}
