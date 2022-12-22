import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { z } from 'zod'
import { login as loginRequest, setToken } from '../../services/requests'

interface LoginError {
  response: AxiosResponse<{ message: string }>
}

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email não foi preenchido.' })
    .email({ message: 'Email inválido.' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter o mínimo de 6 caracteres.' })
    .max(100),
})

export default function Login() {
  const router = useRouter()

  const [login, setLogin] = useState({ email: '', password: '' })
  const [error, setError] = useState({ email: '', password: '' })
  const [invalidLogin, setInvalidLogin] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (Object.values(error).some((value) => Boolean(value))) {
      setError({ email: '', password: '' })
    }

    setInvalidLogin('')
    setLogin((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const validation = validateLogin()
    if (!validation.success) {
      const {
        fieldErrors: { email, password },
      } = validation.error.flatten()
      return setError({
        email: (email && email[0]) || '',
        password: (password && password[0]) || '',
      })
    }

    setLogin({ email: '', password: '' })
    setError({ email: '', password: '' })
    setInvalidLogin('')

    loginRequest(login)
      .then(({ data }) => {
        setToken(data.token)
        saveToken(data.token)
        router.push('/leaderboard')
      })
      .catch((error: LoginError) =>
        setInvalidLogin(error.response?.data.message)
      )
  }

  const validateLogin = () => loginSchema.safeParse(login)

  const saveToken = (token: string) => localStorage.setItem('token', token)

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Entre em sua conta
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="post">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Endereço de email
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={login.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(error.email)}
                    aria-describedby="email-error"
                    required
                    className={`block w-full appearance-none rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500  focus:outline-none focus:ring-indigo-500 ${
                      Boolean(error.email)
                        ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                        : null
                    }`}
                  />
                  {Boolean(error.email) && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {Boolean(error.email) && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {error.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={login.password}
                    onChange={handleChange}
                    autoComplete="password"
                    aria-invalid={Boolean(error.password)}
                    aria-describedby="password-error"
                    required
                    className={`block w-full appearance-none rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500  focus:outline-none focus:ring-indigo-500 ${
                      Boolean(error.password)
                        ? 'border-red-300 pr-10 text-red-900 focus:border-red-500 focus:ring-red-500'
                        : null
                    }`}
                  />
                  {Boolean(error.password) && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        className="h5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {Boolean(error.password) && (
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {error.password}
                  </p>
                )}
                {Boolean(invalidLogin) && (
                  <p className="mt-2 text-sm text-red-600">{`${invalidLogin}.`}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
