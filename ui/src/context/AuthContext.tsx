import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: number
  username: string
  email: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)
const STORAGE_KEY = 'auth'

// INICIO TAREA: "Guardar el usuario autenticado en el estado de React"
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // INICIO TAREA: "Usar el accessToken para acceder a rutas protegidas"
  // Carga el usuario y token desde localStorage al iniciar la app
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const { user, token } = JSON.parse(stored)
      setUser(user)
      setToken(token)
    }
  }, [])

  // Funcion para guardar el usuario y token al iniciar sesion
  const login = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
  }
  // FIN TAREA: "Usar el accessToken para acceder a rutas protegidas"
  // FIN TAREA: "Guardar el usuario autenticado en el estado de React"

  // INICIO TAREA: "Implementar un boton de Cerrar sesion que borre los datos del usuario"
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
  }
  // FIN TAREA: "Implementar un boton de Cerrar sesion que borre los datos del usuario"

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
// FIN TAREA: "Guardar el usuario autenticado en el estado de React"

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}