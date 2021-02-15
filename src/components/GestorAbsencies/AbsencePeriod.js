import React from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import { absenceTypeName, absenceTypeEmoji } from 'services/utils'

import EditMenu from 'components/EditMenu'

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  itemTime: {
    width: '50px',
    height: '60px',
    background: '#f2f4f5',
    textAlign: 'center',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  itemMonth: {
    fontSize: '12px',
    height: '20px',
    lineHeight: '20px',
    background: theme.palette.primary.main,
    color: '#fff',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  itemDay: {
    fontSize: '22px',
    height: '28px',
    lineHeight: '34px',
    color: '#1c242b',
    fontWeight: '400'
  },
  itemDuration: {
    fontSize: '10px',
    lineHeight: '10px',
    textTransform: 'uppercase'
  },
  timeSeparator: {
    margin: '0 8px',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  itemContent: {
    flex: '1 1 auto',
    minWidth: 0,
    marginLeft: '28px',
    '& h5': {
      flex: '1 1 auto',
      minWidth: 0,
      fontWeight: '400',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '1rem',
      lineHeight: '25px',
      margin: 0,
      textTransform: 'uppercase',
      '& span': {
        fontSize: '1.5rem',
        marginRight: '4px'
      }
    },
    '& div': {
      color: '#4d4d4d',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '0.9rem',
      lineHeight: '1.5rem',
      fontWeight: '300'
    }
  }
}))

const AbsencePeriod = (props) => {
  const classes = useStyles()
  const { absence, types, onEdit, onDelete } = props
  const { start_time, end_time, absence_type } = absence

  const duration = moment(end_time).diff(moment(start_time), 'd') + 1
  const absenceType = absenceTypeName(types, absence_type)

  const handleEdit = () => {
    onEdit &&
      onEdit(absence)
  }

  const handleDelete = () => {
    onDelete &&
      onDelete(absence)
  }

  return (
    <div className={classes.item}>
      <div className={classes.itemTime}>
        <div className={classes.itemMonth}>
          { moment(start_time).format('MMM') }
        </div>
        <div className={classes.itemDay}>
          { moment(start_time).format('DD') }
        </div>
        <div className={classes.itemDuration}>
          { moment(start_time).format('H') === '13' ? 'Tarda' : '' }
        </div>
      </div>
      {
        moment(start_time).isSame(end_time, 'day')
          ? ''
          : <>
            <ArrowForwardIcon className={classes.timeSeparator} />
            <div className={classes.itemTime}>
              <div className={classes.itemMonth}>
                { moment(end_time).format('MMM') }
              </div>
              <div className={classes.itemDay}>
                { moment(end_time).format('DD') }
              </div>
              <div className={classes.itemDuration}>
                { moment(end_time).format('H') === '13' ? 'Matí' : '' }
              </div>
            </div>
          </>
      }
      <div className={classes.itemContent}>
        {
          absenceType &&
            <h5>
              <span>{ `${absenceTypeEmoji(absence_type)}` }</span>
              { ` ${absenceType}` }
            </h5>
        }
        {
          duration !== 1 &&
          <div>
            { duration }&nbsp;{ duration > 1 ? 'dies' : 'dia' }
          </div>
        }
      </div>
      <EditMenu
        onEdit={ () => handleEdit(absence) }
        onDelete={ () => handleDelete(absence) }
      />
    </div>
  )
}

export default AbsencePeriod
