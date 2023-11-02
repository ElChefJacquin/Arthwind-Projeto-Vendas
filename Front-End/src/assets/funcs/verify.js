import Cookies from "js-cookie";
import axios from "axios";

export const Verify = async () => {
    if(!Cookies.get("token"))
    window.location.href = "/login";
};

//Implementação:

/*
import { Verify } from "./verify";

function Verificar() {
      Promise.resolve(Verify()).then((value) => {
        value ? "" : navigate("/")
      })
    }
*/
