import React, {Component} from 'react';
//import DateSelector from (./date_selector);
import CrimeSelector from './crime_selector';
//import CitySelector from (./city_selector);

import {SingleDatePicker} from 'react-dates';


class CrimeDisplayer extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      startDate: null,
      endDate: null,
      startDateFocus: null,
      endDateFocus: null,
      crimeSelections: ["robo", "violacion", "violencia", "drogas", "prostitucion"],
      selectedCrimes: ["robo", "violacion", "violencia", "drogas", "prostitucion"],
      city: null
    }

    // bind this to selectors
    this.handleCrimeSelection = this.handleCrimeSelection.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocusChange = this.onEndDateFocusChange.bind(this);
    this.onStartDateFocusChange = this.onStartDateFocusChange.bind(this);
  }

  componentDidUpdate(){
    console.log("DID UPDATE CRIME DISPLAYER");
    //this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes);
  }

  onStartDateChange(newStartDate)
  {
    this.setState({startDate: newStartDate}, () => console.log("start date is: " + this.state.startDate));
    //this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes);
  }

  onEndDateChange(newEndDate)
  {
    this.setState({endDate: newEndDate}, () => this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes));
    //this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes);
  }

  onStartDateFocusChange(focusedF)
  {
    this.setState({startDateFocus: focused}, () => console.log("end date focus change is: " + this.state.onEndDateFocusChange));
  }

  onEndDateFocusChange(focusedI)
  {
    this.setState({endDateFocus: focused});
  }


  handleCrimeSelection(e)
  {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedCrimes.indexOf(newSelection) > -1)
    {
      newSelectionArray = this.state.selectedCrimes.filter(s => s !== newSelection)
    }
    else
    {
      newSelectionArray = [...this.state.selectedCrimes, newSelection];
    }
    this.setState({selectedCrimes: newSelectionArray}, () => this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes)); // console.log('crime selection', this.state.selectedCrimes)
    //this.props.updateMapWithFilters(this.state.startDate, this.state.endDate, this.state.selectedCrimes);
  }


  render()
  {
    return (
        <div >
          <h2 className="panelTitle">Filtros</h2>
          <div className="panelField">
            <div className="panelField-title">
              <h3>Tipo</h3>
            </div>
            <div className="panelField-content">
              <CrimeSelector
                  title={'Qué tipo de crímenes quieres ver en el mapa?'}
                  setName={'crimes'}
                  type={'checkbox'}
                  controlFunc={this.handleCrimeSelection}
                  options={this.state.crimeSelections}
                  selectedOptions={this.state.selectedCrimes}/>
            </div>
          </div>

          <div className="panelField">
            <div className="panelField-title">
              <h3>Rango de Fechas</h3>
            </div>
            <div className="panelField-content">
              <p>Selecciona las fechas en que quieres hacer tu busqueda.</p>
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-3">
              <SingleDatePicker
                  id="startDate-input"
                  date={this.state.startDate}
                  focused={this.state.startDateFocus}
                  onDateChange={this.onStartDateChange}
                  onFocusChange={({focused}) =>
                  {
                    this.setState({startDateFocus: focused});
                  }}
                  numberOfMonths={1}
                  anchorDirection='left'
              />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-3">
              <SingleDatePicker
                  id="endDate-input"
                  date={this.state.endDate}
                  focused={this.state.endDateFocus}
                  onDateChange={this.onEndDateChange}
                  onFocusChange={({focused}) =>
                  {
                    this.setState({endDateFocus: focused});
                  }}
                  numberOfMonths={1}
                  anchorDirection='right'
              />
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="panelField agregarCrimen">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <a className="irAPanelAgregarCrimen btn-agregar btn btn-lg btn-default">Agregar Crimen</a>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
    );
  }
          }

          export default CrimeDisplayer;
