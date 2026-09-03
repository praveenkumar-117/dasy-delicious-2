import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Discount from '../components/Discount';
import OurSpecialDish from '../components/OurSpecialDish';
import AppDownload from '../components/AppDownload';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <main className="bg-blue-100">
     
      <Hero/>
      <Discount/>
      <OurSpecialDish/>
      <AppDownload />

    </main>
  )
}

export default Home
