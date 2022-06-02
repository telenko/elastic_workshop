import React from 'react';
import './App.css';
import ProductList from './products/ProductList';
import Logger from './utils/Logger';

class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, {}> {

  componentDidCatch(e: Error) {
    Logger.error(e);
  }

  render() {
    return <>{this.props.children}</>;
  }

}

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ProductList />
      </div>
    </ErrorBoundary>
  );
}

export default App;
