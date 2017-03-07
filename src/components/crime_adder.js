import React, {Component} from 'react';
import ReportedSelector from './reported_selector';
import CrimeTypeSelector from './crime_type_selector';
import Description from  './description';
import {SingleDatePicker} from 'react-dates';
import axios from 'axios';
const ROOT_URL =  "https://nocrimeback.herokuapp.com/api";//"http://localhost:1337/api";

class CrimeAdder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crimeToAdd: null,
      reportedSelections: ['si', 'no'],
      reportedSelection: [],
      date: null,
      dateFocus : null,
      types: ["robo", "violacion", "violencia", "drogas", "prostitucion"],
      type: null,
      description: ''
    }

    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocusChange = this.onStartDateFocusChange.bind(this);
    this.handleReportedSelection = this.handleReportedSelection.bind(this);
    this.handleCrimeTypeSelect = this.handleCrimeTypeSelect.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  onStartDateChange(newStartDate){
    this.setState({ date: newStartDate }, () => console.log(" date is: " + this.state.date));
  }

  onStartDateFocusChange(focusedF){
    this.setState({ dFocus: focused },() => console.log(" date focus change is: " + this.state.dateFocus));
  }

  handleReportedSelection(e) {
  this.setState({ reportedSelection: [e.target.value] }, () => console.log('reportado ', this.state.reportedSelection));
}

  handleCrimeTypeSelect(e) {
  this.setState({ type: e.target.value }, () => console.log('tipo de crimen', this.state.type));
  }
  handleDescriptionChange(e) {
  this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
  }

  saveCrime(e){
    // check that three necessary things are not null and save the new crime into the database
    if(this.state.reportedSelection.length === 1 && this.state.date && this.state.type && this.state.description){
      console.log("saving crime!");
      var reportedByUser = this.state.reportedSelection[0] === "si";
      var latitudeFromMap = 4.5951213;
      var longitudeFromMap = -74.0710443;

      axios.post( ROOT_URL + '/crimes', {
      latitude: latitudeFromMap,
      longitude: longitudeFromMap,
      type: this.state.type,
      date: this.state.date,
      reported: reportedByUser,
      description: this.state.description
      })
      .then(response => {
        console.log("saving in data base base");
        console.log(response.data);
        this.props.updateMapWithNewCrime();
      })
      .catch(function (error) {
        console.log("Error calling search API, error below:")
        console.log(error);
      });

    }
  }

  render(){
    return(
      <div>
        <h2 className="panelTitle">Reporta un Crimen</h2>
        <div className="panelField">
          <div className="panelField-title">
            <h3>Denunciado</h3>
          </div>
        </div>
        <div className="panelField-content">
        <ReportedSelector
					title={'Reportaste el crimen con las autoridades?'}
					setName={'reported'}
					type={'checkbox'}
					controlFunc={this.handleReportedSelection}
					options={this.state.reportedSelections}
					selectedOptions={this.state.reportedSelection} />
        </div>
        <div className="row">
          <div className="col-md-6">
        <div className="panelField">
          <div className="panelField-title">
            <h3>Fecha</h3>
          </div>
          <div className="panelField-content">
            <p>Cuando sucedio?</p>
          <SingleDatePicker
              id="startDate-input"
              date={this.state.date}
              focused={this.state.dateFocus}
              onDateChange={this.onStartDateChange}
              onFocusChange={({ focused }) => { this.setState({ dateFocus: focused }); }}
              numberOfMonths={1}
              anchorDirection='left'
          />
          </div>
        </div>
          </div>
          <div className="col-md-6">
        <div className="panelField">
          <div className="panelField-title">
            <h3>Tipo</h3>
          </div>
          <div className="panelField-content">
            <p>Qué tipo de crimen fue?</p>
            <div className="textArea2">
              <div id="typeSelectorElement">
        <CrimeTypeSelector
					name={'crime-type'}
					placeholder={'Tipo de crimen'}
					controlFunc={this.handleCrimeTypeSelect}
					options={this.state.types}
					selectedOption={this.state.type} />
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className="panelField">
          <div className="panelField-title">
            <h3>Descripción</h3>
          </div>
          <div className="panelField-content">
          <Description

  					rows={5}
            cols={50}
  					resize={false}
  					content={this.state.description}
  					name={'crime-description'}
  					controlFunc={this.handleDescriptionChange}
  					placeholder={'Cuenta un poco del crimen que presenciaste'} />
          </div>
        </div>
        <div className="panelField aceptarCancelar">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-3">
              <a className="btn-landingPage btn btn-lg btn-default irAPanelFiltros" onClick={this.saveCrime.bind(this)}>Aceptar</a>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <a className="btn-landingPage btn btn-lg btn-default irAPanelFiltros" >Cancelar</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default CrimeAdder;
