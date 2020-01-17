import React, {Component} from 'react';
import SystemNumberTransformator from './services/SystemNumberTransformer';
import Validator from './services/Validator';

class SystemNumberTransformerForm extends Component {
  constructor(props) {
    super(props);
    this.systemNumberTransformator = new SystemNumberTransformator();
    this.validator = new Validator();
    this.state = {
      formDataNumber: null,
      formDataInSystemNumber: 0,
      formDataOutSystemNumber: 0,
      formValidNumber: undefined,
      formValidInSystemNumber: undefined,
      formValidOutSystemNumber: undefined,
      formValidNumberErrorMsg: '',
      formValidInSystemNumberErrorMsg: '',
      formValidOutSystemNumberErrorMsg: '',
      result: null,
    };
  }

  handleClick(event) {
    event.preventDefault();
    this.systemNumberTransformator.setDataNumber(this.state.formDataNumber);
    this.systemNumberTransformator.setDataInSystemNumber(this.state.formDataInSystemNumber);
    this.systemNumberTransformator.setDataOutSystemNumber(this.state.formDataOutSystemNumber);
    this.setState({result: this.systemNumberTransformator.transform()});
  }

  handleChangeNumber(event) {
    this.setState({formDataNumber: event.target.value.toLowerCase()});
    let test = this.validator.isNotEmpty(event.target.value);
    this.setState({formValidNumber: test.state});
    if(!test.state) {
      this.setState({formValidNumberErrorMsg: test.message});
      return;
    }
    test = this.validator.isAcceptableString(event.target.value);
    this.setState({formValidNumber: test.state});
    if(!test.state) {
      this.setState({formValidNumberErrorMsg: test.message});
      return;
    }
  }

  handleChangeInSystemNumber(event) {
    this.setState({formDataInSystemNumber: event.target.value});
    this.validator.generateAcceptCharListInSystem(event.target.value);
    let test = this.validator.isNotEmpty(event.target.value);
    this.setState({formValidInSystemNumber: test.state});
    if(!test.state) {
      this.setState({formValidInSystemNumberErrorMsg: test.message});
      return;
    }
    test = this.validator.tooBigSystemNumber(event.target.value);
    this.setState({formValidInSystemNumber: test.state});
    if(!test.state) {
      this.setState({formValidInSystemNumberErrorMsg: test.message});
      return;
    }
  }


  handleChangeOutSystemNumber(event) {
    this.setState({formDataOutSystemNumber: event.target.value});
    let test = this.validator.isNotEmpty(event.target.value);
    this.setState({formValidOutSystemNumber: test.state});
    if(!test.state) {
      this.setState({formValidOutSystemNumberErrorMsg: test.message});
      return;
    }
    test = this.validator.tooBigSystemNumber(event.target.value);
    this.setState({formValidOutSystemNumber: test.state});
    if(!test.state) {
      this.setState({formValidOutSystemNumberErrorMsg: test.message});
      return;
    }
  }

  handleOnBlurInSystemNumber() {
    let test = this.validator.isAccepatbleSystem(this.state.formDataNumber, 'inAcceptCharList', 'IN');
    this.setState({formValidNumber: test.state});
    if(!test.state) {
      this.setState({formValidNumberErrorMsg: test.message});
      return;
    }
  }

  isFieldNumberIsFill() {
    return this.state.formValidNumber;
  }

  isFieldInSystemNumberIsFill() {
    return this.state.formValidInSystemNumber && this.isFieldNumberIsFill() ? true : false;
  }

  isFieldOutSystemNumberIsFill() {
    return this.state.formValidOutSystemNumber && this.isFieldInSystemNumberIsFill() ? true : false;
  }

  isDisabled() {
    return this.isFieldOutSystemNumberIsFill() ? false : true;
  }

  render(){
    return (
      <div className={this.props.className}>
        <h1 className={`${this.props.className}__title`}>Transformer Liczbowy</h1>
        <p className={`${this.props.className}__paragraph`}> 
          Podaj dowolny system liczbowy i przez transferuj na dowolny system liczbowy
        </p>
        <form>
          <div className={`${this.props.className}__group`}>
            <label 
              for="number"
              className={`${this.props.className}__label`}
            >
              Podaj liczbę
              </label>
            <input 
              type="text"
              onChange={this.handleChangeNumber.bind(this)}
              id="number"
              required
              className={`${this.props.className}__input`}
            />
            {this.state.formValidNumber === false &&
              <span className={`${this.props.className}__error`}>{this.state.formValidNumberErrorMsg}</span>
            }
          </div>

          <div className={`${this.props.className}__group`}>
            <label 
              for="inSystemNumber"
              className={`${this.props.className}__label`}
            >
              Podaj system wejściowy(za pomocą liczby)
              </label>
            <input 
              type="number"
              onChange={this.handleChangeInSystemNumber.bind(this)} 
              onBlur={this.handleOnBlurInSystemNumber.bind(this)}
              disabled={!this.state.formValidNumber}
              id="inSystemNumber"
              required
              className={`${this.props.className}__input`}
            />
            {this.state.formValidInSystemNumber === false &&
              <span className={`${this.props.className}__error`}>{this.state.formValidInSystemNumberErrorMsg}</span>
            }
          </div>

          <div className={`${this.props.className}__group`}>
            <label 
              for="formOutSystemNumber"
              className={`${this.props.className}__label`}
            >
                Podaj system wyjściowy(za pomocą liczby)
            </label>
            <input 
              type="number"
              onChange={this.handleChangeOutSystemNumber.bind(this)} 
              disabled={!this.state.formValidInSystemNumber}
              id="formOutSystemNumber"
              required
              className={`${this.props.className}__input`}
            />
            {this.state.formValidOutSystemNumber === false &&
              <span className={`${this.props.className}__error`}>{this.state.formValidOutSystemNumberErrorMsg}</span>
            }
          </div>
          <button 
            type="submit"
            disabled={this.isDisabled()}
            onClick={this.handleClick.bind(this)}
          >Transferuj</button>
        </form>
        <div>Twój rezultat to: {this.state.result}</div>
      </div>
    )
  }
}

export default SystemNumberTransformerForm;