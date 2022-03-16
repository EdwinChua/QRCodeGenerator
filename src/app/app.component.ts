import { Component, ViewChild } from '@angular/core';
import { QRCodeComponent } from './qrcode/qrcode.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QRCodeTest';
  qrString: string = "";
  fileToUpload: File = null;
  logo: string = ""
  labelText: string = "";
  errCorrectionLvl: string = 'L';
  @ViewChild('qrCodeComp', { static: false }) qrCodeComp: QRCodeComponent;


  handleFileInput(files: FileList) {
    let THIS = this;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function (event) {
      THIS.logo = reader.result.toString();
    }
  }

  downloadImage() {
    console.log(this.qrCodeComp.export())
    //window.location.href = this.qrCodeComp.export();
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = this.qrCodeComp.export()
    link.click();
  }
}
