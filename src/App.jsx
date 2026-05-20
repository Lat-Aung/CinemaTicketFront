import { useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import MyBookings from './pages/MyBookings'

import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import SeatLayout from './pages/SeatLayout'
import Layout from './pages/admin/Layout'
import AddShows from './pages/admin/AddShows'
import Dashboard from './pages/admin/Dashboard'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/react'
import Loading from './components/Loading'



export default function App() {
  const loc = useLocation()
  const isAdminRoute = loc.pathname.startsWith('/admin')
  const { user, isAdmin, fetchingAdminInfo } = useAppContext()

  // user is already loaded (retrieved from clerk useUser()) by AppContext prior 

  // logger and admin gatekeeper
  useEffect(() => {
    console.log('Fetching Admin Info: ', fetchingAdminInfo)
    console.log('User: ', user)
    if(user && !fetchingAdminInfo) {
      if(isAdminRoute && !isAdmin)
        toast.error('You are not authorized to access admin dashboard')
    }
    
  }, [
    fetchingAdminInfo
  ])

  return <>
        <Toaster/>
        {!isAdminRoute && <Navbar/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/:id" element={<MovieDetails/>}/>
          <Route path="/movies/:id/:date" element={<SeatLayout/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path='/loading/:nextUrl' element={<Loading/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route 
            path='/admin/*' 
            element={
              fetchingAdminInfo ? (
                <Loading/>
              ) : 
              (user && isAdmin) ? (
                <Layout />
              ) : (
                <div className='min-h-screen flex justify-center items-center'>
                  <SignIn fallbackRedirectUrl={'/admin'} />
                </div>
              )
            }
          >
            <Route index element={<Navigate to="dashboard" replace/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="add-shows" element={<AddShows/>}/>
            <Route path="list-shows" element={<ListShows/>}/>
            <Route path="list-bookings" element={<ListBookings/>}/>
          </Route>
        </Routes>
        {!isAdminRoute && <Footer/>}
      </>
}