import  { React, useState, useCallback, useEffect } from 'react';
import { db } from './db';
import { collection, getDocs, query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import debounce  from 'lodash/debounce';
import Results from './Results';
import './styles/SearchNotice.css';
import { TextField, AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { blue } from '@mui/material/colors'


const SearchNotice = () => { 

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentQuery, setQuery] = useState([]);
    const [lastDocument, setLastDocument] = useState(null);
    const [rowCount, setRowCount] = useState(0);
    const collectionName = "notices";
    const noticeCollection = collection(db, collectionName);
    const noticeOrder = orderBy("publicationDate", "desc");
    const noticeWhere = where("title", "==", searchText);
    const noticeLimit = limit(11);

    const handleSearchInput = e => {
        setSearchText(e.target.value);  
    }
    
    const dbounce = useCallback(
        debounce(handleSearchInput
        , 500), []);
    
    const loadMore = async () => {
        const nextbatch = [...currentQuery];
        nextbatch.push(startAfter(lastDocument));
        setQuery(nextbatch);
    };
    
    const showMore = () => {
        return lastDocument == null || (lastDocument != null && rowCount < 10);   
    }

    useEffect(() => {        
        const getNotices = async () => {
            const noticeData = [];
            const querySnapshot = await getDocs(query(...currentQuery));
            const rows = querySnapshot.docs.length;
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 2];
            querySnapshot.forEach((doc) => {
                if (!searchResults.some((item) => item.title === doc.data().title)) {
                    noticeData.push(doc.data());
                }
            });

            if (rows > 10) {
                noticeData.pop();
            }

            setSearchResults([...searchResults, ...noticeData]);
            setLastDocument(lastDoc);
            setRowCount(rows);
        };
        if (currentQuery.length !== 0) {
            getNotices();   
        }
    }, [currentQuery]);

    useEffect(() => {
        if (searchText === '') {
            setQuery([]);
            return;
        } 
        const noticeQuery = [];
        noticeQuery.push(noticeCollection);
        noticeQuery.push(noticeWhere);
        noticeQuery.push(noticeOrder);
        noticeQuery.push(noticeLimit);
        setQuery(noticeQuery);
    }, [searchText]);
    
  const bl = blue[50];
    return (
            <div>
                    <AppBar position='sticky'
                    sx={
                        {bgcolor: bl}
                    }>
                        <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <svg width="188" height="33" viewBox="0 0 188 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M164.928 31.841H175.572L175.488 31.1434L174.829 31.105C173.434 30.9834 173.229 30.817 173.229 30.4458V17.7482C173.888 17.3386 174.829 16.929 176.064 16.929C177.997 16.929 179.309 17.7098 179.309 20.833V30.4074C179.309 30.7338 179.309 31.0218 177.914 31.105L177.255 31.1434L177.133 31.841H187.815L187.693 31.1434L187.239 31.105C185.434 30.8554 185.223 30.6954 185.223 30.4074V19.5594C185.223 17.5434 184.813 15.6554 183.828 14.6698C182.88 13.7226 181.812 13.1914 180.461 13.1914C177.876 13.1914 175.405 15.041 173.312 16.769H173.229L173.312 13.2362L164.768 15.617L164.73 16.1482L165.549 16.353C166.944 16.7626 167.277 17.0954 167.277 19.6426V30.4074C167.277 30.9002 166.823 31.0218 165.632 31.105L165.056 31.1434L164.935 31.841H164.928ZM129.549 31.841H140.192L140.071 31.1434L139.495 31.105C137.972 30.9834 137.85 30.817 137.85 30.4458V17.665C138.548 17.2938 139.373 16.9226 140.397 16.9226C142.413 16.9226 143.725 17.7418 143.725 20.8266V30.401C143.725 30.7274 143.559 31.0154 142.368 31.0986L141.671 31.137L141.549 31.8346H152.026L151.904 31.137L151.373 31.0986C149.85 30.8938 149.69 30.8106 149.69 30.4842V17.9978C150.016 17.3386 151.13 16.929 152.237 16.929C154.253 16.929 155.527 17.7482 155.527 20.833V30.4074C155.527 30.7338 155.565 31.0218 154.215 31.105L153.517 31.1434L153.396 31.841H164.039L163.917 31.1434L163.463 31.105C161.575 30.8554 161.492 30.6954 161.492 30.4074V20.6666C161.492 17.5434 161.082 15.6554 160.096 14.6698C159.149 13.7226 158.08 13.1914 156.73 13.1914C154.144 13.1914 151.674 14.9194 149.62 16.8906L149.415 16.8522C149.21 15.9498 148.839 15.2522 148.263 14.6314C147.36 13.729 146.292 13.1914 144.896 13.1914C142.388 13.1914 139.924 14.9962 137.952 16.8074H137.869L137.952 13.2298L129.408 15.6106L129.37 16.1418L130.189 16.3466C131.584 16.7562 131.917 17.089 131.917 19.6362V30.401C131.917 30.8938 131.463 31.0154 130.272 31.0986L129.696 31.137L129.575 31.8346L129.549 31.841ZM119.853 32.5002L128.314 30.4458L128.397 29.953L127.245 29.665C126.055 29.3386 125.805 28.8458 125.805 26.8682V13.8058H117.133L117.3 14.5034L117.914 14.5418C119.597 14.6634 119.885 14.7914 119.885 15.201V27.8538C119.226 28.225 118.368 28.673 117.255 28.673C115.239 28.673 113.927 27.8538 114.01 24.8138L114.132 13.7994H105.338L105.46 14.497L106.074 14.5354C107.962 14.7402 108.128 14.9066 108.128 15.1114L108.045 25.9594C107.962 28.097 108.416 29.8634 109.402 30.8874C110.432 31.873 111.252 32.4106 112.647 32.4106C115.194 32.4106 117.62 30.6826 119.796 28.7946H119.917L119.834 32.4938L119.853 32.5002ZM94.3365 31.841H104.813L104.692 31.1434L104.199 31.105C102.842 30.9834 102.516 30.817 102.516 30.4458V3.94336L94.0933 6.24736L94.0101 6.74016L95.0789 7.19456C96.2309 7.56576 96.5189 7.93696 96.5189 9.94656V30.4074C96.5189 30.9002 96.2693 31.0218 95.0789 31.105L94.5029 31.1434L94.3365 31.841ZM82.2533 31.553C81.5109 31.553 80.8133 31.3482 80.3205 30.8554C79.2517 29.7034 78.4709 27.3226 78.4709 22.3882C78.4709 17.4538 79.8277 14.1322 82.3749 14.1322C83.1173 14.1322 83.6869 14.2986 84.2245 14.8298C85.2933 15.8986 86.1125 18.3242 86.1125 23.169C86.1125 28.0138 84.7557 31.553 82.2533 31.553ZM82.0869 32.417C88.3717 32.417 92.6085 28.1034 92.6085 22.6762C92.6085 17.537 88.9093 13.185 82.5797 13.185C76.2501 13.185 72.0581 17.4986 72.0581 22.8426C72.0581 28.1866 75.7125 32.417 82.0869 32.417ZM58.4581 32.3338C61.2933 32.3338 64.7429 31.5146 66.3045 30.8938L68.2373 30.9322L69.3893 22.6762H67.9941C67.9941 22.6762 66.1893 26.8234 66.1893 26.8682C64.6661 29.665 62.2469 31.3482 58.7525 31.3482C54.0677 31.3482 50.7397 26.7082 50.7397 19.0218C50.7397 11.3354 53.6965 6.65696 59.0789 6.65696C60.8837 6.65696 62.6565 7.14976 63.5589 7.64256L67.3797 15.0794H68.6917L68.4037 6.16416L65.1589 6.94496C63.8021 6.24736 61.3765 5.63296 58.8293 5.63296C49.0117 5.63296 43.4629 11.7962 43.4629 19.3546C43.4629 26.913 49.1717 32.3402 58.4581 32.3402" fill="#24415B"/>
                                <path d="M29.4788 14.2217H8.72363V18.7785H29.4788V14.2217Z" fill="#24415B"/>
                                <path d="M34.8156 11.9176H3.3916V9.93364C3.3916 8.51284 4.5436 7.36084 5.9644 7.36084H32.2428C33.6636 7.36084 34.8156 8.51284 34.8156 9.93364V11.9176Z" fill="#24415B"/>
                                <path d="M38.2016 5.0568H0V3.0728C0 1.652 1.152 0.5 2.5728 0.5H35.6352C37.056 0.5 38.208 1.652 38.208 3.0728V5.0568H38.2016Z" fill="#24415B"/>
                                <path d="M18.1956 21.0825H8.72363V25.6393H18.1956V21.0825Z" fill="#24415B"/>
                                <path d="M29.4847 21.0825H20.0127V25.6393H29.4847V21.0825Z" fill="#24415B"/>
                                <path d="M18.1956 27.9434H8.72363V32.5002H18.1956V27.9434Z" fill="#24415B"/>
                                <path d="M29.4847 27.9434H20.0127V32.5002H29.4847V27.9434Z" fill="#24415B"/>
                            </svg>
                            </Typography>
                            <TextField 
                                id='search' 
                                label="Search" 
                                type="text" 
                                placeholder="Search Notices..."  
                                sx={{position: 'relative', width: '300px', bgcolor: 'white', margin: '10px 0'}}
                                onChange={dbounce} />
                        </Toolbar>
                    </AppBar>    
                    <Box sx={{margin: '0 10px'}}>            
                        <Results data={searchResults} />
                        {showMore() ? null : <Button variant="contained" sx={{margin: '10px'}} onClick={loadMore}>Load More</Button>}
                    </Box>
            </div>
    )
};

export default SearchNotice;