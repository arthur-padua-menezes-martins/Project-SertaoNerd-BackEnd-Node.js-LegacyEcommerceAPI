import { IHttpRequest, IHttpResponse } from './export-all'

/**
* @method handle handles HTTP Request and generates httpResponse
* @param httpRequest references a implemetation of IHttpRequest
*/
export interface Controller {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}