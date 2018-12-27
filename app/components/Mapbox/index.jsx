/*
 * @file component Mapbox
 */
import React from 'react';
import { Checkbox } from 'antd'
import MapboxMap from './map.jsx'

export default class Mapbox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showmap: false
        };
        this.handleChange = this._handleChange.bind(this);
    }

    render(){
        const isShow = this.state.showmap
        ?(
            <MapboxMap/>
        )
        :
        (
            <span>x</span>
        )

        return (
            <div className="mapbox-component">
                <span>Hello World!</span>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示mapbox地图
                </Checkbox>
                <div className="mapbox-container">
                    {mainpart}
                </div>
            </div>
        )
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap })
        if(this.state.showmap){
            //todo
        }
    }
}