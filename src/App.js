import logo from './logo.svg';
import './App.css';
import PerlinFlow from './PerlinFlow';

const center = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

function App() {
  return (
    <div className="App">
        <div style={center}>
            <h1>#001</h1>
            <h2>Perlin Flow</h2>
        </div>
        <PerlinFlow/>
    </div>
  );
}

export default App;
