import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

function Error404() {
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error 404</AlertTitle>
        <AlertDescription>
          The page you requested was not found.
        </AlertDescription>
      </Alert>
    </>
  );
}

export default Error404;
