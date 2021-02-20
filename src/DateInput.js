import React from 'react';
import ReactInputDateMask from './ReactInputDateMask'

export default function DateInput(props) {
    return <ReactInputDateMask mask='dd/mm/yyyy' showMaskOnFocus={true} className={props.className} value={props.value}
                               onChange={props.onChange} showMaskOnHover={true}/>;
}