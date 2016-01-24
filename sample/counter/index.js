import ft from 'tcomb-form-types'

import { t, Domain } from 'reactuate'

const domain = new Domain("counter")
export default domain

const State = t.struct({
  counter: ft.Number.Integer
}, State)

import { createAction } from 'reactuate'

const incrementParameter = t.struct({increment: ft.Number.Integer}, 'incrementParameter')
const IncrementCounter = createAction(domain, 'IncrementCounter',
                                      t.maybe(incrementParameter))
import { createReducer } from 'reactuate'

const initialState = State({counter: 0}, 'CounterState')

const reducer = createReducer(domain, initialState,
    IncrementCounter, (state, action) => {
      let increment = 1;
      if (incrementParameter.is(action.payload)) {
        increment = action.payload.increment
      }
      return State.update(state, {counter: { $set: state.counter + increment }})
    })
