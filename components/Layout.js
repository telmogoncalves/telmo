import React, { useState, useEffect } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Sun, Moon } from 'react-feather'
import Link from 'next/link'

const menu = [
	{
		path: '/',
		name: 'start',
	},
	{
		path: '/about',
		name: 'about',
	},
	{
		path: '/uses',
		name: 'uses',
	},
]

function Layout({ children, isHomepage, secondaryPage, noHead = false }) {
	const [theme, setTheme] = useState()
	const [mounted, setMounted] = useState(false)
	const switchTheme = () => {
		const setTo = theme === 'dark' ? 'light' : 'dark'

		setTheme(setTo)
		localStorage.setItem('BLOG_THEME', setTo)
	}

	useEffect(() => {
		let theme

		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			theme = 'dark'
		}

		setTheme(localStorage.getItem('BLOG_THEME') || theme)
	}, [])

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme)
		setMounted(true)
	}, [theme])

	const containerProps = {
		...isHomepage && { md: 12 },
		...!isHomepage && { md: 8, mdOffset: 2 },
	}

	if (!mounted) return <div />

	return (
		<>
			<div className="top-menu">
				<Row>
					<Col xs={6}>
						<ul>
							{menu.map(({ path, name }) => (
								<li key={name}>
									<Link href={path} as={path}>
										<a>{name}</a>
									</Link>
								</li>
							))}
						</ul>
					</Col>

					<Col xs={6} style={{ textAlign: 'right' }}>
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
				&copy; {new Date().getFullYear()}
			</footer>
		</>
	)
}

export default Layout