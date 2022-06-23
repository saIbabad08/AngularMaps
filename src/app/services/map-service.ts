import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { mapData } from '../untility';

@Injectable({ providedIn: "root" })
export class MapService {
    
  RANGE: number = 12000;
   constructor(public dialog: MatDialog){}
   driverManager(){
    return new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          drawingModes: [google.maps.drawing.OverlayType.RECTANGLE],
        },
      });
   }
  roughSizeOfObject(object: any): number {
    var objectList = [];
    var stack = [object];
    var bytes = 0;
    while (stack.length) {
      var value = stack.pop();
      if (typeof value === 'boolean') {
        bytes += 4;
      } else if (typeof value === 'string') {
        bytes += value.length * 2;
      } else if (typeof value === 'number') {
        bytes += 8;
      } else if (
        typeof value === 'object' &&
        objectList.indexOf(value) === -1
      ) {
        objectList.push(value);

        for (var i in value) {
          stack.push(value[i]);
        }
      }
    }
    return bytes;
  }

  getRandomInRange(
    from: google.maps.LatLng,
    to: google.maps.LatLng,
    fixed: number
  ): google.maps.LatLngLiteral[] {
    let data: google.maps.LatLngLiteral[] = [];
    for (
      let i = to.lat(), j = to.lng();
      data.length < this.RANGE, data.length < this.RANGE;
      i++, j++
    ) {
      data.push({
        lat:
          Number(
            (Math.random() * (from.lat() - to.lat()) + to.lat()).toFixed(fixed)
          ) * 1,
        lng:
          Number(
            (Math.random() * (from.lng() - to.lng()) + to.lng()).toFixed(fixed)
          ) * 1,
      });
    }

    return data;
  }
  
  setDialog(dialogData:mapData): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: dialogData,
    });
  }
}

