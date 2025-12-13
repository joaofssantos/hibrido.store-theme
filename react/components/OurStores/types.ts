export type IProps = {
  title?: string
  subTitle?: string
  stores: Store[]
  filter: Filter
}

export type Filter = {
  title: string
}

export type Store = {
  __editorItemTitle: string
  phone?: string
  addressLabel?: string
  addressNumber?: string
  neighborhood?: string
  city?: string
  state?: string
  cep?: string
  timeLabel?: string
  map?: Map
}

export type Map = {
  latitude: number
  longitude: number
}
