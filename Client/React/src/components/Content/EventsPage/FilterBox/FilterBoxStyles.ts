import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container:{
        marginRight: '22vw',
        alignItems: 'center',
      },
      search:{
        padding: '2px 4px',
        display: 'flex',
        width: 400,
        marginRight: '10vw',
        marginLeft: '10vw',
      },
      input: {
          marginLeft: theme.spacing(1),
          flex: 1,
          paddingRight: '2px',
      },
      iconButton: {
          padding: 10,
          color: '#0C63CE',
      },
      searchDivider: {
          height: 28,
          margin: 4,
      },
      card: {
        marginTop: '2vh',
      },
      content:{
        display: 'flex',
        height: '20vh',
        justifyContent:"space-between",
      },
      divider: {
        height: '20vh',
        margin: 4,
      },
      rightSection:{
        width:"50%",
      },
      leftSection:{
        width:"50%",
      },
      filed: {
        display:'flex',
        flexDirection:'row',
        width:"90%",
        justifyContent:"space-between",
        padding:" 0 1vw",
        alignItems:"center",
      },
      select:{
        width:"50%",
        paddingRight: '24px',
        display: 'flex',
        alignItems: 'center',
      },
      priceRange:{
        width:"50%",
        marginTop:"2%",
        display:"flex",
      },
      priceInput:{
        marginRight:"5%",
        marginLeft:"5%",
        width:"14vw",
      },
      avatar: {
        height: '36px',
        width: '36px',
        marginLeft: '4px',
      },
      menuItem: {
        display:"flex",
        direction:"rtl",
      },
    })
);

export default useStyles;