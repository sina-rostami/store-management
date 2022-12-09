import React from 'react'

import styles from './styles'

const NotFound = () => {
  const classes = styles()

  return (
    <div className={classes.notFoundRoot}>
      404
    </div>
  )
}

export default NotFound
