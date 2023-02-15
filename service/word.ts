import sxRequest, { IResultData } from './index'

export interface ISentence {
  id?: number
  sentence?: string
  sentence_cn?: string
}

export interface IWord {
  id?: number
  word?: string
  level?: string
  mean_cn?: string
  sentences?: ISentence[]
}

// 通过名称获取单个单词
export const getWordByName = (word: string) => {
  return sxRequest.get<IResultData<IWord>>('/words', {
    word
  })
}

// 获取单词列表
export const getWordList = () => {
  return sxRequest.get<IResultData<IWord[]>>('/words/list')
}

// 添加单词
export const addWorById = (word: string, mean_cn: string, level: number, sentences: ISentence[]) => {
  return sxRequest.post<IResultData<any>>('/words', {
    word,
    mean_cn,
    level,
    sentences
  })
}

// 删除单词
export const deleteWorById = (id: string) => {
  return sxRequest.delete<IResultData<any>>('/words', {
    id
  })
}
