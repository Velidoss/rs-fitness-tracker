import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import style from '../StatsComponent.module.css';

const getClone = (obj) => JSON.parse(JSON.stringify(obj));

function ChartComponent({
  selectedFields,
  dataset,
}) {
  if (!dataset[selectedFields]) {
    return <div>...</div>;
  }
  const { data, options } = dataset[selectedFields];

  return (
    <article className={style.statsCanvasContainer}>
      <Bar
        data={getClone(data)}
        options={options}
        redraw
      />
    </article>
  );
}

ChartComponent.propTypes = {
  selectedFields: PropTypes.string.isRequired,
  dataset: PropTypes.object.isRequired,
};

export default ChartComponent;
