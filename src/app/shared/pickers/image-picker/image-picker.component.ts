import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @Output() imagePick = new EventEmitter<string>();
  selectedImage?: string;
  usePicker = false;
  constructor() {}

  ngOnInit() {}
  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    } else {
      Camera.getPhoto({
        quality: 50,
        source: CameraSource.Prompt,
        correctOrientation: true,
        width: 600,
        resultType: CameraResultType.DataUrl,
      })
        .then((image) => {
          this.selectedImage = image.dataUrl;
          this.imagePick.emit(image.dataUrl);
        })
        .catch(() => {
          //handle error
        });
    }
  }
}
