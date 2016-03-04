import chai, { expect } from 'chai';
import mockery from 'mockery';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('Wrapper Admin Page', () => {
  describe('Without DOM', () => {
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
    });

    afterEach(() => {
      mockery.deregisterMock('decorators/pureRender');
      mockery.disable();
    });

    it('should work', () => {
      const WrapperAdminPage = require('../WrapperAdminPage');
      const wrapper = shallow(
        <WrapperAdminPage />
      );
      expect(wrapper).to.have.length(1);
    });
  });
});
