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
}
