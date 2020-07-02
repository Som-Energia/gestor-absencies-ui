import React from 'react'

import moment from 'moment'

import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}))

const daysInMonth = moment().daysInMonth()
const workers = { "count": 5, "next": null, "previous": null, "results": [{ "id": 1, "first_name": "Benjami", "last_name": "Ramos Solis", "email": "benjami.ramos@somenergia.coop", "username": "benjami.ramos@somenergia.coop", "category": "Technical", "gender": "Intersex", "holidays": "98.0", "contract_date": "2019-06-17T12:00:00", "working_week": 40, "vacation_policy": 1 }, { "id": 2, "first_name": "Anna", "last_name": "Rodon", "email": "anna.rodon@somenergia.coop", "username": "anna.rodon@somenergia.coop", "category": "admin", "gender": "Female", "holidays": "194.0", "contract_date": "2019-06-17T12:00:00", "working_week": 32, "vacation_policy": 1 }, { "id": 4, "first_name": "Oriol", "last_name": "Piera", "email": "oriol.piera@somenergia.coop", "username": "oriol.piera@somenergia.coop", "category": "Specialist", "gender": "Male", "holidays": "80.0", "contract_date": "2019-06-17T12:00:00", "working_week": 32, "vacation_policy": 1 }, { "id": 5, "first_name": "Jordi", "last_name": "Pons Pla", "email": "proves@somenergia.coop", "username": "demo", "category": "Worker", "gender": "Male", "holidays": "11.0", "contract_date": "2019-06-01T12:00:00", "working_week": 32, "vacation_policy": 1 }, { "id": 8, "first_name": "tomatic", "last_name": "tomatic", "email": "", "username": "tomatic", "category": "Manager", "gender": "Queer", "holidays": "32.0", "contract_date": "2019-09-11T14:09:27", "working_week": 0, "vacation_policy": 2 }] }

const refDate = '2020-07-01'

const monthDays = () => {
  const days = []
  const dateStart = moment(refDate, 'YYYY-MM-DD')
  const dateEnd = moment(refDate, 'YYYY-MM-DD').add(moment().daysInMonth(), 'days')
  while (dateEnd.diff(dateStart, 'days') > 0) {
    days.push(dateStart.format('D'))
    dateStart.add(1, 'days')
  }
  return days
}

const days = monthDays()

const Calendar = () => {
  const classes = useStyles()

  return (
    <>
      <TableContainer className={classes.root} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {
                days.map(day => (
                  <TableCell align="center">{day}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              workers.results.map(worker =>
                <TableRow key={worker.id}>
                  <TableCell component="th" scope="row">
                    {`${worker.first_name} ${worker.last_name}`}
                  </TableCell>
                  {
                    days.map(day => (
                      <TableCell align="center"><Badge badgeContent="" color="secondary" /></TableCell>
                    ))
                  }
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Calendar
