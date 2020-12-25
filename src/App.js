import './App.css';
import Contents from './containers/Contents/Contents';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Meeting Helper </h1>
        <div className="base-line"></div>
      </header>
      <Contents />
      <Footer />
    </div>
  );
}

export default App;
