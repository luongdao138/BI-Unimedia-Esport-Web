import PlainLayout from '@layouts/PlainLayout'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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

const GmoResultFailPage: PageWithLayoutType = () => {
  const classes = useStyles({})
  return (
    <PlainLayout>
      <Container maxWidth="lg" disableGutters>
        <div className={classes.contaianer}>
          <Typography variant="subtitle1" className={classes.title}>
            チケットの購入ができませんでした
          </Typography>
          <div style={{ marginBottom: 40 }}>しばらくお時間を空けて、再度ご購入手続きをお願いいたします。</div>
          <div className={classes.spacingButton}>
            <Link href="/events">
              <Button variant="contained" color="primary" fullWidth>
                ホームへ
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PlainLayout>
  )
}

export default GmoResultFailPage
