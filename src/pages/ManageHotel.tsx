import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
  Container,
  Link,
} from "@chakra-ui/react";
import MainLayout from "../layouts/MainLayout";
import useProperty from "../contextApi/useProperty";
import TextComponent from "../components/TextComponent";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import colors from "../Utils/colors";

export default function ManageHotel() {
  const { state, dispatch } = useProperty();
  const handlePropertyRemoval = (id: string) => {
    dispatch({ type: "DELETE_PROPERTY", payload: id });
  };
  return (
    <MainLayout isDesc={false}>
      <Container maxW={"1200px"} mt="20px">
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>property name</Th>
                <Th>Chain</Th>
                <Th>Country</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {state?.allProperties?.map(
                ({ id, category, country, property_name, photos }) => (
                  <Tr key={id}>
                    <Td>
                      <Link href={`${category}/${id}`}>{id}</Link>
                    </Td>
                    <Td>
                      <Flex alignItems={"center"} gap="5px">
                        <Avatar
                          size="md"
                          name="Dan Abrahmov"
                          src={photos[0]?.secure_url}
                        />
                        <TextComponent>{property_name}</TextComponent>
                      </Flex>
                    </Td>

                    <Td isNumeric>{category}</Td>
                    <Td isNumeric>{country}</Td>
                    <Td>
                      <Flex gap="5px">
                        <Link href={`${category}/edit/${id}`}>
                          {" "}
                          <Icon
                            as={FaEdit}
                            boxSize={"25px"}
                            color={colors["primary"]}
                          />
                        </Link>

                        <Icon
                          as={RiDeleteBin2Fill}
                          boxSize={"25px"}
                          color="red"
                          onClick={() => handlePropertyRemoval(id)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </MainLayout>
  );
}
