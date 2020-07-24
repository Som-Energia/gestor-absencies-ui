import React, { useState, useEffect } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Zoom from '@material-ui/core/Zoom'

import { makeStyles } from '@material-ui/core/styles'
import EditMenu from '../../components/EditMenu'
import ModalForm from '../../components/ModalForm'

import { useFetchMembers, useFetchTeams } from '../../services/absences'

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

const ET = () => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()
  const [{ teams, loadingTeams, errorTeams }, fetchTeams] = useFetchTeams()

  useEffect(() => {
    if (activeTab === 0) {
      fetchMembers()
    }
    if (activeTab === 1) {
      fetchTeams()
    }
  }, [activeTab])

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setActiveTab(newValue)
  }

  const MembersList = () => {

    const [open, setOpen] = useState(false)

    const handleAccept = () => {
      setOpen(false)
    }

    const handleClose = () => {
      setOpen(false)
    }


    return (
      <>
        {
        members?.results &&
          members.results.map(member => (
            <Grid key={member.id} className={classes.listItem} item xs={12} sm={4}>
              <Zoom in={activeTab === 0}>
                <Card className={classes.card} elevation={0}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="member" className={classes.avatar}>
                        { member.first_name.charAt(0).toUpperCase() }
                      </Avatar>
                    }
                    action={
                      <EditMenu onEdit={ () => setOpen(true) } />
                    }
                    title={ `${member.first_name} ${member.last_name}` }
                    subheader={member.email}
                  />
                </Card>
              </Zoom>
            </Grid>
          ))
        }
        <ModalForm
          title={'Edit member'}
          content={<div>foo</div>}
          open={open}
          onAccept={handleAccept}
          onClose={handleClose}
        />
      </>
    )
  }

  const TeamsList = () => {
    const [open, setOpen] = useState(false)

    const handleAccept = () => {
      setOpen(false)
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        {
        teams?.results &&
          teams.results.map(team => (
            <Grid key={team.id} className={classes.listItem} item xs={12} sm={4}>
              <Zoom in={activeTab === 1}>
                <Card className={classes.card} elevation={0}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="member" className={classes.avatar}>
                        { team.name.charAt(0).toUpperCase() }
                      </Avatar>
                    }
                    action={
                      <EditMenu onEdit={ () => setOpen(true) } />
                    }
                    title={ `${team.name}` }
                    subheader={''}
                  />
                </Card>
              </Zoom>
            </Grid>
          ))
        }
        <ModalForm
          title={'Edit team'}
          content={<div>foo</div>}
          open={open}
          onAccept={handleAccept}
          onClose={handleClose}
        />
      </>
    )
  }

  return (
    <>
      <Paper className={classes.paperTabs} elevation={0}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Membres" />
          <Tab label="Equips" />
        </Tabs>
      </Paper>
      <Grid className={classes.list} container>
        {
          activeTab === 0 &&
            <MembersList />
        }
        {
          activeTab === 1 &&
            <TeamsList />
        }
      </Grid>
    </>
  )
}

export default ET
