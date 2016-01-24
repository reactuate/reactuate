import t from 'tcomb'

export default function(domain, action, payload = t.Any, defaultValue = undefined, meta = t.Any) {
  let actionString = domain.withPrefix(action)
  function ActionCreator(value = defaultValue, error = false,
                         metaValue = undefined, path = [payload.displayName]) {

    if (ActionCreator.is(value)) {
      return value
    }

    value = payload(value)

    if (typeof metaValue !== 'undefined') {
      metaValue = meta(metaValue)
    }

    if (!(this instanceof ActionCreator)) {
      return new ActionCreator(value, error, metaValue, path)
    }

    this.type = actionString
    this.payload = value

    if (!!error) {
      this.error = true
    }

    if (typeof metaValue !== 'undefined') {
      this.meta = metaValue
    }

    if (process.env.NODE_ENV !== 'production') {
      Object.freeze(this)
    }
  }

  ActionCreator.meta = {
    kind: 'actionCreator',
    payload: payload,
    name: actionString,
    identity: false
  }

  ActionCreator.displayName = `Action ${actionString}(${payload.displayName})`
  ActionCreator.actionCreator = true
  ActionCreator.action = action

  ActionCreator.is = x => x instanceof ActionCreator

  domain.register('actions', action, ActionCreator)
  return ActionCreator
}
