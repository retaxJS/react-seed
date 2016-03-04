import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Make RootApp', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock(
      'decorators/pureRender',
      require('helpers/test/decoratorsMock').pureRender
    );
    mockery.registerMock(
      'containers/AppPage',
      require('helpers/test/componentsMock').AppPage
    );
    mockery.registerMock(
      'react-redux',
      require('helpers/test/reactReduxMock')
    );
    mockery.registerMock(
      'radium',
      require('helpers/test/radiumMock')
    );
    mockery.registerMock('material-ui/lib/styles', {
      ThemeDecorator: () => args => args,
      getMuiTheme: () => ({}),
    });
  });

  afterEach(() => {
    mockery.deregisterMock('decorators/pureRender');
    mockery.deregisterMock('containers/AppPage');
    mockery.deregisterMock('react-redux');
    mockery.deregisterMock('radium');
    mockery.deregisterMock('material-ui/lib/styles');
    mockery.disable();
  });

  it('should exists', () => {
    const makeRootApp = require('../RootApp');

    const RootApp = makeRootApp('all');

    const wrapper = shallow((
      <RootApp />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render the RootApp components', () => {
    const makeRootApp = require('../RootApp');

    const RootApp = makeRootApp('all');

    const wrapper = shallow((
      <RootApp />
    ));

    expect(wrapper).to.have.length(1);
    expect(wrapper.find('Style')).to.have.length(1);
    expect(wrapper.find('StyleRoot')).to.have.length(1);
    expect(wrapper.find('AppPage')).to.have.length(1);
  });
});