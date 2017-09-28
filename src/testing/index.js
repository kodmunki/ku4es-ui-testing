import { Assert } from 'ku4es-kernel';
import LocalStorage from './LocalStorage';

let jsDom;
let virtualConsole;

function jsdom(markup, config = {}) {
  if(!Assert.exists(jsDom)) {
    const { JSDOM, VirtualConsole } = require('jsdom');
    jsDom = JSDOM;
    virtualConsole = new VirtualConsole();
  }
  const _config = Assert.exists(config.virtualConsole) ? config : Object.assign(config, { virtualConsole });
  return new jsDom(markup, _config);
}

function testDom(markup = '<!DOCTYPE html><body></body></html>', config) {
  const dom = jsdom(markup, config);
  const { window } = dom;
  window.localStorage = new LocalStorage();
  window.location.setUrl = (url) => dom.reconfigure({ url });
  global.window  = window;
  global.navigator = 'ku4es';
  global.document = window.document;
}

function loadDom(markup = '', config) {
  loadSafeDom(markup, Object.assign({
    features: {
      FetchExternalResources : ['img', 'script'],
      ProcessExternalResources: ['img', 'script']
    },
    resources: 'usable',
    runScripts: 'dangerously'
  }, config));
}

function loadSafeDom(markup = '', config) {
  const dom = Assert.isNullOrEmpty(markup) ? '' : markup;
  testDom(`<!DOCTYPE html><html><body>${dom}</body></html>`, config);
}

function unloadDom() {
  window.close();
  delete global.window;
  delete global.navigator;
  delete global.document;
}

function click(dom, event, bubbles = true, cancelable = true) {
  const mouseEvent = new window.MouseEvent('click', { bubbles, cancelable, view: window });
  Object.assign(mouseEvent, event);
  dom.dispatchEvent(mouseEvent);
}

function keyUp(dom, event) {
  keyEvent(dom, event, 'keyup');
}

function keyEvent(dom, event, type) {
  const { keyCode, which, code, ctrlKey = false, shiftKey = false, altKey = false, metaKey = false } = event;
  const _event = (Assert.isNumber(event)) ? { keyCode: event, which: event }
    : (Assert.exists(keyCode)) ? { keyCode, which: keyCode }
      : (Assert.exists(which)) ? { keyCode: which, which }
        : { keyCode: code, which: code };

  const keyboardEvent = new window.KeyboardEvent(type, {
    keyCode: _event.keyCode,
    which: _event.which,
    charCode: String.fromCharCode(_event.keyCode),
    code, ctrlKey, shiftKey, altKey, metaKey
  });

  dom.dispatchEvent(keyboardEvent);
}

export {
  loadDom,
  loadSafeDom,
  unloadDom,
  testDom,
  click,
  keyUp,
  keyEvent
};
