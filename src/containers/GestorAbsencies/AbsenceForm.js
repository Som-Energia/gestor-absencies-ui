import React, { useState, useEffect } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import moment from 'moment'

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/ca'

import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Fab from '@material-ui/core/Fab'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'

import IconButton from '@material-ui/core/IconButton'

import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined'
import SaveIcon from '@material-ui/icons/Save'

import { makeStyles } from '@material-ui/core/styles'

import { usePostAbsence, useFetchAbsencesType } from '../../services/absences'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const AbsenceForm = (props) => {
  const classes = useStyles()
  const { absenceId, workerId, onSucces, onError } = props
  const [editable, setEditable] = useState(true)

  const [{ types, loadingTypes, errorTypes }, fetchTypes] = useFetchAbsencesType()
  const [{ responsePostAbsence, loadingPostAbsence, errorPostAbsence }, postAbsence] = usePostAbsence()
  const [formResponse, setFormResponse] = useState(false)

  useEffect(() => {
    fetchTypes()
  }, [])

  useEffect(() => {
    if (formResponse) {
      const message = errorPostAbsence === false ? 'Absència creada correctament!' : 'No s\'ha pogut crear l\'absència'
      const response = { state: errorPostAbsence === false, message: message }
      onSucces(response)
    }
  }, [formResponse])

  const initialAbsence = {
    start_time: moment().toISOString(),
    end_time: moment().toISOString(),
    start_morning: true,
    end_afternoon: true,
    absence_type: '',
    worker: [workerId]
  }

  const firstDateHelper = 'Data inicial inclosa'
  const lastDateHelper = 'Data final inclosa'
  const firstHalfHelper = 'Primer matí inclòs'
  const lastHalfHelper = 'Darrera tarda inclosa'

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={'ca'}>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialAbsence }}
        validateOnMount={true}
        validationSchema={
          Yup.object().shape({
            absence_type: Yup.number()
              .required('No has introduit un tipus d\'absència')
              .test(
                'minOneHalfDay',
                'Mínim un mig dia',
                function () { return !(this.parent.start_time === this.parent.end_time && !this.parent.end_afternoon && !this.parent.start_morning) }
              ),
            start_time: Yup.date()
              .required('No has introduit una data d\'inici'),
            end_time: Yup.date()
              .required('No has introduit una data de fi')
              .when(
                'start_time',
                (start_time, schema) => (start_time && schema.min(start_time, 'La data no pot ser anterior a la d\'inici'))
              )
          })
        }
        onSubmit={(values, { setSubmitting }) => {
          async function postForm () {
            await postAbsence(values)
            setFormResponse(true)
          }
          postForm()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          setFieldValue
        }) => (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  select
                  fullWidth
                  label="Tipus d'absència"
                  name="absence_type"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.absence_type || ''}
                  error={errors.absence_type && touched.absence_type}
                  helperText={touched.absence_type && errors.absence_type}
                  disabled={loadingTypes}
                >
                  { types?.results && types?.results.map(type => (
                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                  )) }
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  required
                  fullWidth
                  variant="inline"
                  autoOk
                  disablePast="true"
                  inputVariant="outlined"
                  onChange={event => setFieldValue('start_time', moment(event).toISOString())}
                  onBlur={handleBlur}
                  format="DD/MM/YYYY"
                  InputProps={{
                    startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
                  }}
                  disableToolbar
                  label="Data inicial"
                  name="values.start_time"
                  value={values.start_time || ''}
                  error={!!errors.start_time}
                  helperText={errors.start_time || firstDateHelper}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  required
                  fullWidth
                  variant="inline"
                  autoOk
                  disablePast="true"
                  inputVariant="outlined"
                  onChange={event => setFieldValue('end_time', moment(event).toISOString())}
                  onBlur={handleBlur}
                  format="DD/MM/YYYY"
                  InputProps={{
                    startAdornment: <IconButton><TodayOutlinedIcon /></IconButton>
                  }}
                  disableToolbar
                  label="Data final"
                  name="end_time"
                  value={values.end_time || ''}
                  error={!!errors.end_time}
                  helperText={errors.end_time || lastDateHelper}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.start_morning}
                      onChange={event => setFieldValue('start_morning', !values.start_morning)}
                      onBlur={handleBlur}
                      name="start_morning"
                      color="primary"
                    />
                  }
                  label={firstHalfHelper}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.end_afternoon}
                      onChange={event => setFieldValue('end_afternoon', !values.end_afternoon)}
                      onBlur={handleBlur}
                      name="end_afternoon"
                      color="primary"
                    />
                  }
                  label={lastHalfHelper}
                />
              </Grid>
            </Grid>
            <Box mb={3}>
              <Zoom in={editable} disableStrictModeCompat={true}>
                <Fab
                  color="primary"
                  aria-label="save"
                  className={classes.fab}
                  disabled={!isValid || loadingPostAbsence}
                  onClick={handleSubmit}
                >
                  <SaveIcon />
                </Fab>
              </Zoom>
            </Box>
          </form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}

export default AbsenceForm
