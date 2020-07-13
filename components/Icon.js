import React from 'react'
import simpleIcons from 'simple-icons'

const Icon = ({ type, style }) => {
  const icon = simpleIcons.get(type)

  return (
    <div
      data-icon={type}
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

export default Icon
