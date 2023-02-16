import { defineStore } from 'pinia'
import { getUserByName, getUserList, IUser } from '~~/service/user'


export interface IUserState {
  users?: IUser[]
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      users: []
    }
  },
  actions: {
    // 获取单个用户
    async fetchUserByName(word: string) {
      console.log('fetchWordByName')
      const { data } = await getUserByName(word)
      console.log(data.value?.data)
      this.users = [{ ...data.value?.data }]
    },

    // 获取单词列表
    async fetchUserList() {
      const { data } = await getUserList()
      this.users = data.value?.data
    }
  }
})
