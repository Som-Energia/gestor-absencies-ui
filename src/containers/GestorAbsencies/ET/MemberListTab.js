import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Alert from '@material-ui/lab/Alert'
import Fab from '@material-ui/core/Fab'
import Snackbar from '@material-ui/core/Snackbar'
import Zoom from '@material-ui/core/Zoom'

import ModalForm from 'components/ModalForm'
import MembersList from 'components/GestorAbsencies/MembersList'
import SkeletonList from 'components/SkeletonList'
import SnackbarResponse from 'components/SnackbarResponse'

import MemberForm from 'containers/GestorAbsencies/MemberForm'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import { useFetchMembers } from 'services/absences'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

const MembersListTab = (props) => {
  const { filter } = props
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [memberId, setMemberId] = useState()
  const [formResponse, setFormResponse] = useState({})

  const [filteredMembers, setFilteredMembers] = useState(false)
  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    if (members?.results) {
      const exp = new RegExp(filter, 'i')
      const filtered = members.results.filter(member => member.first_name.match(exp) || member.last_name.match(exp) || member.email.match(exp))
      setFilteredMembers(filtered)
    }
  }, [filter])

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
            members={filteredMembers || members.results}
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
      <SnackbarResponse state={false} message={errorMembers} onClose={() => {}} />
      <SnackbarResponse state={formResponse?.state} message={formResponse?.message} onClose={() => setFormResponse({})} />
    </>
  )
}

export default MembersListTab
