
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import CreatePost from './Pages/CreatePost'
import Navbar from './Components/Navbar'
import Feed from './Pages/Feed'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <>
    <ToastContainer
  position="top-right"
  autoClose={2000}
  theme="colored"
/>
      <BrowserRouter>
      
      <Routes>

      <Route path='/' element={<Login/>} />
      <Route path='/post' element={<CreatePost/>} />
      <Route path='/nav' element={<Navbar/>} />
      <Route path='/feed' element={<Feed/>}/>
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
