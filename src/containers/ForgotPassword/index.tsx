import { useState } from 'react'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import useForgotPassword from './useForgotPassword'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .test('email-validation', 'Invalid email', (value) => {
      return CommonHelper.validateEmail(value)
    })
    .required('Required'),
})

const ForgotPasswordContainer: React.FC = () => {
  const { user, meta, metaConfirm, forgotPassword, forgotConfirm, resetPassword } = useForgotPassword()
  const [confirmationCode, setConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<services.ForgotPasswordParams>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.email) {
        forgotPassword(values)
      }
    },
  })

  const handleForgotConfirm = () => {
    forgotConfirm({ ...values, confirmation_code: confirmationCode })
  }

  const handleResetPassword = () => {
    resetPassword({
      ...values,
      password: password,
      password_confirm: passwordConfirmation,
      confirmation_code: confirmationCode,
    })
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

          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleForgotConfirm} style={{ marginBottom: 20 }}>
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

          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleResetPassword}>
            Confirm forgot
          </Button>
        </>
      )}
    </>
  )
}

export default ForgotPasswordContainer
