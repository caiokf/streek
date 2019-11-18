import { h } from 'preact'
import { shallow } from 'enzyme'
import Header from '../src/components/header'

describe('Initial Test of the Header', () => {
	test('Header renders 3 nav items', () => {
		const context = shallow(<Header />)
		expect(context.find('h1').text()).toBe('Streek')
		expect(context.find('Link').length).toBe(2)
	})
})
