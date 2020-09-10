import React from 'react'


function ExampleFourth(props){
  const { nextStep   } = props;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      nextStep()
      resolve(true)
    }, 3000)
  })

  return (
    <div>
      Fourth Step! This one automatically advances after a 3 second pause expires!
    </div>
  )
}

export default ExampleFourth
