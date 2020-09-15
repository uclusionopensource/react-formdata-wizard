![UclusionWizard](./UclusionWizard.png)
# react-formdata-wizard

> React wizard that maintains step state and form data for you. Form data is automagically
>saved to the local storage of the browser, so you don't have to worry about reloads
> or any other ram-state destroying event.

[![NPM](https://img.shields.io/npm/v/react-formdata-wizard.svg)](https://www.npmjs.com/package/react-formdata-wizard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-formdata-wizard
```

## Usage

```jsx
import React, { Component } from 'react'

import FormdataWizard from 'react-formdata-wizard'
import 'react-formdata-wizard/dist/index.css'

class Example extends Component {
  render() {
    return (
      <FormdataWizard>
        <Step0/>
        <Step1/>
        ...
      </FormdataWizard>
  )
  }
}
```
## General Ethos
This package does _NOT_ render any UI by itself. It doesn't have any buttons, nor does it specify fancy transitions.
What it will do is maintain the current step progress and any form data you give to it. The form data passed in is
persisted into the browsers local storage until the form is either started over or reset.

## Child internal state
The actual step rendered is a _clone_ of the child representing the current step. For this reason children
cannot maintain their own state, and should use the form data instead of useState or useReducer

## Props accepted by the Wizard
Property Name | Property Description | Required
--- | --- | ---
name | the 'name' of the wizard. Should be unique as it will determine the local storage key used | Y
onStartOver | function called with zero arguments that is called when the form is started over _without_ completing | N
onFinish | function called with either the form data or a specific return value that is called when the form finishes normally | N
resetSetter | function that will be called with a variable containing a function that can reset the wizard. This allows higher level components to cause a reset for their own reasons. | N


## Props provided to All Children
Property Name | Property Description
--- | ---
currentStep | the 0-indexed step number we're on
totalSteps | the number of steps we have
formData | the current form data accumulated so far
updateFormData | function that takes an update object and merges the existing formdata with the update object
clearFormData | function that resets the form data to the empty object
nextStep | function that advances the wizard to the next step
previousStep | function that regresses teh wizzard to the previous step
startOver | function that calls onStartOver and then resets the wizard to the initial state
active | boolean that tells the step if it is the currently active step
finish | function taking one optional argument that calls the provided onFinish with that argument, or if not provided the current form state, then resets the wizard to the initial state

## License

GPLv3 © Uclusion Inc, 2020 [BFUculsion](https://github.com/BFUculsion)
