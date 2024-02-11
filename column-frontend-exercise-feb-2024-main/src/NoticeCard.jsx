import './styles/NoticeCard.css';
import { ListItem, ListItemText } from '@mui/material';
const Notice = ({title, date, content }) => {

  const convertDate = () => { // move to a utility file
    return new Date(date.seconds*1000).toDateString();
  }

  return (
    <ListItem>
      <ListItemText
       primary={convertDate() + ' - ' + title} 
       secondary={content}>
      </ListItemText>
    </ListItem>
  );
}

export default Notice;
