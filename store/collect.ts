import { defineStore } from 'pinia'
import { ICollect } from '~~/service/collect'
import { getCollectList, getWordByCollectName } from '~~/service/collect'


export interface ICollectState {
  collects?: ICollect[]
}

export const useCollectStore = defineStore('collect', {
  state: (): ICollectState => {
    return {
      collects: []
    }
  },
  actions: {
    // 获取收藏夹列表
    async fetchCollectList() {
      const { data } = await getCollectList()
      this.collects = data.value?.data
    },

    // 获取单词列表
    async fetchCollectByName(name: string) {
      const { data } = await getWordByCollectName(name)
      this.collects = [{ ...data.value?.data }]
    }
  }
})
