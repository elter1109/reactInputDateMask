import React, {useState, useEffect} from 'react';

export default function ReactInputMask({
                                           mask = 'DD.MM.YYYY',
                                           showMaskOnFocus = false,
                                           inputValue = '',
                                           className = ''
                                       }) {
    const [value, setValue] = useState('')
    const [toggleCursor, setCursor] = useState(false)
    const [positionCursor, setPosCursor] = useState({
        start: 0,
        end: 1,
    })
    const [validObject, setValidObject] = useState({})
    const [letterObject, setLetterObject] = useState({})
    const [moveCursor, setMoveCursor] = useState({
        start: '',
        end: ''
    })
    const [maskOnFocus, setMaskOnFocus] = useState(false)

    useEffect(() => {
        const input = document.getElementById('inputDate')
        input.setSelectionRange(positionCursor.start, positionCursor.end)
    }, [positionCursor.start, positionCursor.end, toggleCursor])

    useEffect(() => {
        const input = document.getElementById('inputDate')
        input.setSelectionRange(moveCursor.start, moveCursor.end)
    }, [moveCursor.start, moveCursor.end])

    useEffect(() => {

        //create valueObject
        const value = inputValue ? inputValue : mask
        const valueObject = createObject(value)
        setValue(valueObject)

        //create validObject
        const validObject = createValidObject(mask)
        setValidObject(validObject)

        //create letterObject
        const letterObject = createObject(mask)
        setLetterObject(letterObject)

        //setPosition Cursor
        setPosCursor((positionCursor) => {
            return {
                ...positionCursor,
                start: 0,
                end: 1
            }

        })

        if (!showMaskOnFocus) setMaskOnFocus(true)
    }, [inputValue, mask, showMaskOnFocus])

    const onFocus = (e) => {
        if (showMaskOnFocus && !maskOnFocus) {
            setMaskOnFocus(true)
        }

    }
    const isCurrValueHaveDigital = (currValue) => {
        const separator = currValue['3']
        const reDigit = /[0-9]/g
        console.log({currValue})
        const resultArr = Object.values(currValue).filter(el => el !== separator).map((el) => el.search(reDigit)).filter(el => el === 0)
        return Boolean(resultArr.length === 8)
    }

    const onClick = (e) => {
        if (isCurrValueHaveDigital(value)) {
            let {selectionStart} = e.target;
            setPosCursor({
                ...positionCursor,
                start: selectionStart,
                end: selectionStart + 1
            })

        } else {
            setCursor(!toggleCursor)
        }

    }

    const createValidObject = (mask) => {
        let validObject = {}, month = 0, day = 0, year = 0;
        [...mask].forEach((el, index) => {
            const newIndex = index + 1;
            if (el === "M" || el === "m") {
                let regex = {};
                if (month === 0) {
                    regex = {
                        mandatoryReg: /[0-1]/
                    }
                    month += 1;
                } else {
                    regex = {
                        mandatoryReg: /[0-9]/,
                        dopReg: /[0-2]/,
                    }
                }
                const property = el + newIndex
                validObject[property] = {...regex}
            } else if (el === 'D' || el === "d") {
                let regex = {}
                if (day === 0) {
                    regex = {
                        mandatoryReg: /[0-3]/
                    }
                    day += 1;
                } else {
                    regex = {
                        mandatoryReg: /[0-9]/,
                        dopReg: /[0|1]/,
                    }
                }
                const property = el + newIndex
                validObject[property] = {...regex}
            } else if (el === 'Y' || el === "y") {
                let regex;
                if (year === 0) {
                    regex = {
                        mandatoryReg: /[[1|2]/
                    }
                    year += 1;
                } else if (year === 1) {
                    regex = {
                        mandatoryReg: /[9|0]/,
                        dopReg: /[0]/
                    }
                    year += 1;
                } else {
                    regex = {
                        mandatoryReg: /[\d]/,
                        dopReg: /[\d]/
                    }
                    year += 1;
                }
                const property = el + newIndex
                validObject[property] = {...regex}
            } else {
                const regex = {
                    mandatoryReg: /[./]/,
                    dopReg: /[./]/
                }
                const property = el + newIndex
                validObject[property] = {...regex}
            }
        })
        return validObject
    }

    const checkVal = (val, position, prevVal = undefined) => {
        const newPos = letterObject[position] + position;
        const letter = letterObject[position]
        const isMatchMandatory = validObject[newPos].mandatoryReg.test(val)
        let isMatchEdditional = true;
        const prevPos = (position - 1).toString();
        const valuePrevPos = value[prevPos] ?? '0'
        const prevValue = prevVal ? prevVal : valuePrevPos;
        if ((prevValue === '3' && letter.toUpperCase() === "D") || (prevValue === '2' && letter.toUpperCase() === 'Y') || (prevValue === '1' && letter.toUpperCase() === "M")) {
            isMatchEdditional = validObject[newPos].dopReg.test(val)
        }
        const isMatchTotal = isMatchMandatory && isMatchEdditional;
        return isMatchTotal
    }

    const onHandleChange = (e) => {

        const {selectionStart, selectionEnd, value: curValue} = e.target;
        const valueArray = [...curValue];
        const newPositionStart = selectionStart - 1;
        const newValue = valueArray[newPositionStart]
        const reg = /[\d]/g;
        const isValidValue = reg.test(newValue)
        if (isValidValue && selectionStart < 11) {
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
                } else if (selectionStart === 3 || selectionStart === 6) {
                    const nextSelStart = selectionStart;
                    setPosCursor({
                        ...positionCursor,
                        start: nextSelStart,
                        end: nextSelStart + 1
                    })

                } else {
                    setCursor(!toggleCursor)
                }
            }
        } else {
            setCursor(!toggleCursor)
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
        const {key, target: {selectionStart}} = e;
        if (key === "Backspace" || key === "Delete") {
            if (selectionStart !== 0) {
                e.preventDefault()
                const newValue = letterObject[selectionStart];
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
            let newStart = key === 'ArrowRight' ? selectionStart + 1 : selectionStart - 1;
            const newEnd = key === 'ArrowRight' ? selectionStart + 2 : newStart + 1;
            setMoveCursor({
                ...moveCursor,
                start: newStart,
                end: newEnd
            })

        }
    }

    const onHandlePaste = ({target: {selectionStart}, clipboardData}) => {
        const paste = (clipboardData || window.clipboardData).getData('text');
        if (paste.length <= 10) {
            const valueString = Object.values(value).join('')
            const prevValue = valueString.slice(0, selectionStart)
            const postValue = valueString.slice(selectionStart + paste.length)
            let arrayValue = [];
            let pos = selectionStart;
            [...paste].forEach((el, index) => {
                pos += 1
                const isValid = checkVal(el, pos, arrayValue[index-1])
                if (isValid) {
                    arrayValue.push(el)
                } else {
                    arrayValue.push(letterObject[pos])
                }
            })
            const newValueString = [prevValue, ...arrayValue, postValue].join('')
            setValue({
                ...value,
                ...createObject(newValueString)
            })

        }

    }

    const newState = Object.keys(value)?.length > 0 ? Object.values(value).join('') : value
    return (
        <input id='inputDate' placeholder={showMaskOnFocus ? '' : mask} type='text'
               onClick={onClick} className={className}
               onFocus={onFocus} value={maskOnFocus ? newState : ''} onChange={onHandleChange} onKeyDown={onKeyDown}
               autoComplete='off' onPaste={onHandlePaste}></input>
    )
}

//31.13.2578