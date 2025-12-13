
import type { Map } from '../types'

export interface MapStore {
    currentMap?: Map
    setCurrentMap: (map: Map) => void
    isMyMapSelected: (map?: Map) => boolean
}
export const useMap = () => ({
    currentMap: undefined,
    setCurrentMap: () => {},
    isMyMapSelected: () => false,
})