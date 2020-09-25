import React, { useState, useEffect } from 'react'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const EditMenu = (props) => {
  const { onEdit = false, onAdd = false, onDelete = false, customize = {} } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [activeItems, setActiveItems] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const filteredItems = [onAdd, onEdit, onDelete].filter(item => item !== false)
    setActiveItems(filteredItems)
  }, [onAdd, onEdit, onDelete])

  return (
    <>
      {
        activeItems.length !== 1
          ? <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          : <>
            {
              onAdd !== false &&
              <IconButton onClick={ () => handleClose() & onAdd() }>
                <AddIcon />
              </IconButton>
            }
            {
              onEdit !== false &&
              <IconButton onClick={ () => handleClose() & onEdit() }>
                <EditIcon />
              </IconButton>
            }
            {
              onDelete !== false &&
              <IconButton onClick={ () => handleClose() & onDelete() }>
                <DeleteIcon/>
              </IconButton>
            }
          </>
      }
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          onAdd !== false &&
          <MenuItem onClick={ () => handleClose() & onAdd() }>
            <ListItemIcon><AddIcon /></ListItemIcon> { customize?.add ? customize?.add : 'Afegir' }
          </MenuItem>
        }
        {
          onEdit !== false &&
          <MenuItem onClick={ () => handleClose() & onEdit() }>
            <ListItemIcon><EditIcon /></ListItemIcon> { customize?.edit ? customize?.edit : 'Editar' }
          </MenuItem>
        }
        {
          onDelete !== false &&
          <MenuItem onClick={ () => handleClose() & onDelete() }>
            <ListItemIcon><DeleteIcon /></ListItemIcon> { customize?.delete ? customize?.delete : 'Eliminar' }
          </MenuItem>
        }
      </Menu>
    </>
  )
}

export default EditMenu
