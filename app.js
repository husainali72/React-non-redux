import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Modal from 'react-modal';
import Favicon from 'react-favicon';


const App = () => {
  return (
    <div>
      <Favicon url="./assets/favicon.ico" />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
