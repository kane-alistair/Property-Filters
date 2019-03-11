import React, { Component } from 'react';
import Property from '../components/Property';

class PropertyContainer extends Component {
  state = { selectedFilters: {}, criteria: {} }

  static getDerivedStateFromProps(props, state){
    let properties = props.properties;

    // Store each criteria separately in state
    for (let propertyObj of properties){
      for (let key in propertyObj){
        if (state['criteria'].hasOwnProperty(key)){
          state['criteria'][key].push(propertyObj[key])
        } else {
          state['criteria'][key] = [propertyObj[key]]
        }
      }
    }

    return state;
  }

  formatCamelCase = (key) => {
    let arr = key.split('');

    for (let char of arr){
      if (char === char.toUpperCase()){
        let index = arr.indexOf(char);
        char = ' ' + char.toLowerCase();
        arr[index] = char;
      }
    }

    arr[0] = arr[0].toUpperCase();

    return arr.join('');
  }

  handleSelection = (event) => {
    const value = event.target.value;
    const label = event.target.name;
    const filters = this.state.selectedFilters;

    //  If 'Any criteria' is re-selected - remove filter from state
    //  Otherwise, add filter to state
    if (value === "none") {
      delete filters[label];
    } else {
      filters[label] = value;
    }

    return this.setState({ selectedFilters: filters })
  }

  applyFilters = (properties, filters) => {
    let result = properties;

    for (let key in filters){
      result = result.filter(property => property[key] === filters[key])
    }

    return result;
  }

  displayProperties = (properties, selectedFilters) => {
    const filteredProperties = this.applyFilters(properties, selectedFilters);
    return filteredProperties.map((property, index) => (
      <Property data={property} formatCamelCase={this.formatCamelCase} key={index} />)
    )
  }

  createFilterDropDowns = (criteria) => {
    const allDropDowns = [];

    const createOptions = (crit) => [...new Set(crit)]
    .sort()
    .map(value => <option key={value}>{value}</option>)

    for (let crit in criteria){
      let formattedKey = this.formatCamelCase(crit);

      allDropDowns.push(
        <div key={crit}>
        <label htmlFor={crit}>{formattedKey}</label>
        <select onChange={this.handleSelection} name={crit}>
        <option defaultValue value='none'>Any {formattedKey.toLowerCase()}</option>
        {createOptions(criteria[crit])}
        </select>
        </div>
      )
    }

    return allDropDowns;
  }

  render() {
    let { properties } = this.props;
    let { criteria, selectedFilters } = this.state;

    return (
      <div>
      {this.createFilterDropDowns(criteria)}
      {this.displayProperties(properties, selectedFilters)}
      </div>
    );
  }
}

export default PropertyContainer;
