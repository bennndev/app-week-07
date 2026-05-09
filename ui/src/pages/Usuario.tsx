import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { getUserData } from '@/lib/api'
import { AlertCircle, Loader2, User, Mail, Shield } from 'lucide-react'

export function Usuario() {
  const { user, token, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchData = async () => {
      if (!token) return
      setIsLoading(true)
      setError('')
      try {
        /* INICIO TAREA: "Consumir endpoint protegido GET /api/test/user con token Bearer"
           La función getUserData ya fue implementada en api.ts con el header
           Authorization: Bearer {token} */
        const data = await getUserData(token)
        setMessage(data)
        /* FIN TAREA: "Consumir endpoint protegido GET /api/test/user con token Bearer" */
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al obtener datos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, token, navigate])

  if (!user) return null

  const roleDisplay = user.roles.map(r => r.replace('ROLE_', ''))
  const initials = user.username.slice(0, 2).toUpperCase()

  return (
    <div className="container py-12">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="size-20">
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
            </div>
            {/* INICIO TAREA: "Mostrar una vista de bienvenida con el nombre del usuario y su rol" */}
            <CardTitle className="text-2xl">@{user.username}</CardTitle>
            <CardDescription>Información de tu cuenta</CardDescription>
            {/* FIN TAREA: "Mostrar una vista de bienvenida con el nombre del usuario y su rol" */}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">ID de usuario</span>
                  <span className="font-medium">#{user.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Correo electrónico</span>
                  <span className="font-medium">{user.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Shield className="size-4 text-muted-foreground mt-0.5" />
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-muted-foreground mb-2">Roles</span>
                  <div className="flex flex-wrap gap-2">
                    {/* INICIO TAREA: "Mostrar una vista de bienvenida con el nombre del usuario y su rol" */}
                    {roleDisplay.map(role => (
                      <Badge key={role} variant="secondary">{role}</Badge>
                    ))}
                    {/* FIN TAREA: "Mostrar una vista de bienvenida con el nombre del usuario y su rol" */}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Cargando datos protegidos...</span>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* INICIO TAREA: "Mostrar el mensaje recibido desde el back-end" */}
            {message && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm font-medium text-primary mb-1">Respuesta del backend:</p>
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            )}
            {/* FIN TAREA: "Mostrar el mensaje recibido desde el back-end" */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}