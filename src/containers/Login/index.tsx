import { useEffect } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import useLoginByEmail from './useLoginByEmail'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required').min(8),
})

const LoginContainer: React.FC = () => {
  const router = useRouter()
  const { loginByEmail, user, meta, resetMeta } = useLoginByEmail()
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<
    UserLoginParams
  >({
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
    <form onSubmit={handleSubmit}>
      <p>{user && JSON.stringify(user)}</p>
      <p>{meta && JSON.stringify(meta)}</p>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            helperText={touched.email && errors.email}
            error={touched.email && !!errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            type="password"
            placeholder="password"
            onChange={handleChange}
            value={values.password}
            helperText={touched.password && errors.password}
            error={touched.password && !!errors.password}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={resetMeta}
        >
          Clear metadata state
        </Button>
      </Box>
    </form>
  )
}

export default LoginContainer
