export interface mapData {
    markers:google.maps.LatLngLiteral[],
    performanceStats:{ start: number; end: number },
    sizeOfMarkers:number
}