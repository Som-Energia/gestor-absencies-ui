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

import MemberForm from './MemberForm'

import { makeStyles } from '@material-ui/core/styles'

import { useAuthState } from '../../context/auth'
import { useFetchMember } from '../../services/absences'

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

const Member = (props) => {
  const classes = useStyles()
  const { user } = useAuthState()

  return (
    <>
      <Card className={classes.paper} elevation={0}>
        <CardHeader title="El meu perfil" />
        <CardContent>
          <MemberForm memberId={user?.user_id} />
        </CardContent>
      </Card>
    </>
  )
}

export default Member
