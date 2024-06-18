import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './services/store.ts'
import { Provider } from 'react-redux'
import App from './components/App/App.tsx'
import './reset.scss'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
)
