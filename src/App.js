import ReactInputDate from './ReactInputMask'
import './App.css';

function App() {
    const value = ''
    const className = 'inputMask'
  return (
    <div className="App">
        <label className='label'>
            <span className='example-label'>Date:</span>
            <div>
                <ReactInputDate mask='dd.mm.yyyy' showMaskOnFocus={true}  className={className} inputValue={value} showMaskOnHover={true}/>
                <span className='field-label'>DD.MM.YYYY (dd.mm.yyyy)</span>
            </div>

        </label>

    </div>
  );
}

export default App;
