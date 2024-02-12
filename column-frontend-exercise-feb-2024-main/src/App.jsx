import './styles/App.css';
import SearchNotice from './SearchNotice';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <SearchNotice />    
      </ErrorBoundary>
  </div>
  );
}

export default App;
