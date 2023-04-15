import { Box, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };

  return (
    <Box>
      <Text fontSize="2xl">Profile</Text>
      <code>{JSON.stringify(user)}</code>

      <Box mt="5">
        <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
