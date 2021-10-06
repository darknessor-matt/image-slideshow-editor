import { Component, OnInit, AfterViewInit, OnDestroy, TemplateRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';

import Cropper from 'cropperjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Subscription } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('imageModal') modal: TemplateRef<any>;

  public readonly uploadedFile: BehaviorSubject<string> = new BehaviorSubject(null);

  public readonly control = new FileUploadControl(
    { listVisible: true, accept: ['image/*'], discardInvalid: true, multiple: false },
    [FileUploadValidators.accept(['image/*']), FileUploadValidators.filesLimit(1)]
  );

  private subscription: Subscription;

  private cropper: Cropper

  modalRef?: BsModalRef;

  tinymceField: any = "Image title"

  @Input()
  index: number

  @Output()
  outputImage = new EventEmitter<{ image: string, index: number, title: string }>()

  croppedImage: string

  constructor(private modalService: BsModalService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subscription = this.control.valueChanges.subscribe((values: Array<File>) => this.getImage(values[0]));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
  }

  private getImage(file: File): void {
    this.openModal(file);
  }

  openModal(file: File) {
    if (FileReader && file) {
      const fr = new FileReader();
      fr.onload = (e) => {
        this.uploadedFile.next(e.target.result as string)
        this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg' });
        setTimeout(() => {
          const image = document.getElementById('image') as HTMLImageElement;
          this.cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            viewMode: 2,
            preview: '.preview',
            crop(event) { },
          });
        }, 0);
      };
      fr.readAsDataURL(file);
    } else {
      this.uploadedFile.next(null);
    }

  }

  saveImage() {
    const canvas = this.cropper.getCroppedCanvas()
    var that = this
    canvas.toBlob(function (blob) {
      setTimeout(() => {
        const url = URL.createObjectURL(blob);
        const safeUrl = that.sanitizer.bypassSecurityTrustUrl(url)
        that.croppedImage = safeUrl as string;
        that.outputImage.emit({ image: that.croppedImage, index: that.index, title: that.tinymceField })
        setTimeout(() => {
          that.modalRef.hide()
          that.cropper.destroy();
          that.cropper = null;
        }, 100);
      }, 0);
    });
  }

}
