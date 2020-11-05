import { IValidation } from '../../protocols/validation/validation'
import { IHttpRequestBody, IHttpRequestBodyComplete } from '../../protocols/http/request/http-request-body'

interface IValidationCompositeComponents {
  content: any
  type: string
}
interface IValidationCompositeParams {
  type: string
  fields?: string[] | [string[], string[]]
  body?: IHttpRequestBody | IHttpRequestBodyComplete
  checkThisType?: string
  checkTheTypeOfThis?: object
  checkThis?: string
  withThis?: string
}
export class ValidationComposite implements IValidation {
  private readonly types: string[] = ['validate fields', 'required fields', 'compare fields', 'verify types']
  private readonly validateFields: any
  private readonly requiredFields: any
  private readonly compareFields: any
  private readonly verifyTypes: any

  constructor (components: IValidationCompositeComponents[]) {
    for (const component of components) {
      if (component.type === 'validate fields') {
        this.validateFields = component.content
      } else if (component.type === 'required fields') {
        this.requiredFields = component.content
      } else if (component.type === 'compare fields') {
        this.compareFields = component.content
      } else if (component.type === 'verify types') {
        this.verifyTypes = component.content
      }
    }
  }

  async validate (input: IValidationCompositeParams): Promise<any> {
    const { type } = input

    if (type === 'validate fields') {
      return this.validateFields.validate(input)
    } else if (type === 'required fields') {
      return this.requiredFields.validate(input)
    } else if (type === 'compare fields') {
      return this.compareFields.validate(input)
    } else if (type === 'verify types') {
      return this.verifyTypes.validate(input)
    }
  }
}
