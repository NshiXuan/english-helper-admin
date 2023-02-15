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
      const { data } = await getWordByName(word)
      this.word = data.value?.data
    },

    // 获取单词列表
    async fetchWordList() {
      console.log('fetchWordList')
      const { data } = await getWordList()
      this.words = data.value?.data
    }
  }
})
