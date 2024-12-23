import { IOption } from "./IOption"

export interface IVariant {
    id: number
    name: string
    slug: string
    type: string
    options: IOption[]
}
