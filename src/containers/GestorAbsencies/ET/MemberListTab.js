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

import { useFetchWorkers, useRemoveWorker } from 'services/absences'

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
  const [{ workers, loadingWorkers, errorWorkers }, fetchWorkers] = useFetchWorkers()
  const [{ responseRemoveWorker, loadingRemoveWorker, errorRemoveWorker }, removeWorker] = useRemoveWorker()

  useEffect(() => {
    fetchWorkers()
  }, [responseRemoveWorker])

  useEffect(() => {
    if (errorWorkers?.results) {
      const exp = new RegExp(filter, 'i')
      const filtered = workers.results.filter(worker => worker.first_name.match(exp) || worker.last_name.match(exp) || worker.email.match(exp))
      setFilteredMembers(filtered)
    }
  }, [filter])

  const handleClick = () => {
    setMemberId(false)
    setOpen(true)
  }

  const handleAccept = (response = {}) => {
    setOpen(false)
    setFormResponse(response)
    response?.state === true &&
    fetchWorkers()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (worker) => {
    const { id } = worker
    setOpen(true)
    setMemberId(id)
  }

  const handleDelete = (worker) => {
    removeWorker(worker)
  }

  return (
    <>
      {
        workers?.results
          ? <MembersList
            members={filteredMembers || workers.results}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          : loadingWorkers
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
      <SnackbarResponse state={false} message={errorWorkers || errorRemoveWorker} onClose={() => {}} />
      <SnackbarResponse state={formResponse?.state} message={formResponse?.message} onClose={() => setFormResponse({})} />
    </>
  )
}

export default MembersListTab
