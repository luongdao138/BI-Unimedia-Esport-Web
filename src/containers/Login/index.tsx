import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import authStore from '@store/auth'
import metadataStore from '@store/metadata'
import { createMetaSelector } from '@store/metadata/selectors'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

const { actions, selectors } = authStore
const metaSelector = createMetaSelector(actions.loginByEmail)

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required').min(8),
})

const LoginContainer: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(metaSelector)
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<
    services.UserLoginParams
  >({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validationSchema,
    onSubmit: (values, _helpers) => {
      if (values.email && values.password) {
        dispatch(
          actions.loginByEmail({
            email: values.email,
            password: values.password,
          })
        )
      }
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      router.push('/welcome')
    }
  }, [meta.loaded])

  const clearMeta = () => {
    dispatch(metadataStore.actions.clearMetaData())
  }

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
          onClick={clearMeta}
        >
          Clear metadata state
        </Button>
      </Box>
    </form>
  )
}

export default LoginContainer
