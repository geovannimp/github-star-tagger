import * as React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

it('should render application without crashing', () => {
  shallow(<App />);
});