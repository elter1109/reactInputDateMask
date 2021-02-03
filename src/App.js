import ReactInputDate from './ReactInputMask'
import './App.css';

function App() {
    const value = ''
  return (
    <div className="App">
      <ReactInputDate mask='DD.MM.YYYY' showMaskOnFocus={true}  inputValue={value}/>
    </div>
  );
}

export default App;
