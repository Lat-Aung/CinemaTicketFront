import { useState } from 'react'
import Navbar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import MyBookings from './pages/MyBookings'

import { useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import SeatLayout from './pages/SeatLayout'


export default function App() {
  const loc = useLocation()
  const isAdminRoute = loc.pathname.startsWith('/admin')

  return <>
        <Toaster/>
        {!isAdminRoute && <Navbar/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/:id" element={<MovieDetails/>}/>
          <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
        </Routes>
        {!isAdminRoute && <Footer/>}
      </>
}