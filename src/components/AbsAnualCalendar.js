import React from 'react'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'

import AbsMonthCalendar from './AbsMonthCalendar'

const months = Array.from(Array(12).keys())

const AbsAnualCalendar = ({ absences, types, year }) => {
  return (
    <Grid container>
      { months.map(month => {
        let monthAbsences = []
        if (absences) {
          monthAbsences = absences.filter(absence => moment().month(month).year(year).isSame(absence.start_time, 'month') || moment().set('month', month).isSame(absence.end_time, 'month'))
        }
        return (
          <Grid key={month} item xs={6} sm={4}>
            <AbsMonthCalendar year={year} month={month} absences={monthAbsences} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default AbsAnualCalendar
