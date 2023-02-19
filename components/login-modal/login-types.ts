export interface LoginProps {
  username: string
  password: string
  url: string
  rememberMe: boolean
}

export enum loginTypes {
  username = 'username',
  password = 'password',
  url = 'url',
}

export const defaultLoginProps: LoginProps = { username: '', password: '', url: '', rememberMe: false }

export enum loginStorage {
  LOGIN_FORM = 'LOGIN_FORM',
}
