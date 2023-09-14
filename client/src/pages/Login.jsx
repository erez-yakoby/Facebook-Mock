import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = useCallback(() => {
    axios
      .post(`${SERVER_URL}/api/auth/login`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <StyledBox>
        <StyledBox
          sx={{ flexDirection: "column", justifyContent: "start" }}
          width={600}
          height={500}
          borderRadius={5}
          p={3}
          gap={3}
          border={1}
          mt={2}
        >
          <Typography
            variant="h3"
            textAlign="center"
            m={3}
            sx={{ fontWeight: "bold" }}
          >
            Login to Facebook-Mock
          </Typography>

          <TextField label="Email" type="email" autoComplete="email" />
          <TextField label="Password" type="password" />
          <Button variant="contained" textAlign="center" sx={{ mt: 3 }}>
            Login
          </Button>
          <Button
            variant="contained"
            textAlign="center"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Sign up
          </Button>
        </StyledBox>
      </StyledBox>

      {/* register modal */}
      <StyledModal
        open={isModalOpen}
        onClose={(e) => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box
          width={500}
          height={300}
          bgcolor={"background.default"}
          color={"text.primary"}
          borderRadius={5}
          p={2}
          m={1}
        >
          some box
        </Box>
      </StyledModal>
    </>
  );
};

export default Login;
