import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <svg width="28" height="28" viewBox="0 0 324 324" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <rect width="300" height="300" transform="translate(11.6001 7.6001)" fill="white"/>
            <g filter="url(#filter0_d_67_533)">
              <rect x="11.6001" y="7.6001" width="300" height="300" rx="50" fill="#C1F0A4"/>
            </g>
            <mask id="mask0_67_533" maskUnits="userSpaceOnUse" x="63" y="59" width="197" height="197">
              <rect x="63.6001" y="59.6001" width="196" height="196" fill="#456E2F"/>
            </mask>
            <g mask="url(#mask0_67_533)">
              <path d="M133.425 222.933H189.775L197.942 190.267H125.258L133.425 222.933ZM133.425 239.267C129.614 239.267 126.279 238.11 123.421 235.796C120.563 233.482 118.657 230.488 117.704 226.813L108.517 190.267H214.683L205.496 226.813C204.543 230.488 202.638 233.482 199.779 235.796C196.921 238.11 193.586 239.267 189.775 239.267H133.425ZM104.433 173.933H218.767V157.6H104.433V173.933ZM161.6 124.933C161.6 111.322 166.364 99.7528 175.892 90.225C185.42 80.6972 196.989 75.9333 210.6 75.9333C210.6 88.1833 206.721 98.8 198.963 107.783C191.204 116.767 181.472 122.211 169.767 124.117V141.267H235.1V173.933C235.1 178.425 233.501 182.27 230.302 185.469C227.104 188.667 223.258 190.267 218.767 190.267H104.433C99.9418 190.267 96.0966 188.667 92.898 185.469C89.6994 182.27 88.1001 178.425 88.1001 173.933V141.267H153.433V124.117C141.728 122.211 131.996 116.767 124.238 107.783C116.479 98.8 112.6 88.1833 112.6 75.9333C126.211 75.9333 137.781 80.6972 147.308 90.225C156.836 99.7528 161.6 111.322 161.6 124.933Z" fill="#456E2F"/>
            </g>
            <defs>
              <filter id="filter0_d_67_533" x="9.72748e-05" y="9.72748e-05" width="323.2" height="323.2" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
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
          <span className="hidden sm:inline">Laboratorio 07 - DAWA</span>
        </Link>

        <div className="flex gap-2 ml-auto">
          <Link to="/">
            <Button variant="ghost">Inicio</Button>
          </Link>

          {/* INICIO TAREA: "Crear barra de navegación simple" */}
          {/* Si no hay usuario: Inicio, Login */}
          {user ? (
            <>
              {/* Si hay usuario: Inicio, Usuario, Cerrar sesión */}
              <Link to="/usuario">
                <Button variant="ghost">{user.username}</Button>
              </Link>
              {/* FIN TAREA: "Crear barra de navegación simple" */}
              {/* INICIO TAREA: "Implementar botón de Cerrar sesión que borre los datos del usuario" */}
              <Button variant="outline" onClick={logout}>Cerrar sesión</Button>
              {/* FIN TAREA: "Implementar botón de Cerrar sesión que borre los datos del usuario" */}
            </>
          ) : (
            <Link to="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

