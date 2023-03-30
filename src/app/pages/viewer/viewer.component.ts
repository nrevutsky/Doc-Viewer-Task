import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
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
    private http: HttpClient,
  ) {
    this.canvas = new fabric.Canvas('canvas', { selection: false })
  }

  public canvas: Canvas;
  public imageId: string = '';
  public imageSrc: string = '';
  public imageNotFound: boolean = false;
  public zoom: number = 100;

  ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas() {
    this.route.params.subscribe(params => {
      this.imageId = params['id'];
      this.http.get(`assets/images/${this.imageId}.png`, { responseType: 'blob' })
        .subscribe({
          next: response => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () => {
              this.imageSrc = reader.result as string;
              fabric.Image.fromURL(this.imageSrc, img => {
                const oImg = img.set({
                  left: 0,
                  top: 0,
                  angle: 0
                }).scale(1);
                oImg.setCoords()
                this.canvas = new fabric.Canvas('canvas', { selection: false })
                this.canvas.add(oImg).renderAll();
                if (oImg.width && oImg.height) {
                  this.canvas.setWidth(oImg.width.toString())
                  this.canvas.setHeight(oImg.height.toString())
                }
              })
            };
          },
          error: () => {
            this.imageNotFound = true;
          }
        })
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
}
