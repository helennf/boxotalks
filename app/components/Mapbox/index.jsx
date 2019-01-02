/*
 * @file component Mapbox
 */
import React from 'react';
import { Checkbox } from 'antd'
import MapboxGL from 'mapbox-gl';
/*import {MapboxLayer} from '@deck.gl/mapbox';
import {JSONLayer} from '@deck.gl/json';
import DeckGL, {GeoJsonLayer} from 'deck.gl';*/
import data from './../../vancouver-blocks.json';
//import MapboxLanguage from '@mapbox/mapbox-gl-language';
//import MapboxMap from './map.jsx'

export default class Mapbox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showmap: false
        };
        this.handleChange = this._handleChange.bind(this);
    }

    render(){
        return (
            <div className="mapbox-component" style={{position: 'absolute',top: '8px',left: '478px'}}>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示mapbox地图
                </Checkbox>
                <div id="mapbox-container" style={{width: '487px',height:'370px'}}>
                </div>
            </div>
        )
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap })
        if(!this.state.showmap){
            //todo
            MapboxGL.accessToken = "pk.eyJ1IjoiaHNhY2NvdW50IiwiYSI6ImNqb2k5aGI5ZjA2dHgzcnQ2YjQ2Zzh2ZmkifQ.OtSQtiTzfeSD8cYuUGiBxA";

            //设置地图区域
            let bounds = [
                [118.21, 28.11], // Southwest coordinates，西南坐标
                [122.40, 31.33]  // Northeast coordinates，东北坐标
            ];

            const map = new MapboxGL.Map({
                style: 'mapbox://styles/mapbox/streets-v10',
                center: [-123.10, 49.25], //地图中心经纬度
                zoom: 13, //缩放级别
                minZoom: 2,
                maxZoom: 19,
                pitch: 70,
                bearing: 180,
                container: 'mapbox-container',
                preserveDrawingBuffer: true,
                //maxBounds: bounds
            });

            //地图显示中文
            /*var language = new MapboxLanguage();
            map.addControl(language);*/

            map.on('load', function () {
                map.addLayer({
                    'id': 'test-json',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': data
                    },
                    'layout': {},
                    'paint': {
                        'fill-color': '#ffffea',
                        'fill-outline-color': '#3385ff',
                        'fill-opacity': 0.6
                    }
                });
            })
        }
    }
}