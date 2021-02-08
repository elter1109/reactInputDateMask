import ReactInputDate from './ReactInputMask'
import './App.css';

function App() {
    const value = ''
    const className = 'inputMask'
  return (
    <div className="App">
        <label className='label'>
            <ReactInputDate mask='DD.MM.YYYY' showMaskOnFocus={true}  className={className}/>
            <span className='field-label'>День рождения</span>
        </label>

    </div>
  );
}

export default App;
