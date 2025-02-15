import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function LoadingScreen(props) {
    const [open, setOpen] = useState(props.action);
    useEffect(() => {
      setOpen(props.action);
    }, [props])

    return (
      <div>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }