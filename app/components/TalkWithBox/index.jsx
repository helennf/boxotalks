/*
 * @file component Mapbox
 */
import React from 'react';
import { Checkbox } from 'antd'
//import MaptalksMap from "../Maptalks/map";
import mapboxgl from 'mapbox-gl';
import * as maptalks from 'maptalks';
import { MapboxglLayer } from 'maptalks.mapboxgl';
import data from './../../vancouver-blocks.json';

export default class TalksWithBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showmap: false,
            map: {},
            paused: false,
            pitch: 0,
            bearing: 0,
            d: 'up'
        };
        this.handleChange = this._handleChange.bind(this);
        this.changeView = this._changeView.bind(this);
        this.reset = this._reset.bind(this);
        this.start = this._start.bind(this);
        this.pause = this._pause.bind(this);
    }

    render() {
        return (
            <div className="talks-box-component" style={{position: 'absolute',top: '400px'}}>
                <div id="talks-box-container" style={{width: '712px', height: '370px'}}>
                </div>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示maptalks.mapbox地图
                </Checkbox>
            </div>
        )
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap })
        if(!this.state.showmap) {
            const that = this;
            mapboxgl.accessToken = 'pk.eyJ1IjoiaHNhY2NvdW50IiwiYSI6ImNqb2k5aGI5ZjA2dHgzcnQ2YjQ2Zzh2ZmkifQ.OtSQtiTzfeSD8cYuUGiBxA';

            var baseLayer = new MapboxglLayer('tile', {
                glOptions: {
                    'style': 'mapbox://styles/mapbox/light-v9'
                }
            }).on('layerload', function () {
                that.start();
            });

            var map = new maptalks.Map("talks-box-container", {
                //limit max pitch to 60 as mapbox-gl-js required
                maxPitch: 60,
                center: [-123.10, 49.25],
                zoom: 13,
                baseLayer: baseLayer
            });
            this.setState({
                map: map,
                paused: true
            })
        }
    }

    _changeView() {
        if (this.state.pitch > 50) {
            this.state.d = 'down';
        } else if (this.state.pitch < 0) {
            this.state.d = 'up';
        }
        if (this.state.d === 'down') {
            this.state.pitch--;
        } else {
            this.state.pitch++;
        }
        this.state.map.setPitch(this.state.pitch);
        this.state.map.setBearing(this.state.bearing++);
        if (!this.state.paused) {
            requestAnimationFrame(this.changeView);
        }
    }
    _reset() {
        requestAnimationFrame(function () {
            this.setState({
                paused: true,
                pitch: 0,
                bearing: 0
            });
            this.state.map.setPitch(0);
            this.state.map.setBearing(0);
        });
    }
     _start() {
        if(this.state.paused){
            this.setState({
                paused: false
            });
            this.changeView();
        }
    }
    _pause() {
        this.setState({
            paused: true
        });
    }
}