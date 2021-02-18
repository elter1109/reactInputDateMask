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
                <ReactInputDate mask='dd/mm/yyyy' showMaskOnFocus={true}  className={className} value={value} showMaskOnHover={true} />
                <span className='comment'>dd/mm/yyyy</span>
            </div>

        </label>
        <label className='label'>
            <span className='example-label'>Date:</span>
            <div>
                <ReactInputDate mask='mm/dd/yyyy' showMaskOnFocus={true}  className={className} value={value} showMaskOnHover={false} />
                <span className='comment'>mm/dd/yyyy</span>
            </div>

        </label>

    </div>
  );
}

export default App;
