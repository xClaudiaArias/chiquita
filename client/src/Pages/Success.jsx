import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const Success = () => {
  const location = useLocation()
  console.log(location, " SUCCESS")
  
  return (
    <div className='success-page'>
      <div className="success-page-container">
        <h1>Order Complete</h1>
        <h2>Thank you for shopping with us</h2>
        <Link to={'/'}><button>Continue shopping</button></Link>
      </div>
    </div>
  )
}

export default Success