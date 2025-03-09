// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
if (typeof global.structuredClone !== 'function') {
    global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
  }

import 'fake-indexeddb/auto';
import '@testing-library/jest-dom';
