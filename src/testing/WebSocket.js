import { nextTick } from 'ku4es-kernel';

/**
 * WebSocket readyState
 * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
 */
const readyState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export default class WebSocket {

  static instances = {};

  #readyState;
  #listeners = {
    open: () => {},
    message: () =>{},
    close: () => {},
    error: () => {},
  };

  /**
   * WebSocket stub to be used for unit testing
   * @param {string} url - url to connect to.
   */
  constructor(url) {
    /**
     * Retains a list of active WeSocket stubs. Useful for
     * unit testing server drops.
     * @type {WebSocket}
     */
    WebSocket.instances[url] = this;

    /** Simulate socket open on next event loop */
    nextTick(() => this.open());
  }

  get readyState() {
    return this.#readyState;
  }

  open() {
    this.#readyState = readyState.OPEN;
    this.#listeners.open();
  }

  close() {
    this.#readyState = readyState.CLOSED;
    this.#listeners.close();
  }

  error() {
    this.#readyState = readyState.CLOSED;
    this.#listeners.error();
  }

  /**
   * Send message
   * @param {string} message - message to send
   */
  send(message) {
    this.#listeners.message(message);
  }

  addEventListener(action, method) {
    this.#listeners[action] = method;
  }

  removeEventListener(action) {
    this.#listeners[action] = () => {};
  }

}
