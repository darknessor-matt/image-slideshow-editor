import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'image-slideshow-editor';

  modalHeight: number

  numberOfImages = 3
  imageIndexes: Array<number> = [0, 1, 2]
  visibility: Array<boolean> = [false, false, false]
  lifetime: Array<number> = [1500, 1500, 1500]

  images: Array<string> = []

  modalRef?: BsModalRef;
  @ViewChild('slideshowModal') modal: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {

  }

  addImage() {
    this.imageIndexes.push(this.numberOfImages);
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
    this.visibility[event.index] = false
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  slideshow() {
    this.openModal()
    this.showSlide(0)
  }

  showSlide(index: number) {
    setTimeout(() => {
      if (index < this.numberOfImages)
        this.showSlide(index + 1)
    }, this.lifetime[index]);
    this.visibility.forEach((x, i) => {
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
    setTimeout(() => {
      var modalWidth = document.getElementById('modalBody').style;
      this.modalHeight * 16 / 9
      console.log(modalWidth)
    }, 0);
  }

  consoleLogButton() {
    console.log("Lifetime: " + this.lifetime)
  }


}
