import { Component, OnInit, Input, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { QRCodeComponent } from '../qrcode/qrcode.component';

@Component({
  selector: 'app-label-template',
  templateUrl: './label-template.component.html',
  styleUrls: ['./label-template.component.css']
})
export class LabelTemplateComponent implements OnInit {
  @Input() stringToEncode: string = "alksdjklasjd";
  @Input() labelText: string = "alsdlaksdj";
  @Input() logoImgSrc: string = "";
  @Input() height: number = 100;
  @Input() width: number = 400;

  @Input() margin: number = 0;
  @Input() errorCorrectionLevel: string;
  @ViewChild('qrCode', { static: false }) qrCodeComp: QRCodeComponent;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  @Input() backgroundColor: string = "white";

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {

    // console.log("working as expected")
    // let THIS = this;
    // setTimeout(() => {



    //   let imgQRCode = new Image();
    //   imgQRCode.src = THIS.qrCodeComp.export();
    //   setTimeout(() => {
    //     let ctx = (<HTMLCanvasElement>THIS.canvas.nativeElement).getContext('2d');
    //     ctx.clearRect(0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.height);


    //     ctx.drawImage(imgQRCode, 0, 0);
    //   }, 100);
    //   // ctx.drawImage(imgQRCode,
    //   //   0, 0, imgQRCode.width, imgQRCode.height,
    //   //   0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.width
    //   // );
    // }, 50)
  }

  qrCodeImageUpdated(event) {
    // console.log(this.canvas.nativeElement.getBoundingClientRect())
    // this.canvas.nativeElement.width = this.canvas.nativeElement.getBoundingClientRect().width * 2;
    // this.canvas.nativeElement.height = this.canvas.nativeElement.getBoundingClientRect().height * 2;

    let THIS = this;
    let imgQRCode = new Image();
    imgQRCode.src = THIS.qrCodeComp.export();
    setTimeout(() => {

      // let tempCanvas:HTMLCanvasElement =document.createElement("canvas");;
      // tempCanvas.width = THIS.canvas.nativeElement.width * 4;
      // tempCanvas.height = THIS.canvas.nativeElement.height * 4;

      // let tempCtx = tempCanvas.getContext("2d");
      // tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

      // tempCtx.fillStyle = "white"; // set color for background
      // tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      // tempCtx.fillStyle = "black"; // set color for text 

      // tempCtx.font = "15px Arial";
      // tempCtx.textAlign = "left";
      // tempCtx.fillText(THIS.labelText, imgQRCode.width + 10 , 10);

      // tempCtx.font = "15px Arial";
      // tempCtx.textAlign = "left";
      // tempCtx.fillText(THIS.labelText, imgQRCode.width + 10 , 30);

      // tempCtx.font = "15px Arial";
      // tempCtx.textAlign = "left";
      // tempCtx.fillText(THIS.labelText, imgQRCode.width + 10 , 50);

      // tempCtx.drawImage(imgQRCode, 0, 0,imgQRCode.width* 4,imgQRCode.height*4);
      // //tempCtx.drawImage(imgQRCode, 0, 0);
      // setTimeout(() => {
      //   console.log(tempCanvas.toDataURL("image/png"))
      // },100)

      let ctx = (<HTMLCanvasElement>THIS.canvas.nativeElement).getContext('2d');
      ctx.clearRect(0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.height);

      ctx.fillStyle = "white"; // set color for background
      ctx.fillRect(0, 0, THIS.canvas.nativeElement.width, THIS.canvas.nativeElement.height); // draw "background"

      ctx.drawImage(imgQRCode, 0, 0); // draw QR code

      ctx.fillStyle = "black"; // set color for text 

      // ctx.font = "15px Arial";
      // ctx.textAlign = "left";
      // ctx.fillText(THIS.labelText, imgQRCode.width + 10, 10);

      // ctx.font = "15px Arial";
      // ctx.textAlign = "left";
      // ctx.fillText(THIS.labelText, imgQRCode.width + 10, 30);

      // ctx.font = "15px Arial";
      // ctx.textAlign = "left";
      // ctx.fillText(THIS.labelText, imgQRCode.width + 10, 50);
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      THIS.sharperText(ctx,"TESTING",imgQRCode.width + 10, 50, 50)
      



    }, 100);
  }

  sharperText(ctx, text, x, y, fontHeight) {

    var width = ctx.measureText(text).width + 12; // add some extra pixels
    var hOffset = Math.floor(fontHeight);

    var c = document.createElement("canvas");
    c.width = width * 3; // scaling by 3
    c.height = fontHeight;
    let tempCtx = c.getContext("2d");
    //c.ctx = c.getContext("2d");
    tempCtx.font = ctx.font;
    tempCtx.globalAlpha = ctx.globalAlpha;
    tempCtx.fillStyle = ctx.fillStyle;
    tempCtx.textAlign = "left";
    tempCtx.setTransform(3, 0, 0, 1, 0, 0); // scaling by 3
    tempCtx.imageSmoothingEnabled = false;
    // tempCtx.mozImageSmoothingEnabled = false; // (obsolete)
    // tempCtx.webkitImageSmoothingEnabled = false;
    // tempCtx.msImageSmoothingEnabled = false;
    // tempCtx.oImageSmoothingEnabled = false;
    // copy existing pixels to new canvas
    tempCtx.drawImage(ctx.canvas, x, y - hOffset, width, fontHeight, 0, 0, width, fontHeight);
    tempCtx.fillText(text, 0, hOffset - 3 /* (harcoded to -3 for letters like 'p', 'g', ..., could be improved) */); // draw the text 3 time the width
    // convert to sub pixels 
    tempCtx.putImageData(this.subPixelBitmap(tempCtx.getImageData(0, 0, width * 3, fontHeight)), 0, 0);
    ctx.drawImage(c, 0, 0, width - 1, fontHeight, x, y - hOffset, width - 1, fontHeight);
  }

  subPixelBitmap(imgData){
    var spR,spG,spB; // sub pixels
    var id,id1; // pixel indexes
    var w = imgData.width;
    var h = imgData.height;
    var d = imgData.data;
    var x,y;
    var ww = w*4;
    for(y = 0; y < h; y+=1){ // (go through all y pixels)
        for(x = 0; x < w-2; x+=3){ // (go through all groups of 3 x pixels)
            id = y*ww+x*4; // (4 consecutive values: id->red, id+1->green, id+2->blue, id+3->alpha)
            var output_id = y*ww+Math.floor(x/3)*4;
            spR = Math.round((d[id + 0] + d[id + 4] + d[id + 8])/3);
            spG = Math.round((d[id + 1] + d[id + 5] + d[id + 9])/3);
            spB = Math.round((d[id + 2] + d[id + 6] + d[id + 10])/3);
            // console.log(d[id+0], d[id+1], d[id+2] + '|' + d[id+5], d[id+6], d[id+7] + '|' + d[id+9], d[id+10], d[id+11]);                        
            d[output_id] = spR;
            d[output_id+1] = spG;
            d[output_id+2] = spB;
            d[output_id+3] = 255; // alpha is always set to 255
        }
    }
    return imgData;
}

}
