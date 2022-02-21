import { Redes } from "./Redes";

export interface Personas{
    id?: number
    nombre: string
    apellido: string
    edad: string
    direccion: string
    telefono: string
    email: string
    src: string
    educaciones: Array<Educaciones>
    proyectos: Array<Proyectos>
    habilidades: Array<Habilidades>
    experiencias: Array<Experiencias>
    redes: Array<Redes>
}
export interface Educaciones{
    id?: number
    periodo: string
    lugar: string
    titulo: string
    src: string
}
export interface Proyectos{
    id?: number
    titulo: string
    periodo: string
    descripcion: string
    url: string
    fotos: string
}
export interface Habilidades{
    id?: number
    habilidad: string
    valor: number
}

export interface Experiencias{
    id?: number
    periodo: string
    lugar: string
    actividades: string
    src: string
}
