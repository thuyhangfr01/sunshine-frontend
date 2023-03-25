import React from 'react'
import Banner from '../../components/Banner'
import Services from '../../components/Services'
import About from '../../components/About'
import Clients from '../../components/Clients'
import Pricing from '../../components/Pricing'

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <Clients />
      <Pricing />
    </>
  )
}

export default Home