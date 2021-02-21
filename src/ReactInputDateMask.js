/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';

export default function ReactInputDateMask({
                                               mask = 'dd.mm.yyyy',
                                               showMaskOnFocus = false,
                                               showMaskOnHover = false,
                                               value: inputValue = '',
                                               className = '',
                                               onChange = undefined
                                           }) {
    const [value, setValue] = useState('')
    const [toggleCursor, setCursor] = useState(false)
    const [positionCursor, setPosCursor] = useState({
        start: 0,
        end: 1,
    })
    const [letterObject, setLetterObject] = useState({})
    const [moveCursor, setMoveCursor] = useState({
        start: '',
        end: ''
    })
    const [maskOnFocus, setMaskOnFocus] = useState(false)
    const [statePlaceholder, setStatePlaceholder] = useState('')
    const myRef = useRef(null);
    const regex = {
        d: /([0-3]d)|(0[1-9]|[12][0-9]|3[01])|(d[0-9])/,
        m: /([0-1]m)|(0[1-9]|1[012])|(m[0-2])/,
        y: /([1-2]yyy)|((19|20)yy)|((19|20)\dy)|((19|20)\d\d)|(yyy\d)|(yy\d\d)|(yy\dy)/,
        '/': /\//,
        '.': /\./
    }

    useEffect(() => {
        const input = myRef.current;
        input.setSelectionRange(positionCursor.start, positionCursor.end)
    }, [positionCursor.start, positionCursor.end, toggleCursor])

    useEffect(() => {
        const input = myRef.current;
        input.setSelectionRange(moveCursor.start, moveCursor.end)
    }, [moveCursor.start, moveCursor.end])

    useEffect(() => {
        const value = inputValue ? inputValue : mask
        const valueObject = createObject(value)
        setValue(valueObject)
        if (!showMaskOnFocus || inputValue) setMaskOnFocus(true)
    }, [inputValue, showMaskOnFocus])

    useEffect(() => {
        const letterObject = createObject(mask)
        setLetterObject(letterObject)
    }, [mask])

    const onFocus = (e) => {
        if (showMaskOnFocus && !maskOnFocus) {
            setMaskOnFocus(true)
            setStatePlaceholder('')
        }

    }

    const findDigitsOrLettersInValue = ({value, looking}) => {
        const separator = value['3']
        const regex = {
            digits: /[0-9]/g,
            letters: /[mMyYdD]/
        }
        const resultArray = Object.values(value).filter(el => el !== separator).map((el) => el.search(regex[looking])).filter(el => el === 0)
        return resultArray.length
    }

    const isCurrValueHaveDigits = (currValue) => {
        const quantityDigits = findDigitsOrLettersInValue({value: currValue, looking: 'digits'})
        const resultIndexLetters = Object.values(currValue).findIndex(el => {
            const regex = /[mMyYdD]/
            const result = el.search(regex)
            return result === 0
        })
        const quantityLetters = findDigitsOrLettersInValue({value: currValue, looking: 'letters'})
        return {
            allDigits: Boolean(quantityDigits === 8),
            indexLetter: resultIndexLetters,
            allLetters: Boolean(quantityLetters === 8)
        }
    }

    const onClick = (e) => {
        const {allDigits, indexLetter} = isCurrValueHaveDigits(value)
        if (allDigits) {
            let {selectionStart} = e.target;
            setPosCursor({
                ...positionCursor,
                start: selectionStart,
                end: selectionStart + 1
            })
        } else if (indexLetter) {
            setPosCursor({
                ...positionCursor,
                start: indexLetter,
                end: indexLetter + 1
            })
            setCursor(!toggleCursor)
        } else {
            setCursor(!toggleCursor)
        }

    }

    const checkOneValue = (val, position) => {
        const newString = Object.values({...value, [position]: val}).join('');
        const letter = letterObject[position]
        let newVal;
        if (letter === "d") {
            newVal = newString.slice(0, 2)
        } else if (letter === "m") {
            newVal = newString.slice(3, 5)
        } else if (letter === "y") {
            newVal = newString.slice(6, 10)
        } else {
            newVal = newString.slice(2, 3)
        }
        const isMatch = regex[letter].test(newVal)
        return isMatch
    }

    const checkManyValue = (pasteString, position) => {
        let arrayLetter = [], resultArray = []
        const arrayPaste = [...pasteString]
        let pos = position - 1
        for (const [index] of arrayPaste.entries()) {
            pos += 1
            arrayLetter[index] = letterObject[pos]
        }
        let day = [], month = [], year = [], sep = []
        arrayLetter.forEach(el => {
            if (el === 'd' && day.length === 0) {
                day.push('d')
            } else if (el === 'm' && month.length === 0) {
                month.push('m')
            } else if (el === 'y' && year.length === 0) {
                year.push('y')
            } else if (el === '/' || el === '.') {
                sep.push(el)
            }

        })
        let newArrayLetter = [...day, sep[0], ...month, sep[1], ...year];
        for (const key of newArrayLetter) {
            const element = ['d', 'm', 'y', '/', '.'].find(el => el === key)
            if (key === element && key !== undefined) {
                const isMatch = pasteString.search(regex[key])
                if (isMatch === 0) {
                    resultArray.push(pasteString)
                } else {
                    for (const [index] of arrayPaste.entries()) {
                        resultArray.push(letterObject[index + 1])
                    }

                }
            }
        }
        console.log({pasteString}, {position}, {arrayLetter}, {newArrayLetter}, {resultArray})

        return resultArray

    }

    const onHandleChange = (e) => {

        const {selectionStart, selectionEnd, value: curValue} = e.target;
        console.log({curValue})
        const valueArray = [...curValue];
        const newPositionStart = selectionStart - 1;
        const newValue = valueArray[newPositionStart]
        const reg = /[\d]/g;
        const isValidValue = reg.test(newValue)
        let newState;
        if (isValidValue && selectionStart < 11) {
            const isMatch = checkOneValue(newValue, selectionStart)
            if (isMatch) {
                newState = {...value, [selectionStart]: newValue};
                setValue(newState)
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
                    newState = {
                        ...value,
                        [selectionStart]: '0',
                        [nextValue]: newValue
                    }
                    setValue(newState)
                    setPosCursor({
                        ...positionCursor,
                        start: newSelect,
                        end: newSelect + 1,
                    })
                } else if (selectionStart === 7) {
                    const nextValue = selectionStart + 2;
                    const nextSelStart = selectionStart + 1;
                    newState = {
                        ...value,
                        [selectionStart]: '2',
                        [nextSelStart]: '0',
                        [nextValue]: newValue
                    }
                    setValue(newState)
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
                    newState = {...value}
                    setCursor(!toggleCursor)
                }
            }
        } else {
            newState = {...value}
            setCursor(!toggleCursor)
        }

        onChange?.(Object.values(newState).join(''))

    }

    const createObject = (string) => {
        let newObject = {};
        [...string].forEach(((el, index) => {
            newObject[index + 1] = el
        }))
        return newObject;
    }

    const onKeyDown = (e) => {
        const {key, target: {selectionStart}} = e;
        let newState;
        if (key === "Backspace" || key === "Delete") {
            if (selectionStart !== 0) {
                e.preventDefault()
                const newValue = letterObject[selectionStart];
                newState = {
                    ...value,
                    [selectionStart]: newValue
                }
                setValue(newState)
                const newStart = selectionStart - 1;
                const newEnd = newStart + 1
                setPosCursor({
                    ...positionCursor,
                    start: newStart,
                    end: newEnd
                })
                onChange?.(Object.values(newState).join(''))
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
            const arrayValue = checkManyValue(paste, selectionStart + 1)
            const newValueString = [prevValue, ...arrayValue, postValue].join('')
            console.log({newValueString})
            setValue({
                ...value,
                ...createObject(newValueString)
            })
        }
    }

    const onHandleMouseEnter = (e) => {
        if (showMaskOnHover && statePlaceholder === '' && !maskOnFocus) {
            setStatePlaceholder(mask)
        }
    }

    const onHandleMouseLeave = (e) => {
        if (showMaskOnHover && statePlaceholder && !maskOnFocus) {
            setStatePlaceholder('')
        }
    }

    const onHandleBlur = (e) => {
        const {allLetters} = isCurrValueHaveDigits(value)
        if (allLetters && showMaskOnFocus && maskOnFocus) {
            setMaskOnFocus(false)
        }
    }

    const newState = Object.keys(value)?.length > 0 ? Object.values(value).join('') : value
    return (
        <input ref={myRef} placeholder={statePlaceholder} type='text'
               onClick={onClick} className={className}
               onFocus={onFocus} value={maskOnFocus ? newState : ''} onChange={onHandleChange} onKeyDown={onKeyDown}
               autoComplete='off' onPaste={onHandlePaste} onMouseEnter={onHandleMouseEnter}
               onMouseLeave={onHandleMouseLeave} onBlur={onHandleBlur}></input>
    )
}
//48/12/2005


