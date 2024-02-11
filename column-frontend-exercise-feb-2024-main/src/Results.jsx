import Notice from "./NoticeCard";
import { Divider, List } from '@mui/material'

const Results = ( { data }) => {

    return (
        <div>
            { data.length === 0 ? <p>No Results found</p> : 
            <List> {
                    data.map((notice, index) =>  {
                        return (
                            <div>
                                <Notice key={index} title={notice.title} date={notice.publicationDate} content={notice.content.substring(0,50)+ '...'} />
                                <Divider variant="middle" component="li" />
                            </div>
                        )
                    })
                }
            </List>
            }
        </div>
    )
}

export default Results;