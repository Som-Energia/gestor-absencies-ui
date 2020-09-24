import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import TeamsListTab from 'containers/GestorAbsencies/ET/TeamListTab'
import MembersListTab from 'containers/GestorAbsencies/ET/MemberListTab'

import SearchIcon from '@material-ui/icons/Search'

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
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  filter: {
    textAlign: 'right'
  }
}))

const ET = () => {
  const classes = useStyles()

  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setFilter('')
  }, [activeTab])

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setActiveTab(newValue)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Paper className={classes.paperTabs} elevation={0}>
        <Grid container>
          <Grid item xs={8}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Membres" />
              <Tab label="Equips" />
            </Tabs>
          </Grid>
          <Grid item xs={4} className={classes.filter}>
            <TextField
              label=""
              margin="none"
              onChange={handleFilter}
              value={filter}
              InputProps={{
                startAdornment: <IconButton><SearchIcon /></IconButton>
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid className={classes.list} container>
        {
          activeTab === 0 &&
            <MembersListTab filter={filter} />
        }
        {
          activeTab === 1 &&
            <TeamsListTab filter={filter} />
        }
      </Grid>
    </>
  )
}

export default ET
