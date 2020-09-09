import React from 'react'

import StatefulWizard from 'react-stateful-wizard'
import 'react-stateful-wizard/dist/index.css'

const App = () => {
  return (
    <StatefulWizard name="foo">
      <div>FirstChild</div>
      <div>SecondChild</div>
    </StatefulWizard>
  )
}

export default App
