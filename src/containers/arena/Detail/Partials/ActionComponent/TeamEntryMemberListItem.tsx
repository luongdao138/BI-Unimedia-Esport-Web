import { Box, makeStyles, Typography } from '@material-ui/core'
import ESLabel from '@components/Label'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import ESSimpleSelectInput from '@components/SimpleSelectInput'
import { TeamMemberSelectItem, MemberSelection } from '@store/arena/actions/types'
import { FormikProps } from 'formik'
import { TeamJoinBase } from '@services/arena.service'
import _ from 'lodash'
import { useFocusState } from '@utils/hooks/input-focus-context'
import CharacterLimited from '@components/CharacterLimited'

interface TeamEntryMemberListProps {
  isLeader?: boolean
  isEdit?: boolean
  index: number
  suggestedTeamMembers: TeamMemberSelectItem[]
  selectedItem: TeamMemberSelectItem | null
  onSearchInput: (keyword: string, index: number) => void
  onItemSelected: (selectedItem: MemberSelection) => void
  loading: boolean
  formik: FormikProps<TeamJoinBase>
}

const TeamEntryMemberListItem: React.FC<TeamEntryMemberListProps> = ({
  index,
  selectedItem,
  suggestedTeamMembers,
  onSearchInput,
  onItemSelected,
  loading,
  isLeader,
  formik,
  isEdit,
}) => {
  const classes = useStyles()
  const nickname = formik.values.members[index - 1].name
  const focusEvent = useFocusState()

  const getNicknameError = (): string => {
    const isTouched = _.get(formik, `touched.members[${index - 1}].name`, false)
    const hasValue = _.get(formik, `values.members[${index - 1}].name`, false)

    if (!isTouched && !hasValue) return undefined
    return _.get(formik, `errors.members[${index - 1}].name`) as string
  }

  if (isLeader === true) {
    return (
      <>
        <Box my={2}>
          <ESLabel label={`メンバー${index}（あなた）`} size="small" bold />
          <Box mt={1}>
            <Typography className={classes.nameDisabled}>{selectedItem.nickname}</Typography>
          </Box>
        </Box>
        <Box my={2}>
          <ESLabel label={`メンバー${index}：エントリーネーム`} size="small" />
          <Box mt={1}>
            <ESInput
              id="members.0.name"
              fullWidth
              value={nickname}
              onChange={formik.handleChange}
              helperText={getNicknameError()}
              onBlur={(e) => {
                formik.handleBlur(e)
                focusEvent.onBlur()
              }}
              onFocus={focusEvent.onFocus}
              endAdornment={<CharacterLimited value={nickname} limit={40} />}
            />
          </Box>
        </Box>
      </>
    )
  }
  return (
    <>
      <Box mt={4} mb={2}>
        {isEdit ? (
          <Box my={2}>
            <ESLabel label={`メンバー${index}`} size="small" bold />
            <Box mt={1}>
              <Typography className={classes.nameDisabled}>{selectedItem.nickname}</Typography>
            </Box>
          </Box>
        ) : (
          <Box mt={1}>
            <ESSimpleSelectInput
              label={`メンバー${index}`}
              index={index}
              selectedItem={selectedItem}
              items={suggestedTeamMembers}
              loading={loading}
              placeholder="ニックネームを入力してください"
              onSearchInput={(keyword) => onSearchInput(keyword, index)}
              onItemSelected={onItemSelected}
              onScrollEnd={() => null}
              {...focusEvent}
            />
          </Box>
        )}
      </Box>
      <Box my={2}>
        <ESLabel label={`メンバー${index}：エントリーネーム`} size="small" />

        <Box mt={1}>
          {selectedItem ? (
            <ESInput
              id={`members.${index - 1}.name`}
              fullWidth
              value={nickname}
              onChange={formik.handleChange}
              helperText={getNicknameError()}
              onBlur={(e) => {
                formik.handleBlur(e)
                focusEvent.onBlur()
              }}
              onFocus={focusEvent.onFocus}
              endAdornment={<CharacterLimited value={nickname} limit={40} />}
            />
          ) : (
            <Typography className={classes.nameDisabled}>ユーザーを指定するとエントリーネームが入力できます</Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  nameDisabled: {
    color: Colors.white_opacity['30'],
  },
}))

export default TeamEntryMemberListItem
