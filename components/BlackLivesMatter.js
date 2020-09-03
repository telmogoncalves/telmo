import React from 'react'

const DONATE_LINK = `https://secure.actblue.com/donate/ms_blm_homepage_2019`

function BlackLivesMatter() {
  return (
    <div className="support-blm">
      <span>
        I support <strong>#BlackLivesMatter</strong>, consider making a donation. {' '}

        <a href={DONATE_LINK} target="_blank" rel="noopener noreferrer nofollow">
          Donate now!
        </a>
      </span>
    </div>
  )
}

export default BlackLivesMatter
