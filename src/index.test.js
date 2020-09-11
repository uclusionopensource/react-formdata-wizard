import React from 'react'
import Renderer from 'react-test-renderer'
import { StatefulWizard } from './StatefulWizard'

const Step1 = (props) => <button onClick={props.nextStep} />
const StepLast = (props) => <button onClick={props.finish('foo')} />

test('Renders only the first step', () => {
  const component = Renderer.create(
    <StatefulWizard name='simple'>
      <Step1 />
      <StepLast />
    </StatefulWizard>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  // trigger next step
})
