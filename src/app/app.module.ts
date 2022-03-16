import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QRCodeComponent } from './qrcode/qrcode.component';
import { LabelTemplateComponent } from './label-template/label-template.component';
import { SamplePageComponent } from './sample-page/sample-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QRCodeComponent,
    LabelTemplateComponent,
    SamplePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
