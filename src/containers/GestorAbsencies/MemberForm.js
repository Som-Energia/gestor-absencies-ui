import React, { useState, useEffect } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import moment from 'moment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import 'moment/locale/ca'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'

import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import { makeStyles } from '@material-ui/core/styles'

import { useFetchMember, useFetchVacationPolicy, useFetchCategories, useFetchGender, usePostWorker } from '../../services/absences'

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

const MemberForm = (props) => {
  const classes = useStyles()
  const { memberId, onSuccess, onError } = props
  const [editable, setEditable] = useState(!memberId)
  const [formResponse, setFormResponse] = useState(false)

  const [{ member, loading, error }, fetchMember] = useFetchMember()
  const [{ vacationPolicy, loadingVacationPolicy, errorVacationPolicy }, loadVacationPolicy] = useFetchVacationPolicy()
  const [{ gender, loadingGender, errorGender }, loadGender] = useFetchGender()
  const [{ categories, loadingCategories, errorCategories }, loadCategories] = useFetchCategories()
  const [{ response, loadingPostWorker, errorPostWorker }, postWorker] = usePostWorker()

  useEffect(() => {
    memberId && fetchMember(memberId)
    loadVacationPolicy()
    loadCategories()
    loadGender()
  }, [memberId])

  useEffect(() => {
    if (formResponse) {
      const message = errorPostWorker === false
        ? memberId ? 'Membre modificat correctament!' : 'Membre creat correctament!'
        : memberId ? 'No s\'ha pogut modificar el membre!' : 'No s\'ha pogut crear el membre!'
      const response = { state: errorPostWorker === false, message: message }
      onSuccess(response)
    }
  }, [formResponse])

  const initialMember = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: '',
    holidays: '',
    contract_date: moment().toISOString(),
    working_week: '',
    vacation_policy: '',
    gender: '',
    category: ''
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={'ca'}>
      <Formik
        enableReinitialize={true}
        validateOnMount
        isInitialValid={false}
        initialValues={{ ...initialMember, ...member }}
        validationSchema={
          Yup.object().shape(
            {
              id: Yup.number(),
              first_name: Yup.string()
                .required('El nom és obligatori'),
              last_name: Yup.string()
                .required('Els cognoms són obligatoris'),
              email: Yup.string()
                .email('L\'email no és vàlid')
                .required('L\'email és obligatori'),
              username: Yup.string()
                .required('L\'usuari és obligatori'),
              holidays: Yup.number()
                .required('El numero de dies de vacances és obligatori'),
              working_week: Yup.number()
                .required('El numero d\'hores setmanals és obligatori'),
              vacation_policy: Yup.number()
                .required('La política de vacances és obligatòria'),
              gender: Yup.string()
                .required('El gènere és obligatori'),
              category: Yup.string()
                .required('La categoria és obligatòria'),
              password: Yup.string()
                .when(
                  'id', {
                    is: 0,
                    then: Yup.string().required('La password és obligatòria')
                      .min(8, 'La password ha de tenir 8 caràcters mínim')
                      .matches(/[a-zA-Z0-9]/, 'La password només pot contenir lletres i números')
                  }),
              repeat_password: Yup.string()
                .when(
                  'id', {
                    is: 0,
                    then: Yup.string().required('Repetir la password és obligatori')
                      .test(
                        'passwordIsEqual',
                        'Els passwords no són iguals',
                        function () { return this.parent.password === this.parent.repeat_password }
                      )
                  })
            }
          )
        }
        onSubmit={(values, { setSubmitting }) => {
          async function postForm () {
            await postWorker(values)
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
          isSubmitting,
          setFieldValue,
          isValid
        }) => (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="first_name"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.first_name || ''}
                  error={errors.first_name && touched.first_name}
                  helperText={touched.first_name && errors.first_name}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Cognoms"
                  name="last_name"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.last_name}
                  error={errors.last_name && touched.last_name}
                  helperText={touched.last_name && errors.last_name}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.email}
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Usuari"
                  name="username"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.username}
                  error={errors.username && touched.username}
                  helperText={touched.username && errors.username}
                  disabled={!editable}
                />
              </Grid>
              {
                !memberId &&
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.password}
                      error={errors.password && touched.password}
                      helperText={touched.password && errors.password}
                      disabled={!editable}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Repeteix la password"
                      name="repeat_password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.repeat_password}
                      error={errors.repeat_password && touched.repeat_password}
                      helperText={touched.repeat_password && errors.repeat_password}
                      disabled={!editable}
                    />
                  </Grid>
                </>
              }
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Dies de vacances"
                  name="holidays"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.holidays}
                  error={errors.holidays && touched.holidays}
                  helperText={touched.holidays && errors.holidays}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  required
                  fullWidth
                  variant="inline"
                  autoOk
                  inputVariant="outlined"
                  onChange={event => setFieldValue('contract_date', moment(event).toISOString())}
                  onBlur={handleBlur}
                  format="DD/MM/YYYY"
                  disableToolbar
                  label="Data contractació"
                  name="values.contract_date"
                  value={values.contract_date || ''}
                  error={!!errors.contract_date}
                  helperText={errors.contract_date}
                  disabled={!editable}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Hores setmanals"
                  name="working_week"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.working_week}
                  error={errors.working_week && touched.working_week}
                  helperText={touched.working_week && errors.working_week}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Política de vacances"
                  name="vacation_policy"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.vacation_policy}
                  error={errors.vacation_policy && touched.vacation_policy}
                  helperText={touched.vacation_policy && errors.vacation_policy}
                  disabled={!editable || loadingVacationPolicy}
                >
                  { vacationPolicy?.results
                    ? vacationPolicy?.results.map(policy => (
                      <MenuItem key={policy.id} value={policy.id}>{policy.name}</MenuItem>
                    ))
                    : <MenuItem></MenuItem>
                  }
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Gènere"
                  name="gender"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.gender}
                  error={!!errorGender || (errors.gender && touched.gender)}
                  helperText={errorGender || (touched.gender && errors.gender)}
                  disabled={!editable || loadingGender}
                >
                  { gender?.results
                    ? gender?.results.map(item => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                    : <MenuItem></MenuItem>
                  }

                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Categoria"
                  name="category"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.category}
                  error={!!errorCategories || (errors.category && touched.category)}
                  helperText={errorCategories || (touched.category && errors.category)}
                  disabled={!editable || loadingCategories}
                >
                  { categories?.results
                    ? categories?.results.map(item => (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))
                    : <MenuItem></MenuItem>
                  }
                </TextField>
              </Grid>
              <Grid item xs={12}>
                { memberId &&
                  <>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      startIcon={<VpnKeyIcon />}
                      disabled={!editable}
                    >
                      Canviar password
                    </Button>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      disabled={!editable}
                    >
                      Eliminar
                    </Button>
                  </>
                }
              </Grid>
            </Grid>
            <Zoom in={editable} disableStrictModeCompat={true}>
              <Fab
                color="primary"
                aria-label="save"
                className={classes.fab}
                disabled={!isValid || loadingPostWorker}
                onClick={handleSubmit}
              >
                <SaveIcon />
              </Fab>
            </Zoom>
            <Zoom in={!editable} disableStrictModeCompat={true}>
              <Fab
                color="primary"
                aria-label="edit"
                className={classes.fab}
                onClick={() => setEditable(true)}
              >
                <EditIcon />
              </Fab>
            </Zoom>
          </form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}

export default MemberForm
