import { useRef } from "react";
import "./App.css";
import { GaodeMap } from "@antv/l7-maps";
import { LineLayer, PointLayer, Scene } from "@antv/l7";
import { PolygonLayer } from "@antv/l7";
import data1 from "./data1.json";
import data2 from "./data2.json";

function App() {
  const sceneRef = useRef<Scene | null>(null);

  if (!sceneRef.current) {
    const scene = new Scene({
      id: "map",
      map: new GaodeMap({
        pitch: 35.210526315789465,
        style: "dark",
        center: [104.288144, 31.239692],
        token: "94e3c919e1998d90cfafc33c12e9c955",
        zoom: 4.4,
      }),
    });

    sceneRef.current = scene;

    console.log("初始化");

    sceneRef.current.on("loaded", () => {
      const chinaPolygonLayer = new PolygonLayer({})
        .source(data1)
        .color("name", [
          "rgb(239,243,255)",
          "rgb(189,215,231)",
          "rgb(107,174,214)",
          "rgb(49,130,189)",
          "rgb(8,81,156)",
        ]);

      sceneRef.current?.addLayer(chinaPolygonLayer);

      console.log("填充图");

      const layer2 = new LineLayer({
        zIndex: 2,
      })
        .source(data1)
        .color("rgb(93,112,146)")
        .size(0.6)
        .style({
          opacity: 1,
        });

      sceneRef.current?.addLayer(layer2);

      console.log("边界线");

      const labelLayer = new PointLayer({
        zIndex: 5,
      })
        .source(data2, {
          parser: {
            type: "json",
            coordinates: "center",
          },
        })
        .color("#fff")
        .shape("name", "text")
        .size(12)
        .style({
          opacity: 1,
          stroke: "#fff",
          strokeWidth: 0,
          padding: [5, 5],
          textAllowOverlap: false,
        });

      scene.addLayer(labelLayer);

      console.log("省份名");
    });
  }

  return <div id="map"></div>;
}

export default App;
