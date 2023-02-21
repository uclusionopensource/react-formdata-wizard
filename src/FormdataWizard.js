import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import {
  clearStorage,
  generateLocalStorageBackedReducer
} from './localStorageUtils'
import { reducer, resetValues, updateValues } from './wizardReducer'

function FormdataWizard(props) {
  const {
    children,
    name,
    onStartOver,
    onFinish,
    resetSetter,
    defaultFormData,
    startStep,
    useLocalStorage
  } = props
  const childArray = React.Children.toArray(children)
  // optionally set up a local storage backed reducer,
  // so that we get resumes across reload, etc
  const { storageBackedReducer, initialValue } = useLocalStorage
    ? generateLocalStorageBackedReducer(name, reducer, defaultFormData)
    : { storageBackedReducer: reducer, initialValue: defaultFormData }
  const [formData, formDataDispatch] = useReducer(
    storageBackedReducer,
    initialValue
  )
  const initialStepState = {
    currentStep: startStep, // start where we're told if not 0
    totalSteps: childArray.length
  }
  // data to track what step we're on

  const [stepState, setStepState] = useState(initialStepState)

  /** Resetting the wizard clears the form data and sets us to the initial step state
   *
   */
  function resetWizard() {
    formDataDispatch(resetValues())
    // we'll also manually, clear the stored data, in case we navigate away before the dispatcher fires
    clearStorage(name)
    // reset the step state
    setStepState(initialStepState)
  }

  /**
   * Start over just resets us, and calls the start over function
   */
  function startOver() {
    // zero all form data
    resetWizard()
    onStartOver()
  }

  /**
   * finish calls onFinish with either the passed in finish value or the form data at time of creation
   * @param finishValue Optional, if not passed, the form data at time of bind of this function will be passed
   */
  function finish(finishValue) {
    const clone = { ...formData }
    resetWizard()
    if (finishValue) {
      onFinish(finishValue)
    } else {
      onFinish(clone)
    }
  }

  /**
   * nextStep advances us to the next step,
   * if we have it - by increment if provided
   */
  function nextStep(increment = 1) {
    if (stepState.currentStep >= childArray.length - increment) {
      return
    }
    setStepState({
      ...stepState,
      currentStep: stepState.currentStep + increment
    })
  }

  /**
   * previousStep moves us back one step if it exists
   */
  function previousStep() {
    if (stepState.currentStep === 0) {
      return
    }
    setStepState({
      ...stepState,
      currentStep: stepState.currentStep - 1
    })
  }

  function getCurrentStepContents() {
    const props = {
      ...stepState,
      formData,
      updateFormData: (data) => formDataDispatch(updateValues(data)),
      clearFormData: () => formDataDispatch(resetValues()),
      nextStep,
      previousStep,
      startOver,
      active: true,
      finish
    }
    const currentStep = childArray[stepState.currentStep]
    if (!currentStep) {
      return React.Fragment
    }
    // Because we use clone element here, the internal state of the element can't be maintained. Hence
    // callers should use the formdata to pass values.
    return React.cloneElement(currentStep, props)
  }

  resetSetter(resetWizard)
  return getCurrentStepContents()
}

FormdataWizard.propTypes = {
  onFinish: PropTypes.func,
  resetSetter: PropTypes.func,
  onStartOver: PropTypes.func,
  name: PropTypes.string.isRequired,
  startStep: PropTypes.number,
  useLocalStorage: PropTypes.bool
}

FormdataWizard.defaultProps = {
  onFinish: () => {},
  resetSetter: () => {},
  onStartOver: () => {},
  startStep: 0,
  useLocalStorage: true
}

export { FormdataWizard }
