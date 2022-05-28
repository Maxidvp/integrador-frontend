import { Red } from "./Redes";

export interface Personas{
    id?: number
	publico: boolean
    resumen: Resumen
    educaciones: Array<Educacion>
    proyectos: Array<Proyecto>
    habilidades: Array<Habilidad>
    experiencias: Array<Experiencia>
    redes: Array<Red>
}
export interface Resumen{
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
}
export interface Educacion{
    id?: number
    periodo: string
    lugar: string
    titulo: string
    imagen: string
}
export interface Proyecto{
    id?: number
    titulo: string
    periodo: string
    descripcion: string
    url: string
    fotos: Array<string>
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
    imagen: string
}
