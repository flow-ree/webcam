import React from 'react'
import ReactDOM from 'react-dom'
import Start from './components/start'
import './assets/style.css'
import 'react-rangeslider/lib/index.css'


// Create app
const container = document.querySelector('#app-container')

// Render app
ReactDOM.render(<Start/>, container)
