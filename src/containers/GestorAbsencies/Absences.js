import React, { useState, useEffect } from 'react'
import moment from 'moment'
import clsx from 'clsx'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import Fade from '@material-ui/core/Fade'
import SnackbarResponse from 'components/SnackbarResponse'

import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'

import { useAuthState } from 'context/auth'
import { useFetch, useFetchAbsencesType, useFetchMember } from 'services/absences'
import { HOLIDAYS_ABSENCE_TYPE, countAbsencesType } from 'services/utils'

import AbsAnualCalendar from 'components/GestorAbsencies/AbsAnualCalendar'
import ModalForm from 'components/ModalForm'
import YearMonthHeader from 'components/GestorAbsencies/YearMonthHeader'
import AbsencePeriod from 'components/GestorAbsencies/AbsencePeriod'

import AbsenceForm from './AbsenceForm'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    paddingBottom: '12px'
  },
  noMarginTop: {
    marginTop: 0
  },
  contentItem: {
    padding: '16px 0 16px 16px',
    '&:last-child': {
      paddingBottom: '16px'
    }
  },
  yearContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    '& h1': {
      fontSize: '36px'
    }
  },
  resum: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resumItem: {
    textAlign: 'center',
    flexGrow: 1
  },
  super: {
    fontSize: '30px'
  },
  superDesc: {
    fontSize: '14px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  emptyContent: {
    fontSize: '16px',
    textTransform: 'uppercase',
    margin: '24px 0'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const Absences = () => {
  const classes = useStyles()

  const [year, setYear] = useState(moment().year())

  const [open, setOpen] = useState(false)
  const [absenceForm, setAbsenceForm] = useState()

  const [totalAbsences, setTotalAbsences] = useState('-')
  const [totalHolidays, setTotalHolidays] = useState('-')
  const [formResponse, setFormResponse] = useState({})

  const nextYear = () => {
    const next = year + 1
    next <= moment().year() + 1 && setYear(next)
  }

  const prevYear = () => {
    const prev = year - 1
    prev >= moment().year() - 5 && setYear(prev)
  }

  const handleAccept = (response = {}) => {
    setOpen(false)
    setFormResponse(response)
    response?.state === true &&
      fetch(`/absencies/absences?worker=${user_id}&start_period=${year}-01-01&end_period=${year}-12-31`)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (absence) => {
    setOpen(true)
    setAbsenceForm(absence)
  }

  const { user } = useAuthState()
  const { user_id } = user

  const [{ data, loading, error }, fetch] = useFetch()
  const [{ types, loadingTypes, errorTypes }, fetchTypes] = useFetchAbsencesType()
  const [{ member, loadingMember, errorMember }, fetchMember] = useFetchMember()

  useEffect(() => {
    fetch(`/absencies/absences?worker=${user_id}&start_period=${year}-01-01&end_period=${year}-12-31`)
    fetchTypes()
    fetchMember(user_id)
  }, [year, user_id])

  useEffect(() => {
    data?.results && setTotalHolidays(countAbsencesType(data?.results, HOLIDAYS_ABSENCE_TYPE))
    data?.results && setTotalAbsences(countAbsencesType(data?.results))
  }, [data])

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <YearMonthHeader
            yearMonth={year}
            handlePrev={prevYear}
            handleNext={nextYear}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          {
            data?.results && types?.results &&
              data?.results.map((absence, index) => (
                <Fade key={index} in={true}>
                  <Card className={clsx(classes.paper, !index && classes.noMarginTop)} elevation={0}>
                    <CardContent className={classes.contentItem}>
                      <AbsencePeriod absence={absence} types={types?.results} onEdit={handleEdit} />
                    </CardContent>
                  </Card>
                </Fade>
              ))
          }

          {
            (!data?.results || !data.count) &&
              <>
                {
                  loading
                    ? [...new Array(7)].map((value, index) => (
                      <Fade key={index} in={loading}>
                        <Skeleton variant="rect" width="100%">
                          <Card className={clsx(classes.paper, !index && classes.noMarginTop)} elevation={0}>
                            <CardContent className={classes.contentItem}>
                              <AbsencePeriod absence={{}} types={false} />
                            </CardContent>
                          </Card>
                        </Skeleton>
                      </Fade>
                    ))
                    : <Fade in={true}>
                      <Card className={clsx(classes.paper, classes.noMarginTop)} elevation={0}>
                        <CardContent className={classes.contentItem}>
                          <div className={classes.emptyContent}>
                            No hi ha absències per aquest període
                          </div>
                        </CardContent>
                      </Card>
                    </Fade>
                }
              </>
          }
        </Grid>
        <Grid item xs={12} sm={7}>
          <Card className={clsx(classes.paper, classes.noMarginTop)} elevation={0}>
            <CardContent>
              <div className={classes.resum}>
                <div className={classes.resumItem}>
                  <div className={classes.super}>{totalAbsences}</div>
                  <div className={classes.superDesc}>DIES TOTALS</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>{member?.holidays ? member?.holidays : '-' }</div>
                  <div className={classes.superDesc}>DIES DISPONIBLES</div>
                </div>
                <div className={classes.resumItem}>
                  <div className={classes.super}>{totalHolidays}</div>
                  <div className={classes.superDesc}>DIES UTILITZATS</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.paper} elevation={0}>
            <CardContent>
              <AbsAnualCalendar year={year} absences={data?.results} types={types?.results} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Fade in={true} disableStrictModeCompat={true}>
        <Fab
          color="primary"
          aria-label="edit"
          className={classes.fab}
          onClick={() => setOpen(true) }
        >
          <AddIcon />
        </Fab>
      </Fade>

      <ModalForm
        title={'Nova absència'}
        open={open}
        showControls={false}
        onAccept={handleAccept}
        onClose={handleClose}
      >
        <AbsenceForm absenceId={ absenceForm ? absenceForm?.id : null} workerId={user_id} onSucces={handleAccept} />
      </ModalForm>

      <SnackbarResponse state={false} message={error || errorMember || errorTypes} onClose={() => {}} />
      <SnackbarResponse state={formResponse?.state} message={formResponse?.message} onClose={() => setFormResponse({})} />
    </>
  )
}

export default Absences
