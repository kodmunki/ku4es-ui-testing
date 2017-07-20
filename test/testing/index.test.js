import assert from 'assert';
import { describe, it } from 'mocha';
import jsdom from 'jsdom';
import { loadDom, loadSafeDom, unloadDom, testDom, click, keyUp, waitToAssert } from '../../src/testing';

describe('testing Test', () => {

  it('testDom default', () => {
    testDom();
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    unloadDom();
  });

  it('testDom custom', () => {
    testDom('<!DOCTYPE html><body><div></div></body></html>', { virtualConsole: new jsdom.VirtualConsole() });
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.equal(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('loadDom default', () => {
    loadDom();
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    unloadDom();
  });

  it('loadDom custom', () => {
    loadDom('<div></div>');
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.equal(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('loadSafeDom default', () => {
    loadSafeDom();
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    unloadDom();
  });

  it('loadSafeDom custom', () => {
    loadSafeDom('<div></div>');
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.equal(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('click', () => {
    loadDom('<button id="button" onclick="this.innerHTML = 1;">0</button>');
    click(document.querySelector('#button'));
    assert.equal(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp keyCode', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { keyCode: 27 });
    assert.equal(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp which', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { which: 27 });
    assert.equal(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp code', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { code: 27 });
    assert.equal(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp code as number', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), 27);
    assert.equal(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('should wait to assert', (done) => {
    waitToAssert(100, () => {
      assert.ok(true);
      done();
    })
  });

});
