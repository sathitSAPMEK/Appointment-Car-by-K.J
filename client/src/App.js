import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import cookie from 'react-cookies'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Home = React.lazy(() => import('./views/pages/home/Home'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Logout = React.lazy(() => import('./views/pages/logout/Logout'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Bill
const Bill = React.lazy(() => import('./views/bill/Bill'))

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: cookie.load('userId') === undefined ? '' : cookie.load('userId').userName,
    }
  }

  render() {
    const { userName } = this.state
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/Home" name="Wellcome" element={<Home />} />
            <Route
              exact
              path="/login"
              name="Login Page"
              element={userName === '' ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route
              exact
              path="/Bill"
              name="Bill"
              element={userName === '' ? <Navigate to="/login" /> : <Bill />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              element={userName === '' ? <Navigate to="/login" /> : <Page404 />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              element={userName === '' ? <Navigate to="/login" /> : <Page500 />}
            />
            <Route exact path="/logout" name="logout" element={<Logout />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
