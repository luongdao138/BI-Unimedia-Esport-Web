export enum STREAM_STATUS {
  BEFORE_START = 'before_start',
  CM_STARTED = 'cm_started',
  LIVE_STREAMING = 'live_streaming',
  ARCHIVE_DELIVERY = 'archive_delivery',
  END_OF_ARCHIVED = 'end_of_archived',
  INACTIVE_STREAM = 422800,
}
