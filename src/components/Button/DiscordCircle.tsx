import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
  },
  Discord: {
    background: '#7289DA',
  },
  svgRoot: {
    height: 30,
    width: 30,
  },
  iconRoot: {
    padding: 0,
  },
}))
{
  /* <svg id="LV1_ic_Discord" data-name="LV1 / ic / Discord" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
  <circle id="Ellipse_2" data-name="Ellipse 2" cx="15" cy="15" r="15" fill="#7289da"/>
  <g id="Discord-Logo-Color" transform="translate(5.747 8.345)">
    <path id="Exclusion_1" data-name="Exclusion 1" d="M4.832,13.309h0A7,7,0,0,1,2.6,12.885a5.8,5.8,0,0,1-1.5-.823A4.52,4.52,0,0,1,0,10.9,18.958,18.958,0,0,1,.356,7.3a22.151,22.151,0,0,1,.784-2.936,18.929,18.929,0,0,1,1.14-2.7h0A7.884,7.884,0,0,1,6.716,0h.018l.159.19A13.408,13.408,0,0,0,3.739,1.537a6.463,6.463,0,0,0-1.012.729h0c.09-.049.421-.224.931-.458a13.483,13.483,0,0,1,2.226-.76A9.216,9.216,0,0,1,7.256.808l.016,0,.019,0h0A1.317,1.317,0,0,1,7.526.776a13.348,13.348,0,0,1,3.2-.031,12.923,12.923,0,0,1,4.768,1.521,6.5,6.5,0,0,0-.962-.7A12.931,12.931,0,0,0,11.55.254L11.772,0h.018a7.883,7.883,0,0,1,4.434,1.664h0a18.9,18.9,0,0,1,1.14,2.7A22.114,22.114,0,0,1,18.148,7.3,18.966,18.966,0,0,1,18.5,10.9a4.522,4.522,0,0,1-1.111,1.163,5.862,5.862,0,0,1-1.5.823,7,7,0,0,1-2.234.423c-.005-.006-.576-.688-1.046-1.284a6.153,6.153,0,0,0,1.324-.542,5.259,5.259,0,0,0,.888-.621,3.561,3.561,0,0,0,.655-.723,9.008,9.008,0,0,1-1.821.935,10.407,10.407,0,0,1-2.3.682,10.813,10.813,0,0,1-1.985.183,11.6,11.6,0,0,1-2.118-.2,13.237,13.237,0,0,1-2.329-.681,9.213,9.213,0,0,1-1.156-.539.653.653,0,0,0-.071-.039.682.682,0,0,1-.072-.04.226.226,0,0,1-.063-.048c-.247-.137-.4-.239-.442-.267h0a3.5,3.5,0,0,0,.632.709,5.223,5.223,0,0,0,.859.614,6.108,6.108,0,0,0,1.282.546c-.473.6-1.056,1.309-1.062,1.315Zm7.24-7.4a1.541,1.541,0,0,0-1.147.517,1.87,1.87,0,0,0,.006,2.483,1.523,1.523,0,0,0,2.287,0,1.877,1.877,0,0,0,0-2.483A1.54,1.54,0,0,0,12.073,5.909Zm-5.782,0a1.541,1.541,0,0,0-1.147.517A1.868,1.868,0,0,0,5.149,8.91a1.524,1.524,0,0,0,2.288,0,1.92,1.92,0,0,0,.34-1.952A1.736,1.736,0,0,0,7.4,6.385,1.554,1.554,0,0,0,6.29,5.909Z" transform="translate(0)" fill="#fff"/>
  </g>
</svg> */
}

const ESButtonDiscordCircle: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles()
  return (
    <IconButton {...props} classes={{ root: classes.iconRoot }}>
      <div className="esbutton-hover" />
      <Avatar classes={{ root: classes.root }} className={classes.Discord}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 30 30">
          <path
            id="Path_99"
            data-name="Path 99"
            d="M4.832,13.309h0A7,7,0,0,1,2.6,12.885a5.8,5.8,0,0,1-1.5-.823A4.52,4.52,0,0,1,0,10.9,18.958,18.958,0,0,1,.356,7.3a22.151,22.151,0,0,1,.784-2.936,18.929,18.929,0,0,1,1.14-2.7h0A7.884,7.884,0,0,1,6.716,0h.018l.159.19A13.408,13.408,0,0,0,3.739,1.537a6.463,6.463,0,0,0-1.012.729h0c.09-.049.421-.224.931-.458a13.483,13.483,0,0,1,2.226-.76A9.216,9.216,0,0,1,7.256.808l.016,0,.019,0h0A1.317,1.317,0,0,1,7.526.776a13.348,13.348,0,0,1,3.2-.031,12.923,12.923,0,0,1,4.768,1.521,6.5,6.5,0,0,0-.962-.7A12.931,12.931,0,0,0,11.55.254L11.772,0h.018a7.883,7.883,0,0,1,4.434,1.664h0a18.9,18.9,0,0,1,1.14,2.7A22.114,22.114,0,0,1,18.148,7.3,18.966,18.966,0,0,1,18.5,10.9a4.522,4.522,0,0,1-1.111,1.163,5.862,5.862,0,0,1-1.5.823,7,7,0,0,1-2.234.423c-.005-.006-.576-.688-1.046-1.284a6.153,6.153,0,0,0,1.324-.542,5.259,5.259,0,0,0,.888-.621,3.561,3.561,0,0,0,.655-.723,9.008,9.008,0,0,1-1.821.935,10.407,10.407,0,0,1-2.3.682,10.813,10.813,0,0,1-1.985.183,11.6,11.6,0,0,1-2.118-.2,13.237,13.237,0,0,1-2.329-.681,9.213,9.213,0,0,1-1.156-.539.653.653,0,0,0-.071-.039.682.682,0,0,1-.072-.04.226.226,0,0,1-.063-.048c-.247-.137-.4-.239-.442-.267h0a3.5,3.5,0,0,0,.632.709,5.223,5.223,0,0,0,.859.614,6.108,6.108,0,0,0,1.282.546c-.473.6-1.056,1.309-1.062,1.315Zm7.24-7.4a1.541,1.541,0,0,0-1.147.517,1.87,1.87,0,0,0,.006,2.483,1.523,1.523,0,0,0,2.287,0,1.877,1.877,0,0,0,0-2.483A1.54,1.54,0,0,0,12.073,5.909Zm-5.782,0a1.541,1.541,0,0,0-1.147.517A1.868,1.868,0,0,0,5.149,8.91a1.524,1.524,0,0,0,2.288,0,1.92,1.92,0,0,0,.34-1.952A1.736,1.736,0,0,0,7.4,6.385,1.554,1.554,0,0,0,6.29,5.909Z"
            transform="translate(5.747 8.345)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonDiscordCircle
