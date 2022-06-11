import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'react-cookies'
import { cilList, cilShieldAlt, cibLine, cibFacebook } from '@coreui/icons'
import FacebookIcon from '@mui/icons-material/Facebook'
import userLogo from 'src/assets/images/icons/line_icon.png'
import Logo2 from 'src/assets/images/logo2_crop.png'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCardHeader,
  CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'

import AngularImg from 'src/assets/images/angular.jpg'
import ReactImg from 'src/assets/images/react.jpg'
import VueImg from 'src/assets/images/vue.jpg'

import { DocsCallout, DocsExample } from 'src/components'

// Import Alert Component
import alertComponent from 'src/components/alertSwal/alertComponent'
// Import Axios
import Axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const linkToLogin = () => {
    return navigate('/login')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center" style={{ marginTop: '5px' }}>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <CNav variant="pills" className="justify-content-end">
                  <CNavItem>
                    <p style={{ fontSize: '35px', fontFamily: 'fantasy', marginRight: '540px' }}>
                      Welcome To Phet Garage
                    </p>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink active>
                      <img src={Logo2} key="1" alt="logo" style={{ width: '100px' }} />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="https://www.facebook.com/">
                      <CIcon icon={cibLine} size="xxl" />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="https://www.facebook.com/">
                      <CIcon icon={cibFacebook} size="xxl" />
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      onClick={() => {
                        linkToLogin()
                      }}
                    >
                      เข้าสู่ระบบ
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCardHeader>
              <CCardBody>
                <CCarousel controls indicators>
                  <CCarouselItem>
                    <img className="d-block w-100" src={ReactImg} alt="slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                      <h5>First slide label</h5>
                      <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                  <CCarouselItem>
                    <img className="d-block w-100" src={AngularImg} alt="slide 2" />
                    <CCarouselCaption className="d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                  <CCarouselItem>
                    <img className="d-block w-100" src={VueImg} alt="slide 3" />
                    <CCarouselCaption className="d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                  </CCarouselItem>
                </CCarousel>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
