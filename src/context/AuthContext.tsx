// src/context/AuthContext.tsx

import React, { createContext, useContext } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../hooks/useAuth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, pass: string, nombre: string) => Promise<any>
  signIn: (email: string, pass: string) => Promise<any>
  signOut: () => Promise<void>

  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const { user, loading } = useAuth()

  const signUp = async (email: string, pass: string, nombre: string) => {

    const cleanEmail = email.trim().toLowerCase()

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: pass,
      options: {
        data: {
          nombre
        }
      }
    })

    if (error) {
      throw new Error(error.message)
    }

    if (data.user && data.user.identities?.length === 0) {
      throw new Error("Este correo ya está registrado")
    }

    if (!data.user) {
      throw new Error("No se pudo crear el usuario")
    }

    return data
  }

  const signIn = async (email: string, pass: string) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: pass
    })

    if (error) {

      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Correo o contraseña incorrectos")
      }

      throw error
    }

    return data
  }

  const signOut = async () => {

    const { error } = await supabase.auth.signOut()

    if (error) throw error

  }

  // 📧 enviar correo de recuperación
  const resetPassword = async (email: string) => {

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: "http://localhost:5173/reset-password"
      }
    )

    if (error) {
      throw new Error(error.message)
    }

  }

  // 🔑 actualizar contraseña
  const updatePassword = async (password: string) => {

    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) {
      throw new Error(error.message)
    }

  }

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de <AuthProvider>")
  }

  return context
}