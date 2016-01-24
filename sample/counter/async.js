import ft               from 'tcomb-form-types'
import { t,
         Domain,
         createSaga,
         createAction,
         fork,
         take, put }    from 'reactuate'

import domain           from './index'

const asyncDomain = new Domain("counterAsync")

const incrementParameter = t.struct({increment: ft.Number.Integer}, 'incrementParameter')
const IncrementCounterDelayed = createAction(asyncDomain,
                                'IncrementCounterDelayed', t.maybe(incrementParameter))

function delay(millis) {
    return new Promise(resolve =>
      setTimeout( () => resolve(true), millis)
    )
}

createSaga(asyncDomain, 'IncrementCounterDelayed', function* () {
  while(true) {
     const nextAction = yield take(IncrementCounterDelayed.is)
     yield fork(function* () {
       yield delay(1000)
       yield put(domain.actions.IncrementCounter(nextAction.payload))
     })
   }
})

export default asyncDomain
