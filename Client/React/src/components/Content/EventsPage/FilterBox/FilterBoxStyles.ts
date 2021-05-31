import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container:{
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
          color: theme.typography.body2.color,
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
        alignItems:"center",  
        height: '30%',
      },
      select:{
        width:"50%",
        display: 'flex',
        alignItems: 'center',
      },
      priceRange:{
        width:"55%",
        marginTop:"2%",
        display:"flex",
      },
      priceInput:{
        marginRight:"0.5vw",
        marginLeft:"0.5vw",
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
        width: '11vw',
        marginTop: '2vh',
        marginRight: '45%',
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