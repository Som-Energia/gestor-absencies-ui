import React, { useState } from 'react'

import { loginService } from '../services/authentication'

const AuthContext = React.createContext()

const AuthProvider = (props) => {
  const [state, setState] = useState({
    status: 'pending',
    error: null,
    user: null
  })

  React.useEffect(() => {
    const user = localStorage.getItem('somAuthUser')
    if (user) {
      setState({ status: 'success', error: null, user: JSON.parse(user) })
    }
  }, [])

  const login = async (username, password) => {
    return loginService(username, password)
      .then(response => {
        response.data.lastRefresh = new Date().toString()
        // TODO: Only remember if checkbox was checked
        localStorage.setItem('somAuthUser', JSON.stringify(response.data))
        setState({ status: 'success', error: null, user: response.data })
      }).catch(error => {
        setState({ status: 'error', error: error, user: null })
        localStorage.removeItem('somAuthUser')
      })
  }

  const logout = () => {
    setState({ status: 'pending', error: null, user: null })
    localStorage.removeItem('somAuthUser')
  } // clear the token in localStorage and the user data

  return (
    <AuthContext.Provider value={{ ...state, login, logout }} {...props} />
  )
}

const useAuthState = () => {
  const state = React.useContext(AuthContext)
  const isPending = state.status === 'pending'
  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'
  const isAuthenticated = state.user && isSuccess

  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  }
}

export { AuthProvider, useAuthState }
