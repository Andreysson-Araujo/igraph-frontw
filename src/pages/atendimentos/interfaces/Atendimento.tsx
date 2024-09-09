
import { ReactNode } from "react";
import Comentario from "./Comentarios";


interface Atendimento {
    usuario_name: ReactNode;
    unidade_name: ReactNode;
    servico_name: ReactNode;
    id: number;
    quantidade: number;
    data_de_atendimento: Date;
    comentarios: Comentario[];
    usuarios_id: number;
    servicos_id: number;
    unidades_id: number;
}



export default Atendimento
