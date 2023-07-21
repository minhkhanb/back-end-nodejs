/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/components/WorldMap/RoundWorldMapAtlas.tsx
*/

import React, { useState, useEffect } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { v4 as uuid} from 'uuid';

const scale = 200;
const cx = 400;
const cy = 150;
const initRotation = 100;

const RoundWorldMap = () => {
  const [geographies, setGeographies] = useState<[] | Array<Feature<Geometry | null>>>([]);
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const [rotation, _setRotation] = useState<number>(initRotation);

  useEffect(() => {
    fetch('/data/world-110m.json').then((response) => {
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Houston we have a problem: ${response.status}`);
        return;
      }
      response.json().then((worldData) => {
        const mapFeatures: Array<Feature<Geometry | null>> = ((feature(worldData, worldData.objects.countries) as unknown) as FeatureCollection).features;
        setGeographies(mapFeatures);
      });
    });
  }, []);

  const projection = geoOrthographic().scale(scale).translate([cx, cy]).rotate([rotation, 0]);

  return (
    <svg width={scale * 3} height={scale * 3} viewBox="0 0 800 450">
      <g>
        <circle fill="#f2f2f2" cx={cx} cy={cy} r={scale} />
      </g>
      <g>
        {(geographies as []).map((d, i) => (
          <path
            key={`path-${uuid()}`}
            d={geoPath().projection(projection)(d) as string}
            fill={`rgba(38,50,56,${(1 / (geographies ? geographies.length : 0)) * i})`}
            stroke="aliceblue"
            strokeWidth={0.5}
          />
        ))}
      </g>
    </svg>
  );
};

export default RoundWorldMap;
