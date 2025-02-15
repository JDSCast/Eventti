import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

export default function DialogDelete(props) {
  //Lanza codigo para el dialog y la que trae del parent
  const handleCloseAndDelete = () => {
    
    try {
      props.handleDialogDelete(props.deleteId);
    } catch (error) {
      return console.error(error.message)
    }
    return props.handleDialogClose()
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleDialogClose}
        aria-labelledby="Alerta de accion eliminar"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estás a punto de eliminar el evento{" "}
            <strong>&quot;{props.eventName}&quot;</strong> de forma permanente.
            <br />
            <br />
            Esta acción no se puede deshacer. ¿Estás seguro de que deseas
            continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDialogClose}>Cancelar</Button>
          <Button onClick={handleCloseAndDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
