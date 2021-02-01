import mergeHistoryWithGoal from './mergeHistoryWithGoal';
import { VALUES } from '../config/statsRadioConfig';
import { AXES, DATASETS, BASE_OPTIONS, POSITIONS } from '../config/statsChartConfig';

const {
  WEIGHT,
  WEIGHT_WITH_CALORIES,
  CALORIES,
  CALORIES_WITH_GOAL,
} = VALUES;

const userDatasetCreator = {
  [WEIGHT]: (dates, weight) => ({
    data: {
      labels: dates,
      datasets: [
        {
          data: weight,
          ...DATASETS.WEIGHT,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      scales: {
        xAxes: [
          {
            ...AXES.DATES,
          },
        ],
        yAxes: [
          { 
            ...AXES.KILOGRAMS,
          },
        ],
      },
    },
  }),

  [WEIGHT_WITH_CALORIES]: (dates, weight, calories) => ({
    data: {
      labels: dates,
      datasets: [
        {
          data: weight,
          ...DATASETS.WEIGHT,
        },
        {
          data: calories,
          ...DATASETS.CALORIES,
        }
      ],
    },
    options: {
      ...BASE_OPTIONS,
      scales: {
        xAxes: [
          {
            ...AXES.DATES,
          }
        ],
        yAxes: [
          {
            ...AXES.KILOGRAMS,
            position: POSITIONS.LEFT,
          },
          {
            ...AXES.CALORIES,
            position: POSITIONS.RIGHT,
          }
        ]
      }
    }
  }),

  [CALORIES]: (dates, calories) => ({
    data: {
      labels: dates,
      datasets: [
        {
          data: calories,
          ...DATASETS.CALORIES,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      scales: {
        xAxes: [
          {
            ...AXES.DATES,
          }
        ],
        yAxes: [
          { 
            ...AXES.CALORIES,
          },
        ],
      },
    },
  }),

  [CALORIES_WITH_GOAL]: (dates, calories) => ({
    data: {
      labels: dates,
      datasets: [
        {
          data: calories,
          ...DATASETS.CALORIES,
        },
      ],
    },
    options: {
      ...BASE_OPTIONS,
      scales: {
        xAxes: [
          {
            ...AXES.DATES,
          },
        ],
        yAxes: [
          {
            ...AXES.CALORIES,
          }
        ],
      },
    },
  }),
}

const reduceDatesArray = (arr) => arr.reduce((acc, obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    acc[key] = acc[key] ? acc[key].concat(value) : [value];
  });
  return acc;
}, {});

function getUserDataset({ goal }, history) {
  const {
    date: dates, 
    weight, 
    calories, 
  } = reduceDatesArray(history);

  const result = {
    [WEIGHT]: userDatasetCreator[WEIGHT](dates, weight),
    [WEIGHT_WITH_CALORIES]: userDatasetCreator[WEIGHT_WITH_CALORIES](dates, weight, calories),
    [CALORIES]: userDatasetCreator[CALORIES](dates, calories),
  };

  if (goal) {
    result[CALORIES_WITH_GOAL] = userDatasetCreator[CALORIES_WITH_GOAL](dates, calories);
  }

  return result;
}

export default getUserDataset;