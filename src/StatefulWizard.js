import React, { useReducer, useState } from 'react'
import { generateLocalStorageBackedReducer } from './localStorageUtils'
import { reducer, resetValues, updateValues } from './wizardReducer'

function StatefulWizard(props) {
  const { children, name, onStartOver, onFinish, resetSetter } = props
  const childArray = React.Children.toArray(children)
  // set up a local storage backed reducer, so that we get resumes across reload, etc
  const { storageBackedReducer, initialValue } = generateLocalStorageBackedReducer(name, reducer)
  const [formData, formDataDispatch] = useReducer(storageBackedReducer, initialValue)
  const initialStepState = {
    currentStep: 0,
    totalSteps: childArray.length
  }
  // data to track what step we're on

  const [stepState, setStepState] = useState(initialStepState)

  /** Resetting the wizard clears the form data and sets us to the initial step state
   *
   */
  function resetWizard() {
    formDataDispatch(resetValues())
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
    if (finishValue) {
      onFinish(finishValue)
    } else {
      onFinish(formData)
    }
    resetWizard()
  }

  /**
   * nextStep advances us to the next step,
   * if we have it
   */
  function nextStep() {
    if (stepState.currentStep === childArray.length - 1) {
      return
    }
    setStepState({
      ...stepState,
      currentStep: stepState.currentStep + 1
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

export { StatefulWizard }
