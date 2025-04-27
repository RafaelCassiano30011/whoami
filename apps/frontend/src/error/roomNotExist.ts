import { NavigateFunction } from "react-router-dom";

const roomNotExist = (navigate: NavigateFunction) => {
  return navigate(`/`);
};

export { roomNotExist };
