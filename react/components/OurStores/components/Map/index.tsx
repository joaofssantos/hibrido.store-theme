import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import { Store, Map } from '../../types'
import styles from './styles.modules.css'

// Fix leaflet icon issue
// @ts-ignore
delete (L.Icon.Default.prototype)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Props {
    stores: Store[]
    center: Map | null
}

export function OurStoreMap({ stores, center }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      // Inject Leaflet CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      mapInstanceRef.current = L.map(mapRef.current).setView([-23.5505, -46.6333], 10) // Default to Sao Paulo

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)

      // Force map invalidation to ensure correct rendering
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize()

        // Re-fit bounds after invalidating size to ensure correct zoom
        if (markersRef.current.length > 0) {
            const bounds = L.latLngBounds([])
            markersRef.current.forEach(marker => {
                const latLng = marker.getLatLng()
                bounds.extend(latLng)
            })
            mapInstanceRef.current?.fitBounds(bounds, { padding: [50, 50] })
        }
      }, 200)
    }

    // Clear old markers
    const currentMarkers: L.Marker[] = markersRef.current
    currentMarkers.forEach((marker: L.Marker) => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    const bounds = L.latLngBounds([])
    let hasMarkers = false
    const currentStores: Store[] = stores

    currentStores.forEach((store: Store) => {
      if (store.map && store.map.latitude && store.map.longitude) {
        const marker = L.marker([store.map.latitude, store.map.longitude])

        marker.bindPopup(`
          <div style="font-size: 14px; line-height: 1.4;">
            <strong style="display: block; margin-bottom: 4px; color: #0f3e99;">${store.__editorItemTitle}</strong><br/>
            ${store.phone ? `Telefone: ${store.phone}<br/>` : ''}<br/>
            ${store.addressLabel|| ''}, ${store.addressNumber || ''}, ${store.neighborhood || ''}, ${store.city || ''}, ${store.state || ''}, ${store.cep || ''}<br/>
            ${store.timeLabel || ''}
          </div>
        `)

        marker.addTo(mapInstanceRef.current!)
        markersRef.current.push(marker)
        bounds.extend([store.map.latitude, store.map.longitude])
        hasMarkers = true
      }
    })

    // Fit bounds if there are markers
    if (hasMarkers && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] })
    }

  }, [stores])

  useEffect(() => {
    if (center && mapInstanceRef.current) {
        mapInstanceRef.current.setView([center.latitude, center.longitude], 15)
    }
  }, [center])

  return (
    <div className={styles.storeMapContainer} >
      <div ref={mapRef} className={styles.storeMap}  />
    </div>
  )
}
