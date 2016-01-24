import t from 'tcomb'

export default function(domain, initialState, ...cases) {
  let reducer = (state = initialState, action) => {
    let typedAction = action
    if (action['type'] === '@@reactuate/action') {
      let actionCreator = domain.get('actions')[domain.withoutPrefix(action.meta.name)]
      if (!t.Nil.is(actionCreator)) {
        typedAction = actionCreator(action.payload.payload, action.payload.error, action.payload.meta)
      }
    }
    Object.freeze(state)
    let stateCases = cases.map(f => {
      if (typeof f === 'function' && typeof f.meta === 'undefined') {
        return (handler) => f(state, handler)
      } else {
        return f
      }
    })
    return t.match(typedAction, ...stateCases, t.Any, () => state)
  }
  domain.reducer = reducer
  return reducer
}
