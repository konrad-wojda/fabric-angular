import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DrawingService } from '../shared/drawing-service';
import { CanvasSize, canvasSize } from '../shared/drawing.models';
import { MatButtonModule } from '@angular/material/button';
import { CanvasComponent } from '../canvas/canvas.component';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../shared/snackbar-service';

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

  constructor(
    private drawingService: DrawingService,
    private snackbarService: SnackbarService
  ) {}

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
    // @TODO (konrad) uncomment right one.
    this.drawingService.postDrawing(this.canvas.toJSON().objects).subscribe();
    // this.snackbarService.showSnackbar(
    //   'Drawing saved successfully!',
    //   'Redirect'
    // );
  }
}
