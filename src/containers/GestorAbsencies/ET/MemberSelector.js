import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

import MembersList from 'components/GestorAbsencies/MembersList'
import SkeletonList from 'components/SkeletonList'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import GroupIcon from '@material-ui/icons/Group'
import SearchIcon from '@material-ui/icons/Search'

import { useFetchWorkers, usePostMember } from 'services/absences'

const MemberSelector = (props) => {
  const { team = null } = props

  const [filter, setFilter] = useState()
  const [filteredWorkers, setFilteredWorkers] = useState(false)
  const [{ workers, loadingWorkers, errorWorkers }, fetchWorkers] = useFetchWorkers()
  const [{ responsePostMember, loadingPostMember, errorPostMember }, postMember] = usePostMember()

  useEffect(() => {
    fetchWorkers()
  }, [])

  useEffect(() => {
    if (workers?.results) {
      const exp = new RegExp(filter, 'i')
      const filtered = workers.results.filter(worker => worker.first_name.match(exp) || worker.last_name.match(exp) || worker.email.match(exp))
      setFilteredWorkers(filtered)
    }
  }, [filter])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  const handleAdd = (worker) => {
    postMember({ worker: worker?.id, team: team?.id })
  }

  return (
    <>
      <TextField
        label=""
        margin="none"
        fullWidth
        onChange={handleFilter}
        value={filter}
        InputProps={{
          startAdornment: <IconButton><SearchIcon /></IconButton>
        }}
      />
      {
        workers?.results
          ? <MembersList
            members={filteredWorkers || workers.results}
            gridItemSize={12}
            onAdd={handleAdd}
          />
          : loadingWorkers
            ? <SkeletonList numItems={15} />
            : <></>
      }
    </>
  )
}

export default MemberSelector
