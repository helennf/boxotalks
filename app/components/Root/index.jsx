/*
 * @file component Root
 */
import React from 'react';
//import Mapbox from './../Mapbox';
import Maptalks from './../Maptalks';

export default class Root extends React.Component{
    render(){
        return (
            <div className="root-component">
                <Maptalks />
            </div>
        )
    }
}