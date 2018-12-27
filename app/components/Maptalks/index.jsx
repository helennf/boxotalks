/*
 * @file component Mapbox
 */
import React from 'react';
import { Checkbox } from 'antd'
//import MaptalksMap from "../Maptalks/map";
import * as maptalks from 'maptalks';
import * as THREE from 'three';
import { ThreeLayer } from 'maptalks.three';
import data from './../../vancouver-blocks.json';

export default class Maptalks extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showmap: false
        };
        this.handleChange = this._handleChange.bind(this);
        this.getColor = this._getColor.bind(this);
    }

    render(){
        return (
            <div className="maptalks-component">
                <span>Hello!</span>
                <Checkbox
                    checked={this.state.showmap}
                    onChange={() => {
                        this.handleChange()
                    }}
                >
                    显示mapbox地图
                </Checkbox>
                <div id="maptalks-container" style={{width: '100%',height:'400px'}}>
                </div>
            </div>
        )
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap })
        if(!this.state.showmap){
            const map = new maptalks.Map('maptalks-container', {
                center: [-123.10, 49.25],
                zoom: 10,
                centerCross : true,
                doubleClickZoom : false,
                baseLayer : new maptalks.TileLayer('tile',{
                    'urlTemplate' : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
                    'subdomains'  : ['a','b','c','d']
                })
                /*layers : [
                    new maptalks.VectorLayer('v', [new maptalks.Marker([-123.10, 49.25])])
                ]*/
            });

            const threeLayer = new ThreeLayer('three',{
                forceRenderOnMoving : true,
                forceRenderOnRotating : true
            });
            threeLayer.prepareToDraw = function (gl, scene, camera) {
                const me = this;
                const light = new THREE.DirectionalLight(0xffffff);
                light.position.set(0, -10, 10).normalize();
                scene.add(light);
                //...
                data.features.forEach(function (g) {
                    debugger;
                    var heightPerLevel = 10;
                    var levels = g.properties.growth*10 || 1;
                    let color;
                    if (levels < 2) {
                        color = 0x2685;
                    } else if (levels >= 2 && levels <= 5) {
                        color = 0xff57;
                    } else {
                        color = 0xff2e;
                    }
                    /*if (levels < 2) {
                        color = "rgb(128, 247, 247)";
                    } else if (levels >= 2 && levels <= 5) {
                        color = "rgb(20, 184, 247)";
                    } else {
                        color = "rgb(20, 58, 247)";
                    }*/
                    var m = new THREE.MeshPhongMaterial({color: color, opacity : 0.7});
                    //change to back side with THREE <= v0.94
                    // m.side = THREE.BackSide;
                    var mesh = me.toExtrudeMesh(maptalks.GeoJSON.toGeometry(g), levels * heightPerLevel, m, levels * heightPerLevel);
                    if (Array.isArray(mesh)) {
                        scene.add.apply(scene, mesh);
                    } else {
                        scene.add(mesh);
                    }
                });
            };
            threeLayer.addTo(map);
        }
    }

    _getColor(level) {
        if (level < 2) {
            return ffdeada7;
        } else if (level >= 2 && level <= 5) {
            return ffd700033;
        } else {
            return ffe4c400;
        }
    }
}