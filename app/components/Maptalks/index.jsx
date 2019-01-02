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
                    显示maptalks地图
                </Checkbox>
                <div id="maptalks-container" style={{width: '470px',height:'370px'}}>
                </div>
            </div>
        )
    }

    _handleChange(){
        this.setState({ showmap: !this.state.showmap })
        if(!this.state.showmap){
            const map = new maptalks.Map('maptalks-container', {
                center: [-123.10, 49.25],
                zoom: 13,
                pitch : 70,
                bearing : 180,
                centerCross : true,
                doubleClickZoom : false,
                baseLayer : new maptalks.TileLayer('tile',{
                    'urlTemplate' : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    'subdomains'  : ['a','b','c']
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
                    //var heightPerLevel = 10;
                    var levels = g.properties.valuePerSqm/100 || 1;
                    let color;
                    if (levels < 40) {
                        color = "rgb(128, 247, 247)";
                    } else if (levels >= 40 && levels <= 80) {
                        color = "rgb(20, 184, 247)";
                    } else {
                        color = "rgb(20, 58, 247)";
                    }
                    var m = new THREE.MeshPhongMaterial({color: color, opacity : 0.7});
                    //change to back side with THREE <= v0.94
                    // m.side = THREE.BackSide;
                    var mesh = me.toExtrudeMesh(maptalks.GeoJSON.toGeometry(g), levels, m, levels);
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
}