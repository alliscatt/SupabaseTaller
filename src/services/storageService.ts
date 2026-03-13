// src/services/storageService.ts

import { supabase } from '../lib/supabaseClient'

const AVATARS_BUCKET = 'avatars'
const ARCHIVOS_BUCKET = 'archivos-tareas'

export const storageService = {

  avatars: {

    // subir avatar (siempre mismo nombre para evitar problemas)
    upload: async (userId: string, file: File) => {

      const path = `${userId}/avatar.PNG`

      const { error } = await supabase.storage
        .from(AVATARS_BUCKET)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) throw error

      const { data } = supabase.storage
        .from(AVATARS_BUCKET)
        .getPublicUrl(path)

      return data.publicUrl

    },

    // obtener url pública
    getPublicUrl: (userId: string) => {

      const path = `${userId}/avatar.PNG`

      const { data } = supabase.storage
        .from(AVATARS_BUCKET)
        .getPublicUrl(path)

      return data.publicUrl

    },

    // eliminar avatar
    delete: async (userId: string) => {

      const path = `${userId}/avatar.PNG`

      return supabase.storage
        .from(AVATARS_BUCKET)
        .remove([path])

    }

  },

  archivos: {

    // subir archivo de tarea
    upload: async (tareaId: string, file: File) => {

      const path = `${tareaId}/${Date.now()}-${file.name}`

      const { error, data } = await supabase.storage
        .from(ARCHIVOS_BUCKET)
        .upload(path, file)

      if (error) throw error

      return data

    },

    // listar archivos
    list: (tareaId: string) =>
      supabase.storage
        .from(ARCHIVOS_BUCKET)
        .list(tareaId),

    // url temporal
    getSignedUrl: (path: string, expiresIn = 3600) =>
      supabase.storage
        .from(ARCHIVOS_BUCKET)
        .createSignedUrl(path, expiresIn),

    // eliminar archivo
    delete: (path: string) =>
      supabase.storage
        .from(ARCHIVOS_BUCKET)
        .remove([path]),

  }

}

export default storageService