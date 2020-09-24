import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Alert from '@material-ui/lab/Alert'
import Fab from '@material-ui/core/Fab'
import Snackbar from '@material-ui/core/Snackbar'
import Zoom from '@material-ui/core/Zoom'

import ModalForm from 'components/ModalForm'
import TeamsList from 'components/GestorAbsencies/TeamsList'
import SkeletonList from 'components/SkeletonList'
import SnackbarResponse from 'components/SnackbarResponse'

import TeamForm from 'containers/GestorAbsencies/TeamForm'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import { useFetchTeams } from 'services/absences'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const TeamsListTab = (props) => {
  const { filter } = props

  const [filteredTeams, setFilteredTeams] = useState(false)
  const [{ teams, loadingTeams, errorTeams }, fetchTeams] = useFetchTeams()

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [teamId, setTeamId] = useState()
  const [formResponse, setFormResponse] = useState({})

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    const exp = new RegExp(filter, 'i')
    if (teams?.results) {
      const filtered = teams.results.filter(team => team.name.match(exp))
      setFilteredTeams(filtered)
    }
  }, [filter])

  const handleAccept = (response = {}) => {
    setOpen(false)
    setFormResponse(response)
    response?.state === true &&
      fetchTeams()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (teamId) => {
    setOpen(true)
    setTeamId(teamId)
  }

  const handleClick = () => {
    setTeamId(false)
    setOpen(true)
  }

  return (
    <>
      {
        teams?.results
          ? <TeamsList teams={filteredTeams || teams.results} onEdit={handleEdit} />
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
        <TeamForm teamId={teamId} onSuccess={handleAccept} onError={() => {}} />
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
      <SnackbarResponse state={false} message={errorTeams} onClose={() => {}} />
      <SnackbarResponse state={formResponse?.state} message={formResponse?.message} onClose={() => setFormResponse({})} />
    </>
  )
}

export default TeamsListTab
