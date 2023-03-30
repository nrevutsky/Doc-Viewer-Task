import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Canvas} from "fabric/fabric-impl";
import {fabric} from "fabric";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ) {
    this.canvas = new fabric.Canvas('canvas');
  }

  public canvas: Canvas;
  public imageId: string = '';
  public imageNotFound: boolean = false;
  public zoom: number = 100;

  ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas() {
    this.canvas = new fabric.Canvas('canvas', { selection: false });
    this.route.params.subscribe(params => {
      this.imageId = params['id'];
      fabric.Image.fromURL(`assets/images/${this.imageId}.png`, image => {
        if (image.width && image.height) {
          this.canvas.setDimensions({
            width: image.width,
            height: image.height
          });
        }
        image.selectable = false;
        this.canvas.add(image);
      });
    });
  }

  public setZoom(action: boolean) {
    const newZoom = action ? this.zoom + 10 : this.zoom - 10;
    if (newZoom < 0) {
      return;
    }
    if (newZoom > 100) {

    }
    this.zoom = action ? this.zoom + 10 : this.zoom - 10;
    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(action ? zoom * 1.1 : zoom / 1.1);
  }

  addText(): void {
    const text = new fabric.Textbox('Add your text here', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: 'black'
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  }

  saveImage() {
    const dataURL = this.canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
