import React from 'react';

function ExampleFirst(props) {
  const { nextStep } = props;

  return (
    <div>
      First Step!
      <button onClick={nextStep}>Next</button>
    </div>
  )

}

export default ExampleFirst;
