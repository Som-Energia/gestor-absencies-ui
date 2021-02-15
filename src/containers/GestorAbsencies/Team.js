import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'

import { makeStyles } from '@material-ui/core/styles'

import MembersList from 'components/GestorAbsencies/MembersList'
import SkeletonList from 'components/SkeletonList'
import ModalForm from 'components/ModalForm'

import MemberSelector from 'containers/GestorAbsencies/ET/MemberSelector'


import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import GroupIcon from '@material-ui/icons/Group'

import { useFetchMembers } from 'services/absences'

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
  },
  root: {
    '& .MuiDialog-paper': {
      height: 'calc(100% - 64px)'
    }
  }
}))

const Team = (props) => {
  const classes = useStyles()
  const { team } = props
  const { id, name } = team

  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()
  const [filteredMembers, setFilteredMembers] = useState(false)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchMembers(id)
  }, [id])

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (member) => {
    console.log(`team: ${id}`, `member: ${member.id}`)
  }

  return (
    <div className={classes.root}>
      <Card className={classes.paper} elevation={0}>
        <CardHeader className={classes.title} title={name} avatar={<GroupIcon />} />
        <CardContent>
          <h5>Membres de l'equip</h5>
          {
            members?.results
              ? <MembersList
                members={members.results}
                onDelete={handleDelete}
              />
              : loadingMembers
                ? <SkeletonList numItems={15} />
                : <></>
          }
        </CardContent>
      </Card>
      <Fade in={true} disableStrictModeCompat={true}>
        <Fab
          color="primary"
          aria-label="edit"
          className={classes.fab}
          onClick={handleClick}
        >
          <PersonAddOutlinedIcon />
        </Fab>
      </Fade>
      <ModalForm
        title={`Afegir membres a l'equip ${name}`}
        open={open}
        onAccept={handleClose}
        onClose={handleClose}
        maxWidth="md"
        showControls={false}
      >
        <MemberSelector team={team} />
      </ModalForm>
    </div>
  )
}

export default Team
