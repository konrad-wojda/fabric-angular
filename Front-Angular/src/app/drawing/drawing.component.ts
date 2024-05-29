import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DrawingService } from '../shared/drawing-service';
import { CanvasSize, canvasSize } from '../shared/drawing.models';

@Component({
  selector: 'app-drawing',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule],
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss',
})
export class DrawingComponent implements OnInit {
  canvas!: fabric.Canvas;
  canvasSize: CanvasSize = canvasSize;

  constructor(private drawingService: DrawingService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('fabricSurface');
    this.canvas.backgroundColor = 'white';
    this.canvas.setWidth(this.canvasSize.WIDTH);
    this.canvas.setHeight(this.canvasSize.HEIGHT);
  }

  onClear(): void {
    this.canvas.clear();
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

  onSave(): void {
    if (this.canvas.toJSON().objects.length === 0) return;

    this.drawingService
      .postDrawing(this.canvas.toJSON().objects)
      .subscribe(() => {
        this.onClear();
      });
  }
}
