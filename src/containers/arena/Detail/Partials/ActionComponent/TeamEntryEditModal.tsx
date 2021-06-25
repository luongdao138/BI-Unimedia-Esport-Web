import _ from 'lodash'
import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
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

interface EntryEditModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  isEdit?: boolean
}

const TeamEntryEditModal: React.FC<EntryEditModalProps> = ({ tournament, userProfile }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { teamDetail, isPending, getTeamDetail } = useTeamDetail()
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (open) fetch()
  }, [open])

  const handleReturn = () => setOpen(false)
  const fetch = () => {
    const teamId = _.get(tournament, 'attributes.my_info[0].team_id')
    if (_.isNumber(teamId)) {
      getTeamDetail(teamId)
    }
  }

  const onOpen = () => {
    setOpen(true)
    setEditMode(false)
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
    const teamId = _.get(tournament, 'attributes.my_info[0].team_id')

    return {
      team_id: teamId,
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

  return (
    <Box>
      <ButtonPrimary round fullWidth onClick={onOpen}>
        {t('common:tournament.check_entry')}
      </ButtonPrimary>

      <StickyActionModal
        open={open}
        returnText={t('common:tournament.join')}
        actionButtonText={editMode ? t('common:tournament.join_with_this') : t('common:tournament.update_entry_nick')}
        actionButtonDisabled={false}
        onReturnClicked={handleReturn}
        onActionButtonClicked={onSubmit}
      >
        <form onSubmit={onSubmit}>
          <BlackBox>
            <DetailInfo
              detail={tournament}
              bottomButton={
                <ESButton className={classes.bottomButton} variant="outlined" round size="large" onClick={() => setOpen(false)}>
                  {t('common:tournament.tournament_detail')}
                </ESButton>
              }
            />
          </BlackBox>
          <Box width="100%" flexDirection="column" alignItems="center" pt={4.5}>
            <TeamMemberItemExpanded team={teamData()} handleClick={() => null} yellowTitle hideFollow />
          </Box>
        </form>
        {editMode ? (
          <TeamEntryModal
            tournament={tournament}
            userProfile={userProfile}
            handleClose={() => setEditMode(false)}
            isEdit
            initialData={getEditInitialData()}
            updateDone={() => fetch()}
          />
        ) : null}
      </StickyActionModal>

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
