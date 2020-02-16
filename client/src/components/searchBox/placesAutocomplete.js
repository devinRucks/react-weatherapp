import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import '../../App.css';

export default class LocationSearchInput extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               address: '',
               latLng: {}
          };
     }

     handleChange = address => {
          this.setState({ address });
     };

     handleSelect = async (address) => {
          const results = await geocodeByAddress(address);
          const latLng = await getLatLng(results[0]);
          this.setState({ latLng, address })
          this.sendData()
     };

     sendData = () => {
          this.props.parentCallback(this.state.latLng)
     }

     render() {
          return (
               <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
               >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                         <div>
                              <input
                                   {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                   })}
                              />
                              <div className="autocomplete-dropdown-container">
                                   {loading && <div>Loading...</div>}

                                   {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                             ? 'suggestion-item--active'
                                             : 'suggestion-item';
                                        return (
                                             <div
                                                  {...getSuggestionItemProps(suggestion, {
                                                       className
                                                  })}
                                             >
                                                  <span>{suggestion.description}</span>
                                             </div>
                                        );
                                   })}
                              </div>
                         </div>
                    )}
               </PlacesAutocomplete>
          );
     }
}