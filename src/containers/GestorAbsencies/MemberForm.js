import React, { useState, useEffect } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'

import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

import { makeStyles } from '@material-ui/core/styles'

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
  const { member } = props
  const [editable, setEditable] = useState(false)

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ member }
        validationSchema={
          Yup.object().shape(
            {
              email: Yup.string()
                .email('El email no és vàlid')
                .required('El email és obligatori'),
              password: Yup.string()
                .required('La password és obligatoria')
                .min(4, 'La password ha de tenir com a mínim 4 caràcters')
              // .matches(/(?=.*[0-9])/, 'La contraseña debe tener al menos un número')
            }
          )
        }
        onSubmit={(values, { setSubmitting }) => {
          console.log('submit: ', values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
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
                  value={values?.first_name}
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
                <TextField
                  required
                  fullWidth
                  label="Data contractació"
                  name="contract_date"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.contract_date}
                  error={errors.contract_date && touched.contract_date}
                  helperText={touched.contract_date && errors.contract_date}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Hores per setmana"
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
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Gènere"
                  name="gender"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.gender}
                  error={errors.gender && touched.gender}
                  helperText={touched.gender && errors.gender}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Categoria"
                  name="category"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.category}
                  error={errors.category && touched.category}
                  helperText={touched.category && errors.category}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  variant="outlined"
                >
                  Eliminar
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                >
                  Canviar password
                </Button>
              </Grid>
            </Grid>
            <Zoom in={editable} disableStrictModeCompat={true}>
              <Fab
                color="primary"
                aria-label="save"
                className={classes.fab}
                onClick={() => setEditable(false)}
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
    </>
  )
}

export default MemberForm
