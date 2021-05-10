import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, ButtonProps, SvgIcon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'
import { LoginSocialParams } from '@services/auth.service'

import { genRanHex } from '@utils/helpers/CommonHelper'

const useStyles = makeStyles((theme) => ({
  contained: {
    minWidth: 280,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: '#00B900',
    height: 50,
    boxShadow: 'none',
    color: Colors.white,
    fontWeight: 'bold',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: 'rgba(255,255,255,.3)',
    '&:hover': {
      boxShadow: 'none',
      background: '#01a201',
    },
  },
  leftIcon: {
    position: 'absolute',
    left: theme.spacing(2.5),
  },
  title: {
    justifyContent: 'left',
    marginLeft: theme.spacing(5),
    textTransform: 'capitalize',
  },
  disabled: {
    backgroundColor: '#00B900 !important',
    color: '#FFF !important',
  },
  svgRoot: {
    width: '1.3em',
    height: '1.1em',
  },
}))

const ESButtonLine: React.FC<ButtonProps> = ({ classes: _classes, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...props } = rest

  return (
    <Button
      classes={{
        contained: classes.contained,
        startIcon: classes.leftIcon,
        label: classes.title,
        disabled: classes.disabled,
      }}
      color="primary"
      {...props}
      startIcon={
        <SvgIcon classes={{ root: classes.svgRoot }}>
          <g id="TYPE_A" data-name="TYPE A" transform="translate(0)">
            <g id="Group_7252" data-name="Group 7252">
              <path
                id="Path_16886"
                data-name="Path 16886"
                d="M403.163,267.5c0-5.84-5.855-10.592-13.052-10.592s-13.052,4.752-13.052,10.592c0,5.236,4.643,9.621,10.915,10.45.425.091,1,.28,1.15.643a2.684,2.684,0,0,1,.042,1.18s-.153.921-.186,1.117c-.057.33-.262,1.291,1.131.7s7.516-4.426,10.255-7.578h0a9.423,9.423,0,0,0,2.8-6.517"
                transform="translate(-377.059 -256.905)"
                fill="#fff"
              />
              <g id="Group_7251" data-name="Group 7251" transform="translate(4.282 7.769)">
                <path
                  id="Path_16887"
                  data-name="Path 16887"
                  d="M409.127,282.914h-.916a.254.254,0,0,0-.254.254v5.687a.254.254,0,0,0,.254.254h.916a.254.254,0,0,0,.254-.254v-5.687a.254.254,0,0,0-.254-.254"
                  transform="translate(-403.009 -282.914)"
                  fill="#00b900"
                />
                <path
                  id="Path_16888"
                  data-name="Path 16888"
                  d="M420.86,282.914h-.916a.254.254,0,0,0-.254.254v3.379l-2.606-3.519a.281.281,0,0,0-.02-.026h0l-.015-.016,0,0-.013-.011-.007-.005-.013-.009-.008,0-.013-.007-.008,0-.015-.006-.008,0-.015,0-.009,0-.015,0h-.962a.254.254,0,0,0-.254.254v5.687a.254.254,0,0,0,.254.254h.916a.254.254,0,0,0,.254-.254v-3.378L419.737,289a.256.256,0,0,0,.065.063l0,0,.016.01.007,0,.012.006.013.005.007,0,.017.006h0a.26.26,0,0,0,.065.009h.916a.254.254,0,0,0,.254-.254v-5.687a.254.254,0,0,0-.254-.254"
                  transform="translate(-408.441 -282.914)"
                  fill="#00b900"
                />
                <path
                  id="Path_16889"
                  data-name="Path 16889"
                  d="M395.3,287.684h-2.488v-4.517a.254.254,0,0,0-.254-.254h-.916a.254.254,0,0,0-.254.254v5.686h0a.252.252,0,0,0,.071.176l0,0,0,0a.252.252,0,0,0,.176.071H395.3a.254.254,0,0,0,.254-.254v-.916a.254.254,0,0,0-.254-.254"
                  transform="translate(-391.392 -282.913)"
                  fill="#00b900"
                />
                <path
                  id="Path_16890"
                  data-name="Path 16890"
                  d="M440.709,284.338a.254.254,0,0,0,.254-.254v-.916a.254.254,0,0,0-.254-.254h-3.658a.253.253,0,0,0-.177.072l0,0,0,0a.252.252,0,0,0-.07.175h0v5.686h0a.252.252,0,0,0,.071.176l0,0,0,0a.252.252,0,0,0,.176.071h3.658a.254.254,0,0,0,.254-.254v-.916a.254.254,0,0,0-.254-.254h-2.488v-.961h2.488a.254.254,0,0,0,.254-.254v-.915a.254.254,0,0,0-.254-.255h-2.488v-.961Z"
                  transform="translate(-423.233 -282.914)"
                  fill="#00b900"
                />
              </g>
            </g>
          </g>
        </SvgIcon>
      }
    >
      {t('common:button.line')}
    </Button>
  )
}

ESButtonLine.defaultProps = {
  variant: 'contained',
}
type LineButtonProps = { onSuccess?: (param: LoginSocialParams) => void } & ButtonProps

const LineButton: React.FC<LineButtonProps> = ({ onSuccess, ...rest }) => {
  const [authCode, setAuthCode] = useState<string | undefined>()
  const handleAuthorize = async () => {
    const popup = openPopup()
    popup.location.replace(
      `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${
        process.env.NEXT_PUBLIC_LINE_CLIENT_ID
      }&scope=profile%20openid%20email&state=${genRanHex(6)}&redirect_uri=${process.env.NEXT_PUBLIC_LINE_CALLBACK}`
    )
    polling(popup)
  }

  useEffect(() => {
    const getAccessToken = async (code) => {
      const { data } = await axios.post<{ access_token }>('/api/line/token', { code })
      return data
    }
    if (authCode) {
      getAccessToken(authCode).then((data) => {
        !!onSuccess && onSuccess({ social_channel: 'line', access_token: data.access_token })
      })
    }
  }, [authCode])

  const openPopup = () => {
    const w = 600
    const h = 600
    const left = screen.width / 2 - w / 2
    const top = screen.height / 2 - h / 2

    return window.open(
      '',
      '',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        w +
        ', height=' +
        h +
        ', top=' +
        top +
        ', left=' +
        left
    )
  }

  const polling = (popup) => {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling)
        console.error(new Error('Popup has been closed by user'))
      }

      const closeDialog = () => {
        clearInterval(polling)
        popup.close()
      }
      try {
        if (!popup.location.hostname.includes('access.line.me')) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search)
            const code = query.get('code')
            if (code) {
              setAuthCode(code)
              closeDialog()
            }
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }, 500)
  }

  return <ESButtonLine onClick={handleAuthorize} {...rest} />
}
export default LineButton
