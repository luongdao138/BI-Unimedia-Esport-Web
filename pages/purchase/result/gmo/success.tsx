import MainLayout from '@layouts/PlainLayout'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import PageWithLayoutType from '@constants/page'

const useStyles = makeStyles((theme) => ({
  contaianer: {
    padding: 42,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: 20,
  },
  spacingButton: {
    marginBottom: 20,
    padding: '0px 20px',
  },
}))

const GmoResultSuccessPage: PageWithLayoutType = () => {
  const classes = useStyles({})
  return (
    <Container maxWidth="lg" disableGutters>
      <div className={classes.contaianer}>
        <Typography variant="subtitle1" className={classes.title}>
          チケットの購入を確認しました
        </Typography>
        <div style={{ marginBottom: 40 }}>注文情報は設定画面内の【購入履歴】よりご確認いただくことが可能です。</div>
        <div className={classes.spacingButton}>
          <Link href="/events">
            <Button variant="contained" color="primary" fullWidth>
              ホームへ
            </Button>
          </Link>
        </div>
        <div className={classes.spacingButton}>
          <Link href="/settings/payment_histories">
            <Button variant="contained" color="primary" fullWidth>
              購入履歴へ
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  )
}

GmoResultSuccessPage.Layout = MainLayout
export default GmoResultSuccessPage
