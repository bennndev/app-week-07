import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { login } from '@/lib/api'
import { AlertCircle, Loader2 } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const { login: setAuth } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await login(data)
      setAuth(
        {
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles,
        },
        response.accessToken
      )
      navigate('/usuario')
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User Not found.') {
          setError('Usuario no encontrado.')
        } else if (err.message === 'Invalid Password!') {
          setError('Contraseña inválida.')
        } else {
          setError(err.message)
        }
      } else {
        setError('Error al iniciar sesión')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <svg width="48" height="48" viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="300" transform="translate(11.6001 7.6001)" fill="white"/>
              <g filter="url(#filter0_d_login)">
                <rect x="11.6001" y="7.6001" width="300" height="300" rx="50" fill="#C1F0A4"/>
              </g>
              <mask id="mask0_login" maskUnits="userSpaceOnUse" x="63" y="59" width="197" height="197">
                <rect x="63.6001" y="59.6001" width="196" height="196" fill="#456E2F"/>
              </mask>
              <g mask="url(#mask0_login)">
                <path d="M133.425 222.933H189.775L197.942 190.267H125.258L133.425 222.933ZM133.425 239.267C129.614 239.267 126.279 238.11 123.421 235.796C120.563 233.482 118.657 230.488 117.704 226.813L108.517 190.267H214.683L205.496 226.813C204.543 230.488 202.638 233.482 199.779 235.796C196.921 238.11 193.586 239.267 189.775 239.267H133.425ZM104.433 173.933H218.767V157.6H104.433V173.933ZM161.6 124.933C161.6 111.322 166.364 99.7528 175.892 90.225C185.42 80.6972 196.989 75.9333 210.6 75.9333C210.6 88.1833 206.721 98.8 198.963 107.783C191.204 116.767 181.472 122.211 169.767 124.117V141.267H235.1V173.933C235.1 178.425 233.501 182.27 230.302 185.469C227.104 188.667 223.258 190.267 218.767 190.267H104.433C99.9418 190.267 96.0966 188.667 92.898 185.469C89.6994 182.27 88.1001 178.425 88.1001 173.933V141.267H153.433V124.117C141.728 122.211 131.996 116.767 124.238 107.783C116.479 98.8 112.6 88.1833 112.6 75.9333C126.211 75.9333 137.781 80.6972 147.308 90.225C156.836 99.7528 161.6 111.322 161.6 124.933Z" fill="#456E2F"/>
              </g>
              <defs>
                <filter id="filter0_d_login" x="9.72748e-05" y="9.72748e-05" width="323.2" height="323.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="5.8"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_67_533"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_67_533" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Field>
              <FieldLabel htmlFor="username">Usuario</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Tu usuario"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Tu contraseña"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </Field>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}