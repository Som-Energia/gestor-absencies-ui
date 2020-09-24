import React from 'react'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

const SnackbarResponse = (props) => {
  const { state, message, onClose } = props
  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={state === true ? 'success' : 'error'}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarResponse
