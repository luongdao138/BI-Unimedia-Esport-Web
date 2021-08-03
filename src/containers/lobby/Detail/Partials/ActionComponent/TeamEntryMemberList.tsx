import { LobbyDetail, TeamJoinBase } from '@services/lobby.service'
import { UserProfile } from '@services/user.service'
import TeamEntryMemberListItem from './TeamEntryMemberListItem'
import useSuggestedTeamMembers from './useSuggestedTeamMembers'
import { ReactNode, useEffect } from 'react'
import { MemberSelection, TeamMemberSelectItem } from '@store/arena/actions/types'
import _ from 'lodash'
import { FormikProps } from 'formik'

interface TeamEntryMemberListProps {
  tournament: LobbyDetail
  userProfile: UserProfile
  formik: FormikProps<TeamJoinBase>
  setSelectedMember: (memberSelection: MemberSelection) => void
  removeSelectedMember: (memberSelection: MemberSelection) => void
  getSelectedMember: (index: number) => TeamMemberSelectItem | null
  selectedMembers: MemberSelection[]
  isEdit: boolean
}
//TODO arena action type ашиглаж байгаа өөрчлөлт оруулаагүй
const TeamEntryMemberList: React.FC<TeamEntryMemberListProps> = ({
  tournament,
  userProfile,
  formik,
  setSelectedMember,
  removeSelectedMember,
  getSelectedMember,
  selectedMembers,
  isEdit,
}) => {
  const { suggestedTeamMembers, meta, getSuggestedTeamMembers, focusIndex, setfocusIndex } = useSuggestedTeamMembers()

  useEffect(() => {
    getSuggestedTeamMembers({ page: 1, keyword: '', tournament_id: tournament.id })
  }, [])

  const handleSearchInput = (keyword: string, index: number) => {
    setfocusIndex(index)
    getSuggestedTeamMembers({ page: 1, keyword: keyword, tournament_id: tournament.id })
  }

  const handleMemberSelect = (selectedMember: MemberSelection) => {
    if (selectedMember.item) {
      setSelectedMember(selectedMember)
    } else {
      removeSelectedMember(selectedMember)
    }
  }

  const memberNicknames = formik.values.members
  const renderMembers = () => {
    const children = [] as ReactNode[]
    for (let i = 1; i < memberNicknames.length; i++) {
      const index = i + 1
      children.push(
        <TeamEntryMemberListItem
          key={index}
          index={index}
          suggestedTeamMembers={suggestedTeamMembers
            .filter((suggested) => !selectedMembers.find((member) => member?.item?.id === suggested.id))
            .map((suggested) => ({
              id: `${suggested.id}`,
              nickname: suggested.attributes.nickname,
              avatar: suggested.attributes.avatar,
              userCode: suggested.attributes.user_code,
            }))}
          selectedItem={getSelectedMember(index)}
          onSearchInput={handleSearchInput}
          onItemSelected={handleMemberSelect}
          loading={focusIndex === index && meta.pending}
          formik={formik}
          isEdit={isEdit}
        />
      )
    }
    return children
  }

  return (
    <>
      <TeamEntryMemberListItem
        isLeader
        index={1}
        selectedItem={{
          id: _.get(userProfile, 'id', ''),
          nickname: _.get(userProfile, 'attributes.nickname', ''),
          avatar: '',
          userCode: '',
        }}
        suggestedTeamMembers={[]}
        onSearchInput={handleSearchInput}
        onItemSelected={handleMemberSelect}
        loading={false}
        formik={formik}
      />
      {memberNicknames.length > 0 && renderMembers()}
    </>
  )
}

export default TeamEntryMemberList
