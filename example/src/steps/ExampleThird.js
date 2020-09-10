import React from 'react'

function ExampleThird(props){
  const { formData, updateFormData, previousStep, nextStep } = props;

  function handleInputChange(event) {
    const update = { thirdInput: event.target.value};
    updateFormData(update)  ;
  }

  return (
    <div>
      Third Step! This one Saves state across reloads!
      <button onClick={previousStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
      <textarea value={formData.thirdInput} onChange={handleInputChange}/>
    </div>
  )
}

export default ExampleThird
