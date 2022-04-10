import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.js'
import {MevProvider} from './context/MevContext.js'

ReactDOM.render(
  <MevProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MevProvider>,
  document.getElementById('root')
)
