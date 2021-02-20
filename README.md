# react-input-date-mask

[![Build Status](https://img.shields.io/travis/sanniassin/react-input-mask/master.svg?style=flat)](https://travis-ci.org/sanniassin/react-input-mask) [![npm version](https://img.shields.io/npm/v/react-input-mask.svg?style=flat)](https://www.npmjs.com/package/react-input-mask) [![npm downloads](https://img.shields.io/npm/dm/react-input-mask.svg?style=flat)](https://www.npmjs.com/package/react-input-mask)

Input date masking component for React. React-input-date-mask requires React 16.8.0 or later.

#### [Demo]()

# Table of Contents
* [Install](#install)
* [Usage](#usage)
* [Properties](#properties)
* [Examples](#examples)

# Install
```npm install react-input-date-mask --save```

# Usage
```jsx
import React from 'react';
import ReactInputDateMask from 'react-input-date-mask';

function DateInput(props) {
    return <ReactInputDateMask  mask='dd/mm/yyyy' showMaskOnFocus={true}  className={props.className} value={props.value} onChange={props.onChange} showMaskOnHover={true} />;
  
}
```

# Properties
|                           Name                            |               Type                | Default | Description |
|        :-----------------------------------------:        |    :-------------------------:    | :-----: | :--------------------------------------------------------------------- |
|                    **[`mask`](#mask)**                    |       `{String}`          |   'dd.mm.yyyy'   | Mask format |
|          **[`showMaskOnFocus`](#showMaskOnFocus)**        |       `{Boolean}`         |     `false`      | If this option - true, the mask will only be displayed when an event occurs onFocus |
| **[`showMaskOnHover`](#showMaskOnHover)**                 |       `{Boolean}`         |     `false`      |  |
|                **[`className`](#className)**              |     `{String}`            |        ' '       | You can pass a class input |

### `mask`
Mask format. Can be a string. There are two options. The first option by default: 'dd.mm.yyyy'. The second options: 'mm.dd.yyyy' <br /><br />