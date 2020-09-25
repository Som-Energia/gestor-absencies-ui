import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'

import MembersList from 'components/GestorAbsencies/MembersList'
import SkeletonList from 'components/SkeletonList'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import GroupIcon from '@material-ui/icons/Group'
import SearchIcon from '@material-ui/icons/Search'

import { useFetchMembers, usePostMember } from 'services/absences'

const MemberSelector = (props) => {
  const { team = null } = props

  const [filter, setFilter] = useState()
  const [filteredMembers, setFilteredMembers] = useState(false)
  const [{ members, loadingMembers, errorMembers }, fetchMembers] = useFetchMembers()
  const [{ responsePostMember, loadingPostMember, errorPostMember }, postMember] = usePostMember()

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    if (members?.results) {
      const exp = new RegExp(filter, 'i')
      const filtered = members.results.filter(member => member.first_name.match(exp) || member.last_name.match(exp) || member.email.match(exp))
      setFilteredMembers(filtered)
    }
  }, [filter])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    console.log(event.target.value)
  }

  const handleAdd = (member) => {
    postMember({ worker: member?.id, team: team?.id })
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
        members?.results
          ? <MembersList
            members={filteredMembers || members.results}
            gridItemSize={12}
            onAdd={handleAdd}
          />
          : loadingMembers
            ? <SkeletonList numItems={15} />
            : <></>
      }
    </>
  )
}

export default MemberSelector
