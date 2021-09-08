import _ from 'lodash'
import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import StickyActionModal from '@components/StickyActionModal'
import ESLoader from '@components/FullScreenLoader'
import ESButton from '@components/Button'
import { UserProfile } from '@services/user.service'
import useTeamDetail from './useTeamDetail'
import TeamMemberItemExpanded from '../TeamMemberItemExpanded'
import TeamEntryModal from './TeamEntryModal'
import { TeamMemberSelectItem } from '@store/arena/actions/types'
import useDocTitle from '@utils/hooks/useDocTitle'
import { ROLE } from '@constants/tournament.constants'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import LoginRequired from '@containers/LoginRequired'

interface EntryEditModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  previewMode?: boolean
  initialTeamId?: string
  myTeam: boolean
  open: boolean
  onClose?: () => void
  toDetail?: () => void
}

const TeamEntryEditModal: React.FC<EntryEditModalProps> = ({
  tournament,
  userProfile,
  previewMode,
  initialTeamId,
  myTeam,
  open,
  onClose,
  toDetail,
}) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { teamDetail, isPending, getTeamDetail } = useTeamDetail()
  const { isRecruiting } = useArenaHelper(tournament)
  const [editMode, setEditMode] = useState(false)
  const isPreview = previewMode === true
  const { resetTitle, changeTitle } = useDocTitle()

  useEffect(() => {
    if (open) {
      setEditMode(false)
      fetch()
      changeTitle(`${t('common:page_head.arena_entry_title')}｜${tournament?.attributes?.title || ''}`)
    }
  }, [open])

  useEffect(() => {
    return () => resetTitle()
  }, [])

  useEffect(() => {
    if (isPreview) fetch()
  }, [isPreview])

  const getTeamId = () => {
    const myInfos = _.get(tournament, 'attributes.my_info', [])
    if (!_.isArray(myInfos)) return null
    const info = myInfos.find((myInfo) => _.get(myInfo, 'role') === ROLE.INTERESTED || _.get(myInfo, 'role') === ROLE.PARTICIPANT)
    if (!info) return null
    const teamId = _.get(info, 'team_id', null)
    if (_.isNumber(teamId)) return teamId
    return null
  }

  const fetch = () => {
    let teamId = 0
    if (isPreview && _.isString(initialTeamId)) {
      teamId = parseInt(initialTeamId)
      getTeamDetail(teamId)
      return
    }
    teamId = getTeamId()
    if (_.isNumber(teamId)) {
      getTeamDetail(teamId)
    }
  }

  const onSubmit = () => {
    if (!editMode) {
      setEditMode(true)
    }
  }

  const teamData = () => {
    const team = {
      attributes: { team: { data: { attributes: {} } } },
    }
    const attrs = _.get(teamDetail, 'attributes', {})
    const leaderId = _.get(attrs, 'leader_id', -1)
    const members = _.clone(_.get(attrs, 'members', []))
    const leaderDetail = _.remove(members as any[], (member) => member.user_id === leaderId)
    if (leaderDetail.length > 0) members.unshift(leaderDetail[0])

    team.attributes.team.data.attributes = {
      name: _.get(attrs, 'name', ''),
      team_avatar: _.get(attrs, 'team_avatar'),
      members: members,
    }
    return team
  }

  const getEditInitialData = () => {
    const attrs = _.get(teamDetail, 'attributes', {})
    const leaderId = _.get(attrs, 'leader_id', -1)
    const members = _.clone(_.get(attrs, 'members', []))
    const leaderDetail = _.remove(members as any[], (member) => member.user_id === leaderId)
    if (leaderDetail.length > 0) members.unshift(leaderDetail[0])
    const teamId = getTeamId()

    return {
      team_id: `${teamId}`,
      team_name: _.get(attrs, 'name', '') as string,
      team_icon_url: _.get(attrs, 'team_avatar', '') as string,
      members: members.map((member) => ({
        id: `${member.user_id}`,
        nickname: member.nickname,
        userCode: member.user_code,
        avatar: member.image_url,
        name: member.name,
      })) as TeamMemberSelectItem[],
    }
  }

  const handleClose = () => {
    resetTitle()
    onClose()
  }

  return (
    <Box>
      <StickyActionModal
        open={(open || isPreview) && !editMode}
        returnText={t('common:arena.entry_information')}
        actionButtonText={editMode ? t('common:tournament.join_with_this') : t('common:tournament.update_entry_info')}
        actionButtonDisabled={false}
        onReturnClicked={handleClose}
        onActionButtonClicked={onSubmit}
        hideFooter={!myTeam || !isRecruiting}
      >
        <form onSubmit={onSubmit}>
          <BlackBox>
            <DetailInfo
              detail={tournament}
              bottomButton={
                <LoginRequired>
                  <ESButton
                    className={classes.bottomButton}
                    variant="outlined"
                    round
                    size="large"
                    onClick={toDetail ? toDetail : handleClose}
                  >
                    {t('common:tournament.tournament_detail')}
                  </ESButton>
                </LoginRequired>
              }
            />
          </BlackBox>
          {isPending ? null : (
            <Box width="100%" flexDirection="column" alignItems="center" pt={4.5}>
              <TeamMemberItemExpanded team={teamData()} handleClick={() => null} yellowTitle={myTeam === true} hideFollow />
            </Box>
          )}
        </form>
      </StickyActionModal>

      {editMode ? (
        <TeamEntryModal
          tournament={tournament}
          userProfile={userProfile}
          onClose={() => setEditMode(false)}
          open={editMode}
          isEdit
          initialData={getEditInitialData()}
          updateDone={() => fetch()}
        />
      ) : null}

      {isPending && <ESLoader open={isPending} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  bottomButton: {
    borderRadius: 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
}))

export default TeamEntryEditModal
