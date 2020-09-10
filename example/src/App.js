import React, { useState } from 'react'
import ExampleFirst from './steps/ExampleFirst'
import ExampleSecond from './steps/ExampleSecond'
import StatefulWizard from 'react-stateful-wizard'
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
    <StatefulWizard name="foo" onFinish={onFinsh}>
      <ExampleFirst/>
      <ExampleSecond/>
      <ExampleThird/>
      <ExampleFourth/>
      <ExampleFifth/>
    </StatefulWizard>
      {lastForm && (<div>
        Last form step 3 called with {lastForm.thirdInput}
      </div>)}
    </div>
  )
}

export default App
