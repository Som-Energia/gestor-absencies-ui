import React, { useState, useEffect } from 'react'

import { Formik } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'

import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

import { makeStyles } from '@material-ui/core/styles'

import { useFetchTeam, usePostTeam, useRemoveTeam } from 'services/absences'

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

const TeamForm = (props) => {
  const { teamId, onSuccess, onError } = props
  const classes = useStyles()
  const [editable, setEditable] = useState(!teamId)
  const [formResponse, setFormResponse] = useState(false)

  const [{ team, loadingTeam, errorTeam }, fetchTeam] = useFetchTeam()
  const [{ response, loadingPostTeam, errorPostTeam }, postTeam] = usePostTeam()
  const [{ responseRemove, loadingRemoveTeam, errorRemoveTeam }, removeTeam] = useRemoveTeam()

  useEffect(() => {
    teamId && fetchTeam(teamId)
  }, [teamId])

  useEffect(() => {
    if (formResponse) {
      const message = errorRemoveTeam === false
      ? errorPostTeam === false
        ? teamId ? 'Equip modificat correctament!' : 'Equip creat correctament!'
        : teamId ? 'No s\'ha pogut modificar l\'equip!' : 'No s\'ha pogut crear l\'equip!'
      : 'No s\'ha pogut eliminar l\'equip!'

      const response = { state: errorPostTeam === false, message: message }
      onSuccess(response)
    }
  }, [formResponse])

  const initialTeam = {
    id: 0,
    name: ''
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        validateOnMount
        isInitialValid={false}
        initialValues={{ ...initialTeam, ...team }}
        validationSchema={
          Yup.object().shape(
            {
              id: Yup.number(),
              name: Yup.string()
                .required('El nom és obligatori')
            }
          )
        }
        onSubmit={(values, { setSubmitting }) => {
          async function postForm () {
            await postTeam(values)
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.name || ''}
                  error={errors.name && touched.name}
                  helperText={touched.name && errors.name}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>

              <Grid item xs={12}>
                { teamId &&
                  <>
                    <Button
                      className={classes.button}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      disabled={!editable}
                      onClick={() => {
                        async function deleteForm () {
                          await removeTeam(values)
                          setFormResponse(responseRemove)
                        }
                        deleteForm()
                      }}
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
                disabled={!isValid || loadingPostTeam || loadingRemoveTeam}
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
    </>
  )
}

export default TeamForm
