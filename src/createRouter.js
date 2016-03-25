import React           from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider }    from 'react-redux'

export default function(store, routes, createElement) {
  return <Provider store={store}><ReduxRouter createElement={createElement}>{routes}</ReduxRouter></Provider>
}
