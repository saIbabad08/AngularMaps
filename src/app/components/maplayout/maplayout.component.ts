import {
  AfterViewInit,
  Component,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { MapService } from 'src/app/services/map-service';

@Component({
  selector: 'app-maplayout',
  templateUrl: './maplayout.component.html',
  styleUrls: ['./maplayout.component.scss'],
})
export class MaplayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  performanceStats: { start: number; end: number } = { start: 0, end: 0 };
  markers: google.maps.LatLngLiteral[] = [];
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom: number = 4;
  drawingManager!: google.maps.drawing.DrawingManager;
  markerClustererImagePath: string =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  infoContent!: string;
  rectangle: google.maps.Rectangle = new google.maps.Rectangle(null);
  sizeOfMarkers!: number;
  isOpen: boolean = true;
  constructor(public dialog: MatDialog, private mapService: MapService) {}
  ngAfterViewInit(): void {
    if (this.map?.googleMap) {
      this.initDrawingManager();
    }
  }
  initDrawingManager(): void {
    this.drawingManager = this.mapService.driverManager();
    if (this.map?.googleMap) {
      this.drawingManager.setMap(this.map.googleMap);
      google.maps.event.addListener(
        this.drawingManager,
        'rectanglecomplete',
        (rect: google.maps.Rectangle) => {
          this.afterRectDrawn(rect);
        }
      );
    }
    google.maps.event.addListener(
      this.drawingManager,
      'drawingmode_changed',
      () => {
        if (
          this.drawingManager.getDrawingMode() ==
            google.maps.drawing.OverlayType.RECTANGLE &&
          this.rectangle != null
        )
          this.rectangle.setMap(null);
      }
    );
  }
  afterRectDrawn(rect: google.maps.Rectangle): void {
    if (this.rectangle != null) this.rectangle.setMap(null);
    this.rectangle = rect;
    this.performanceStats.start = performance.now();
    const ne = rect.getBounds()!.getNorthEast();
    const sw = rect.getBounds()!.getSouthWest();
    this.markers = this.mapService.getRandomInRange(ne, sw, 10);
    this.sizeOfMarkers = this.mapService.roughSizeOfObject(this.markers);
    this.drawingManager.setOptions({
      drawingMode: null,
    });
  }
  openInfoWindow(marker: MapMarker, content: google.maps.LatLngLiteral): void {
    this.infoContent = `<div class="info-style">
        <div>
            <div class="lat-section">Lat:${content.lat}</div>
            <div class="lng-section">Lng:${content.lng}</div>
            <div class="timeStamp">
              TimeStamp${new Date()}
            </div>
        </div>

    </div>`;
    this.infoWindow.open(marker);
  }
  markerRendered(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.performanceStats.end = performance.now();
      const dialogData = {
        markers: this.markers,
        performanceStats: this.performanceStats,
        sizeOfMarkers: this.sizeOfMarkers,
      };
      this.mapService.setDialog(dialogData);
    }
  }
  trackByIndex(index: number): number {
    return index;
  }
  resetMap(): void {
    this.markers = [];
    this.rectangle.setMap(null);
    this.isOpen = true;
  }
  ngOnDestroy(): void {
    this.resetMap();
  }
}
