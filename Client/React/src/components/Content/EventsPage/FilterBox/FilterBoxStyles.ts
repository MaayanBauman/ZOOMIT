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
        height: '19vh',
        margin: 4,
      },
      rightSection:{
        width:"23vw",
      },
      leftSection:{
        width:"23vw",
      },
      filed: {
        display:'flex',
        flexDirection:'row',
        width:"90%",
        justifyContent:"space-between",
        padding:" 0 1vw",
        alignItems:"center",  
        height: '30%',
      },
      select:{
        width:"50%",
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
        height: '30px',
        width: '30px',
        marginLeft: '4px',
      },
      menuItem: {
        display:"flex",
        direction:"rtl",
        alignItems: "center",
      },
      filterBtn: {
        background:'#0C63CE',
        width: '10vw',
        marginTop: '7vh',
        marginRight: '55%',
      },
      checkbox:{
        color:'#0C63CE',
      },
      picker: {
        width: '10vw',
      },
      calendarIcon: {
        color: '#0C63CE'
      },
    })
);

export default useStyles;