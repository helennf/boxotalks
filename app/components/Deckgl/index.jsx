import React from 'react';
import { Checkbox } from 'antd'
import DeckGL, {LineLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaHNhY2NvdW50IiwiYSI6ImNqb2k5aGI5ZjA2dHgzcnQ2YjQ2Zzh2ZmkifQ.OtSQtiTzfeSD8cYuUGiBxA';

const initialViewState = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];

export default class Deckgl extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showmap: false,
        };
        this.handleChange = this._handleChange.bind(this);
    }

    render() {
        const layers = [
            new LineLayer({id: 'line-layer', data})
        ];

        const mainpart = this.state.showmap
            ?
            (
                <DeckGL
                    initialViewState={initialViewState}
                    controller={true}
                    layers={layers}
                    width={470}
                    height={370}
                >
                    <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                </DeckGL>
            )
            :
            (
                <span></span>
            )

        return (
            <div className="deckgl-component" style={{position: 'absolute',top: '8px', left: '965px'}}>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示deckgl地图
                </Checkbox>
                <div id="deckgl-container" style={{position: 'absolute', width: '470px', height: '370px'}}>
                    {mainpart}
                </div>
            </div>
        );
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap });
    }
}
