import React, { useState, useEffect } from 'react'

import moment from 'moment'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'

import YearMonthHeader from 'components/GestorAbsencies/YearMonthHeader'

import SearchIcon from '@material-ui/icons/Search'

import { useFetch, useFetchAbsencesType, useFetchMembers, useFetchTeams, useFetchWorkers } from 'services/absences'
import { absenceTypeEmoji, absenceTypeName } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  header: {
    fontSize: '1rem',
    fontWeight: 500
  },
  workingDay: {
    backgroundColor: '#f2f2f2'
  },
  cell: {
    fontSize: '1rem',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    alignItems: 'center',
    minWidth: '50px'
  },
  weekendCell: {
    backgroundColor: 'rgba(224, 224, 224, 0.3)'
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '2rem',
    justifyContent: 'center'
  },
  littleIconWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    justifyContent: 'center'
  },
  paperTabs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  filter_worker: {
    textAlign: 'left'
  },
  filter_team: {
    textAlign: 'right'
  }
}))

const Calendar = () => {
  const classes = useStyles()
  const [refDate, setRefDate] = useState(moment().date(1))
  const [days, setDays] = useState([])
  const [absencesGrid, setAbsencesGrid] = useState({})
  const [filterWorker, setFilterWorker] = useState('')
  const [filterTeam, setFilterTeam] = useState('')
  const [filteredMembers, setFilteredMembers] = useState([])

  const [{ data, loading, error }, fetch] = useFetch()
  const [{ types, loadingTypes, errorTypes }, fetchTypes] = useFetchAbsencesType()
  const [{ workers, loadingWorkers, errorWorkers }, fetchWorkers] = useFetchWorkers()
  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()
  const [{ teams, loadingTeams, errorTeams }, fetchTeams] = useFetchTeams()

  useEffect(() => {
    fetchWorkers()
    fetchMembers()
    fetchTeams()
    fetchTypes()
    setFilterWorker('')
    setFilterTeam('')
    setFilteredMembers([])
  }, [])

  useEffect(() => {
    const daysOfMonth = monthDays(refDate)
    setDays(daysOfMonth)
    fetch(`/absencies/absences?start_period=${refDate.year()}-${refDate.month() + 1}-01&end_period=${refDate.year()}-${refDate.month() + 1}-${refDate.daysInMonth()}`)
  }, [refDate])

  useEffect(() => { // Rename absences to occurrence??
    const elements = data?.results ? data?.results : []
    elements.forEach(absence => {
      if (absencesGrid[absence?.worker] === undefined) {
        absencesGrid[absence?.worker] = {}
      }
      const diff = Math.round(
          Math.abs(
            moment(absence.end_time).diff(absence.start_time, 'days')
          )
      ) + 1
      if (diff > 0) {
        const arr = [... Array(diff)]
        arr.map((value, index) => {
          const data = moment(absence.start_time).add(index, 'days').format('DDMMYYYY')
          absencesGrid[absence?.worker][data] = {
            'absence_type': absence.absence_type,
            'duration': 1
          }
        })
        absencesGrid[absence?.worker][moment(absence.start_time).format('DDMMYYYY')]['duration'] = moment(absence.start_time).hour() != 9 ? 0.5 : 1
        absencesGrid[absence?.worker][moment(absence.end_time).format('DDMMYYYY')]['duration'] = moment(absence.end_time).hour() != 17 ? 0.5 : 1
      }
    })
    console.log(absencesGrid)
  }, [data])

  const nextMonth = () => {
    const yearLimit = moment().year() + 1
    refDate.year() <= yearLimit &&
      setRefDate(moment(refDate).add(1, 'M'))
  }

  const prevMonth = () => {
    const yearLimit = moment().year() - 1
    refDate.year() >= yearLimit &&
      setRefDate(moment(refDate).subtract(1, 'M'))
  }

  const handleFilterWorker = (event) => {
    const filter_worker_lowercase = event.target.value.toLowerCase()
    setFilterWorker(filter_worker_lowercase)
  }

  const handleFilterTeam = (event) => {
    const filter_team_lowercase = event.target.value.toLowerCase()
    setFilterTeam(filter_team_lowercase)

    let teamId = 0;
    teams.results.forEach((team) => {
        if (team.name.toLowerCase() == filter_team_lowercase) {
            teamId = team.id
        }
    })

    let filtered_workers_ids = []
    if (teamId == 0) {
      fetchMembers()
    }
    else {
      fetchMembers(teamId)
      members.results.forEach(
        member => filtered_workers_ids.push(member.worker)
      )
    }
    setFilteredMembers(filtered_workers_ids)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <YearMonthHeader
            yearMonth={refDate.format('MMMM, YYYY')}
            handlePrev={prevMonth}
            handleNext={nextMonth}
          />
        </Grid>

        <Paper className={classes.paperTabs} elevation={0}>
          <Grid container>
            <Grid item xs={4} className={classes.filter_worker}>
              <TextField
                label="Filtre Worker"
                margin="none"
                onChange={handleFilterWorker}
                value={filterWorker}
                InputProps={{
                  startAdornment: <IconButton><SearchIcon /></IconButton>
                }}
              />
            </Grid>
            <Grid item xs={4} className={classes.filter_team}>
              <TextField
                label="Filtre Team"
                margin="none"
                onChange={handleFilterTeam}
                value={filterTeam}
                InputProps={{
                  startAdornment: <IconButton><SearchIcon /></IconButton>
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Grid item xs={12}>
          <TableContainer className={classes.root} component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="calendar">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {
                    days.map(day => (
                      <TableCell className={classes.cell} key={day} align="center">{day}</TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  workers?.results && workers?.results.map(worker =>
                    `${worker.first_name.toLowerCase()} ${worker.last_name.toLowerCase()}`.includes(filterWorker)
                    && (filteredMembers.length === 0 || filteredMembers.includes(worker.id))
                    && <TableRow key={worker.id}>
                      <TableCell className={classes.header} component="th" scope="row" nowrap="nowrap">
                        {`${worker.first_name} ${worker.last_name}`}
                      </TableCell>
                      {
                        days.map(day => {
                          const date = moment(refDate, 'YYYY-MM-DD').set('date', day)
                          const dateKey = date.format('DDMMYYYY')
                          return <TableCell
                            key={`${worker.id}-${day}`}
                            className={clsx(classes.cell, [6, 7].includes(date.isoWeekday()) && classes.weekendCell)}
                            align="center"
                            padding="none"
                          >
                          {
                            absencesGrid[worker.id] !== undefined
                              && absencesGrid[worker.id][dateKey] !== undefined
                                && <Tooltip
                                    title={
                                      `${date.format('dddd, DD/MM/YYYY')}
                                      ${absenceTypeName(types?.results, absencesGrid[worker.id][dateKey]['absence_type'])}
                                      `
                                    }
                                  >
                                    <div className={
                                        absencesGrid[worker.id][dateKey]['duration'] == 1
                                        ? classes.iconWrapper
                                        : classes.littleIconWrapper
                                      }>
                                      {
                                              absenceTypeEmoji(absencesGrid[worker.id][dateKey]['absence_type'])
                                      }
                                    </div>
                                  </Tooltip>
                          }
                          </TableCell>
                        })
                      }
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}

const monthDays = (refDate) => {
  const days = []
  const dateStart = moment(refDate).date(1)
  const dateEnd = moment(refDate).add(refDate.daysInMonth(), 'days')

  while (dateEnd.diff(dateStart, 'days') > 0) {
    days.push(dateStart.format('D'))
    dateStart.add(1, 'days')
  }
  return days
}

const AbsenceType = ({ type }) => {
  return <>
    {
      `${absenceTypeEmoji(type)}`
    }
  </>
}

export default Calendar
