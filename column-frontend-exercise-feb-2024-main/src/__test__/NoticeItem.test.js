import { Timestamp } from "firebase/firestore";
import Notice from "../NoticeItem";
import { render, screen } from '@testing-library/react';

test('renders Notice list when data is present', () => {
    const noticeData = 
        {
            title: "Notice 1",
            publicationDate: Timestamp.fromDate(new Date("2022-01-01")),
            content: "Notice 1 content"
        };
    render(<Notice notice={noticeData} />);
    const results = screen.getByRole('listitem');
    expect(results).toBeInTheDocument();
    expect(results.innerHTML).toContain("Notice 1");
});