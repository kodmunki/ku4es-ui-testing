import { Assert } from 'ku4es-kernel';

let jsDom;
let virtualConsole;

export const jsdom = (markup, config = {}) => {
  if(!Assert.exists(jsDom)) {
    const { JSDOM, VirtualConsole } = require('jsdom');
    jsDom = JSDOM;
    virtualConsole = new VirtualConsole();
  }
  const _config = Assert.exists(config.virtualConsole) ? config : Object.assign({}, config, { virtualConsole });
  return new jsDom(markup, Object.assign({url: 'http://localhost'}, _config));
};

export const testDom = (markup = '<!DOCTYPE html><html><head></head><body></body></html>', config) => {
  const dom = jsdom(markup, config);
  const { window } = dom;
  window.location.setUrl = url => dom.reconfigure({ url });
  global.window  = window;
  global.document = window.document;
};

export const loadDom = (markup = '', config) => {
  loadSafeDom(markup, Object.assign({
    features: {
      FetchExternalResources : ['img', 'script'],
      ProcessExternalResources: ['img', 'script']
    },
    resources: 'usable',
    runScripts: 'dangerously'
  }, config));
};

export const loadSafeDom = (markup = '', config) => {
  const dom = Assert.isNullOrEmpty(markup) ? '' : markup;
  testDom(`<!DOCTYPE html><html><head></head><body>${dom}</body></html>`, config);
};

export const unloadDom = () => {
  window.close();
  delete global.window;
  delete global.navigator;
  delete global.document;
};

export const click = (dom, event, bubbles = true, cancelable = true) => {
  const mouseEvent = new window.MouseEvent('click', { bubbles, cancelable, view: window });
  Object.assign(mouseEvent, event);
  dom.dispatchEvent(mouseEvent);
};

export const keyUp = (dom, event) => {
  keyEvent(dom, event, 'keyup');
};

export const keyEvent = (dom, event, type) => {
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
};
