import Results from '../Results';
import { render, screen } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';

test('renders Results list when data is present', () => {
    const noticeData = [
        {
            id: "1",
            title: "Notice 1",
            publicationDate: "2022-01-01",
            content: "Notice 1 content"
        },
        {
            id: "2",
            title: "Notice 2",
            publicationDate: "2022-01-02",
            content: "Notice 2 content"
        },
        {
            id: "3",
            title: "Notice 3",
            publicationDate: "2022-01-03",
            content: "Notice 3 content"
        }
    ];
    render(
        <StaticRouter>
            <Results data={noticeData} />
        </StaticRouter>);
    const results = screen.getByRole('list');
    expect(results).toBeInTheDocument();
});

test('renders no results found', () => {
    const noticeData = [];
    render(
    <StaticRouter>
       <Results data={noticeData} />
    </StaticRouter>);
    const results = screen.getByText(/No Results/i);
    expect(results).toBeInTheDocument();
});