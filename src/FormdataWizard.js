import React, { useReducer } from 'react'
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
  const initialStepState = {
    currentStep: startStep, // start where we're told if not 0
    totalSteps: childArray.length
  }

  const initialState = { steps: initialStepState, formData: defaultFormData }

  // optionally set up a local storage backed reducer,
  // so that we get resumes across reload, etc
  const { storageBackedReducer, initialValue } = useLocalStorage
    ? generateLocalStorageBackedReducer(name, reducer, initialState)
    : { storageBackedReducer: reducer, initialValue: initialState }
  const [stateData, stateDataDispatch] = useReducer(
    storageBackedReducer,
    initialValue
  )
  // data to track what step we're on
  /** Resetting the wizard clears the form data and sets us to the initial step state
   *
   */
  function resetWizard() {
    clearStorage(name)
    stateDataDispatch(resetValues(initialState))
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
    const clone = { ...stateData.formData }
    // Should not reset the in memory values here or will cause re-render and be visible to user
    clearStorage(name)
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
    const { steps } = stateData
    if (steps.currentStep >= childArray.length - increment) {
      return
    }
    const newSteps = {
      ...steps,
      currentStep: steps.currentStep + increment
    }
    stateDataDispatch(updateValues({ steps: newSteps }))
  }

  /**
   * previousStep moves us back one step if it exists
   */
  function previousStep() {
    const { steps } = stateData
    if (steps.currentStep === 0) {
      return
    }
    const newSteps = {
      ...steps,
      currentStep: steps.currentStep - 1
    }
    stateDataDispatch(updateValues({ steps: newSteps }))
  }

  function getCurrentStepContents() {
    const { steps, formData } = stateData
    const props = {
      steps,
      formData,
      updateFormData: (data) =>
        stateDataDispatch(updateValues({ ...formData, ...data })),
      clearFormData: () => stateDataDispatch(resetValues(initialState)),
      nextStep,
      previousStep,
      startOver,
      active: true,
      finish
    }
    const currentStep = childArray[steps.currentStep]
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
