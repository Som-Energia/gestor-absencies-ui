import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles((theme) => ({
  yearContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    '& h5': {
      fontSize: '2rem',
      fontWeight: 400,
      margin: '24px'
    }
  }
}))

const YearMonthHeader = (props) => {
  const classes = useStyles()
  const { yearMonth, handlePrev, handleNext } = props
  return (
    <Paper className={classes.yearContainer} elevation={0}>
      <IconButton aria-label="previous" onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <h5>{yearMonth}</h5>
      <IconButton aria-label="next" onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Paper>
  )
}

export default YearMonthHeader
