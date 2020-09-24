import React from 'react'

import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

import EditMenu from '../EditMenu'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2)
  },
  paperTabs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  list: {
    margin: '0 0 0 -8px'
  },
  listItem: {
    padding: '8px 0 8px 8px'
  }
}))

const TeamsList = ({ teams = [], active = true, onEdit = () => {} }) => {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (team) => {
    history.push('/gestor-absencies/et/team', { team: team })
  }

  return (
    <>
      {
        teams.map(team => (
          <Grid key={team.id} className={classes.listItem} item xs={12} sm={4}>
            <Zoom in={true}>
              <Card className={classes.card} elevation={0}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="member" className={classes.avatar}>
                      { team.name.charAt(0).toUpperCase() }
                    </Avatar>
                  }
                  action={
                    <EditMenu
                      onEdit={ () => onEdit(team.id) }
                      onAdd={ () => handleClick(team)}
                    />
                  }
                  title={ `${team.name}` }
                  subheader={''}
                />
              </Card>
            </Zoom>
          </Grid>
        ))
      }
    </>
  )
}

export default TeamsList
