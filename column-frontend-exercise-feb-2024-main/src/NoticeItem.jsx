import './styles/NoticeItem.css';
import { ListItem, ListItemText } from '@mui/material';
const Notice = ({ notice }) => {


  return (
      <ListItem>
        <ListItemText
        primary={notice.publicationDate + ' - ' + notice.title} 
        secondary={notice.content.substring(0,50) + '...'}>
        </ListItemText>
      </ListItem>
  );
}

export default Notice;
