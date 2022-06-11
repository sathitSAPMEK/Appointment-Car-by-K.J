import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cibAdobeAfterEffects,
  cilApplications,
  cilLayers,
  cilList,
  cil3d,
  cilBook,
  cilCalendar,
  cilChatBubble,
  cilFile,
  cilMediaRecord,
  cilAccountLogout,
  cilHamburgerMenu,
  cilCheckCircle,
} from '@coreui/icons'

import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const nav_admin = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Spares',
    to: '/spares',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category Spares',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
        to: '/spares/category',
      },
      {
        component: CNavItem,
        name: 'Spares',
        icon: <CIcon icon={cil3d} customClassName="nav-icon" />,
        to: '/spares/item',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Appointment',
    to: '/appointment',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Appointment List',
        icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
        to: '/appointment/list',
      },
      {
        component: CNavItem,
        name: 'Appointment Success',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
        to: '/appointment/success',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Chat',
    to: '/chat',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Report',
    to: '/report',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'appointment',
        to: '/report/appointment',
        icon: <CIcon icon={cilMediaRecord} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

const nav_user = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Appointment',
    to: '/appointment',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Appointment List',
        icon: <CIcon icon={cilHamburgerMenu} customClassName="nav-icon" />,
        to: '/appointment/list',
      },
      {
        component: CNavItem,
        name: 'Appointment Success',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
        to: '/appointment/success',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Chat',
    to: '/chat',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

const navbar = {
  nav_admin: nav_admin,
  nav_user: nav_user,
}

export default navbar
