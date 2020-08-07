import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Menu from '@material-ui/core/Menu'

import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'

import { useAuthState } from '../context/auth'

import cuca from '../images/cuca.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontSize: '17px'
  },
  appBar: {
    display: 'flex',
    background: '#fff',
    color: '#4d4d4d'
  },
  logo: {
    width: '60px',
    marginBottom: '5px'
  },
  titleText: {
    marginLeft: '15px',
    fontWeight: '400',
    textTransform: 'uppercase'
  }
}))

const MenuAppBar = () => {
  const classes = useStyles()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { user, login, logout, isAuthenticated } = useAuthState()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    history.push('/gestor-absencies/member')
    handleClose()
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img className={classes.logo} src={cuca} alt="logo" />
            <span className={classes.titleText}>Som Intranet</span>
          </Typography>
          {isAuthenticated && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><ExitToAppIcon /></ListItemIcon>Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuAppBar
