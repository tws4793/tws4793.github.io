import { useState } from 'react'
import Counter from './components/Counter'
import Header from './components/Header'
import LinkTree from './components/LinkTree'
import './App.css'

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <LinkTree />
    </>
  )
}

export default App
