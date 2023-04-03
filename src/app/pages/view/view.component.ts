import {Component, OnInit} from '@angular/core';
import documents from '../../../documents/documents.json';

interface Document {
  id: number;
  path: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public documents: Document[] = [];
  private offset: number = 0;
  private limit: number = 1;
  public zoom: number = 1;
  public isContextMenuOpen: boolean = false;
  public contextMenuPosition: { x: number, y: number } = { x: 0, y: 0 };
  public showTextArea: boolean = false;
  public text: string = '';
  public activeDocument!: Document;
  public annotations: { x: number, y: number, text: string, documentId: number }[] = [];

  ngOnInit(): void {
    this.loadDocuments();
  }

  private loadDocuments() {
    this.documents = [...this.documents, ...documents.slice(this.offset, this.offset + this.limit)]
    this.offset++
    const loadDocument = () => {
      this.documents = [...this.documents, ...documents.slice(this.offset, this.offset + this.limit)]
      this.offset++
    }
    window.addEventListener('scroll', function() {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadDocument();
      }
    });
  }

  public increaseSize() {
    if (this.zoom > 1.5) {
      return;
    }
    this.zoom += 0.1;
  }

  public decreaseSize() {
    if (this.zoom < 0.2) {
      return;
    }
    window.scrollTo(window.scrollX, window.scrollY + 1);
    this.zoom -= 0.1;
  }

  public reset() {
    const x = this.contextMenuPosition.x;
    const y = this.contextMenuPosition.y;

    if (this.text) {
      this.annotations.push({ x, y, text: this.text, documentId: this.activeDocument.id });
      this.text = '';
    }

    this.isContextMenuOpen = false;
    this.showTextArea = false;
  }

  public onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isContextMenuOpen = true;
    this.showTextArea = false;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY + window.pageYOffset };
  }

  public addText(document: Document) {
    this.activeDocument = document;
    this.isContextMenuOpen = false;
    this.showTextArea = true;
  }

  public addPicture() {
    this.isContextMenuOpen = false;
  }
}
