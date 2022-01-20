export interface Personas{
    id?: number
    nombre: string
    apellido: string
    edad: string
    direccion: string
    telefono: string
    email: string
    src: string
    educaciones: Educaciones
    proyectos: Proyectos
    habilidades: Habilidades
    experiencias: Experiencias
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
    inicio: string
    fin: string
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
