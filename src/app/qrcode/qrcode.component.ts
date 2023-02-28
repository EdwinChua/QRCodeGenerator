import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as QRCode from 'qrcode';
// qr code lib https://github.com/soldair/node-qrcode#usage

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCodeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  @ViewChild('img', { static: false }) img: ElementRef;
  @Input() stringToEncode: string;
  @Input() labelText: string;
  @Input() logoImgSrc: string = "";
  @Input() height:number = 400;
  @Input() margin: number = 0;

  @Output() qrImgBase64_EventEmitter = new EventEmitter<string>();

  /**
  * L, M, Q, H
  */
  @Input() errorCorrectionLevel: string;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

    let THIS = this;
    let text = this.stringToEncode;
    //let errorCorrectionLevel = this.errorCorrectionLevel;

    let opts = {
      errorCorrectionLevel: THIS.errorCorrectionLevel,
      margin: THIS.margin,
      width: THIS.height - 30
      // color:{
      //   dark:"#000000ff",
      //   light:"#000000ff"
      // }
    }
    let opts2 = {
      errorCorrectionLevel: THIS.errorCorrectionLevel,
      margin: THIS.margin,
      width: THIS.height - 30,
      type: "svg"
    }
    QRCode.toString(text, opts2, function (err, url) {
      console.log(url)
    })
    QRCode.toDataURL(text, opts, function (err, url) {

      let imgQRCode = new Image();
      imgQRCode.src = url;
      imgQRCode.crossOrigin = "anonymous";

      let img = new Image();
      img.src = THIS.logoImgSrc;
      img.crossOrigin = "anonymous";

      try {
        let ctx = (<HTMLCanvasElement>THIS.canvas.nativeElement).getContext('2d');
        ctx.clearRect(0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.height);
        setTimeout(() => {
          ctx.drawImage(imgQRCode,
            0, 0, imgQRCode.width, imgQRCode.height,
            0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.width
          );
          let canvas_Centre_Horizontal = THIS.canvas.nativeElement.width / 2;
          let canvas_Centre_Vertical = THIS.canvas.nativeElement.width / 2;

          let logoSize_Horizontal = THIS.canvas.nativeElement.width * 0.16;
          let logoSize_Vertical = THIS.canvas.nativeElement.width * 0.16;

          let imageStart_Horizontal = canvas_Centre_Horizontal - (logoSize_Horizontal / 2);
          let imageStart_Vertical = canvas_Centre_Vertical - (logoSize_Vertical / 2);

          ctx.drawImage(img,
            //0, 0, THIS.img.nativeElement.width, THIS.img.nativeElement.height,
            imageStart_Horizontal, imageStart_Vertical, logoSize_Horizontal, logoSize_Vertical
          );
          ctx.font = "10px Arial";
          ctx.textAlign = "center";
          ctx.fillText(THIS.labelText, THIS.canvas.nativeElement.width/2 , THIS.canvas.nativeElement.height-10);

          
          setTimeout(()=>{
            THIS.qrImgBase64_EventEmitter.emit(THIS.canvas.nativeElement.toDataURL("image/png"))
          },100)

        },50)
      } catch (ex) {
        console.log(ex)
      }


    })

  }

  export(){
    return this.canvas.nativeElement.toDataURL("image/png");
  }

}
