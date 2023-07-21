import React from 'react';
import Layout from '@src/components/Layout';
import vietnam from '@src/utils/diaphantinh.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import avatar from '@src/assets/images/avatar.png';
import { css } from '@emotion/react';

const Map: React.FunctionComponent = () => {
  const [province, setProvince] = React.useState<string>('');
  const renderSvg = () => {
    console.log(vietnam);
  };

  React.useEffect(() => {
    renderSvg();
  }, []);

  const width = 800;
  const height = width;
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    vietnam
  );

  const path = geoPath().projection(projection);

  const tooltipRef = React.useRef(null);

  return (
    <Layout>
      <div className="svg">
        <div
          ref={tooltipRef}
          className="avatar"
          style={{
            pointerEvents: 'none',
            display: 'flex',
            position: 'fixed',
            left: '-999rem',
            top: '-999rem',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <img
            src={avatar}
            css={css`
              margin-left: 50px;
            `}
            width={50}
            height={50}
            alt=""
          />
          <span></span>
        </div>
        <svg width={width} height={height}>
          <g className="geojson-layer">
            {vietnam.features.map((d, index) => (
              <path
                key={index}
                d={path(d)}
                fill="white"
                stroke="#0e1724"
                strokeWidth="1"
                strokeOpacity="0.5"
                onMouseEnter={(e) => {
                  // setProvince(d.properties.ten_tinh);
                  //
                  tooltipRef.current.style.top = e.clientY + 'px';
                  tooltipRef.current.style.left = e.clientX + 'px';
                  tooltipRef.current.querySelector(
                    'span'
                  ).innerText = `Su Bo đi đến ${d.properties.ten_tinh}`;
                  select(e.target).attr('fill', 'lightgray');
                }}
                onMouseOut={(e) => {
                  select(e.target).attr('fill', 'white');
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </Layout>
  );
};

export default Map;
