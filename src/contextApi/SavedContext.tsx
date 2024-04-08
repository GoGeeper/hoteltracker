import { createContext, ReactNode, useReducer } from "react";

export const SavedContext = createContext<{
  state: SavedState;
  dispatch: React.Dispatch<SavedAction>;
}>({
  state: { Saved: [] },
  dispatch: () => {},
});
type product = {
  id: 1;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
type SavedAction =
  | {
      type: "ADD_REMOVE_PRODUCT";
      payload: product;
    }
  | {
      type: "REMOVE_PRODUCT";
      payload: number;
    }
  | {
      type: "REMOVE_ALL_PRODUCT";
    };
type SavedState = {
  Saved: product[];
};
const reducer = (state: SavedState, action: SavedAction) => {
  switch (action.type) {
    case "ADD_REMOVE_PRODUCT":
      const existingSaved = state.Saved.find(
        (item) => item.id === action.payload.id
      );
      if (existingSaved) {
        return {
          ...state,
          Saved: [...state.Saved].map((item) =>
            item.id === existingSaved.id ? action.payload : item
          ),
        };
      } else {
        return {
          ...state,
          Saved: [...state.Saved, action.payload],
        };
      }
    case "REMOVE_PRODUCT":
      return {
        ...state,
        Saved: [...state.Saved].filter((item) => item.id !== action.payload),
      };
    case "REMOVE_ALL_PRODUCT":
      return {
        ...state,
        Saved: [],
      };
    default:
      return state;
  }
};
const SavedContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { Saved: [] });
  return (
    <SavedContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
};
export default SavedContextProvider;

type listPropertyProps = {
  category: string;
  // chain
  country: string;
  str_name: string;
  zip_code: string;
  city: string;
  // address
  property_name: string;
  star_rating: string;
  property_management: string;
  // name
  facilities: string[];
  // facilities
  breakfast_details: string;
  // breakfast
  parking_details: string;
  // parking
  photos: string[];
  // photos
};
