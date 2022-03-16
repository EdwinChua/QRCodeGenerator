import { TestBed } from '@angular/core/testing';

import { QrCodeGeneratorService } from './qr-code-generator.service';

describe('QrCodeGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrCodeGeneratorService = TestBed.get(QrCodeGeneratorService);
    expect(service).toBeTruthy();
  });
});
