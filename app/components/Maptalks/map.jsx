/*
 * @file component Mapbox
 */
import React from 'react';
import * as maptalks from 'maptalks';
import { ThreeLayer } from 'maptalks.three';

export default class MaptalksMap extends React.Component{
    //
    render() {
        debugger;
        const map = new maptalks.Map('maptalks-container', {
            center: [0, 0],
            zoom: 1
        });

        const threeLayer = new ThreeLayer('three');
        threeLayer.prepareToDraw = function (gl, scene, camera) {
            const light = new THREE.DirectionalLight(0xffffff);
            light.position.set(0, -10, -10).normalize();
            scene.add(light);
            //...
        };
        threeLayer.addTo(map);
        /*return (
            <div id="map" style={{width: '100%', height: '500px'}}></div>
        )*/
    }
}