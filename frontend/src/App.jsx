import React from "react"
import Home from "./Components/Home.jsx"
import DaySelector from "./Components/DaySelector.jsx"
import Practice from './Components/PracticeTest.jsx'
import { Route, Routes } from 'react-router-dom'
import Fouro4 from './Components/Fouro4.jsx'
import SignIn from "./Components/SignIn.jsx"
import Origin from "./Components/Origin.jsx"
import SignUp from "./Components/SignUp.jsx"
import Navbar from "./Components/Navbar.jsx"
import Favorites from "./Components/Favorites.jsx"

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      {/* Set Home as the default starting page */}
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/Commune' element={<SignIn />} />
      <Route path='/Haven' element={<SignUp />} />
      <Route path='/Origin' element={<Origin />} />
      <Route path='/Sanctuary' element={<Favorites />} />

      
      {/* Other pages */}
      <Route path='/DaySelector' element={<DaySelector />} />
      <Route path='/PracticeTest' element={<Practice />} />
      
      {/* 404 Page for any other URL */}
      <Route path='*' element={<Fouro4 />} />
    </Routes>
    </>
  )
}

export default App
