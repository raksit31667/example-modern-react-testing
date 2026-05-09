import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './mocks/server'
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: (key: string) => {
    return localStorageMock.store[key] || null
  },
  setItem: (key: string, value: string) => {
    localStorageMock.store[key] = value
  },
  removeItem: (key: string) => {
    delete localStorageMock.store[key]
  },
  clear: () => {
    localStorageMock.store = {}
  },
  key: (index: number) => {
    const keys = Object.keys(localStorageMock.store)
    return keys[index] || null
  },
  get length() {
    return Object.keys(localStorageMock.store).length
  },
  store: {} as Record<string, string>,
}

global.localStorage = localStorageMock as unknown as Storage

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
})

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers()
  localStorageMock.clear()
})

// Clean up after the tests are finished
afterAll(() => server.close())
