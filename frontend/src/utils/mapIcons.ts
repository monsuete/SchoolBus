import Leaflet from 'leaflet'

import bustrans from '../assets/images/bustrans.svg'
import 'leaflet/dist/leaflet.css'

const mapIcon = Leaflet.icon({
    iconUrl: bustrans,
  
    // popupAnchor: [170, 2],
    // iconSize: [58, 68],
    // iconAnchor: [29, 68],


    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

export default mapIcon