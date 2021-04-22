import React, { Component } from 'react'

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleSearch = this.handleSearch.bind(this)

    }
    handleSearch(event) {
        let filteredSuggestions
        const { value } = event.target
        this.setState({ value: event.target.value })
        if (this.props.compVal == "subarea") {
            filteredSuggestions = this.props.data.filter(
                suggestion => suggestion.desg.toLowerCase().indexOf(value.toLowerCase()) > -1);
            this.setState({
            }, this.props.update(filteredSuggestions))
        }
    }


    render() {
        return (
            <div className="dcrInput">
                {this.props.compVal == "subarea" ?
                    <input
                        placeholder="Select Sub Area"
                        onChange={this.handleSearch}
                        value={this.state.value}

                    /> : null}
            </div>
        )
    }
}
export default SearchInput
