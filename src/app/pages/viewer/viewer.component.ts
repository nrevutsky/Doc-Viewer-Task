import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  public imageId: string = '';
  public imageSrc: string = '';
  public imageNotFound: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imageId = params['id'];
      this.http.get(`assets/images/${this.imageId}.png`, { responseType: 'blob' })
        .subscribe({
          next: response => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () => {
              this.imageSrc = reader.result as string;
            };
          },
          error: () => {
            this.imageNotFound = true;
          }
        })
    });
  }
}
