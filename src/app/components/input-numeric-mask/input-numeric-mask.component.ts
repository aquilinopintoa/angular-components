import {Component, Input, OnInit} from '@angular/core';

interface InputMetadata {
  value: number;
  position: number;
  disabled: boolean;
}

@Component({
  selector: 'input-numeric-mask',
  templateUrl: './input-numeric-mask.component.html',
  styleUrls: ['./input-numeric-mask.component.scss']
})
export class InputNumericMaskComponent implements OnInit {
  public hideValue = false;
  public inputsMetadata: InputMetadata[] = [];
  private _positionsNumber = 0;
  private _disabledPositions: number[] = [];
  @Input() set inputsCount(value: number) {
    this._positionsNumber = value;
    this.calculateInputMetadata();
  }
  @Input() set disabledPositions(value: number[]) {
    this._disabledPositions = value;
    this.calculateInputMetadata();
  }

  constructor() { }

  ngOnInit() {
  }

  calculateInputMetadata(): void {
    this.inputsMetadata = [];
    for (let i = 0; i < this._positionsNumber; i++) {
      const metadata: InputMetadata = {
        disabled: this._disabledPositions.includes(i),
        value: null,
        position: i
      };

      this.inputsMetadata.push(metadata);
    }
  }




}
