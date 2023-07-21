/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/components/WorldMap/RoundWorldMapAtlas.js
*/

import React, { useState, useEffect } from 'react';
import { geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Button } from '@mui/material';
import AnimationFrame from '../../hooks/AnimationFrame';
import { v4 as uuid} from 'uuid';

const scale = 200;
const cx = 400;
const cy = 150;
const initRotation = 100;

const WorldMap = () => {
  const [geographies, setGeographies] = useState<[] | Array<Feature<Geometry | null>>>([]);
  const [rotation, setRotation] = useState<number>(initRotation);
  const [isRotate, setIsRotate] = useState<boolean>(false);

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

  // geoEqualEarth
  // geoOrthographic
  const projection = geoOrthographic().scale(scale).translate([cx, cy]).rotate([rotation, 0]);

  AnimationFrame(() => {
    if (isRotate) {
      let newRotation = rotation;
      if (rotation >= 360) {
        newRotation = rotation - 360;
      }
      setRotation(newRotation + 0.3);
      console.log(`rotation: ${  rotation}`)
    }
  });

  return (
    <>
      <Button
        size="medium"
        color="primary"
        startIcon={<PlayCircleFilledWhiteIcon />}
        onClick={() => {
          setIsRotate(true);
        }}
      />
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
    </>
  );
};

export default WorldMap;
