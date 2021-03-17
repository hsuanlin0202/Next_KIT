import { SET_TEMPLATE } from "../../types/template/index";

const templateInitialState = { count: 0 };

const templateReducer = (state, action) => {
  switch (action.type) {
    case SET_TEMPLATE:
      return { ...state, count: action.payload.data + state.count };
    default:
      throw new Error();
  }
};

export { templateInitialState, templateReducer };
