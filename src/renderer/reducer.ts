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
    case 'set_baseline':
      console.log('setting baseline');
      return {
        ...state,
        years: [...state.years],
        baseline: action.payload,
        sectionBaseline: [...state.sectionBaseline],
      };
    case 'set_section_baseline':
      console.log('setting section baseline');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: action.payload,
      };
    case 'set_min_tutoring_hours':
      console.log('setting min tutoring hours');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        minTutoringHours: action.payload[0],
      };
    case 'set_min_tests':
      console.log('setting min tests');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        minTests: action.payload[0],
      };
    case 'set_exclude_without_baseline':
      console.log('setting exclude without baseline');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        excludeWithoutBaseline: action.payload,
      };
    case 'set_exclude_incomplete':
      console.log('setting exclude incomplete');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        excludeIncomplete: action.payload,
      };
    case 'set_name':
      console.log('setting name');
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        name: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
