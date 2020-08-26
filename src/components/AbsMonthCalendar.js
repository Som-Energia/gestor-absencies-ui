import React from 'react'
import moment from 'moment'
import clsx from 'clsx'

import Tooltip from '@material-ui/core/Tooltip'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  monthGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7,1fr)',
    margin: '16px 16px 24px 16px',
    padding: 0
  },
  monthItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '16px',
    height: '16px',
    padding: '0',
    margin: '1px 0',
    border: 0
  },
  monthDay: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6f7a80',
    textAlign: 'left',
    cursor: 'default',
    '&:hover': {
      background: '#6f7a80',
      color: '#fff',
      borderRadius: '8px'
    }
  },
  absenceDay: {
    color: '#fff',
    background: theme.palette.primary.main,
    borderRadius: '8px',
    cursor: 'pointer'
  },
  monthName: {
    textTransform: 'uppercase',
    fontSize: '16px',
    textAlign: 'center',
    color: '#4d4d4d !important'
  }
}))

const absenceDay = (absences, day, month, year) => {
  const refDay = moment(day)
  const absencesDay = absences.filter(absence => refDay.isBetween(absence.start_time, absence.end_time))

  return absencesDay.length > 0
}

const AbsMonthCalendar = (props) => {
  const classes = useStyles()
  const { year, month, absences } = props

  const monthRef = moment().month(month).year(year)
  const monthName = monthRef.format('MMMM')

  const firstDay = moment(monthRef).startOf('month')
  const numFirstDay = firstDay.isoWeekday()
  const lastDay = moment(monthRef).endOf('month')

  return (
    <div className={classes.root}>
      <div className={classes.monthName}>{monthName}</div>
      <div className={classes.monthGrid}>
        {
          [...new Array(numFirstDay - 1).keys()].map((number) => (
            <div key={number} className={classes.monthItem}>
              <div></div>
            </div>
          ))
        }
        {
          [...new Array(lastDay.date()).keys()].map(day => {
            const refDay = moment().date(day + 1).month(month).year(year).hour(9).minute(0).second(0)
            return (
              <Tooltip key={day} title={refDay.format('dddd, DD/MM/YYYY')}>
                <div className={clsx(classes.monthItem, classes.monthDay, absenceDay(absences, refDay) && classes.absenceDay)}>
                  <div>•</div>
                </div>
              </Tooltip>
            )
          })
        }
      </div>
    </div>
  )
}

export default AbsMonthCalendar
