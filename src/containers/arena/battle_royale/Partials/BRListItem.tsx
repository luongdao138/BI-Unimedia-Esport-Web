import { cloneElement, memo } from 'react'
import { Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

import { useTranslation } from 'react-i18next'

interface BRListItemProps {
  avatar: JSX.Element
  text?: string
  textSecondary?: string
  onChange?: (score: string) => void
  undefeated?: boolean
  setUndefeated?: () => void
  onClick?: () => void
  isModerator?: boolean
  clickable?: boolean
  children?: JSX.Element
  highlight?: boolean
}

const BRListItem: React.FC<BRListItemProps> = (props: BRListItemProps) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const avatarClone = cloneElement(props.avatar, {
    className: classes.pointer,
  })
  return (
    <div className={`${classes.root}  ${props.highlight ? 'highlight' : ''}`} onClick={props.onClick && props.onClick}>
      <div className={classes.contentWrapper}>
        {avatarClone}
        <div className={classes.textContent}>
          <Typography className={`${classes.text} ${props.highlight ? 'highlight' : ''}`} noWrap>
            {props.text || t('common:common.not_sure')}
          </Typography>
          {props.textSecondary && (
            <Typography className={classes.textSecondary} noWrap>
              {`@${props.textSecondary}`}
            </Typography>
          )}
        </div>
        {props.isModerator && (
          <div className={classes.undefeatedButton} onClick={props.setUndefeated}>
            <ButtonPrimary round size="small" disabled={!props.undefeated}>
              {t('common:arena.undefeated')}
            </ButtonPrimary>
          </div>
        )}
        {props.children ? <div className={classes.rightContent}>{props.children}</div> : <></>}
      </div>
    </div>
  )
}

BRListItem.defaultProps = {
  highlight: false,
  isModerator: false,
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 64,
    backgroundColor: theme.palette.common.black,
    borderRadius: theme.spacing(0.5),
    border: '1px solid #4c4c4c',
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '&.highlight': {
      border: `1px solid ${Colors.yellow}`,
    },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#111',
      transition: 'all 0.3s ease',
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(2.5),
    position: 'relative',
    color: Colors.white,
    paddingRight: 200,
  },
  rightContent: {
    width: 200,
    height: 50,
    position: 'absolute',
    right: 0,
    borderLeft: '1px solid #4c4c4c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: theme.spacing(1.5),
    paddingLeft: theme.spacing(1.5),
  },
  textContent: {
    paddingLeft: theme.spacing(1),
    flex: 'auto',
    overflow: 'hidden',
  },
  text: {
    fontSize: 12,
    '&.highlight': {
      color: Colors.yellow,
    },
  },
  textSecondary: {
    fontSize: 10,
  },
  pointer: {
    cursor: 'pointer',
  },
  undefeatedButton: {
    marginRight: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    contentWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: theme.spacing(0.5),
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingRight: 175,
    },
    textContent: {
      width: '100%',
      padding: '0 5px',
    },
    rightContent: {
      width: 170,
      paddingRight: theme.spacing(0.5),
      paddingLeft: theme.spacing(0.5),
    },
    root: {
      minHeight: 56,
    },
  },
}))

export default memo(BRListItem)
