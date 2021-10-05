import { Component, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-slideshow-editor';

  imageIndexes: Array<number> = []
  numberOfImages = 0

  images: Array<string> = []
  visibility: Array<boolean> = []

  modalRef?: BsModalRef;
  @ViewChild('slideshowModal') modal: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  addImage() {
    this.imageIndexes.push(this.numberOfImages);
    this.visibility.push(false);
    this.numberOfImages++;
  }

  removeImage(i: number) {
    this.imageIndexes.splice(i, 1)
    this.visibility.splice(i, 1)
    this.images.splice(i, 1)
    this.numberOfImages--;
    this.imageIndexes.forEach((x) => {
      if (x > i) {
        x--;
      }
    })
  }

  addImageToArray(event) {
    this.images[event.index] = event.image
    console.log(this.images)
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  slideshow() {
    this.showSlide(0)
  }

  showSlide(index: number) {
    this.visibility.forEach((x, i) => {
      setTimeout(() => {
        if (i <= this.numberOfImages)
          this.showSlide(i + 1)
      }, 1500);
      if (i == index) {
        this.visibility[i] = true;
      }
      else {
        this.visibility[i] = false
      }
    })
    console.log(this.visibility)
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg' });
  }


}
