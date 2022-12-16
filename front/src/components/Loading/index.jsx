import React from 'react'

import styles from './styles'

const Loading = () => {
  const classes = styles()

  return (
    <div className={classes.loadingContainer}>
      ... Loading
    </div>
  )
}

export default Loading
