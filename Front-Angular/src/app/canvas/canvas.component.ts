import { fabric } from 'fabric';

import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

import { CanvasSize, canvasSize } from '../shared/drawing.models';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent implements OnDestroy {
  @Output() canvasReady = new EventEmitter<fabric.Canvas>();

  private canvasSize: CanvasSize = canvasSize;
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const canvas = new fabric.Canvas('fabricSurface', {
      isDrawingMode: false,
    });

    canvas.setWidth(this.canvasSize.WIDTH);
    canvas.setHeight(this.canvasSize.HEIGHT);

    this.canvasReady.emit(canvas);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }
}
