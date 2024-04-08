import {
  Alert,
  AlertIcon,
  Box,
  Card,
  Flex,
  Highlight,
  Icon,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import HeadingComponent from "../HeadingComponent";
import { ButtonWrapper } from "../ButtonWrapper";
import colors from "../../Utils/colors";
import { MdArrowBackIos } from "react-icons/md";
import TextComponent from "../TextComponent";
import { GrGallery } from "react-icons/gr";
import { FaCameraRetro } from "react-icons/fa";
import { useState, useCallback, useEffect } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import {
  PropertyContext,
  CloudinaryAsset,
} from "../../contextApi/PropertyProvider";
import { useContext } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contextApi/useAuth";

const preset = {
  cloudName: "dddj0ycqp",
  API_KEY: "257649773845154",
  API_SECRET: "w5kp-gPmF7k7UMT53n0A54FWA9E",
  preset: "hotel_tracker",
};

export default function Photos({
  maxW,
  photo = [],
  setUpdatedPhoto = undefined,
}: {
  maxW?: string;
  photo?: CloudinaryAsset[];
  setUpdatedPhoto?: React.Dispatch<
    React.SetStateAction<[] | CloudinaryAsset[]>
  >;
}) {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(PropertyContext);
  const validFilesProps =
    state?.photos?.photos.length > 0
      ? state?.photos?.photos
      : photo?.length > 0
      ? photo
      : [];
  const [validFiles, setValidFiles] = useState<CloudinaryAsset[] | []>(
    validFilesProps
  );
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      handleFileUpload(acceptedFiles);
      handleRejectedFiles(rejectedFiles);
    },
    []
  );

  const handleFileUpload = async (files: File[]) => {
    const newValidFiles: File[] = [];
    new Cloudinary({
      cloud: {
        cloudName: preset?.cloudName,
        apiKey: preset?.API_KEY,
        apiSecret: preset?.API_SECRET,
        // replace with your cloud name
      },
      url: {
        secure: true, // secure URL
      },
    });

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Max file size is 5 MB.`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset?.preset); // replace with your upload preset

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${preset?.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data: CloudinaryAsset = await response.json();

        newValidFiles.push(file);
        setValidFiles((prevFiles) => [...prevFiles, data]);

        setLoading(false);
      } catch (error) {
        console.error("Error uploading file: ", error);
        setLoading(false);
      }
    }
  };

  const handleRejectedFiles = (rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach((rejectedFile: FileRejection) => {
      console.log("Rejected:", rejectedFile.file.name);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      // 'image/avif': ['.avif']
    },
  });

  const handleRemoveFile = (file: string) => {
    setValidFiles((prevFiles) => prevFiles.filter((f) => f.asset_id !== file));
  };
  // update the photo context
  useEffect(() => {
    if (photo?.length === 0) {
      dispatch({ type: "ADD_PHOTOS", payload: { photos: validFiles } });
    } else {
      setUpdatedPhoto && setUpdatedPhoto(validFiles);
    }
  }, [validFiles]);

  // handle submitting
  const [sucess, setSuccess] = useState("");
  function handleSubmit() {
    const payload = {
      ...state?.address,
      ...state?.breakfast,
      ...state?.chain,
      ...state?.facility,
      ...state?.name,
      ...state?.parking,
      ...state?.photos,
      id: new Date().getTime().toString(),
      user_id: auth?.user?.email,
    };
    dispatch({ type: "ADD_PROPERTIES", payload });
    setSuccess("successfully uploaded and will be redirected to homepage");
    dispatch({ type: "RESET_PROPERTIES" });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }

  return (
    <>
      <Box maxW={maxW ?? "600px"}>
        {sucess && (
          <Alert status="success" mb="10px">
            <AlertIcon />
            {sucess}
          </Alert>
        )}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
        <HeadingComponent
          rest={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "40px",
            mb: "20px",
          }}
        >
          What does your hotel look like?
        </HeadingComponent>
        <Card p="20px 20px 60px 20px">
          <TextComponent rest={{ fontSize: "15px" }}>
            <Highlight
              query={["Upload at least 3 photos of your property"]}
              styles={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Upload at least 6 photos of your property. The more you upload,
              the more likely you are to get bookings. You can add more later.
            </Highlight>
          </TextComponent>
          <Stack
            border={"1px dotted black"}
            width={"100%"}
            minH="200px"
            mt="20px"
            alignItems={"center"}
            p="20px"
            cursor={"pointer"}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon as={GrGallery} boxSize={20} />
            <HeadingComponent>Drag and drop or</HeadingComponent>
            <ButtonWrapper
              rest={{
                border: `1px solid ${colors["primary"]}`,
                color: colors["primary"],
              }}
            >
              <Flex gap="10px" alignItems={"center"}>
                <Icon as={FaCameraRetro} />
                upload photos
              </Flex>
            </ButtonWrapper>
            <TextComponent rest={{ color: colors["chakraColorsGray500"] }}>
              jpg/jpeg or png, maximum size allowed 1mb
            </TextComponent>
          </Stack>
          <Flex overflowX={"scroll"} gap={"10px"} mt="10px">
            {validFiles.map((file, index: number) => (
              <div
                key={index}
                style={{
                  minWidth: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                }}
                className="drop__zone__image"
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(108, 142, 160, 0.3), rgba(108, 142, 160, 0.4)), url(${file?.secure_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
                <div
                  className="icon_remover"
                  onClick={() => handleRemoveFile(file?.asset_id)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    cursor: "pointer",
                  }}
                >
                  <Icon as={FaTimes} color="white" />
                </div>
              </div>
            ))}
          </Flex>
        </Card>
        {photo?.length <= 0 && (
          <Flex gap="10px" mt="30px">
            <Box flex="30%">
              <ButtonWrapper
                rest={{
                  w: "full",
                  bg: colors["white"],
                  border: `1px solid ${colors["primary"]}`,
                }}
                handleClicked={() => window.history.back()}
              >
                <Icon as={MdArrowBackIos} color={colors["primary"]} />
              </ButtonWrapper>
            </Box>
            <Box flex="70%">
              <ButtonWrapper
                rest={{ bg: colors["primary"], w: "full" }}
                isDisabled={validFiles?.length < 6}
                handleClicked={handleSubmit}
              >
                Continue
              </ButtonWrapper>
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
}
