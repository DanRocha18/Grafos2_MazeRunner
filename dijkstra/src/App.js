import './App.css';
import HeaderComponent from './HeaderComponente'
import BodyComponent from './BodyComponent'

function App() {  
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Jockey+One&display=swap" rel="stylesheet"></link>
      <HeaderComponent style={{ fontFamily: 'Jockey One, sans-serif' }} />
      <BodyComponent style={{ fontFamily: 'Jockey One, sans-serif' }}  />
    </div>
  );
}

export default App;
