import { Component, OnInit } from '@angular/core';
import { QrCodeGeneratorService } from '../qr-code-generator/qr-code-generator.service'
import { ErrorCorrectionLevel } from '../models'

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css']
})
export class SamplePageComponent implements OnInit {

  constructor(qrCodeGen:QrCodeGeneratorService) { }

  ngOnInit() {
    //this.qrCodeGen.generateQRCodeSvg()
  }

}
