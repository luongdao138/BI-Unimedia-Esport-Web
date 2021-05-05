import {
  FC,
  ReactNode,
  createRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { Typography } from '@material-ui/core'

const BACKSPACE_KEY = 8
const LEFT_ARROW_KEY = 37
const RIGHT_ARROW_KEY = 39
const UP_ARROW_KEY = 38
const DOWN_ARROW_KEY = 40
const E_KEY = 69
const DASH = 189
const DOT = 190
const MOBILE_DOT = 229

interface Props {
  numberOfPins?: number
  onChange: (value: string) => void
  error?: boolean
  value?: string
}

const PinInput: FC<Props> = ({
  numberOfPins = 4,
  onChange,
  error = false,
  value,
}) => {
  const values = value.split('')
  const pins: ReactNode[] = []
  const classes = useStyles({ error: error })
  const inputRefs = []

  // trigger input onchange
  const handleOnChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (numberOfPins - 1 > index) {
      inputRefs[index + 1].current.focus()
    }

    if (inputRefs[index].current.value !== null) {
      inputRefs[index].current.value = e.target.value.substr(
        e.target.value.length - 1
      )
    }

    setValues()
  }

  // trigger input special keys which is backspace, arrows etc
  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case BACKSPACE_KEY:
        e.preventDefault()
        if (hasCurrentElement(index)) {
          if (
            inputRefs[index].current.value === '' &&
            hasCurrentElement(index - 1)
          ) {
            inputRefs[index - 1].current.focus()
            inputRefs[index - 1].current.value = ''
          }
          inputRefs[index].current.value = ''
        }
        break
      case LEFT_ARROW_KEY:
        e.preventDefault()
        hasCurrentElement(index - 1) && inputRefs[index - 1].current.focus()
        break
      case RIGHT_ARROW_KEY:
        e.preventDefault()
        hasCurrentElement(index + 1) && inputRefs[index + 1].current.focus()
        break
      case UP_ARROW_KEY:
      case DOWN_ARROW_KEY:
      case E_KEY:
      case DOT:
      case DASH:
        e.preventDefault()
        break
      case MOBILE_DOT:
        return false
      default:
        break
    }
  }

  const hasCurrentElement = (index: number) => inputRefs[index]

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedValue = e.clipboardData ? e.clipboardData.getData('Text') : ''
    const length = pastedValue.length

    if (length > 0 && !isNaN(+pastedValue) && !pastedValue.includes('e')) {
      const realLength = length > numberOfPins ? numberOfPins : length
      for (let index = 0; index < realLength; index++) {
        inputRefs[index].current.value = pastedValue[index]
      }
      if (hasCurrentElement(realLength - 1)) {
        realLength === numberOfPins
          ? inputRefs[realLength - 1].current.focus()
          : inputRefs[realLength].current.focus()
      }
    }
  }

  const setValues = () => {
    const values = []

    for (const input of inputRefs) {
      values.push(input.current.value)
    }

    onChange(values.join(''))
  }

  for (let index = 0; index < numberOfPins; index++) {
    const newRef = createRef<any>()
    inputRefs.push(newRef)
    pins.push(
      <div key={index} className={classes.pinDefaultStyle}>
        <input
          ref={newRef}
          className={classes.pinText}
          id={index.toString()}
          type="number"
          autoFocus={values.length === index}
          min={0}
          max={9}
          placeholder="0"
          pattern="\d*"
          autoComplete="off"
          value={values[index] || ''}
          onChange={(e) => handleOnChange(index, e)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onPaste={(e) => onPaste(e)}
        />
      </div>
    )
  }

  return (
    <>
      <div className={classes.containerDefaultStyle}>{pins}</div>
      {error && (
        <Typography color="secondary">入力されたコードは無効です</Typography>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  containerDefaultStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pinDefaultStyle: {
    width: 50,
    height: 60,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  pinText: (props: { error?: boolean }) => ({
    borderRadius: 5,
    border: `1px solid ${props.error ? Colors.secondary : Colors.grey[1000]}`,
    outline: 'none',
    boxSizing: 'border-box',
    color: Colors.white,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    height: '100%',
    width: '100%',
    backgroundColor: props.error ? 'rgba(247, 247, 53, 0.1)' : Colors.black,
    '&[type=number]': {
      '-moz-appearance': 'textfield',
      '-webkit-user-select': 'none',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&:focus': {
      outline: 'none',
      border: `1px solid ${Colors.white}`,
    },
  }),
}))

export default PinInput
