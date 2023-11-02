import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ip from "../assets/funcs/ip";
import axios from "axios";
import Cookies from "js-cookie";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Ocultarprod({open, setModalOpen, id}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setModalOpen(false);
  const config = {
    headers: { Authorization: `${Cookies.get("token")}` },
  };


  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              color: "black",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Ocultar produto
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h7"
            component="h5"
            style={{
              color: "black",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            O produto que você deseja excluir tem vendas associadas e não pode ser apagado, porém você pode ocultá-lo. Deseja ocultar o produto?<br/>(Essa ação é irreversível)
          </Typography>
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              axios
              .delete(`http://${ip}/ocultarproduto/${id}`, config)
              .then((response) => {
                handleClose();
              });
            }}
          >
            Ocultar
          </Button>
          <Button
            variant="contained"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
