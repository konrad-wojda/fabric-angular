import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CanvasComponent } from '../canvas/canvas.component';
import { DrawingService } from '../shared/drawing-service';
import { Drawing } from '../shared/drawing.models';

@Component({
  selector: 'app-drawing-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    CanvasComponent,
  ],
  templateUrl: './drawing-list.component.html',
  styleUrl: './drawing-list.component.scss',
})
export class DrawingListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'visibility'];
  drawings = new MatTableDataSource<Drawing>([]);
  offset = 0;
  canvas!: fabric.Canvas;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private drawingService: DrawingService) {}

  handleCanvasReady(canvas: fabric.Canvas): void {
    this.canvas = canvas;
  }

  ngOnInit(): void {
    this.drawingService
      .getDrawings(this.offset)
      .subscribe((drawings: Drawing[]) => {
        this.drawings.data = drawings;
        this.drawings.paginator = this.paginator;
      });
  }

  ngAfterViewInit() {
    this.drawings.paginator = this.paginator;
  }

  selectDrawing(drawing: number): void {
    this.canvas.clear();

    let json = this.drawings.data[drawing].drawing
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

  // There should be function for mat-paginator which should
  // get max number of records (drawings) and utilize
  // this.drawings.paginator.pageSize to get smaller number of
  // data than 25...or to cache it till new GET will be necessary,
  // but API have not info about it (yet)
}
