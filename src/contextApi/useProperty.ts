import { useContext } from "react";
import { PropertyContext } from "../contextApi/PropertyProvider";

export default function useProperty() {
  const { state, dispatch } = useContext(PropertyContext);

  return {
    state,
    dispatch,
  };
}
