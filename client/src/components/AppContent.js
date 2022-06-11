import React, { Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import cookie from 'react-cookies'

// routes config
import routes from '../routes'

const AppContent = () => {
  const [userId, setUserId] = useState(
    cookie.load('userId') === undefined ? '' : cookie.load('userId'),
  )
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes
            .filter((route) => route.role === (userId === '' ? 'user' : userId.role))
            .map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={userId === '' ? <Navigate to="/login" /> : <route.element />}
                  />
                )
              )
            })}
          <Route path="/" element={<Navigate to="Home" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
