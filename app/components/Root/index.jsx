/*
 * @file component Root
 */
import React from 'react';
import Mapbox from './../Mapbox';
import Maptalks from './../Maptalks';
import Deckgl from './../Deckgl';
import TalksWithBox from './../TalkWithBox';
import TalksWithDeck from './../TalkWithDeck';

export default class Root extends React.Component{
    render(){
        return (
            <div className="root-component">
                <Maptalks />
                <Mapbox />
                <Deckgl />
                <TalksWithBox />
                <TalksWithDeck />
            </div>
        )
    }
}