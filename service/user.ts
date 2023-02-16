import sxRequest, { IResultData } from './index'

export interface IUser {
  id?: number
  username?: string
  password?: string
}

// 通过名称获取用户
export const getUserByName = (name: string) => {
  return sxRequest.get<IResultData<IUser>>('/users', {
    name
  })
}

// 获取单词列表
export const getUserList = () => {
  return sxRequest.get<IResultData<IUser[]>>('/users/list')
}

// 注册 添加用户
export const registerApi = (username: string, password: string) => {
  return sxRequest.post<IResultData<IUser>>('/users/register', {
    username,
    password
  })
}

// 删除用户
export const deleteUserById = (id: string) => {
  return sxRequest.delete<IResultData<IUser>>('/users', {
    id
  })
}

// 更新用户
export const updateUserById = (id: string, username: string, password: string) => {
  return sxRequest.post<IResultData<IUser>>('/users', {
    id,
    username,
    password
  })
}
