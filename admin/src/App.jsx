import React from 'react'
import Admin from './pages/Admin/Admin'
import Navbar from './components/Navbar/Navbar'
import './index.css'

const App = () => {
  return (
    <div className="admin-app">
      <Navbar />
      <Admin />
    </div>
  )
}

export default App