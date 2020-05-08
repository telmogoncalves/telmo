import React, { useState, useEffect } from 'react'
import simpleIcons from 'simple-icons'
import Head from 'next/head'
import { Row, Col } from 'react-flexbox-grid'
import dynamic from 'next/dynamic'
import { config } from 'react-spring'

const TextTransition = dynamic(() => import("react-text-transition"), {
  ssr: false
});

import Layout from '../components/Layout'
import { PRESENT, SKILLS } from '../constants/Stack'

const Icon = ({ stack, style }) => {
  const icon = simpleIcons.get(stack)

  return (
    <div
      data-icon={stack}
      style={{
        fill: `#${icon.hex}`,
        display: 'inline-block',
        width: '50px',
        margin: '0 auto',
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  )
}

function About() {
  const [index, setIndex] = useState(0)
  const avatar = `https://images.weserv.nl/?url=https://unavatar.now.sh/twitter/telmo`

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      3000 // every 3 seconds
    )
  }, [])

  return (
    <>
      <img className="about-avatar" src={avatar} />

      <Layout secondaryPage>
        <div style={{ marginTop: 50 }}>
          <h1 className="about-h1">
            Telmo {' '}
            <TextTransition
              text={SKILLS[index % SKILLS.length]}
              springConfig={config.gentle}
              style={{ display: 'inline-block' }}
            />
          </h1>

          <div className="about-intro">
            <Row>
              <Col md={12}>
                I'm a full-stack engineer with 13+ years of
                experience. I started my career back in 2007
                as a designer, then quickly started coding as well.

                <br /><br />

                I've seen it all. In my career I've worked with
                a lot of technologies: PHP, MooTools, jQuery, Ruby
                on Rails, Angular, ReactJS, GraphQL, and many more.
              </Col>
            </Row>

            <hr />

            <h3>What I've worked with so far</h3>

            <Row style={{ marginTop: 30 }}>
              {PRESENT.map(s => (
                <Col md={2} xs={4} key={s} style={{ textAlign: 'center', marginBottom: 40 }}>
                  <Icon stack={s} />
                  <div className="stack-name">{s}</div>
                </Col>
              ))}
            </Row>

            <hr />

            Follow me on {' '}
            <a href="https://twitter.com/telmo" target="_blank" rel="noopener noreferrer nofollow">
              Twitter
            </a>. That's where I usually hangout.
          </div>
        </div>
      </Layout>
    </>
  )
}

export default About
