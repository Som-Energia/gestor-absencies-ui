import React from 'react'

import Grid from '@material-ui/core/Grid'

import AbsMonthCalendar from './AbsMonthCalendar'

const months = Array.from(Array(12).keys())

const AbsAnualCalendar = () => {
  return (
    <Grid container>
      { months.map(month => (
        <Grid item xs={6} sm={4}>
          <AbsMonthCalendar month={month} />
        </Grid>
      )) }
    </Grid>
  )
}

export default AbsAnualCalendar
