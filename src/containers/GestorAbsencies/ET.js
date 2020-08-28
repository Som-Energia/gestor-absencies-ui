import React, { useState, useEffect } from 'react'

import Alert from '@material-ui/lab/Alert'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'

import { makeStyles } from '@material-ui/core/styles'
import ModalForm from '../../components/ModalForm'
import MembersList from '../../components/MembersList'
import TeamsList from '../../components/TeamsList'
import SkeletonList from '../../components/SkeletonList'
import MemberForm from './MemberForm'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import SearchIcon from '@material-ui/icons/Search'

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
  },
  fab: {
    position: 'absolute',
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

  const [filteredMembers, setFilteredMembers] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])

  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()
  const [{ teams, loadingTeams, errorTeams }, fetchTeams] = useFetchTeams()

  useEffect(() => {
    if (activeTab === 0) {
      setFilter('')
      fetchMembers()
    }
    if (activeTab === 1) {
      setFilter('')
      fetchTeams()
    }
  }, [activeTab])

  useEffect(() => {
    const exp = new RegExp(filter, 'i')
    if (activeTab === 0 && members?.results) {
      const filtered = members.results.filter(member => member.first_name.match(exp) || member.last_name.match(exp) || member.email.match(exp))
      setFilteredMembers(filtered)
    }
    if (activeTab === 1 && teams?.results) {
      const filtered = teams.results.filter(team => team.name.match(exp))
      setFilteredTeams(filtered)
    }
  }, [filter])

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setActiveTab(newValue)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const MembersListTab = () => {
    const [open, setOpen] = useState(false)
    const [memberId, setMemberId] = useState()
    const [formResponse, setFormResponse] = useState({})

    const handleClick = () => {
      setMemberId(false)
      setOpen(true)
    }

    const handleEdit = (memberId) => {
      setOpen(true)
      setMemberId(memberId)
    }

    const handleAccept = (response = {}) => {
      setOpen(false)
      setFormResponse(response)
      response?.state === true &&
        fetchMembers()
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        {
          members?.results
            ? <MembersList
              members={filter !== '' ? filteredMembers : members.results}
              onEdit={handleEdit}
            />
            : loadingMembers
              ? <SkeletonList numItems={15} />
              : <></>
        }
        <ModalForm
          title={ memberId ? 'Editar membre' : 'Afegir membre'}
          open={open}
          onAccept={handleAccept}
          onClose={handleClose}
          maxWidth="md"
          showControls={false}
        >
          <MemberForm memberId={memberId} onSuccess={handleAccept} onError={() => {}} />
        </ModalForm>
        <Zoom in={true} disableStrictModeCompat={true}>
          <Fab
            color="primary"
            aria-label="edit"
            className={classes.fab}
            onClick={handleClick}
          >
            <PersonAddOutlinedIcon />
          </Fab>
        </Zoom>
        <Snackbar open={ !!errorMembers }>
          <Alert severity="error">
            { errorMembers }
          </Alert>
        </Snackbar>
        <Snackbar open={!!formResponse?.message} autoHideDuration={6000} onClose={() => setFormResponse({})}>
          <Alert severity={formResponse?.state === true ? 'success' : 'error'}>
            { formResponse?.message }
          </Alert>
        </Snackbar>
      </>
    )
  }

  const TeamsListTab = () => {
    const [open, setOpen] = useState(false)
    const [teamId, setTeamId] = useState()

    const handleAccept = () => {
      setOpen(false)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleEdit = (teamId) => {
      setOpen(true)
      setTeamId(teamId)
    }

    return (
      <>
        {
          teams?.results
            ? <TeamsList teams={filteredTeams ? filteredTeams : teams.results} onEdit={handleEdit} />
            : loadingTeams
              ? <SkeletonList numItems={15} />
              : <></>
        }
        <ModalForm
          title={ teamId ? 'Editar equip' : 'Afegir equip'}
          open={open}
          showControls={false}
          onAccept={handleAccept}
          onClose={handleClose}
          maxWidth="md"
        >
          <div></div>
        </ModalForm>
        <Zoom in={true} disableStrictModeCompat={true}>
          <Fab
            color="primary"
            aria-label="edit"
            className={classes.fab}
            onClick={ console.log('add!') }
          >
            <PersonAddOutlinedIcon />
          </Fab>
        </Zoom>
        <Snackbar open={ !!errorTeams }>
          <Alert severity="error">
            { errorTeams }
          </Alert>
        </Snackbar>
      </>
    )
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
            <MembersListTab />
        }
        {
          activeTab === 1 &&
            <TeamsListTab />
        }
      </Grid>
    </>
  )
}

export default ET
