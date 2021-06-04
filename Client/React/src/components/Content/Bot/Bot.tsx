//@ts-nocheck
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import RecommendedEvents from './RecommendedEvents/RecommendedEvents';
import PastEvents from './PastEvents/PastEvents';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import { useSelector } from 'react-redux';

const Bot = () => {
    const user = useSelector<StoreStateType, User>(state => state.user);

    const title = 'העוזר האישי שלך';
    const theme = {
      background: '#f5f8fb',
      headerBgColor: '#EF6C00',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#EF6C00',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
      fontFamily: 'Assistant',
    };
    const steps = [
        {
            id: '1',
            message: 'הייי! אני פה כדי לעזור לך למצוא אירועים במיוחד עבורך :)',
            trigger: '2',
        },
        {
            id: '2',
            message: 'אם היית אצלנו בעבר כדי לך לעבור לפני בדירוג אירועים כדי שאני אוכל להיות יותר מדויק',
            trigger: '3',
        },
        {
            id: '3',
            options: [
                { value: 1, label: 'לדרג אירועי עבר', trigger: '4' },
                { value: 2, label: 'תמליץ לי על אירועים!', trigger: '5' },
            ],
        },
        {
            id: '4',
            component: (
                <PastEvents />
            ),
            trigger: '1',
        },
        {
            id: '5',
            component: (
                <RecommendedEvents />
            ),
            trigger: '1',
        },
  ];

    return (
        <ThemeProvider theme={theme}>
            <ChatBot 
              steps={steps}  
              floating={true} 
              userAvatar={user.photograph}
              headerTitle={title}
              floatingIcon={<LiveHelpIcon style={{color: 'white'}} />}
              floatingStyle={{left: '60px'}} />
        </ThemeProvider>
    )
}

export default Bot;