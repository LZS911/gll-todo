import formatUrlParam from '../formatUrlParam'

describe('formatUrlParam', () => {
  it(`The prefix contains '?'`, () => {
    expect(
      formatUrlParam('?title=textTitle')
    ).toEqual({ title: 'textTitle' })
  })
  it(`The prefix doesn't contain ’?‘`, () => {
    expect(
      formatUrlParam('title=textTitle')
    ).toEqual({ title: 'textTitle' })
  })

  it('Value for the number of priority for number type', () => {
    expect(
      formatUrlParam('title=123')
    ).toEqual({ title: 123 })
  })
})