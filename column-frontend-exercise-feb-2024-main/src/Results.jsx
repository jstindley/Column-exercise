import Notice from "./NoticeItem";
import { Divider, List } from '@mui/material'
import { Link } from 'react-router-dom';

const Results = ( { data }) => {

    return (
        <div>
            { data.length === 0 ? <p>No Results</p> : 
            <List> {
                    data.map((notice) =>  {
                        return (
                            <Link  key={notice.id} to={`/notice/${notice.id}`}>
                                <div>
                                    <Notice notice={notice} />
                                    <Divider variant="middle" component="li" />
                                </div>
                            </Link>
                        )
                    })
                }
            </List>
            }
        </div>
    )
}

export default Results;