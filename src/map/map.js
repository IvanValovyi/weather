import React from "react";
import './map.css'
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
import VectorLayerWithContext from "./layers/vector/vector";
import * as olProj from 'ol/proj'
import Geolocation from 'ol/Geolocation';

export const MapContext = React.createContext(undefined)

export class MapComponent extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            MapContext:null
        }
        this.mapDivRef = React.createRef()
    }

    geolocation
    updateData

    componentDidMount(){
        if (!this.mapDivRef.current) {
            return
        }

        const view = new View({
            center:[0, 0],
            zoom: 4
        })

        const map = new Map({
            target: this.mapDivRef.current,
            layers:[
                new TileLayer({
                    source: new XYZ({
                        url:'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            view: view
        })

        this.geolocation = new Geolocation({
            trackingOptions: {
              enableHighAccuracy: true,
            },
            projection: view.getProjection(),
          });

          this.geolocation.on('change', (e) => {
            this.setState({
                MapContext: {map, coordinate: e.target.values_.position},
            })
            let coordinate = olProj.transform(e.target.values_.position, 'EPSG:3857', 'EPSG:4326')
            this.props.updateData(this.updateData(coordinate))
          });

        this.updateData = async function (coordinate){
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate[1]}&lon=${coordinate[0]}&units=metric&appid=90c4bad62cdec1c30bea122ec322daab`)
            return await res.json()
        }

        map.on('singleclick', (e)=>{
            this.setState({
                MapContext: {map, coordinate: e.coordinate}
            })
            let coordinate = olProj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326')
            this.props.updateData(this.updateData(coordinate))
            this.props.resetGetLoc()
        })
        
    }

    componentDidUpdate(){
        if (this.props.getLoc) {
            this.geolocation.setTracking(true)
        } else {
            this.geolocation.setTracking(false)
        }
    }

    render(){
        return(
            <div className="map" ref={this.mapDivRef}>
                {this.state.MapContext && (
                    <MapContext.Provider value={this.state.MapContext}>
                        <VectorLayerWithContext/>
                    </MapContext.Provider>
                )}
            </div>
        )
    }
}

export default MapComponent