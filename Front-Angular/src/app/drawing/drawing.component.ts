import { fabric } from 'fabric';
import { tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CanvasComponent } from '../canvas/canvas.component';
import { DrawingService } from '../shared/drawing-service';
import { CanvasSize, canvasSize } from '../shared/drawing.models';

@Component({
  selector: 'app-drawing',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CanvasComponent,
  ],
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss',
})
export class DrawingComponent {
  canvas!: fabric.Canvas;
  canvasSize: CanvasSize = canvasSize;
  isFreeDrawing: boolean = false;

  constructor(private drawingService: DrawingService) {}

  handleCanvasReady(canvas: fabric.Canvas): void {
    this.canvas = canvas;
  }

  onAddLine(): void {
    const halfLineWidth = 4;
    const line = new fabric.Line([
      halfLineWidth * 3,
      this.canvasSize.HEIGHT / 2,
      this.canvasSize.WIDTH - halfLineWidth * 3,
      this.canvasSize.HEIGHT / 2,
    ]);
    line.set('stroke', 'black');
    line.set('strokeWidth', halfLineWidth * 2);
    this.canvas.add(line);
  }

  onFreeDraw(): void {
    this.isFreeDrawing = !this.isFreeDrawing;
    this.canvas.isDrawingMode = this.isFreeDrawing;
  }

  onClear(): void {
    this.canvas.clear();
  }

  onSave(): void {
    if (this.canvas.toJSON().objects.length === 0) return;

    this.drawingService
      .postDrawing(this.canvas.toJSON().objects)
      .pipe(
        tap((success) => {
          if (success) {
            this.onClear();
          }
        })
      )
      .subscribe();
  }
}
