import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  monthGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7,1fr)',
    margin: '12px 32px 32px 32px',
    padding: 0
  },
  monthDay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 600,
    width: '12px',
    height: '12px',
    lineHeight: '13px',
    padding: '0 3px',
    margin: '3px 0',
    color: '#6f7a80',
    textAlign: 'left',
    cursor: 'default'
  },
  monthName: {
    textTransform: 'uppercase',
    fontSize: '14px',
    textAlign: 'center'
  }
}))

const AbsMonthCalendar = (props) => {
  const classes = useStyles()
  const { month } = props

  const monthRef = moment().set('month', month)
  const monthName = monthRef.format('MMMM')

  const firstDay = monthRef.startOf('month')
  const lastDay = monthRef.endOf('month')
  const numFirstDay = firstDay.isoWeekday()

  return (
    <div className={classes.root}>
      <div className={classes.monthName}>{monthName}</div>
      <div className={classes.monthGrid}>
        {
          [...new Array(numFirstDay - 1).keys()].map((number) => (
            <div key={number} className={classes.monthDay}>
              <div></div>
            </div>
          ))
        }
        {
          [...new Array(lastDay.date()).keys()].map(day => (
            <div key={day} className={classes.monthDay}>
              <div>•</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AbsMonthCalendar
