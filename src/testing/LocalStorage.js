export default class LocalStorage {

  constructor() {
    this._store = { }
  }

  getItem(key) {
    return this._store[key];
  }

  setItem(key, value) {
    this._store[key] = value;
  }

  removeItem(key) {
    delete this._store[key];
  }

}
