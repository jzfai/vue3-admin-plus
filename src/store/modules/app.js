import defaultSettings from '@/settings'
const state = {
  sidebar: {
    opened: true
  },
  settings: defaultSettings,
  cachedViews: [],
  cachedViewsDeep: []
}

const mutations = {
  /*mutations建议以M_开头*/

  /*
   * data:ObjType
   * such as {sidebarLogo:false}
   * */
  M_settings: (state, data) => {
    state.settings = { ...state.settings, ...data }
  },

  M_sidebar_opened: (state, data) => {
    state.sidebar.opened = data
  },
  M_toggleSideBar: (state) => {
    state.sidebar.opened = !state.sidebar.opened
  },

  /*keepAlive缓存*/
  M_ADD_CACHED_VIEW: (state, view) => {
    console.log('M_ADD_CACHED_VIEW', view)
    if (state.cachedViews.includes(view)) return
    state.cachedViews.push(view)
  },
  M_DEL_CACHED_VIEW: (state, view) => {
    console.log('M_DEL_CACHED_VIEW', view)
    const index = state.cachedViews.indexOf(view)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  M_RESET_CACHED_VIEW: (state) => {
    state.cachedViews = []
  },

  /*third  keepAlive*/
  M_ADD_CACHED_VIEW_DEEP: (state, view) => {
    if (state.cachedViewsDeep.includes(view)) return
    state.cachedViewsDeep.push(view)
  },
  M_DEL_CACHED_VIEW_DEEP: (state, view) => {
    const index = state.cachedViewsDeep.indexOf(view)
    index > -1 && state.cachedViewsDeep.splice(index, 1)
  },
  M_RESET_CACHED_VIEW_DEEP: (state) => {
    state.cachedViewsDeep = []
  }
}
const actions = {
  A_sidebar_opened({ commit }, data) {
    commit('M_sidebar_opened', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
