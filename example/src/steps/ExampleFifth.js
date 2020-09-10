import React from 'react'


function ExampleFifth(props){
  const { finish } = props;


  return (
    <div>
      Fifth step! Clicking finish calls onFinish, and resets the form!
      <button onClick={() => finish()}>Finish</button>
    </div>
  )
}

export default ExampleFifth
