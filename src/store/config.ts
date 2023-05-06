import { defineStore } from 'pinia'
import { langTitle } from '@/hooks/use-common'
import settings from '@/settings'
import { toggleHtmlClass } from '@/theme/utils'
import { i18n } from '@/lang'
export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      language: settings.defaultLanguage,
      theme: settings.defaultTheme,
      size: settings.defaultSize,
      rememberMe: settings.rememberMe,
      username: settings.username,
      password: settings.password,
    }
  },
  persist: {
    storage: localStorage,
    paths: ['language', 'theme', 'size',"rememberMe","username","password"]
  },
  actions: {
    setLoginInfo({username,password,rememberMe}){
      this.username = username
      this.password = password
      this.rememberMe = rememberMe
    },
    setTheme(data: string) {
      this.theme = data
      toggleHtmlClass(data)
    },
    setSize(data: string) {
      this.size = data
    },
    setLanguage(lang: string, title) {
      const { locale }: any = i18n.global
      this.language = lang
      locale.value = lang
      document.title = langTitle(title) // i18 page title
    }
  }
})
