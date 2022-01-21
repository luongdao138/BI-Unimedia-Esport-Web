import i18n from '@locales/i18n'
import { ButtonBase, makeStyles } from '@material-ui/core'
import React from 'react'

export type IButtonSelectMember = {
  text?: string
  memberId?: string | number
  onClick?: (memberId: string | number) => void
}

const ButtonSelectMember: React.FC<IButtonSelectMember> = ({
  text = i18n.t('common:live_stream_screen.text_select_member'),
  memberId,
  onClick,
}) => {
  const classes = useStyles()

  return (
    <ButtonBase
      onClick={() => {
        onClick && onClick(memberId)
      }}
      className={`${classes.btnChoiceMember}`}
    >
      {text}
    </ButtonBase>
  )
}

const useStyles = makeStyles((theme) => ({
  btnChoiceMember: {
    width: '70px',
    height: '28px',
    borderRadius: '3px',
    background: '#767676',
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: 600,
  },
  [theme.breakpoints.down(769)]: {
    btnChoiceMember: {
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: 'bold',
      width: 57,
      height: 22,
    },
  },
}))

export default ButtonSelectMember
