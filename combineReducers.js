import { combineReducers }    from 'redux'
import { routerStateReducer } from 'redux-router'

export default function(reducers) {
   if (typeof reducers !== 'object') {
     throw "Reactuate reducers should be an object (and not a function)"
   }
   return combineReducers({router: routerStateReducer, ...reducers})
}
