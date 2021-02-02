import React from 'react';
import PropTypes from 'prop-types';
import style from '../StatsComponent.module.css';

function UserSummaryComponent({
  summary: {
    age,
    sex,
    height,
    weight,
    goal,
  },
}) {
  return (
    <ul className={style.statsUserSummaryComponent}>
      <li key="userSummaryAge">
        <h3>Age:</h3>
        <h3>
          { age }
          {' '}
          years
        </h3>
      </li>
      <li key="userSummarySex">
        <h3>Sex:</h3>
        <h3>{ sex }</h3>
      </li>
      <li key="userSummaryHeight">
        <h3>Height:</h3>
        <h3>
          { height }
          {' '}
          cm
        </h3>
      </li>
      <li key="userSummaryWeight">
        <h3>Weight:</h3>
        <h3>
          { weight }
          {' '}
          kg
        </h3>
      </li>
      <li key="userSummaryGoalCalories">
        <h3>Goal calories:</h3>
        <h3>{ goal === undefined ? 'none' : `${goal} / day` }</h3>
      </li>
    </ul>
  );
}

UserSummaryComponent.propTypes = {
  summary: PropTypes.shape({
    age: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    goal: PropTypes.oneOfType(PropTypes.number, PropTypes.bool).isRequired,
  }).isRequired,
};

export default UserSummaryComponent;
