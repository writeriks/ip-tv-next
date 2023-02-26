export interface LoginProps {
  username: string
  password: string
  url: string
  isRememberMe: boolean
}

export enum loginTypes {
  username = 'username',
  password = 'password',
  url = 'url',
}

export const defaultLoginProps: LoginProps = { username: '', password: '', url: '', isRememberMe: false }

export enum loginStorage {
  LOGIN_FORM = 'LOGIN_FORM',
}
