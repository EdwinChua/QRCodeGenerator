import { Injectable } from '@angular/core';
import { ErrorCorrectionLevel } from 'src/app/models'
import * as QRCode from 'qrcode';
// qr code lib https://github.com/soldair/node-qrcode#usage

@Injectable({
  providedIn: 'root'
})
export class QrCodeGeneratorService {

  constructor() { }

  generateQRCodeSvg(stringToEncode:string,errorCorrectionLevel:ErrorCorrectionLevel, margin:number,width:number){
    let opts2 = {
      errorCorrectionLevel: errorCorrectionLevel,
      margin: margin,
      width: width,
      type: "svg"
    }
    QRCode.toString(stringToEncode, opts2, function (err, result) {
      return result;
    })
  }

}
