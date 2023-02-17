import sxRequest, { IResultData } from './index'
import { IUser } from './user'
import { IWord } from './word'


export interface ICollect {
  id?: number
  userId?: number
  name?: string
}

export interface ICollectWord {
  id?: number
  name?: string
  user?: IUser
  words?: IWord[]
}

// 获取收藏夹列表
export const getCollectList = () => {
  return sxRequest.get<IResultData<ICollectWord[]>>('/collects/list')
}

// 通过收藏夹名称获取收藏夹单词
export const getWordByCollectName = (name: string) => {
  return sxRequest.get<IResultData<ICollectWord>>('/collects/name', {
    name
  })
}

// 删除收藏夹
export const deleteCollectAPI = (id: number) => {
  return sxRequest.delete<IResultData<any>>('/collects/delete', {
    id
  })
}
