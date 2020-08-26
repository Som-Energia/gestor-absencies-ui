import React, { useState, useEffect } from 'react'
import moment from 'moment'
import clsx from 'clsx'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Zoom from '@material-ui/core/Zoom'

import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import { useAuthState } from '../../context/auth'
import { useFetch, useFetchAbsencesType, useFetchMember } from '../../services/absences'
import { HOLIDAYS_ABSENCE_TYPE, countAbsencesType } from '../../services/utils'

import AbsAnualCalendar from '../../components/AbsAnualCalendar'
import EditMenu from '../../components/EditMenu'
import ModalForm from '../../components/ModalForm'

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
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  itemTime: {
    width: '50px',
    height: '60px',
    background: '#f2f4f5',
    textAlign: 'center',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  itemMonth: {
    fontSize: '12px',
    height: '20px',
    lineHeight: '20px',
    background: theme.palette.primary.main,
    color: '#fff',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  itemDay: {
    fontSize: '22px',
    height: '28px',
    lineHeight: '34px',
    color: '#1c242b',
    fontWeight: '400'
  },
  itemDuration: {
    fontSize: '10px',
    lineHeight: '10px',
    textTransform: 'uppercase'
  },
  timeSeparator: {
    margin: '0 8px',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  itemContent: {
    flex: '1 1 auto',
    minWidth: 0,
    marginLeft: '24px',
    '& h5': {
      flex: '1 1 auto',
      minWidth: 0,
      fontWeight: '400',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '16px',
      lineHeight: '25px',
      margin: 0
    },
    '& div': {
      color: '#4d4d4d',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '13px',
      lineHeight: '16px'
    }
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const AbsencePeriod = (props) => {
  const classes = useStyles()
  const { absence, types } = props
  const { start_time, end_time, absence_type } = absence

  const duration = moment(end_time).diff(moment(start_time), 'd') + 1
  const absenceType = types.filter(({ id }) => id === absence_type)[0]?.name

  return (
    <div className={classes.item}>
      <div className={classes.itemTime}>
        <div className={classes.itemMonth}>
          { moment(start_time).format('MMM') }
        </div>
        <div className={classes.itemDay}>
          { moment(start_time).format('DD') }
        </div>
        <div className={classes.itemDuration}>
          { moment(start_time).format('H') === '13' ? 'Tarda' : '' }
        </div>
      </div>
      {
        moment(start_time).isSame(end_time, 'day')
          ? ''
          : <>
            <ArrowForwardIcon className={classes.timeSeparator} />
            <div className={classes.itemTime}>
              <div className={classes.itemMonth}>
                { moment(end_time).format('MMM') }
              </div>
              <div className={classes.itemDay}>
                { moment(end_time).format('DD') }
              </div>
              <div className={classes.itemDuration}>
                { moment(end_time).format('H') === '13' ? 'Matí' : '' }
              </div>
            </div>
          </>
      }
      <div className={classes.itemContent}>
        {
          absenceType &&
            <h5>{ absenceType }</h5>
        }
        <div>
          { duration }&nbsp;{ duration > 1 ? 'dies' : 'dia' }
        </div>
      </div>
      <EditMenu onEdit={ () => console.log('edit!') } />
    </div>
  )
}

const Absences = () => {
  const classes = useStyles()
  const [year, setYear] = useState('2020')
  const [open, setOpen] = useState(false)
  const [totalAbsences, setTotalAbsences] = useState('-')
  const [totalHolidays, setTotalHolidays] = useState('-')

  const nextYear = () => {
    const next = year + 1
    next <= moment().year() + 1 && setYear(next)
  }

  const prevYear = () => {
    const prev = year - 1
    prev >= moment().year() - 5 && setYear(prev)
  }

  const handleAccept = () => {
    setOpen(false)
    fetch(`/absencies/absences?worker=${user_id}&start_period=${year}-01-01&end_period=${year}-12-31`)
  }

  const handleClose = () => {
    setOpen(false)
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
          <Paper className={classes.yearContainer} elevation={0}>
            <IconButton aria-label="previous year" onClick={prevYear}>
              <ArrowBackIosIcon />
            </IconButton>
            <h1>{year}</h1>
            <IconButton aria-label="next year" onClick={nextYear}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          {
            data?.results && types?.results &&
              data?.results.map((absence, index) => (
                <Zoom key={index} in={true}>
                  <Card className={clsx(classes.paper, !index && classes.noMarginTop)} elevation={0}>
                    <CardContent className={classes.contentItem}>
                      <AbsencePeriod absence={absence} types={types?.results} />
                    </CardContent>
                  </Card>
                </Zoom>
              ))
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
      <ModalForm
        title={'Nova absència'}
        open={open}
        showControls={false}
        onAccept={handleAccept}
        onClose={handleClose}
      >
        <AbsenceForm absenceId={0} workerId={user_id} onSucces={handleAccept} />
      </ModalForm>
      <Zoom in={true} disableStrictModeCompat={true}>
        <Fab
          color="primary"
          aria-label="edit"
          className={classes.fab}
          onClick={() => setOpen(true) }
        >
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  )
}

export default Absences
