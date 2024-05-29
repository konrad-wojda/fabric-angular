import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { fabric } from 'fabric';

import { DrawingService } from '../shared/drawing-service';
import { Drawing } from '../shared/drawing.models';
import { CanvasSize, canvasSize } from '../shared/drawing.models';

@Component({
  selector: 'app-drawing-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule],
  templateUrl: './drawing-list.component.html',
  styleUrl: './drawing-list.component.scss',
})
export class DrawingListComponent implements OnInit {
  drawings: Drawing[] = [];
  offset = 0;

  canvas!: fabric.Canvas;
  canvasSize: CanvasSize = canvasSize;

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('fabricSurface');
    this.canvas.backgroundColor = 'white';
    this.canvas.setWidth(this.canvasSize.WIDTH);
    this.canvas.setHeight(this.canvasSize.HEIGHT);
    this.drawingService.getDrawings(this.offset).subscribe((drawings) => {
      this.drawings = drawings;
    });
  }

  selectDrawing(drawing: number): void {
    this.canvas.clear();
    let json = this.drawings[drawing].drawing
      .replaceAll('None', 'null')
      .replaceAll("'", '"')
      .replaceAll('False', 'false')
      .replaceAll('True', 'true');

    this.canvas.loadFromJSON(`{"objects":${json}}`, () => {
      this.canvas.selection = false;
      this.canvas.forEachObject(function (obj) {
        obj.selectable = false;
        obj.evented = false;
      });
      this.canvas.renderAll();
    });
  }
}
