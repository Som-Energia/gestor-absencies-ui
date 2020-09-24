import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import GroupIcon from '@material-ui/icons/Group'

import { makeStyles } from '@material-ui/core/styles'

import { useAuthState } from 'context/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: '0em'
  }
}))

const Team = (props) => {
  const classes = useStyles()
  const { team } = props
  const { id, name } = team

  return (
    <>
      <Card className={classes.paper} elevation={0}>
        <CardHeader className={classes.title} title={name} avatar={<GroupIcon />} />
        <CardContent>

        </CardContent>
      </Card>
    </>
  )
}

export default Team
