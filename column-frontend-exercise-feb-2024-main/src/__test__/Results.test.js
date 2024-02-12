import Results from '../Results';
import { render, screen } from '@testing-library/react';

test('renders Results list when data is present', () => {
    const noticeData = [
        {
            title: "Notice 1",
            publicationDate: "2022-01-01",
            content: "Notice 1 content"
        },
        {
            title: "Notice 2",
            publicationDate: "2022-01-02",
            content: "Notice 2 content"
        },
        {
            title: "Notice 3",
            publicationDate: "2022-01-03",
            content: "Notice 3 content"
        }
    ];
    render(<Results data={noticeData} />);
    const results = screen.getByRole('list');
    expect(results).toBeInTheDocument();
});

test('renders no results found', () => {
    const noticeData = [];
    render(<Results data={noticeData} />);
    const results = screen.getByText(/No Results/i);
    expect(results).toBeInTheDocument();
});