import React, { useState } from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const EditMenu = (props) => {
  const { onEdit, onAdd = false } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          onAdd !== false &&
          <MenuItem onClick={ () => handleClose() & onAdd() }>
            <ListItemIcon><AddIcon /></ListItemIcon>Afegir
          </MenuItem>
        }
        <MenuItem onClick={ () => handleClose() & onEdit() }>
          <ListItemIcon><EditIcon /></ListItemIcon>Editar
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>Eliminar
        </MenuItem>
      </Menu>
    </>
  )
}

export default EditMenu
