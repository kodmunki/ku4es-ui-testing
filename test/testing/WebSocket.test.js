import assert from 'assert';
import { describe, it } from 'mocha';
import WebSocket from '../../src/testing/WebSocket';

describe('WebSocket Test', () => {
  it('should init', () => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.open();
    socket.send('message');
    socket.close();
    socket.error();
  });

  it('should open', (done) => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.addEventListener('open', () => {
      assert.equal(socket.readyState, 1);
      done();
    });
  });

  it('should close', (done) => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.addEventListener('close', () => {
      assert.equal(socket.readyState, 3);
      done();
    });
    socket.close();
  });

  it('should error', (done) => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.addEventListener('error', () => {
      assert.equal(socket.readyState, 3);
      done();
    });
    socket.error();
  });

  it('should not send on closed socket', () => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.addEventListener('message', (message) => {
      assert.equal(message, 'message');
    });
    assert.throws(() => socket.send('message'));
  });

  it('should send', (done) => {
    const socket = new WebSocket('ws://ws.endpoint');
    socket.addEventListener('message', (message) => {
      assert.equal(message, 'message');
      done();
    });
    socket.open();
    socket.send('message');
  });

  it('should instances', () => {
    const socket = new WebSocket('ws://ws.endpoint');

    let open, close, send;
    socket.addEventListener('open', () => (open = true));
    socket.addEventListener('message', message => (send = message));
    socket.addEventListener('close', () => (close = true));

    WebSocket.instances['ws://ws.endpoint'].open();
    WebSocket.instances['ws://ws.endpoint'].send('message');
    WebSocket.instances['ws://ws.endpoint'].close();

    assert.ok(open);
    assert.equal(send, 'message');
    assert.ok(close);

    socket.removeEventListener('message');
    WebSocket.instances['ws://ws.endpoint'].open();
    WebSocket.instances['ws://ws.endpoint'].send('another message');
    assert.equal(send, 'message');

  });

});
