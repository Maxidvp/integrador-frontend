import { Red } from "./Redes";

export interface Personas{
    id?: number
    nombre: string
    apellido: string
    titulo: string
    nacimiento: string
    direccion: string
    telefono: string
    email: string
    foto: string
    banner: string
    sobremi: string
    educaciones: Array<Educacion>
    proyectos: Array<Proyecto>
    habilidades: Array<Habilidad>
    experiencias: Array<Experiencia>
    redes: Array<Red>
}
export interface Educacion{
    id?: number
    periodo: string
    lugar: string
    titulo: string
    src: string
}
export interface Proyecto{
    id?: number
    titulo: string
    periodo: string
    descripcion: string
    url: string
    fotos: string
}
export interface Habilidad{
    id?: number
    habilidad: string
    valor: number
}

export interface Experiencia{
    id?: number
    periodo: string
    lugar: string
    actividades: string
    src: string
}
