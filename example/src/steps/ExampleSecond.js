import React from 'react'

function ExampleSecond(props) {
  const { previousStep, nextStep } = props

  return (
    <div>
      Second Step!
      <button onClick={previousStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}

export default ExampleSecond
