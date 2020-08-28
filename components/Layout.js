import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Sun, Moon } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { currentDayName } from '../utils/dateUtils'

import BlackLivesMatter from './BlackLivesMatter'

const menu = [
  {
    path: '/',
    name: '0. start',
  },
  {
    path: '/about',
    name: '1. about',
  },
  {
    path: '/uses',
    name: '2. uses',
  },
]
const SHORTCUTS = ['Digit0', 'Digit1', 'Digit2']

function Layout({ children, isHomepage, secondaryPage }) {
  const router = useRouter()
  const onLoadTheme = typeof localStorage !== 'undefined' && localStorage.getItem('BLOG_THEME')
  const [theme, setTheme] = useState(onLoadTheme)
  const [mounted, setMounted] = useState(false)
  const switchTheme = () => {
    const setTo = theme === 'dark' ? 'light' : 'dark'

    setTheme(setTo)
  }

  function triggerShortcut(e) {
    if (SHORTCUTS.includes(e.code)) {
      // Split code to get only the number
      const code = e.code.split('t')[1]

      // Get route from menu
      const { path } = menu[code]

      router.push(path)
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', triggerShortcut)

    if (onLoadTheme) return

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    localStorage.setItem('BLOG_THEME', theme)

    setMounted(true)
  }, [theme])

  const containerProps = {
    ...isHomepage && { md: 12 },
    ...!isHomepage && { md: 8, mdOffset: 2 },
  }

  if (!mounted) return <div />

  return (
    <>
      <BlackLivesMatter />

      <div className="top-menu">
        <Row>
          <Col xs={10}>
            <ul>
              <li className="logo">
                <Link href="/" as="/">
                  <a>⧩</a>
                </Link>
              </li>

              {menu.map(({ path, name }) => (
                <li key={name}>
                  <Link href={path} as={path}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={2} style={{ textAlign: 'right' }}>
            <button className="theme-switch-button" onClick={() => switchTheme()}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </Col>
        </Row>
      </div>

      <Grid>
        <Row>
          <Col {...containerProps}>
            {!secondaryPage && (
              <h1 className={`blog-title`} style={isHomepage && { textAlign: 'left' }}>
                Telmo, code <span className="amp">&</span> design
              </h1>
            )}

            {children}
          </Col>
        </Row>
      </Grid>

      <footer>
        <div>No tracking. No ads. Happy {currentDayName()}!</div>
        <div>&copy; {new Date().getFullYear()}</div>
      </footer>
    </>
  )
}

export default Layout
