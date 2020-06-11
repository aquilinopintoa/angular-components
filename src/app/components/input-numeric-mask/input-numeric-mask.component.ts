import {Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

interface InputMetadata {
  value: string;
  position: number;
  disabled: boolean;
}

@Component({
  selector: 'input-numeric-mask',
  templateUrl: './input-numeric-mask.component.html',
  styleUrls: ['./input-numeric-mask.component.scss']
})
export class InputNumericMaskComponent implements OnInit {
  public value = [];
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
  @ViewChildren('input') viewList: QueryList<ElementRef>;

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
      this.value.push(null);
    }
  }

  setValue(index: number, value): void {
    if (Number(value)) {
      this._focusOnNextInput(index);
    }
  }


  handlerKeyup(index: number) {
    if (!this.inputsMetadata[index].value) {
      this._focusOnLeftInput(index);
    }
  }

  private _focusOnNextInput(focusedIndex: number): void {
    const validNextInput = this._nextRightValidInput(focusedIndex);

    const inputsDOM = this.viewList
      .toArray()
      .map((inputER) => inputER.nativeElement);

    inputsDOM[validNextInput].focus();
  }

  private _focusOnLeftInput(focusedIndex: number): void {
    const validNextInput = this._nextLeftValidInput(focusedIndex);

    const inputsDOM = this.viewList
      .toArray()
      .map((inputER) => inputER.nativeElement);

    inputsDOM[validNextInput].focus();
  }

  private _nextRightValidInput(currentIndex: number): number {
    let newIndex = this._positionsNumber - 1;

    for (let i = currentIndex + 1 ; i < this._positionsNumber; i++) {
      if (!this._disabledPositions.includes(i)) {
        newIndex = i;
        break;
      }
    }

    return newIndex;
  }

  private _nextLeftValidInput(currentIndex: number): number {
    let newIndex = currentIndex;

    for (let i = newIndex - 1; i >= 0; i--) {
      if (!this._disabledPositions.includes(i)) {
        newIndex = i;
        break;
      }
    }

    return newIndex;
  }
}