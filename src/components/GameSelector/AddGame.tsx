import { useFormik } from 'formik'
import { Box, makeStyles } from '@material-ui/core'
import { CreateGameTitleParams, GameGenre } from '@services/game.service'
import Input from '@components/Input'
import Select from '@components/Select'
import Button from '@components/Button'
import Toast from '@components/Toast'
import * as Yup from 'yup'

import useAddGame from './useAddGame'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  genres: GameGenre[]
}

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
}))
const validationSchema = Yup.object().shape({
  display_name: Yup.string().required(),
  game_genre_id: Yup.number().test('game_genre_id', '', (value) => {
    return value !== -1
  }),
})

const AddGame: React.FC<Props> = ({ genres }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { createGame, meta } = useAddGame()
  const formik = useFormik<CreateGameTitleParams>({
    initialValues: {
      display_name: '',
      game_genre_id: -1,
    },
    validationSchema,
    onSubmit(values) {
      createGame(values)
    },
  })
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (meta.loaded) {
      setOpen(true)
      formik.resetForm()
    }
  }, [meta.loaded])

  return (
    <Box pt={4} px={5}>
      <Toast open={open} message={t('profile.favorite_game.add_success')} onClose={() => setOpen(false)} />
      <form onSubmit={formik.handleSubmit}>
        <Select
          id="game_genre_id"
          name="game_genre_id"
          value={formik.values.game_genre_id}
          onChange={formik.handleChange}
          fullWidth
          required
          size="small"
          error={!!formik.errors.game_genre_id}
          label={t('profile.favorite_game.genre_label')}
        >
          <option disabled value={-1}>
            {t('please_select')}
          </option>
          {genres.map((g, idx) => (
            <option key={idx} value={g.attributes.id}>
              {g.attributes.name}
            </option>
          ))}
        </Select>
        <Box pb={4} />
        <Input
          id="display_name"
          name="display_name"
          value={formik.values.display_name}
          onChange={formik.handleChange}
          fullWidth
          required
          size="small"
          error={!!formik.errors.display_name}
          labelPrimary={t('profile.favorite_game.title_label')}
        />
        <Box pb={4} />
        <Box textAlign="center">
          <Button variant="outlined" className={classes.button} type="submit" disabled={meta.pending}>
            {t('profile.favorite_game.add_button')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddGame
