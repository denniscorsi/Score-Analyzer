import { Parameters } from '../../types';

interface Action {
  type: string;
  payload: any;
}

const reducer = (state: Parameters, action: Action) => {
  switch (action.type) {
    case 'set_years':
      console.log('setting years');
      return {
        ...state,
        years: action.payload,
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
      };
    default:
      return state;
  }
};

export default reducer;
