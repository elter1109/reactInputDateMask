import react from 'react';
import DateInput from "./DateInput";
import './App.css';

function App() {
    const value = ''
    const className = 'inputMask'
    const onChange = () => {

    }
  return (
    <div className="App">
        <label className='label'>
            <span className='example-label'>Date:</span>
            <div>
                <DateInput className={className} value={value} onChange={onChange} />
                <span className='comment'>dd/mm/yyyy</span>
            </div>

        </label>
        <label className='label'>
            <span className='example-label'>Date:</span>
            <div>
                <DateInput className={className} value={value} onChange={onChange} />
                <span className='comment'>mm/dd/yyyy</span>
            </div>

        </label>

    </div>
  );
}

export default App;
