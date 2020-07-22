import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

import Layout from '../components/Layout'

function Reviews() {
  return (
    <>
      <Layout secondaryPage>
        <Row>
          <Col md={12}>
            <h1 className="main-h1" style={{ marginBottom: 50 }}>Pull request reviews</h1>

            <p className="reviews-description">
              I get a lot of messages on Twitter asking for help. Most of the times
              people just send screenshots of their code, aside from being impossible
              to debug the code, it's not at all the right way of asking for help.

              <br />
              <br />

              So, I'll be spending some time after work reviewing your pull requests,
              I'll only review <b>HTML</b>, <b>CSS</b>, <b>JavaScript</b> and <b>ReactJS</b>.

              <br /><br />

              <h3 className="reviews-what-to-do">What do you need to do?</h3>

              <ul className="reviews-list">
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer nofollow">GitHub</a>
                  You'll need an account.
                </li>

                <li>
                  <span className="point">Branches</span>
                  Make sure to put your changes in a different branch from <b>main</b>.
                </li>

                <li>
                  <span className="point">Repository</span>
                  If the repository is private you'll need to add {' '}
                  <a href="https://github.com/telmogoncalves" style={{ display: 'inline', margin: 0 }} target="_blank" rel="noopener noreferrer nofollow">my account</a> {' '}
                  as a collaborator.
                </li>

                <li>
                  <span className="point">Pull Requests</span>
                  Open a pull request and assign it to me so I get notified. Try to keep
                  pull requests short and straight to the point.
                </li>

                <li>
                  <span className="point">Timings</span>
                  Keep in mind I might not review pull requests every single day, although
                  if you see that I'm taking too long drop me a message on {' '}
                  <a href="https://twitter.com/telmo" style={{ display: 'inline', margin: 0 }} target="_blank" rel="noopener noreferrer nofollow">Twitter</a>.
                </li>

                <li>
                  <span className="point">Polite</span>
                  I'll try my best to give you constructive feedback and also explain why you should
                  make changes.
                </li>

                <li>
                  <span className="point">Rejection</span>
                  Keep in mind I'm doing this for <b>free</b> and I'm in a position where I can
                  refuse to review some pull requests.
                </li>
              </ul>

              <div className="happy-coding">
                <span>Happy coding,</span>
                <span>— Telmo</span>
              </div>
            </p>
          </Col>
        </Row>
      </Layout>
    </>
  )
}

Reviews.getInitialProps = () => {
  return {
    data: {
      og: {
        description: "Need feedback on a pull request?",
        image: "https://telmo.im/og/reviews.png"
      }
    }
  }
}

export default Reviews
