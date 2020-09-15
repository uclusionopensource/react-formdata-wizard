import React, { useState } from 'react'
import ExampleFirst from './steps/ExampleFirst'
import ExampleSecond from './steps/ExampleSecond'
import FormdataWizard from 'react-formdata-wizard'
import ExampleThird from './steps/ExampleThird'
import ExampleFourth from './steps/ExampleFourth'
import ExampleFifth from './steps/ExampleFifth'


const App = () => {
  const [lastForm, setLastForm] = useState(null);


  function onFinsh(data) {
    setLastForm(data);
  }

  return (
    <div>
    <FormdataWizard name="foo" onFinish={onFinsh}>
      <ExampleFirst/>
      <ExampleSecond/>
      <ExampleThird/>
      <ExampleFourth/>
      <ExampleFifth/>
    </FormdataWizard>
      {lastForm && (<div>
        Last form step 3 called with {lastForm.thirdInput}
      </div>)}
    </div>
  )
}

export default App
