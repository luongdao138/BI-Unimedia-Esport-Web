export enum GIFT_MANAGE_ACTION_TYPE {
  ADD_TARGET_PERSON_GIFT = 'gift_manage/add',
  RESET_TARGET_PERSON_GIFT = 'gift_manage/reset',
  CHECK_SNS_URL = 'gift_manage/check_sns',
  RESET_CHECK_SNS_URL = 'gift_manage/check_sns/reset',
  ADD_NEW_GIFT_MASTER = 'gift_manage/gift_master/add',
  GET_ALL_GIFT_MASTER = 'gift_manage/gift_master/get_list',
  NEW_GROUP_ADD_GIFT_MASTER = 'gift_manage/gift_group/add_master',
  NEW_GROUP_REMOVE_GIFT_MASTER = 'gift_manage/gift_group/remove_master',
  CREATE_NEW_GIFT_GROUP = 'gift_manage/gift_group/add',
  GET_GIFT_GROUP = 'gift_manage/gift_group/get_list',
}
