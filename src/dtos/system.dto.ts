export type Type = 'error' | 'warning' | 'info' | 'success'

export interface LogRequestDTO {
    type?:  Type, 
    label?: string,
    data: any
}