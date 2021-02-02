import React, {useState, useEffect} from 'react';

export default function ReactInputMask({placeholder = '', showMaskOnFocus = false, showMaskOnHover = false}) {
    const [value, setValue] = useState('')
    const [toggleCursor, setCursor] = useState(false)
    const [positionCursor, setPosCursor] = useState({
        start: 0,
        end: 1,
    })
    const data = createObject(placeholder)
    useEffect(() => {
        const input = document.getElementById('inputDate')
        input.selectionStart = positionCursor.start
        input.selectionEnd = positionCursor.end;
    }, [positionCursor.start, positionCursor.end])

    const onFocus = (e) => {
        if (value === '' && showMaskOnFocus) {
            const stateObject = createObject(placeholder)
            setValue(stateObject)
        }

    }
    const onClick = (e) => {
        currentCursorPosition({
            target: e.target, position: {
                start: positionCursor.start,
                end: positionCursor.end
            }
        })
    }

    const onBlur = () => {
    }

    const checkVal = (val, position) => {
        const validObj = {
            '1': {
                mandatoryReg: /[0-3]/
            },
            '2': {
                mandatoryReg: /[0-9]/,
                dopReg: /[0|1]/,
            },
            '3': {
                mandatoryReg: /\//,
            },
            '4': {
                mandatoryReg: /[0-1]/
            },
            '5': {
                mandatoryReg: /[0-9]/,
                dopReg: /[0-2]/,
            },
            '6': {
                mandatoryReg: /\//,
            },
            '7': {
                mandatoryReg: /[[1|2]/
            },
            '8': {
                mandatoryReg: /[9|0]/,
                dopReg: /[0]/
            },
            '9': {
                mandatoryReg: /[\d]/
            },
            '10': {
                mandatoryReg: /[\d]/
            },
        }
        const isMatchMandatory = validObj[String(position)].mandatoryReg.test(val)
        let isMatchEdditional = true;
        if ((position === 2 && value['1'] === '3') || (position === 8 && value['7'] === '2') || (position === 5 && value['4'] === '1')) {
            isMatchEdditional = validObj[String(position)].dopReg.test(val)
        }
        const isMatchTotal = isMatchMandatory && isMatchEdditional;
        return isMatchTotal
    }

    const onChange = (e) => {
        const {selectionStart, selectionEnd, value: curValue} = e.target;
        const valueArray = [...curValue];
        const newPositionStart = selectionStart - 1;
        const newValue = valueArray[newPositionStart]
        const digitalArray = newValue.match(/[\d]/g);
        if (digitalArray.length > 0 && selectionStart < 11) {
            const isMatch = checkVal(newValue, selectionStart)
            if (isMatch) {
                setValue({
                    ...value,
                    [selectionStart]: newValue
                })
                const newSelectionStart = (selectionStart === 2 || selectionStart === 5) ? selectionStart + 1 : selectionStart
                const newSelectionEnd = (selectionStart === 2 || selectionStart === 5) ? selectionEnd + 2 : selectionEnd + 1
                setPosCursor({
                    ...positionCursor,
                    start: newSelectionStart,
                    end: newSelectionEnd
                })
            } else {
                if (selectionStart === 1 || selectionStart === 4) {
                    const nextValue = selectionStart + 1;
                    const newSelect = selectionStart + 2;
                    setValue({
                        ...value,
                        [selectionStart]: 0,
                        [nextValue]: newValue
                    })
                    setPosCursor({
                        ...positionCursor,
                        start: newSelect,
                        end: newSelect + 1,
                    })
                } else if (selectionStart === 7) {
                    const nextValue = selectionStart + 2;
                    const nextSelStart = selectionStart + 1;
                    setValue({
                        ...value,
                        [selectionStart]: 2,
                        [nextSelStart]: 0,
                        [nextValue]: newValue
                    })
                    setPosCursor({
                        ...positionCursor,
                        start: nextValue,
                        end: nextValue + 1
                    })
                } else {
                }
            }
        }

    }

    function createObject(string) {
        let newObject = {};
        [...string].forEach(((el, index) => {
            newObject[index + 1] = el
        }))
        return newObject;
    }

    const onKeyDown = (e) => {
        const {key, target: {selectionStart, selectionEnd}} = e;
        if (key === "Backspace" || key === "Delete") {
            if (selectionStart !== 0) {
                e.preventDefault()
                const newValue = data[selectionStart];
                setValue({
                    ...value,
                    [selectionStart]: newValue
                })
                const newStart = selectionStart - 1;
                const newEnd = newStart + 1
                setPosCursor({
                    ...positionCursor,
                    start: newStart,
                    end: newEnd
                })
            } else {
                e.preventDefault()
            }

        } else if (key === 'ArrowRight' || key === 'ArrowLeft') {
            console.log('left/right',)
            const newStart = key === 'ArrowRight' ? selectionStart : selectionStart - 1;
            const newEnd = key === 'ArrowRight' ? selectionStart + 1 : selectionStart - 1;

        }
    }

    function currentCursorPosition  ({target, position: {start, end}})  {
        target.selectionStart = start;
        target.selectionEnd = end;
        setCursor(!toggleCursor)

    }
    const newState = Object.keys(value)?.length > 0 ? Object.values(value).join('') : value
    return (
        <input id='inputDate' placeholder={showMaskOnFocus || showMaskOnHover ? '' : placeholder} type='text'
               onClick={onClick}
               onFocus={onFocus} value={newState} onBlur={onBlur} onChange={onChange} onKeyDown={onKeyDown}></input>
    )
}