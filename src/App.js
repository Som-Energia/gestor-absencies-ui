import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import { useAuthState } from './context/auth'

import GestorAbsencies from './containers/GestorAbsencies'
import Login from './containers/Login'

import MenuAppBar from './components/MenuAppBar'

import './i18n/i18n'
import './App.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96b633'
    },
    secondary: {
      main: '#a1a1a1'
    },
    contrastThreshold: 2,
    tonalOffset: 0.2
  },
  typography: {
    color: '#4d4d4d',
    htmlFontSize: 16
  },
  shape: {
    borderRadius: '0'
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#4d4d4d'
  },
  container: {
    position: 'relative',
    height: 'calc(100vh - 64px)'
  }
}))

const App = () => {
  const classes = useStyles()
  const { isAuthenticated } = useAuthState()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <MenuAppBar />
          <CssBaseline />
          <div className={classes.container}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/gestor-absencies" />
              </Route>
              <Route path="/gestor-absencies">
                { isAuthenticated ? <GestorAbsencies /> : <Redirect from="/gestor-absencies" to="/login" /> }
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
