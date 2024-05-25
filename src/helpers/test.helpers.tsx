import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../store/root-reducers'
import { RootState } from '../store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import React from 'react'

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState
    }),
    ...renderOptions
  }: {
    preloadedState: RootState
    store?: any
  }
) => {
  const Wrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }
  return render(component, { wrapper: Wrapper, ...renderOptions })
}
