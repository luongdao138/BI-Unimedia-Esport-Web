import { useEffect } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import useLoginByEmail from './useLoginByEmail'
import { IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import Image from 'next/image'
import ESInput from '@components/Input'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import ESButton from '@components/Button'
import ESDividerWithMiddleText from '@components/DividerWithMiddleText'
import Link from 'next/link'
import ESToast from '@components/Toast'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required').min(8),
})

const LoginContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { loginByEmail, meta } = useLoginByEmail()
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<UserLoginParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validationSchema,
    onSubmit: (values, _helpers) => {
      loginByEmail(values)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      router.push('/welcome')
    }
  }, [meta.loaded])

  return (
    <>
      <Grid container>
        <Grid item style={{ paddingTop: 40 }}>
          <IconButton size="small">
            <ArrowBackIcon />
          </IconButton>
        </Grid>

        <Grid container direction="row" justify="center">
          <Grid item className={classes.itemContainer}>
            <Image height="148" width="116" src="/images/big_logo.png" alt="logo" />
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container direction="row" justify="center">
              <Grid item xs={12}>
                <ESInput
                  id="email"
                  placeholder="exelab@sample.co.jp"
                  labelPrimary="メールアドレス"
                  labelSecondary={
                    <Typography color="textPrimary" gutterBottom={false} variant="body2">
                      メールアドレスがわからない場合
                      <FilterNoneIcon fontSize="inherit" className={classes.iconMargin} />
                    </Typography>
                  }
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                />
              </Grid>

              <Grid item xs={12} className={classes.passwordContainer}>
                <ESInput
                  id="password"
                  labelPrimary="パスワード"
                  type="password"
                  labelSecondary={
                    <Typography color="textPrimary" gutterBottom={false} variant="body2">
                      パスワードをお忘れの場合
                    </Typography>
                  }
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                />
              </Grid>

              <Grid item xs={12} className={classes.buttonContainer}>
                <ESButton type="submit" variant="contained" color="primary" round gradient fullWidth>
                  ログイン
                </ESButton>
              </Grid>
            </Grid>
          </form>

          <Grid item xs={12} className={classes.linkContainer}>
            <Link href="/register">
              <a>はじめての方はこちら</a>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <ESDividerWithMiddleText text="または" />
          </Grid>

          <Grid item xs={12} className={classes.socialContainer}>
            hello
          </Grid>
        </Grid>
      </Grid>
      {!!meta.error && <ESToast open={!!meta.error} message={'ログインに失敗しました。'} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  itemContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  iconMargin: {
    marginLeft: theme.spacing(1 / 2),
  },
  passwordContainer: {
    paddingTop: theme.spacing(3),
  },
  buttonContainer: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    textAlign: 'center',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  linkContainer: {
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  socialContainer: {
    paddingTop: theme.spacing(8),
  },
}))

export default LoginContainer
