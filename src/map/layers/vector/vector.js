import { Feature } from "ol";
import { Circle } from "ol/style";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import React from "react";
import { MapContext } from "../../map";

class VectorLayerComponent extends React.PureComponent{
    layer;
    source;

    componentDidMount() {
        this.source = new VectorSource({
          features: undefined,
        });
    
        this.layer = new VectorLayer({
          source: this.source,
        });
    
        this.props.map.addLayer(this.layer);
      }

    onMapClick(coordinate){
        const FeatureToAdd = new Feature({
            geometry: new Point(coordinate)
        })
        const style = new Style({
            image: new Circle({
                radius: 6,
                fill: new Fill({color: 'red'}),
                stroke: new Stroke({
                    color: 'white',
                    width: 2
                })
            })
        })
        FeatureToAdd.setStyle(style)
        this.source.clear()
        this.source.addFeatures([FeatureToAdd])
    }

    componentDidUpdate(){
        this.onMapClick(this.props.coordinate)
    }

    render(){
        return null
    }
}

const VectorLayerWithContext = ()=>{
    return(
        <MapContext.Consumer>
            {(mapContext)=>{
                if (mapContext) {
                    return(
                        <VectorLayerComponent map={mapContext.map} coordinate={mapContext.coordinate}/>
                    )
                }
            }}
        </MapContext.Consumer>
    )
}

export default VectorLayerWithContext