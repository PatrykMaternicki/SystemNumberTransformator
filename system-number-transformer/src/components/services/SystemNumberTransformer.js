
import FormData from '../model/FormData.js';
import { ACCEPTABLE_CHARLIST } from '../dictionary/AcceptCharList.js';
export default class SystemNumberTransformer {
  constructor() {
    this.ACCEPTABLE_CHARLIST = ACCEPTABLE_CHARLIST;
    this.data = new FormData();
  }

  setDataNumber(number) {
    this.data.number = number;
  }

  setDataInSystemNumber(inSystemNumber) {
    this.data.inSystemNumber = inSystemNumber;
  }

  setDataOutSystemNumber(outSystemNumber) {
    this.data.outSystemNumber = outSystemNumber;
  }

  transform() {
    return this.transferNumberToOutputSystemNumber(this.transferNumberTo10SystemNumber());
  }

  transferNumberTo10SystemNumber() {
    let stringNumber = this.setNumberToArray();
    let outputNum10 = 0;
    let parsedInSystemNumber = Number.parseInt(this.data.inSystemNumber);
    for (var i = 0; stringNumber.length > i; i++){
      if (parsedInSystemNumber > 9 ) {
        stringNumber[i] = this.convertLetterToNum(stringNumber[i]);
      }
       outputNum10 = outputNum10 +  (Number.parseInt(stringNumber[i]) * Math.pow(parsedInSystemNumber,i));
    }

    return outputNum10;
  }

  setNumberToArray() {
    var arr = [];
    for (var i= 0; this.data.number.length > i; i++) {
      arr.push(this.data.number[i]);
    }
    return arr.reverse();
  }

  convertLetterToNum(value) {
    return this.ACCEPTABLE_CHARLIST.indexOf(value, 0);
  }

  convertNumToLetter(value) {
    var newString = [];
    for (var i= 0; value.length > i; i++){
      newString.push(this.ACCEPTABLE_CHARLIST[Number.parseInt(value[i])]);
    }
    return newString;
  }

  transferNumberToOutputSystemNumber(value) {
    let currentValue = value;
    let moduloString = [];
    let parsedOutSystemNumber = Number.parseInt(this.data.outSystemNumber);

    while (currentValue !== 0) {
      let modulo = currentValue % parsedOutSystemNumber;
      currentValue = currentValue - modulo;
      moduloString.push(modulo);
      currentValue = currentValue/parsedOutSystemNumber;
    }

    var reverseModuloString = moduloString.reverse();
    if (parsedOutSystemNumber > 9  ) {
      reverseModuloString = this.convertNumToLetter(reverseModuloString)
    }
    return reverseModuloString.join('');
  }
}