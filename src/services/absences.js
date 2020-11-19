import { useState } from 'react'

import axios from 'axios'
import { useAuthState } from 'context/auth'

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
        timeout: 10000,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setData(result?.data)
    } catch (e) {
      setError('No s\'han pogut obtenir les dades')
    }
    setLoading(false)
  }

  return [{ data, loading, error }, load]
}

export const useFetchWorkers = () => {
  const [workers, setWorkers] = useState({})
  const [loadingWorkers, setLoading] = useState(false)
  const [errorWorkers, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setWorkers(null)
    setLoading(false)
    setError(false)
  }

  const load = async (workerId = false) => {
    init()
    setLoading(true)
    try {
      const URL = workerId
        ? `${API_URL}/absencies/workers/${workerId}`
        : `${API_URL}/absencies/workers`

      const result = await axios.get(URL, {
        timeout: 10000,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setWorkers(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ workers, loadingWorkers, errorWorkers }, load]
}

export const useFetchMembers = () => {
  const [members, setMembers] = useState({})
  const [loadingMembers, setLoading] = useState(false)
  const [errorMembers, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setMembers(null)
    setLoading(false)
    setError(false)
  }

  const load = async (teamId = false) => {
    init()
    setLoading(true)
    try {
      const memberURL = !teamId
        ? `${API_URL}/absencies/members`
        : `${API_URL}/absencies/members?team=${teamId}`

      const membersResult = await axios.get(memberURL, {
        timeout: 10000,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setMembers(membersResult?.data)
    } catch (e) {
      setError('No s\'han pogut obtenir les dades')
    }
    setLoading(false)
  }

  return [{ members, loadingMembers, errorMembers, setMembers }, load]
}

export const usePostMember = () => {
  const [responsePostMember, setResponse] = useState()
  const [loadingPostMember, setLoading] = useState(false)
  const [errorPostMember, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const post = async (data = { worker: null, team: null }) => {
    init()
    try {
      const result = await axios({
        method: 'POST',
        url: `${API_URL}/absencies/members`,
        data: data,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(result?.data)
    } catch (e) {
      setError(true)
      setResponse(null)
    }
    setLoading(false)
  }

  return [{ responsePostMember, loadingPostMember, errorPostMember }, post]
}

export const useFetchTeams = () => {
  const [teams, setTeams] = useState({})
  const [loadingTeams, setLoading] = useState(false)
  const [errorTeams, setError] = useState(false)

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
        timeout: 10000,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setTeams(result?.data)
    } catch (e) {
      setError('No s\'han pogut obtenir les dades')
    }
    setLoading(false)
  }

  return [{ teams, loadingTeams, errorTeams, setTeams }, load]
}

export const useFetchTeam = () => {
  const [team, setTeam] = useState({})
  const [loadingTeam, setLoading] = useState(false)
  const [errorTeam, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setTeam(null)
    setLoading(false)
    setError(false)
  }

  const load = async (memberId) => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/teams/${memberId}`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setTeam(result?.data)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return [{ team, loadingTeam, errorTeam }, load]
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

export const useFetchVacationPolicy = () => {
  const [vacationPolicy, setVacationPolicy] = useState({})
  const [loadingVacationPolicy, setLoading] = useState(false)
  const [errorVacationPolicy, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setVacationPolicy({})
    setLoading(false)
    setError(false)
  }

  const loadVacationPolicy = async () => {
    init()
    setLoading(true)
    try {
      const result = await axios.get(`${API_URL}/absencies/vacationpolicy`, {
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setVacationPolicy(result?.data)
    } catch (e) {
      setError('Error obtenint les polítiques de vacances')
    }
    setLoading(false)
  }

  return [{ vacationPolicy, loadingVacationPolicy, errorVacationPolicy }, loadVacationPolicy]
}

export const useFetchCategories = () => {
  const [categories, setCategories] = useState({})
  const [loadingCategories, setLoading] = useState(false)
  const [errorCategories, setError] = useState(false)

  const categoriesMock = {
    results: [
      { id: 'Technical', name: 'Tècnic' },
      { id: 'Specialist', name: 'Especialista' },
      { id: 'Manager', name: 'Gerència' },
      { id: 'admin', name: 'Administrador' }
    ]
  }

  const init = () => {
    setCategories({})
    setLoading(false)
    setError(false)
  }

  const loadCategories = async () => {
    init()
    setLoading(true)
    try {
      setCategories(categoriesMock)
    } catch (e) {
      setError('Error obtenint les categories')
    }
    setLoading(false)
  }

  return [{ categories, loadingCategories, errorCategories }, loadCategories]
}

export const useFetchGender = () => {
  const [gender, setGender] = useState({})
  const [loadingGender, setLoading] = useState(false)
  const [errorGender, setError] = useState(false)

  const genderMock = {
    results: [
      { id: 'Female', name: 'Dona' },
      { id: 'Male', name: 'Home' },
      { id: 'Intersex', name: 'Intersex' },
      { id: 'Trans', name: 'Trans' },
      { id: 'Queer', name: 'Queer' },
      { id: 'Other', name: 'Altre' }
    ]
  }

  const init = () => {
    setGender({})
    setLoading(false)
    setError(false)
  }

  const loadGender = async () => {
    init()
    setLoading(true)
    try {
      setGender(genderMock)
    } catch (e) {
      setError('Error obtenint els gèneres')
    }
    setLoading(false)
  }

  return [{ gender, loadingGender, errorGender }, loadGender]
}

export const usePostAbsence = () => {
  const { user } = useAuthState()

  const [responsePostAbsence, setResponse] = useState()
  const [loadingPostAbsence, setLoading] = useState(false)
  const [errorPostAbsence, setError] = useState(false)

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const postAbsence = async (data) => {
    init()
    try {
      const result = await axios({
        method: 'POST',
        url: `${API_URL}/absencies/absences`,
        data: data,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      console.log('response! ', result)
      setResponse(result?.data)
    } catch (e) {
      setError(true)
      setResponse(null)
      console.log('catch error!', errorPostAbsence)
    }
    console.log('loading: ', loadingPostAbsence)
    setLoading(false)
  }

  return [{ responsePostAbsence, loadingPostAbsence, errorPostAbsence }, postAbsence]
}

export const usePostWorker = () => {
  const [responsePostWorker, setResponse] = useState()
  const [loadingPostWorker, setLoading] = useState(false)
  const [errorPostWorker, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const post = async (data) => {
    init()
    try {
      const result = await axios({
        method: data.id === 0 ? 'POST' : 'PUT',
        url: `${API_URL}/absencies/workers${data.id === 0 ? '' : `/${data.id}`}`,
        data: data,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(result?.data)
    } catch (e) {
      setError(true)
      setResponse(null)
    }
    setLoading(false)
  }

  return [{ responsePostWorker, loadingPostWorker, errorPostWorker }, post]
}

export const usePostTeam = () => {
  const [responsePostTeam, setResponse] = useState()
  const [loadingPostTeam, setLoading] = useState(false)
  const [errorPostTeam, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const post = async (data) => {
    init()
    try {
      const result = await axios({
        method: data.id === 0 ? 'POST' : 'PUT',
        url: `${API_URL}/absencies/teams${data.id === 0 ? '' : `/${data.id}`}`,
        data: data,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(result?.data)
    } catch (e) {
      setError(true)
      setResponse(null)
    }
    setLoading(false)
  }

  return [{ responsePostTeam, loadingPostTeam, errorPostTeam }, post]
}

export const useRemoveTeam = () => {
  const [responseRemoveTeam, setResponse] = useState()
  const [loadingRemoveTeam, setLoading] = useState(false)
  const [errorRemoveTeam, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const remove = async (data) => {
    init()
    try {
      await axios({
        method: 'DELETE',
        url: `${API_URL}/absencies/teams/${data.id}`,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(true)
    } catch (e) {
      setError(true)
      setResponse(null)
    }
    setLoading(false)
  }

  return [{ responseRemoveTeam, loadingRemoveTeam, errorRemoveTeam }, remove]
}

export const useRemoveWorker = () => {
  const [responseRemoveWorker, setResponse] = useState()
  const [loadingRemoveWorker, setLoading] = useState(false)
  const [errorRemoveWorker, setError] = useState(false)

  const { user } = useAuthState()

  const init = () => {
    setResponse(null)
    setLoading(true)
    setError(false)
  }

  const remove = async (data) => {
    init()
    try {
      await axios({
        method: 'DELETE',
        url: `${API_URL}/absencies/workers/${data.id}`,
        headers: {
          Authorization: `JWT ${user?.token}`
        }
      })
      setResponse(true)
    } catch (e) {
      setError(true)
      setResponse(null)
    }
    setLoading(false)
  }

  return [{ responseRemoveWorker, loadingRemoveWorker, errorRemoveWorker }, remove]
}
