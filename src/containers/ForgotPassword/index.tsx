import { useState } from 'react'
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
import { CommonHelper } from '@utils/helpers/CommonHelper'

const { actions, selectors } = authStore
const metaSelector = createMetaSelector(actions.forgotPassword)
const metaConfirmSelector = createMetaSelector(actions.forgotConfirm)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .test('email-validation', 'Invalid email', (value) => {
      return CommonHelper.validateEmail(value)
    })
    .required('Required'),
})

const ForgotPasswordContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const [confirmationCode, setConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const user = useAppSelector(selectors.getAuth)
  const meta = useAppSelector(metaSelector)
  const metaConfirm = useAppSelector(metaConfirmSelector)
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<
    services.ForgotPasswordParams
  >({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.email) {
        dispatch(
          actions.forgotPassword({
            email: values.email,
          })
        )
      }
    },
  })

  const clearMeta = () => {
    dispatch(metadataStore.actions.clearMetaData())
  }

  const handleForgotConfirm = () => {
    dispatch(
      actions.forgotConfirm({
        email: values.email,
        confirmation_code: confirmationCode,
      })
    )
  }

  const handleResetPassword = () => {
    dispatch(
      actions.resetPassword({
        email: values.email,
        password: password,
        password_confirm: passwordConfirmation,
        confirmation_code: confirmationCode,
      })
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ paddingBottom: 20 }}>
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Forgot password
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

      {meta.loaded && (
        <>
          <TextField
            id="confirm"
            label="confirm"
            placeholder="confirm"
            onChange={(e) => setConfirm(e.target.value)}
            value={confirmationCode}
            fullWidth
            style={{ paddingBottom: 20 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleForgotConfirm}
            style={{ marginBottom: 20 }}
          >
            Confirm forgot
          </Button>
        </>
      )}

      {metaConfirm.loaded && (
        <>
          <TextField
            id="password"
            label="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth
            style={{ paddingBottom: 20 }}
          />

          <TextField
            id="password-confirm"
            label="password confirm"
            placeholder="password confirm"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            fullWidth
            style={{ paddingBottom: 20 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleResetPassword}
          >
            Confirm forgot
          </Button>
        </>
      )}
    </>
  )
}

export default ForgotPasswordContainer
