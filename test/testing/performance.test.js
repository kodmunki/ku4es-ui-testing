import assert from 'assert';
import { describe, it } from 'mocha';
import performance from '../../src/testing/performance';

describe('performance Test', () => {

  it('should pass', () => {
    const test = () => 1 + 1;
    assert.ok(performance(test) < 10);
  });

  it('should fail', () => {
    const test = () => { for(let i = 0; i < 100000; i++) { Math.pow(i, i); } };
    assert.ok(!performance(test) < 400);
  });

});
