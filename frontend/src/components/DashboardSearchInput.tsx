import * as React from "react";
import { Component } from 'react';

import * as searchIcon from '../assets/img/search-icon.svg';
import '../assets/scss/DashboardSearchInput.scss';

export interface DashboardSearchInputProps {
    
}
export default class DashboardSearchInput extends Component<DashboardSearchInputProps> {
    render() {
        return (
            <div className="dashbord-search-input">
                <img src={searchIcon}/>
                <input/>
                <button>Search</button>
            </div>
        );
    }
}