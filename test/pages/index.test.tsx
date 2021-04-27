import React from 'react'
import renderer from 'react-test-renderer'
import HomePage from '../../pages/index'

describe('Home page', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomePage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
