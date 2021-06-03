import { Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import ESInput from '@components/Input'
import { useState } from 'react'

interface BRListItemProps {
  index: string
  avatar: string | null
  label: string
  score?: string | null
  editable?: boolean
  onChange?: (score: string) => void
}

const BRListItem: React.FC<BRListItemProps> = (props: BRListItemProps) => {
  const classes = useStyles()
  const [editable, setEditable] = useState(props.editable)
  const handleChange = (e) => {
    props.onChange(e.target.value.replace(/[^0-9.]/g, ''))
  }
  return (
    <div className={classes.match}>
      <div className={classes.matchContent}>
        <div className={classes.matchHeader}>{props.index}</div>
        <div className={classes.participantWrapper}>
          <div className={classes.participant}>
            <Avatar className={classes.avatar} alt={props.label} src={props.avatar} />
            <Typography className={classes.label} noWrap={true}>
              {props.label}
            </Typography>
          </div>
          <div className={classes.scoreWrap} onClick={() => setEditable(true)}>
            <ESInput
              onBlur={() => {
                setEditable(false)
              }}
              disabled={!editable}
              placeholder="0000"
              onChange={handleChange}
              value={props.score}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  match: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0px 40px',
    padding: '8px 0',
    flexGrow: 1,
    position: 'relative',
  },
  matchContent: {
    position: 'relative',
    backgroundColor: Colors.black_opacity['30'],
    borderRadius: theme.spacing(0.5),
    border: '1px solid #4c4c4c',
  },
  matchHeader: {
    paddingLeft: theme.spacing(1.5),
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 18,
    backgroundColor: Colors.black,
    width: '100%',
    overflow: 'hidden',
    lineHeight: 1.7,
    color: Colors.white_opacity[70],
  },
  participantWrapper: {
    display: 'flex',
    height: 42,
    paddingLeft: 12,
    paddingRight: 32,
    paddingTop: 8,
    paddingBottom: 8,
    position: 'relative',
    borderTop: '1px solid #4c4c4c',

    color: '#FFFFFF',
  },
  participant: {
    display: 'flex',
    alignItems: 'center',
  },
  scoreWrap: {
    position: 'absolute',
    right: 8,
    top: '50%',
    width: 55,
    transform: 'translate(0,-50%)',
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
    },
    '& .PrivateNotchedOutline-root-23': {
      borderWidth: '0',
    },
    '& .MuiInputBase-input': {
      fontSize: 20,
      textAlign: 'right',
      color: Colors.white_opacity[70],
    },
    '& .MuiOutlinedInput-input': {
      padding: '19.5px 4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 4.5,
      paddingBottom: 4.5,
    },
    '& .Mui-disabled': {
      backgroundColor: Colors.black,
    },
  },
  avatar: {
    height: 26,
    width: 26,
    marginRight: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'start',
  },
}))

BRListItem.defaultProps = { editable: false }

export default BRListItem
