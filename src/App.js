import ReactInputDate from './ReactInputMask'
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactInputDate placeholder='DD.MM.YYYY' showMaskOnFocus={true} showMaskOnHover={true} />
    </div>
  );
}

export default App;
