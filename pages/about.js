import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import dynamic from 'next/dynamic'

import Layout from '../components/Layout'
import Icon from '../components/Icon'
import { PRESENT } from '../constants/Stack'

function About() {
  return (
    <>
      <Layout secondaryPage>
        <div style={{ marginTop: 50 }}>
          <h1 className="main-h1 about-h1">
            About me.
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
                  <Icon type={s} />
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
