import { IAccountModel } from '../models/account'

export interface IAddAccountModel {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  address: {
    cep: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
}

export interface IAddAccount {
  add: (account: IAddAccountModel) => IAccountModel
}
