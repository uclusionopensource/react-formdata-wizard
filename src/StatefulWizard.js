import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { generateLocalStorageBackedReducer } from './localStorageUtils'
import { reducer, resetValues } from './wizardReducer'

export function StatefulWizard(props) {
  const { children, name, onStartOver, onFinish } = props
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
  function myOnStartOver() {
    // zero all form data
    resetWizard()
    onStartOver()
  }

  /**
   * On finish clones the data so that future object updates don't get lost,
   * then calls onFinish with the cloned data, and then resets us
   * @param formData
   */
  function myOnFinish(formData) {
    const cloned = { ...formData }
    onFinish(cloned)
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
      formDataDispatch,
      nextStep,
      previousStep,
      onStartOver: myOnStartOver,
      active: true,
      onFinish: myOnFinish
    }
    const currentStep = childArray[stepState.currentStep]
    if (!currentStep) {
      return React.Fragment
    }
    // Because we use clone element here, the internal state of the element can't be maintained. Hence
    // callers should use the formdata to pass values.
    return React.cloneElement(currentStep, props)
  }

  const currentStep = getCurrentStepContents()
  return currentStep;
}

StatefulWizard.propTypes = {
  name: PropTypes.string.isRequired,
  onStartOver: PropTypes.func,
  onFinish: PropTypes.func
}

StatefulWizard.defaultProps = {
  onStartOver: () => {
  },
  onFinish: () => {
  }
}
