import ReactInputDate from './ReactInputMask'
import './App.css';

function App() {
    const value = ''
    const className = 'select'
  return (
    <div className="App">
      <ReactInputDate mask='DD.MM.YYYY' showMaskOnFocus={false}  inputValue={value} className={className}/>
    </div>
  );
}

export default App;
