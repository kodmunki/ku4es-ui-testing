import assert from 'assert';
import { describe, it } from 'mocha';
import LocalStorage from '../../src/testing/LocalStorage';

describe('LocalStorage Test', () => {
  it('should get, set, and remove', () => {
    const localStorage = new LocalStorage();

    localStorage.setItem('key', 'value');
    assert.equal(localStorage.getItem('key'), 'value');

    localStorage.removeItem('key');
    assert.ok(!localStorage.getItem('key'));
  });
});
