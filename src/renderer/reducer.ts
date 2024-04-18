import { Parameters } from "../../types";

interface Action {
  type: string;
  payload: any;
}

const reducer = (state: Parameters, action: Action) => {
  switch (action.type) {
    case "set_years":
      return {
        ...state,
        years: action.payload,
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline]
      };
    case "set_baseline":
      return {
        ...state,
        years: [...state.years],
        baseline: action.payload,
        sectionBaseline: [...state.sectionBaseline]
      };
    case "set_section_baseline":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: action.payload
      };
    case "set_min_tutoring_hours":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        minTutoringHours: action.payload[0]
      };
    case "set_min_tests":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        minTests: action.payload[0]
      };
    case "set_exclude_without_baseline":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        excludeWithoutBaseline: action.payload
      };
    case "set_exclude_incomplete":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        excludeIncomplete: action.payload
      };
    case "set_name":
      return {
        ...state,
        years: [...state.years],
        baseline: [...state.baseline],
        sectionBaseline: [...state.sectionBaseline],
        name: action.payload
      };
    case "flip_section_behavior":
      return {
        ...state,
        remove: !state.remove
      };
    default:
      return state;
  }
};

export default reducer;
