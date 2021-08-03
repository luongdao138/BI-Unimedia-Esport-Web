import { useState } from 'react'
import { MemberSelection, TeamMemberSelectItem } from '@store/arena/actions/types'
import _ from 'lodash'
//TODO arena action type ашиглаж байгаа өөрчлөлт оруулаагүй
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTeamSelectedMember = () => {
  const [selectedMembers, setSelectedMembers] = useState([] as MemberSelection[])
  const setSelectedMember = (selectedMember: MemberSelection) => {
    const newSelectedList = [...selectedMembers]
    const index = newSelectedList.findIndex((member) => member.index === selectedMember.index)
    if (index > -1) {
      newSelectedList[index].item = selectedMember.item
    } else {
      newSelectedList.push(selectedMember)
    }
    setSelectedMembers(newSelectedList)
  }

  const removeSelectedMember = (selectedMember: MemberSelection) => {
    const newSelectedList = [...selectedMembers]
    _.remove(newSelectedList, (item) => selectedMember.index === item.index)
    setSelectedMembers(newSelectedList)
  }

  const getSelectedMember = (index: number) => {
    const member = selectedMembers.find((member) => member.index === index)
    return _.get(member, 'item', null) as TeamMemberSelectItem | null
  }
  return { selectedMembers, getSelectedMember, setSelectedMember, setSelectedMembers, removeSelectedMember }
}

export default useTeamSelectedMember
