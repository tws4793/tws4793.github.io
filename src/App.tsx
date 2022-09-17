import { useState } from 'react'
import Header from './components/Header'
import LinkTree from './components/LinkTree'
import { Helmet } from 'react-helmet'
import './App.css'

const App = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Teo Wei Shen</title>
      </Helmet>
      <Header />
      <LinkTree />
    </>
  )
}

export default App
