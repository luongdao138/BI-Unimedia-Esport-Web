import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import { Theme, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import Linkify from 'react-linkify'

const TermsPage: PageWithLayoutType = () => {
  const { t } = useTranslation('terms')
  const classes = useStyles()

  return (
    <div>
      <HeaderWithButton title={t('title')} />
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.link}>
            {decoratedText}
          </a>
        )}
      >
        <Typography className={classes.wrap} paragraph={true}>
          {t('text')}
        </Typography>
      </Linkify>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    whiteSpace: 'pre-line',
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    color: Colors.white_opacity[70],
    background: Colors.black_opacity[70],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  link: {
    color: Colors.secondary,
    textDecoration: 'none',
  },
}))

TermsPage.Layout = MainLayout

export default TermsPage
