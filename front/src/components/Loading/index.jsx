import React from 'react'

import styles from './styles'

const Loading = () => {
  const classes = styles()

  return (
    <div className={classes.loadingContainer}>
      در حال بارگذاری ...
    </div>
  )
}

export default Loading
