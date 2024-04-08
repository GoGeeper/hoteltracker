import { Container } from "@chakra-ui/react";

import AuthLayout from "../layouts/AuthLayout";
import { useParams } from "react-router-dom";
import Category from "../components/LIstProperties/Category";
import Property from "../components/LIstProperties/Property";
import Address from "../components/LIstProperties/Address";
import Map from "../components/LIstProperties/Map";
import Name from "../components/LIstProperties/Name";
import Facilities from "../components/LIstProperties/Facilities";
import Breakfast from "../components/LIstProperties/Breakfast";
import Parking from "../components/LIstProperties/Parking";
import Photos from "../components/LIstProperties/Photos";

export default function ListProperty() {
  const { type } = useParams();

  return (
    <AuthLayout>
      <Container maxW={"1000px"} mt="60px">
        {type === "category" && <Category />}
        {type === "property" && <Property />}
        {type === "address" && <Address />}
        {type === "map" && <Map />}
        {type === "name" && <Name />}

        {type === "facilities" && <Facilities />}
        {type === "breakfast" && <Breakfast />}
        {type === "parking" && <Parking />}
        {type === "photos" && <Photos />}
      </Container>
    </AuthLayout>
  );
}
