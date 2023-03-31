import {Component, OnInit} from '@angular/core';
import documents from '../../../documents/documents.json';

interface ImageFile {
  id: number;
  path: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public files: ImageFile[] = [];
  private offset: number = 0;
  private limit: number = 1;

  ngOnInit(): void {
    this.files = [...this.files, ...documents.slice(this.offset, this.offset + this.limit)]
    this.offset++
    const loadDocument = () => {
      this.files = [...this.files, ...documents.slice(this.offset, this.offset + this.limit)]
      this.offset++
    }
    window.addEventListener('scroll', function() {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadDocument();
      }
    });
  }
}
