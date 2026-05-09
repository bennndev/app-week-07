const API_URL = 'http://localhost:3000/api'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  id: number
  username: string
  email: string
  roles: string[]
  accessToken: string
}

// INICIO TAREA: "Consumir endpoint de login POST /api/auth/signin"
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Login failed')
  }

  return res.json()
}
// FIN TAREA: "Consumir endpoint de login POST /api/auth/signin"

// INICIO TAREA: "Consumir endpoint protegido GET /api/test/user con token Bearer"
export async function getUserData(token: string): Promise<string> {
  const res = await fetch(`${API_URL}/test/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user data')
  }

  return res.text()
}
// FIN TAREA: "Consumir endpoint protegido GET /api/test/user con token Bearer"