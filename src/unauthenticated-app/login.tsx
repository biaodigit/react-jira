// @flow 
import { useAuth } from 'context/auth-context';
import * as React from 'react';

type Props = {

};

export const LoginScreen = (props: Props) => {
    const { login, user } = useAuth()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        login({ username, password })
    }
    return (
        <form onSubmit={handleSubmit}>
            {
                user ? <> <div>登录成功，用户名：{user.name}</div>
                    <div>token：{user.token}</div>
                </>
                    : <>
                        <div>
                            <label htmlFor="username">用户名</label>
                            <input type="text" id={'username'} />
                        </div>
                        <div>
                            <label htmlFor="password">密码</label>
                            <input type="text" id={'password'} />
                        </div>
                        <button type="submit">登录</button></>
            }
        </form>
    );
};