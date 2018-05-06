import * as React from "react";
import { Component } from 'react';

import * as searchIcon from '../assets/img/search-icon.svg';
import '../assets/scss/DashboardSearchInput.scss';

export interface DashboardSearchInputProps {
    onSearch: (filter:string) => void;
    filter: string;
}
export default class DashboardSearchInput extends Component<DashboardSearchInputProps> {
    public state = {
        filter: ''
    }

    constructor(props: DashboardSearchInputProps) {
        super(props);
        this.state = {
            filter: props.filter,
        }
    }

    handleFilterChange = (e) => {
        this.setState({
            filter: e.target.value,
        })
    }

    handleSearch = () => {
        this.props.onSearch(this.state.filter);
    }

    render() {
        return (
            <form>
                <div className="dashbord-search-input">
                    <img src={searchIcon}/>
                    <input value={this.state.filter} onChange={this.handleFilterChange} placeholder="Search by tags"/>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
            </form>
        );
    }
}