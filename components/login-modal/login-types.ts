export interface LoginProps {
  username: string
  password: string
  url: string
}

export enum loginTypes {
  username = 'username',
  password = 'password',
  url = 'url',
}

export const defaultLoginProps = { username: '', password: '', url: '' }
