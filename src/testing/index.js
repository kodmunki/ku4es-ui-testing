import { Assert } from 'ku4es-kernel';

let jsDom;
let virtualConsole;

function jsdom(markup, config = {}) {
  if(!Assert.exists(jsDom)) {
    const { JSDOM, VirtualConsole } = require('jsdom');
    jsDom = JSDOM;
    virtualConsole = new VirtualConsole();
  }
  const _config = Assert.exists(config.virtualConsole) ? config : Object.assign({}, config, { virtualConsole });
  return new jsDom(markup, Object.assign({url: 'http://localhost'}, _config));
}

function loadTestDom(markup = '<!DOCTYPE html><html><head></head><body></body></html>', config) {
  const dom = jsdom(markup, config);
  const { window } = dom;
  window.location.setUrl = url => dom.reconfigure({ url });
  global.window  = window;
  global.document = window.document;
}

function loadDom(content, config) {
  loadSafeDom(content, Object.assign({
    features: {
      FetchExternalResources : ['img', 'script'],
      ProcessExternalResources: ['img', 'script']
    },
    resources: 'usable',
    runScripts: 'dangerously'
  }, config));
}

function loadSafeDom(content, config) {
  const head = content && content.head ? content.head : '';
  const body = content && content.body ? content.body : content;
  loadTestDom(`<!DOCTYPE html><html>${head || ''}<head></head><body>${Assert.isString(body) ? body : ''}</body></html>`, config);
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
  loadTestDom,
  unloadDom,
  click,
  keyUp,
  keyEvent
};
