const {toFlow, setTypeName} = require('./toFlow');

describe('toFlow', () => {
  it('handles empty objects', () => {
    expect(toFlow({})).toEqual('{}')
  })
  
  it('transforms json as expected', () => {
    expect(toFlow({
      str: 'cake',
      number: 1,
      bool: false,
      arr: [1, true, 'foo', {}, [1, {foo: 'bar'}]],
      nestedObj: {
        arr: [1, true, 'foo', {}, [1, {foo: 'bar'}]]
      }
    })).toMatchSnapshot()
  })
})

describe('setTypeName', () => {
  it('defaults to the filename passed, with stripped extension and postfixed `T`', () => {
    expect(
      setTypeName('{"name": string}', 'config.json', undefined)
    ).toMatchSnapshot()
  })
  
  it('uses the user defined type name if passed', () => {
    expect(
      setTypeName('{"name": string}', 'config.json', 'stupidName')
    ).toMatchSnapshot()
  })
})