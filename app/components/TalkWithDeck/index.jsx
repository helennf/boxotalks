/*
 * @file component Mapbox
 */
import React from 'react';
import { Checkbox } from 'antd'
import * as maptalks from 'maptalks';
import DeckGL, {LineLayer} from 'deck.gl';
import DeckGLLayer from './../../utils/DeckGLLayer'
import DeckGLRenderer from './../../utils/DeckGLRenderer'

export default class TalksWithDeck extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showmap: false,
        };
        this.handleChange = this._handleChange.bind(this);
    }
    render() {
        return (
            <div className="talks-deck-component" style={{position: 'absolute',top: '400px',left:'712px'}}>
                <div id="talks-deck-container" style={{width: '712px', height: '370px'}}>
                </div>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示maptalks.deck地图
                </Checkbox>
            </div>
        )
    }

    _handleChange() {
        this.setState({showmap: !this.state.showmap})
        if (!this.state.showmap) {
            const initialViewState = {
                longitude: -122.41669,
                latitude: 37.7853,
                zoom: 13,
                pitch: 0,
                bearing: 0
            };
            const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
            const layers = [
                new LineLayer({id: 'line-layer', data})
            ];
            const options = {
                renderer: 'gl',
                initialViewState: initialViewState,
                controller: true,
                layers: layers
            };
            var baseLayer = new DeckGLLayer('decklayer', options);
            var map = new maptalks.Map("talks-deck-container", {
                //limit max pitch to 60 as mapbox-gl-js required
                maxPitch: 60,
                center: [-123.10, 49.25],
                zoom: 13,
                baseLayer: baseLayer
                /*baseLayer : new maptalks.TileLayer('tile',{
                    'urlTemplate' : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'subdomains'  : ['a','b','c']
                })*/
            });
            var deckcanvas = new DeckGLRenderer();
            //deckcanvas.createContext();
            //deckcanvas.draw();

            //map.config('renderer ', baseLayer);
        }
    }
}

