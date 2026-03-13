// src/components/AvatarUpload.tsx

import { useState, useEffect } from "react"
import storageService from "../services/storageService"
import { useAuthContext } from "../context/AuthContext"

export function AvatarUpload() {

  const { user } = useAuthContext()

  const [url, setUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"

  // cargar avatar al iniciar
  useEffect(() => {

    if (!user) return

    const avatarUrl = storageService.avatars.getPublicUrl(user.id)

    // evitar cache
    setUrl(avatarUrl + "?t=" + Date.now())

  }, [user])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]

    if (!file || !user) return

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
      return alert("Solo JPG, PNG o WebP")

    if (file.size > 2 * 1024 * 1024)
      return alert("Máximo 2MB")

    setUploading(true)

    try {

      const publicUrl = await storageService.avatars.upload(user.id, file)

      // evitar cache del navegador
      setUrl(publicUrl + "?t=" + Date.now())

    } catch (err: any) {

      alert(err.message)

    } finally {

      setUploading(false)

    }

  }

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >

      <img
        src={url ?? defaultAvatar}
        alt="avatar"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #64748b",
        }}
      />

      <label
        style={{
          background: "#2563eb",
          color: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >

        {uploading ? "Subiendo..." : "Cambiar"}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
        />

      </label>

    </div>

  )
}