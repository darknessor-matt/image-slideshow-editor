import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { slideShowAnimation } from './animations/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideShowAnimation("one", 1),
    slideShowAnimation("two", 0.5)
  ]
})
export class AppComponent implements OnInit {
  title = 'image-slideshow-editor';

  numberOfImages = 3

  imageHeight: number

  imageIndexes: Array<number> = [0, 1, 2]
  visibility: Array<boolean> = []
  lifetime: Array<number> = [1500, 1500, 1500]
  titles: Array<string> = []
  animations: Array<string> = []

  animationsSelected: Array<string> =["left", "right", "left"]

  images: Array<string> = []

  modalRef?: BsModalRef;
  @ViewChild('slideshowModal') modal: TemplateRef<any>;

  constructor(private modalService: BsModalService, public sanitizer: DomSanitizer) { }


  ngOnInit(): void {

  }

  addImage() {
    this.imageIndexes.push(this.numberOfImages);
    this.animationsSelected[this.numberOfImages] = "left"
    this.numberOfImages++;
  }

  removeImage(i: number) {
    this.imageIndexes.splice(i, 1)
    this.visibility.splice(i, 1)
    this.lifetime.splice(i, 1)
    this.titles.splice(i, 1)
    this.animationsSelected.splice(i, 1)
    this.images.splice(i, 1)
    this.animations.splice(i, 1)
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
    this.lifetime[event.index] = 1500
    this.animations[event.index] = "hidden"
    this.titles[event.index] = event.title
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  slideshow() {
    if (this.visibility[0] == false || this.visibility[0] == true) {
      this.openModal()
      this.showSlide(0)
    }
  }

  showSlide(index: number) {
    setTimeout(() => {
      if (index < this.numberOfImages)
        this.showSlide(index + 1)
    }, this.lifetime[index]);
    this.visibility.forEach((x, i) => {
      if (i == index) {
        this.visibility[i] = true;
        this.animations[i] = this.animationsSelected[i]
        setTimeout(() => {
          this.animations[i] = "shown"
        }, 0);
      }
      else {
        // this.visibility[i-1] = false
        this.animations[i] = "hidden"
      }
    })
    if (index == this.numberOfImages)
      this.modalRef.hide()
    console.log(this.visibility)
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg' });
    setTimeout(() => {
      const image = document.getElementById('slideshow-image') as HTMLImageElement;
      this.imageHeight = image.height
    }, 0);
  }

  consoleLogButton() {
    console.log("Visibility: " + this.visibility)
    console.log("Lifetime: " + this.lifetime)
  }

  moveUp(index:number) {
    // var temp1 = this.lifetime[index]
    // this.lifetime[index] = this.lifetime[index-1] 
    // this.lifetime[index-1] = temp1

    // var temp2 = this.titles[index]
    // this.titles[index] = this.titles[index-1] 
    // this.titles[index-1] = temp2

    // var temp3 = this.animationsSelected[index]
    // this.animationsSelected[index] = this.animationsSelected[index-1] 
    // this.animationsSelected[index-1] = temp3

    // var temp4 = this.images[index]
    // this.images[index] = this.images[index-1] 
    // this.images[index-1] = temp4
  }

  moveDown(index:number) {
    // var temp1 = this.lifetime[index]
    // this.lifetime[index] = this.lifetime[index+1] 
    // this.lifetime[index+1] = temp1

    // var temp2 = this.titles[index]
    // this.titles[index] = this.titles[index+1] 
    // this.titles[index+1] = temp2

    // var temp3 = this.animationsSelected[index]
    // this.animationsSelected[index] = this.animationsSelected[index+1] 
    // this.animationsSelected[index+1] = temp3

    // var temp4 = this.images[index]
    // this.images[index] = this.images[index+1] 
    // this.images[index+1] = temp4
  }


}
