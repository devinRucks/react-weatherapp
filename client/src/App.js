import React from 'react';
import './App.css';
import CurrentData from './components/currentData/currentData.js'
import DailyData from './components/dailyData/dailyData.js'
import { getCurrentPosition } from './utils/coordinates.js'
import LocationSearchInput from './components/searchBox/placesAutocomplete.js'
import axios from 'axios'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentData: [],
			dailyData: [],
			latitude: null,
			longitude: null,
			loading: true
		}
	}

	// Retrieve weather from DarkSky API
	getData() {
		axios.post('/search', {
			latitude: this.state.latitude,
			longitude: this.state.longitude
		})
			.then(res => res.data)
			.then(data => {
				this.setState({
					currentData: data.currentData,
					dailyData: [...data.dailyData],
					loading: false
				}, () => {
					// Change the background image to match the weather description
					console.log(this.state.currentData.icon)
					document.body.style.backgroundImage = `url(https://source.unsplash.com/1500x1000/?${this.state.currentData.icon}-weather)`;
				})
			})
	}

	// After setting state of user's coords, retrieve weather data
	async getCoords() {
		try {
			const { coords } = await getCurrentPosition();
			this.setState({
				latitude: coords.latitude,
				longitude: coords.longitude,
			}, () => this.getData())

		} catch (error) {
			console.error(error);
		}
	}

	// When page first loads, get user's coords
	componentDidMount() {
		this.getCoords()
	}

	// Gets updated data for the new coords
	componentDidUpdate(prevProps, prevState) {
		if (this.state.latitude !== prevState.latitude) {
			this.getData();
		}
	}

	// Updates state for the coords that come from the search bar
	callbackFunction = (coord) => {
		this.setState({
			latitude: coord.lat,
			longitude: coord.lng,
			loading: true
		})
	}

	render() {
		return (
			<div id="container">

				<div id="search-container">
					<LocationSearchInput parentCallback={this.callbackFunction} />
				</div>

				<div className="powered-by"></div>

				<div id="current-weather-container">
					<CurrentData currentData={this.state.currentData} loading={this.state.loading} summary={this.state.dailyData} />
				</div>

				<div id="weekly-weather-container">
					<DailyData dailyData={this.state.dailyData} loading={this.state.loading} />
				</div>

			</div>
		);
	}
}
