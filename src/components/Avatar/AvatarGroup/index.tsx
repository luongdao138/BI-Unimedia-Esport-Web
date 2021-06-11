import { withStyles } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { Colors } from '@theme/colors'

const ESAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: Colors.white,
  },
})(AvatarGroup)

export default ESAvatarGroup
