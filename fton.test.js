const fton = require('./fton');

describe('fton', () => {
  it('handles empty objects', () => {
    expect(
      fton('config.json', '{}')
    ).toEqual('// @flow\nexport type configT = {}')
  })

  it('transforms json as expected', () => {
    expect(fton(
      'config.json', 
      `{
        "str": "cake",
        "number": 1,
        "bool": false,
        "arr": [1, true, "foo", {}, [1, {"foo": "bar"}]],
        "nestedObj": {
          "arr": [1, true, "foo", {}, [1, {"foo": "bar"}]]
        }
      }`
    )).toMatchSnapshot()
  })
})
