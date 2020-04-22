import assert from 'assert';
import { describe, it } from 'mocha';
import jsdom from 'jsdom';
import { loadDom, loadSafeDom, unloadDom, loadTestDom, click, keyUp } from '../../src/testing';

describe('testing Test', () => {

  it('loadTestDom default', () => {
    loadTestDom();
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    unloadDom();
  });

  it('loadTestDom custom', () => {
    loadTestDom('<!DOCTYPE html><html><head></head><body><div></div></body></html>', { virtualConsole: new jsdom.VirtualConsole() });
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.strictEqual(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('loadDom default', () => {
    loadDom();
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.strictEqual(window.location.href, 'http://localhost/');
    window.location.setUrl('http://new.url.com');
    assert.strictEqual(window.location.href, 'http://new.url.com/');
    unloadDom();
  });

  it('loadDom custom', () => {
    loadDom('<div></div>');
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.strictEqual(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('loadDom custom head and body', () => {
    loadDom({
      head: '<meta name="value"/>',
      body: '<div></div>'
    });
    assert.ok(window);
    assert.ok(window.localStorage);
    assert.ok(document);
    assert.strictEqual(document.head.innerHTML, '<meta name="value">');
    assert.strictEqual(document.getElementsByTagName('div').length, 1);
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
    assert.strictEqual(document.getElementsByTagName('div').length, 1);
    unloadDom();
  });

  it('click', () => {
    loadDom('<button id="button" onclick="this.innerHTML = 1;">0</button>');
    click(document.querySelector('#button'));
    assert.strictEqual(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp keyCode', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { keyCode: 27 });
    assert.strictEqual(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp which', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { which: 27 });
    assert.strictEqual(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp code', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), { code: 27 });
    assert.strictEqual(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

  it('keyUp code as number', () => {
    loadDom('<button id="button" onkeyup="this.innerHTML = 1;">0</button>');
    keyUp(document.querySelector('#button'), 27);
    assert.strictEqual(document.querySelector('#button').innerHTML, '1');
    unloadDom();
  });

});
