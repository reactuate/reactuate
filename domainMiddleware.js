export default function ({ getState }) {
  return (next) => (action) => {
    if (!!action.constructor.actionCreator) {
      let newAction = {type: "@@reactuate/action", payload: {...action}, meta: {name: action.constructor.action}}
      return next(newAction)
    } else {
      return next(action)
    }
  }
}
