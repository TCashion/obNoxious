import React from 'react';
import { render } from '@testing-library/react';
import NavDropdown from './NavDropdown';

// bypass mapbox error
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
}));

test('<NavDropdown /> created', () => {
    const wrapper = render(<NavDropdown />);
    expect(wrapper.baseElement.tagName).toBe('BODY')
});