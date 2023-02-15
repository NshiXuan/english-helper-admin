import { defineStore } from 'pinia'

import { getWordByName, IWord, getWordList } from '~~/service/word'

export interface IHomeState {
  count?: number
  word?: IWord
  words?: IWord[]
}

export const useHomeStore = defineStore('home', {
  state: (): IHomeState => {
    return {
      count: 100,
      word: {},
      words: []
    }
  },
  actions: {
    // 获取单个单词数据
    async fetchWordByName(word: string) {
      console.log('fetchWordByName')
      const { data } = await getWordByName(word)
      console.log(data.value?.data)
      this.words = [{ ...data.value?.data }]
    },

    // 获取单词列表
    async fetchWordList() {
      const { data } = await getWordList()
      this.words = data.value?.data
    }
  }
})
