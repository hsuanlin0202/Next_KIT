import { SET_TEMPLATE } from "../../types/template/index";
const tempalteAction = (data) => ({
  type: SET_TEMPLATE,
  payload: {
    data,
  },
});

export { tempalteAction };
