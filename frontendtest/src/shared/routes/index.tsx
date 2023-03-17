import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Favorites from '../../Pages/Favorites/Favorites';
import Home from '../../Pages/home/Home';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/favorites" element={<Favorites/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
  )
}

export default AppRoutes;