import * as React from 'react'

export interface IState {
  base64Data: string | null
}

export interface ISignaturePadProps {
  style?: any
  dataUrl?: string
  penColor?: string
  penWeigth?: number
  onError?: (error: any) => void
  onChange?: (event: IState) => void
  renderError?: (component: React.ComponentClass<any>) => React.Component<any>
  renderLoading?: (component: React.ComponentClass<any>) => React.Component<any>
}
