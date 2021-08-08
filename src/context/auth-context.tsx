import React, { useContext, useState } from 'react'
import * as auth from '../auth-provider'
import { AuthForm, User } from 'types'

const AuthContext = React.createContext<{
    user: User | null
    login: (form: AuthForm) => Promise<void>
    register: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(setUser)

    const register = (form: AuthForm) => auth.register(form).then(setUser)

    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}