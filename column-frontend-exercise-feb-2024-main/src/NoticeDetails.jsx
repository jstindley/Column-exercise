import { db } from './db';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';

const NoticeDetails = () => {    
    const { id } = useParams();
    const collectionName = "notices";
    const noticeCollection = doc(db, collectionName, id);
    const [noticeInfo, setNoticeInfo] = useState({
        title: '',
        publicationDate: null,
        content: ''
    });
    
    const getNotice = async () => {
      const notice =  await getDoc(noticeCollection)
        setNoticeInfo({
            date: new Date(notice.data().publicationDate.seconds * 1000).toDateString(),
            title: notice.data().title,
            content: notice.data().content
        });
    } 
    
    getNotice();
    const noticeAvailable = () => {
        return noticeInfo.title !== ''
    };



    return (
        noticeAvailable() ? 
        <Box sx={{margin: '0 10px'}}>
            <div>
                <h1>{noticeInfo.title}</h1>
                <h3>{noticeInfo.date}</h3>
                <p>{noticeInfo.content}</p>
            </div>
        </Box>
        : <p>Loading...</p>
    )
}

export default NoticeDetails;