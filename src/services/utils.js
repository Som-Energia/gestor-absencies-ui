import moment from 'moment'

export const HOLIDAYS_ABSENCE_TYPE = 2

export const countAbsencesType = (data, type = false) => {
  let count = 0
  data.forEach((absence) => {
    if (type === false || absence?.absence_type === type) {
      count += moment(absence.end_time).diff(moment(absence.start_time), 'days') + 1
    }
  })
  return count
}

export const absenceTypeName = (types, typeId) => {
  return Array.isArray(types) && types.filter(({ id }) => id === typeId)[0]?.name
}

export const absenceTypeEmoji = (typeId) => {
  // 🏖 🧗‍♀️ 🎉 👩🏽‍🎓 🤧 😷 🤒 ⚰️ 💀 ⚫️ 📦
  switch (typeId) {
    case 2:
      return '🏖'
    default:
      return '🎉'
  }
}
