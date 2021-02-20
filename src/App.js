import React, {useState} from 'react';
import DateInput from "./DateInput";
import './App.css';

function App() {
    const [state, setState] = useState('12.12.2025')
    const className = 'inputMask'
    const onChange = (value) => {
        setState(value)
    }
    return (
        <div className="App">
            <label className='label'>
                <span className='example-label'>Date:</span>
                <div>
                    <DateInput className={className} value={state} onChange={onChange}/>
                    <span className='comment'>dd/mm/yyyy</span>
                </div>

            </label>
            <label className='label'>
                <span className='example-label'>Date:</span>
                <div>
                    <DateInput className={className} value='' onChange={onChange}/>
                    <span className='comment'>mm/dd/yyyy</span>
                </div>

            </label>

        </div>
    );
}

export default App;
