import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { useAuthState } from '../context/auth'

export const API_URL = 'https://gestorabsencies-demo.somenergia.local'
export const APP = axios.create({ baseURL: API_URL })

export const useFetch = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setData(null)
    setLoading(false)
    setError(false)
  }

  const load = async (endPoint) => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}${endPoint}`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setData(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ data, loading, error }, load]
}

export const useFetchMember = () => {
  const [member, setMember] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setMember(null)
    setLoading(false)
    setError(false)
  }

  const load = async (memberId) => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/workers/${memberId}`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setMember(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ member, loading, error }, load]
}

export const useFetchMembers = () => {
  const [members, setMembers] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setMembers(null)
    setLoading(false)
    setError(false)
  }

  const load = async () => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/workers`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setMembers(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ members, loading, error }, load]
}

export const useFetchTeams = () => {
  const [teams, setTeams] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setTeams(null)
    setLoading(false)
    setError(false)
  }

  const load = async () => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/teams`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setTeams(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ teams, loading, error }, load]
}

export const useFetchAbsencesType = () => {
  const [types, setTypes] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setTypes(null)
    setLoading(false)
    setError(false)
  }

  const load = async () => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/absencetype`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setTypes(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ types, loading, error }, load]
}


export const usePostAbsence = () => {
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(false)
    setError(false)
  }

  const postAbsence = async (data) => {
    init()
    setLoading(true)
    try {
      const result = await axios({
        method: 'POST',
        url: `${API_URL}/absencies/absences`,
        data: data,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(result?.data)
    } catch (e) {
      setResponse(null)
      setError(true)
    }
    setLoading(false)
  }

  return [{ response, loading, error }, postAbsence]
}
