import { chrome } from '.'

it('works with chrome-promise', async () => {
  const alarms = [{ name: 'alarm', scheduledTime: 0 }]
  chrome.alarms.getAll.mockImplementation(() =>
    Promise.resolve([{ name: 'alarm', scheduledTime: 0 }]),
  )

  expect(await chrome.alarms.getAll()).toStrictEqual(alarms)
})
