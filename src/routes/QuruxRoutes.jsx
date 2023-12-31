import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "./DashboardRoutes"
import {Inicio} from '../pages/Inicio'
import {Mundohombres}  from '../pages/Mundohombres'
import {ListaE} from '../pages/ListaE'
import {Mundomujeres} from '../pages/Mundomujeres'
import { Mundomascotas } from "../pages/Mundomascotas"
import { Login } from "../pages/login/Login"
import {Guiaespecialista} from '../pages/Guiaespecialista'
import {Terminos} from '../pages/Terminos'
import Pasarela from "../pages/pasarela/Pasarela"
import {GuiaUsuario} from '../pages/GuiaUsuario'
import {TCEspecialistas} from '../pages/TCEspecialistas'
import { AgendarEspecialista } from "../pages/AgendarEspecialista"




export const QuruxRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<><Inicio/></>} />
            <Route path="/mundohombres" element={<><Mundohombres/></>} />
            <Route path="/mundomujeres" element={<><Mundomujeres/></>} />
            <Route path="/mundomascotas" element={<><Mundomascotas/></>} />
            <Route path="/dashboard/*" element={<><DashboardRoutes/></>} />
            <Route path="/Guiaespecialista" element={<><Guiaespecialista/></>} />
            <Route path="/GuiaUsuario" element={<><GuiaUsuario/></>} />
            <Route path="/TCEspecialistas" element={<><TCEspecialistas/></>} />
            <Route path="/Terminos" element={<><Terminos/></>} />
            <Route path="/ListaE" element={<><ListaE/></>} />
            <Route path="/login" element={<><Login/></>} />
            <Route path="/pasarela" element={<><Pasarela/></>} />
            <Route path="/agendar-especialista/:id" element={<AgendarEspecialista />} />

           

            {/* Ruta comodín para cualquier ruta no coincidente */}
            <Route path="/*" element={<Navigate to="/404" />} />
            
            {/* Página 404 */}
            <Route path="/404" element={<>Página no encontrada (404)</>} />
        </Routes>
    )
}