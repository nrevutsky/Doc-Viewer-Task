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
  private image: fabric.Image | undefined;
  public zoom: number = 100;
  public elementTarget: fabric.IText | fabric.Image | undefined;
  private isDraggingAvailable: boolean = true;

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
        this.image = image;
        image.selectable = false;
        this.canvas.add(image);
      });
    });
    document.addEventListener('keydown', e => {
      e.key === 'Delete' && this.elementTarget && this.canvas.remove(this.elementTarget);
    })

    let isDragging = false;
    let lastX: number;
    let lastY: number;

    this.canvas.on('mouse:down', event => {
      if (event.target && this.image) {
        this.isDraggingAvailable = event.target.ownMatrixCache.key === this.image.ownMatrixCache.key;
      }
      if (event.e.button === 0) {
        isDragging = true;
        lastX = event.e.clientX;
        lastY = event.e.clientY;
      }
    });

    this.canvas.on('mouse:move', (event) => {
      if (isDragging && this.isDraggingAvailable) {
        const deltaX = event.e.clientX - lastX;
        const deltaY = event.e.clientY - lastY;
        const zoom = this.canvas.getZoom();
        if (this.canvas && this.canvas.viewportTransform) {
          this.canvas.setViewportTransform([
            this.canvas.viewportTransform[0],
            this.canvas.viewportTransform[1],
            this.canvas.viewportTransform[2],
            this.canvas.viewportTransform[3],
            this.canvas.viewportTransform[4] + deltaX / zoom,
            this.canvas.viewportTransform[5] + deltaY / zoom
          ]);
        }
        lastX = event.e.clientX;
        lastY = event.e.clientY;
      }
    });

    this.canvas.on('mouse:up', event => {
      if (event.e.button === 0) {
        isDragging = false;
      }
    });
  }

  public setZoom(action: boolean) {
    const newZoom = action ? this.zoom + 10 : this.zoom - 10;
    if (newZoom < 0) {
      return;
    }
    this.zoom = action ? this.zoom + 10 : this.zoom - 10;
    const zoom = this.canvas.getZoom();
    this.canvas.setZoom(action ? zoom * 1.1 : zoom / 1.1);
  }

  public addText(): void {
    this.isDraggingAvailable = false;
    const text = new fabric.Textbox('Add your text here', {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: 'black',
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.elementTarget = text;
    text.on('mousedown', (event) => {
      this.isDraggingAvailable = false;
      this.elementTarget = event.target as fabric.IText;
    });
  }

  public addImage() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.click();
    inputElement.addEventListener('change', this.onFileSelected.bind(this));
  }

  private onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (loadEvent: any) => {
      const img = new fabric.Image('');
      img.setSrc(loadEvent.target.result, () => {
        this.elementTarget = img;
        this.canvas.add(img);
        img.on('mousedown', (event) => {
          this.isDraggingAvailable = false;
          this.elementTarget = event.target as fabric.IText;
        });
      });
    };
    reader.readAsDataURL(file);
  }

  public saveImage() {
    console.log(this.canvas.toJSON().objects);
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
