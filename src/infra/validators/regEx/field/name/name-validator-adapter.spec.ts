import { NameValidatorAdapter } from './name-validator-adapter'
import { getfakeDataSignUpHttpRequestBodyMatchField, getfakeDataSignUpHttpRequestBodyNotMatchField } from '../import-all'

interface INameValidatorAdapterTypes {
  systemUnderTest: NameValidatorAdapter
}
const makeSystemUnderTest = async (): Promise<INameValidatorAdapterTypes> => {
  const systemUnderTest = new NameValidatorAdapter()

  return {
    systemUnderTest
  }
}

describe('NameValidatorAdapter', () => {
  test('Should return false if validator returns false <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(getfakeDataSignUpHttpRequestBodyNotMatchField('name'))

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true <version: 0.0.1>', async () => {
    const { systemUnderTest } = await makeSystemUnderTest()
    const isValid = await systemUnderTest.isValid(getfakeDataSignUpHttpRequestBodyMatchField('name'))

    expect(isValid).toBe(true)
  })
})
