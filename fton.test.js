const fton = require('./fton')
const pkg = require('./package.json')

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
          "arr": [1, true, "foo", {}, [1, {"foo": "bar"}]],
          "foo": "bar",
          "Baz-foo": {"baz_": 1}
        }
      }`
    )).toMatchSnapshot()
  })
  
  it('can set indentation and typename', () => {
    expect(fton(
      'config.json', 
      `{
        "str": "cake",
        "foo": [1,2],
        "nestedObj": {
          "foo": "bar"
        }
      }`,
      { indent: 4, typename: 'stupidNameT' }
    )).toMatchSnapshot()
  })
  
})
