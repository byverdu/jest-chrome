import { chrome } from '../src'

test('chrome api events', () => {
  const listenerSpy = jest.fn()
  const sendResponseSpy = jest.fn()

  chrome.runtime.onMessage.addListener(listenerSpy)

  expect(listenerSpy).not.toBeCalled()
  expect(chrome.runtime.onMessage.hasListeners()).toBe(true)

  chrome.runtime.onMessage.callListeners(
    { greeting: 'hello' }, // message
    {}, // MessageSender object
    sendResponseSpy, // SendResponse function
  )

  expect(listenerSpy).toBeCalledWith(
    { greeting: 'hello' },
    {},
    sendResponseSpy,
  )
  expect(sendResponseSpy).not.toBeCalled()
})

test('chrome api functions', () => {
  const manifest = {
    name: 'my chrome extension',
    manifest_version: 3,
    version: '1.0.0',
  }

  chrome.runtime.getManifest.mockImplementation(() => manifest)

  expect(chrome.runtime.getManifest()).toEqual(manifest)
  expect(chrome.runtime.getManifest).toBeCalled()
})

test('chrome api functions with Promises', async () => {
  const message = { greeting: 'hello?' }

  chrome.runtime.sendMessage.mockImplementation((msg) =>
    Promise.resolve(msg),
  )

  chrome.runtime.sendMessage(message)

  expect(chrome.runtime.sendMessage).toBeCalledWith(message)
})
