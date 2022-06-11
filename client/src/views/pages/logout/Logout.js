import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { useNavigate, Navigate } from 'react-router-dom'
import Login from '../login/Login'

const Logout = () => {
  cookie.remove('userId')
  return <Login />
}

export default Logout
