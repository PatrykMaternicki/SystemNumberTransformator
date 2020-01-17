import { ACCEPTABLE_CHARLIST } from '../dictionary/AcceptCharList.js';
import { ERRORS_MESSAGES } from '../dictionary/ErrorMessages.js';
import ValidState from '../model/ValidState.js';

export default class Validator {
  constructor() {
    this.ACCEPTABLE_CHARLIST = ACCEPTABLE_CHARLIST;
    this.ERRORS_MESSAGES = ERRORS_MESSAGES;
    this.MAX_SYSTEM_NUMBER = 16;
  }

  isNotEmpty(value) {
    return !value ? this.setValidState('EMPTY_FIELD', false) : this.setValidState('', true);
  }

  isAccepatbleSystem(value, systemNumberKey, messageKey) {
    let isAcceptable = true;
    for(let i= 0; value.length > i; i++) {
      if(this[systemNumberKey].indexOf(value[i]) === -1) {
        isAcceptable = false;
        break;
      }
    }
    return isAcceptable ?  this.setValidState('', true) :  this.setValidState(`NOT_ACCEPTABLE_SYSTEM_${messageKey}_NUMBER`, false);
  }

  isAcceptableString(value) {
    let isAcceptable = true;
    for(let i= 0; value.length > i; i++) {
      if(this.ACCEPTABLE_CHARLIST.indexOf(value[i]) === -1) {
        isAcceptable = false;
        break;
      }
    }

    return isAcceptable ?  this.setValidState('', true) :  this.setValidState('NOT_ACCEPTABLE_STRING', false);
  }

  tooBigSystemNumber(value) {
    return value > this.MAX_SYSTEM_NUMBER ? this.setValidState('TOO_BIG_SYSTEM', false) :  this.setValidState('', true);
  }

  setValidState(key, value) {
    return new ValidState(this.ERRORS_MESSAGES[key] || '', value);
  }

  substring(length) {
    return this.ACCEPTABLE_CHARLIST.substring(0, length);
  }

  generateAcceptCharListInSystem(lengthAcceptChar) {
    this.inAcceptCharList = this.substring(lengthAcceptChar);
  }

  generateAcceptCharListOutSystem(lengthAcceptChar) {
    this.outAcceptCharList = this.substring(lengthAcceptChar);
  }
}