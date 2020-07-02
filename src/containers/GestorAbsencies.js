import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, Link as RouterLink, useLocation, useRouteMatch } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ViewCompactIcon from '@material-ui/icons/ViewCompact'
import PersonIcon from '@material-ui/icons/Person'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import GroupIcon from '@material-ui/icons/Group'
import SettingsIcon from '@material-ui/icons/Settings'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import Absences from './GestorAbsencies/Absences'
import Calendar from './GestorAbsencies/Calendar'
import Member from './GestorAbsencies/Member'
import ET from './GestorAbsencies/ET'
import SomEnergia from './GestorAbsencies/SomEnergia'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: '#fff',
      color: '#4d4d4d'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'absolute'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const breadcrumbNameMap = {
  '/absences': 'Absències',
  '/member': 'El meu perfil',
  '/calendar': 'Calendari',
  '/et': 'ET',
  '/somenergia': 'Som Energia'
}

const breadcrumbIconMap = {
  '/absences': <ViewCompactIcon />,
  '/member': <PersonIcon />,
  '/calendar': <CalendarTodayIcon />,
  '/et': <GroupIcon />,
  '/somenergia': <SettingsIcon />
}


const GestorAbsencies = (props) => {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const location = useLocation()
  const { path, url } = useRouteMatch()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {Object.keys(breadcrumbNameMap).map((key, index) => {
          return <ListItem key={key} button selected={`${url}${key}` === location.pathname} component={RouterLink} to={`${url}${key}`}>
            <ListItemIcon>{breadcrumbIconMap[key]}</ListItemIcon>
            <ListItemText primary={breadcrumbNameMap[key]} />
          </ListItem>
        })}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} color="inherit" to="/gestor-absencies">
            Gestor d'absències
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1
            let to = `/${pathnames.slice(0, index + 1).join('/')}`
            to = to.replace(url, '')

            return last ? (
              <Typography color="textPrimary" key={to}>
                {breadcrumbNameMap[to]}
              </Typography>
            ) : (
              (breadcrumbNameMap[to])
                ? <Link component={RouterLink} color="inherit" to={to} key={to}>
                  {breadcrumbNameMap[to]}
                </Link>
                : null
            )
          })}
        </Breadcrumbs>

        <Switch>
          <Route exact path={path}>
            <h1>Main</h1>
          </Route>
          <Route exact path={`${path}/absences`}>
            <Absences />
          </Route>
          <Route exact path={`${path}/member`}>
            <Member />
          </Route>
          <Route exact path={`${path}/calendar`}>
            <Calendar />
          </Route>
          <Route exact path={`${path}/et`}>
            <ET />
          </Route>
          <Route exact path={`${path}/somenergia`}>
            <SomEnergia />
          </Route>

        </Switch>
      </main>
    </div>
  )
}

GestorAbsencies.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
}

export default GestorAbsencies
