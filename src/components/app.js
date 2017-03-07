import React, {Component} from 'react';
import axios from 'axios';
import CrimeMap from './crime_map';
import CrimeDisplayer from './crime_displayer';
import CrimeAdder from './crime_adder';
const API_KEY = 'hey! missing GOOGLEMAPS KEY';
const ROOT_URL =  "https://nocrimeback.herokuapp.com/api"; //"http://localhost:1337/api"; 

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crimes: [],
      markers:[],
      curentCrime: null,
      filters: {}
    }

    this.updateMapWithFilters = this.updateMapWithFilters.bind(this);
    this.updateMapWithNewCrime = this.updateMapWithNewCrime.bind(this);
  }
  componentDidMount()
  {
    console.log("calling in DID MOUNT");
    axios.get(ROOT_URL+ "/crimes")
    .then(response => {
      this.setState({
        crimes: response.data
      });
      const nMarkers = [];

      for (let i = 0; i < this.state.crimes.length; i++)
      {
        const position = new google.maps.LatLng(
            this.state.crimes[i].latitude,
            this.state.crimes[i].longitude
        );

        nMarkers.push({
          position,
          content: `This is the secret message`.split(` `)[i],
          showInfo: false,
        });
      }
      //console.log(nMarkers.length);
      this.setState({markers: nMarkers});
    })
  }


  updateMapWithFilters(startDateParam, endDateParam, selectedCrimesParam){
    if (selectedCrimesParam.length === 0){
      selectedCrimesParam = ["robo", "violacion", "violencia", "drogas", "prostitucion"];
      this.state.filters.selectedCrimes = ["robo", "violacion", "violencia", "drogas", "prostitucion"];
    }
    else{
      this.state.filters.selectedCrimes = selectedCrimesParam;
    }
    this.state.filters.startDate = startDateParam || new Date(22272000);
    this.state.filters.endDate = endDateParam || new Date(1628057472000);

    // update crimes with a axios call to the API. API IS DONE, only thing left is to call it.
    axios.post( ROOT_URL + '/crimes/search', {
    startDate: this.state.filters.startDate,
    endDate: this.state.filters.endDate,
    selectedCrimes: this.state.filters.selectedCrimes
    })
    .then(response => {
      console.log("Wooo got data from data base");
      console.log(response.data);
      //console.log("-------THIS IS-------");
      //console.log(this);
      this.setState({
          crimes: response.data
      });

      const nMarkers = [];

      for (let i = 0; i < this.state.crimes.length; i++)
      {
        console.log("entra for por que si");
        const position = new google.maps.LatLng(
            this.state.crimes[i].latitude,
            this.state.crimes[i].longitude
        );
        nMarkers.push({
          position,
          content: `This is the secret message`.split(` `)[i],
          showInfo: false,
        });
      }
      console.log("nMarkers mide: " + nMarkers.length);
      console.log(nMarkers);
      this.setState({markers: nMarkers});
    })
    .catch(function (error) {
      console.log("Error calling search API, error below:")
      console.log(error);
    });


  }

  // updates the map with crimes and leaves the filters intact
  updateMapWithNewCrime(){
    // update crimes with a axios call to the API. API IS DONE, only thing left is to call it.
    axios.post( ROOT_URL + '/crimes/search', {
    startDate: this.state.filters.startDate,
    endDate: this.state.filters.endDate,
    selectedCrimes: this.state.filters.selectedCrimes
    })
    .then(response => {
      console.log("Wooo got data from data base");
      console.log(response.data);
      //console.log("-------THIS IS-------");
      //console.log(this);
      this.setState({
          crimes: response.data
      });

      const nMarkers = [];

      for (let i = 0; i < this.state.crimes.length; i++)
      {
        console.log("entra for por que si");
        const position = new google.maps.LatLng(
            this.state.crimes[i].latitude,
            this.state.crimes[i].longitude
        );
        nMarkers.push({
          position,
          content: `This is the secret message`.split(` `)[i],
          showInfo: false,
        });
      }
      console.log("nMarkers mide: " + nMarkers.length);
      console.log(nMarkers);
      this.setState({markers: nMarkers});
    })
    .catch(function (error) {
      console.log("Error calling search API, error below:")
      console.log(error);
    });
  }

  render(){
    return(
        <div className="mapSection" id="mapSection">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-1">
              </div>

              <div className="col-md-10 principal">
                <div className="row mapContainer">
                  <div className="col-md-8 map">
                    <div className="map-area">
                      <CrimeMap crimes={this.state.crimes} markers={this.state.markers}/>
                    </div>
                  </div>

                  <div id="panelFiltros" className="col-md-4 mapPanel">
                    <CrimeDisplayer updateMapWithFilters={this.updateMapWithFilters}/>
                  </div>
                  <div id="panelCrear" className="col-md-4 mapPanel">
                    <CrimeAdder updateMapWithNewCrime={this.updateMapWithNewCrime}/>
                  </div>
                </div>
              </div>

              <div className="col-md-1">
              </div>
            </div>
          </div>

        </div>


  );
  }
}

export default App;
