import React, { createContext, useReducer, useEffect, useState } from "react";

// Define your initial state
const initialState: PropertyState = {
  chain: {
    category: "",
  },
  address: {
    country: "",
    str_name: "",
    zip_code: "",
    city: "",
  },
  name: {
    property_name: "",
    star_rating: "",
    property_management: "",
  },
  facility: {
    facilities: [],
  },
  breakfast: {
    breakfast_details: "",
  },
  parking: {
    parking_details: "",
  },
  photos: {
    photos: [],
  },
  allProperties: [
    {
      category: "",
      country: "",
      str_name: "",
      zip_code: "",
      city: "",
      property_name: "",
      star_rating: "",
      property_management: "",
      facilities: [],
      breakfast_details: "",
      parking_details: "",
      photos: [],
      id: "",
      user_id: "",
    },
  ],
};
// Define your context
export const PropertyContext = createContext<{
  state: PropertyState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

// Define your actions
type Action =
  | { type: "ADD_CHAIN"; payload: ChainProps }
  | { type: "ADD_FACILITY"; payload: FacilitiesProps }
  | { type: "ADD_ADDRESS"; payload: AddressProps }
  | { type: "ADD_NAME"; payload: NameProps }
  | { type: "ADD_BREAKFAST"; payload: BreakfastProps }
  | { type: "ADD_PARKING"; payload: ParkingProps }
  | { type: "ADD_PHOTOS"; payload: PhotosProps }
  | { type: "ADD_PROPERTIES"; payload: allProperties }
  | { type: "DELETE_PROPERTY"; payload: string }
  | { type: "UPDATE_PROPERTY"; payload: allProperties }
  | { type: "SET_STATE"; payload: PropertyState }
  | { type: "RESET_PROPERTIES" };

// Define your reducer
const propertyReducer = (
  state: PropertyState,
  action: Action
): PropertyState => {
  switch (action.type) {
    case "ADD_CHAIN":
      return { ...state, chain: action.payload };
    case "ADD_ADDRESS":
      return { ...state, address: action.payload };
    case "ADD_FACILITY":
      return { ...state, facility: action.payload };
    case "ADD_NAME":
      return { ...state, name: action.payload };
    case "ADD_BREAKFAST":
      return { ...state, breakfast: action.payload };
    case "ADD_PARKING":
      return { ...state, parking: action.payload };
    case "ADD_PHOTOS":
      return { ...state, photos: action.payload };
    case "ADD_PROPERTIES":
      return {
        ...state,
        allProperties: [...state.allProperties, action.payload],
      };
    case "DELETE_PROPERTY":
      return {
        ...state,
        allProperties: state.allProperties.filter(
          (property) => property.id !== action.payload
        ),
      };
    case "UPDATE_PROPERTY":
      if (!Array.isArray(state.allProperties)) {
        return state;
      }
      const updatedAllProperties = state.allProperties.map((property) =>
        property.id === action.payload.id
          ? { ...action.payload }
          : { ...property }
      );

      return {
        ...state,
        allProperties: updatedAllProperties,
      };
    case "SET_STATE":
      return { ...action.payload };
    case "RESET_PROPERTIES":
      return {
        ...state,
        chain: initialState.chain,
        address: initialState.address,
        name: initialState.name,
        facility: initialState.facility,
        breakfast: initialState.breakfast,
        parking: initialState.parking,
        photos: initialState.photos,
      };
    default:
      return state;
  }
};
// Define your types/interfaces
interface ChainProps {
  category: string;
}
export interface AddressProps {
  country: string;
  str_name: string;
  zip_code: string;
  city: string;
}
export interface NameProps {
  property_name: string;
  star_rating: string;
  property_management: string;
}
export interface FacilitiesProps {
  facilities: string[];
}
export interface BreakfastProps {
  breakfast_details: string;
}
export interface ParkingProps {
  parking_details: string;
}
export interface CloudinaryAsset {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_extension: string;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}
export interface PhotosProps {
  photos: CloudinaryAsset[];
}
export type allProperties = FacilitiesProps &
  ChainProps &
  AddressProps &
  NameProps &
  BreakfastProps &
  ParkingProps &
  PhotosProps & { id: string; user_id: string };

// Define your state
interface PropertyState {
  chain: ChainProps;
  address: AddressProps;
  name: NameProps;
  facility: FacilitiesProps;
  breakfast: BreakfastProps;
  parking: ParkingProps;
  photos: PhotosProps;
  allProperties: allProperties[];
}

// Define your Provider component
export default function PropertyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(propertyReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after initial mount
  }, []);

  useEffect(() => {
    const savedState = localStorage.getItem("propertyState");
    if (savedState) {
      dispatch({
        type: "SET_STATE",
        payload: JSON.parse(savedState),
      });
    }
  }, []);

  useEffect(() => {
    if (isMounted && state) {
      localStorage.setItem("propertyState", JSON.stringify(state));
    }
  }, [state]);

  return (
    <PropertyContext.Provider value={{ state, dispatch }}>
      {children}
    </PropertyContext.Provider>
  );
}
