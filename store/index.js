const moment = require('moment')

export const state = () => ({
  list: [],
  newList: [],
  current: []
})

export const mutations = {
  SET_LIST(state, payload) {
    state.list = payload
  },
  SET_LISTs(state, payload) {
    state.newList = payload
  },
  SET_CURRENT(state, payload) {
    state.current = payload
  }
}

export const actions = {
  async loadList({ commit }) {
    const data = await this.$axios.$get('list')
    commit('SET_LIST', data)
    const time = moment().format('D MMMM YYYY')
    const weekAgo = moment(time)
      .subtract(22, 'd')
      .format('D MMMM YYYY')

    const current = []

    for (let i = 0; i < data.length; i++) {
      const isBetween = moment(data[i].start, ['D MMMM YYYY']).isBetween(
        weekAgo,
        time
      )
      if (isBetween === true) {
        current.push(data[i])
      }
    }
    if (current.length === 0) {
      commit('SET_CURRENT', 'nothing currently active')
    } else {
      commit('SET_CURRENT', current)
    }
  }

  //   async loadList({ commit }) {
  //     const data = await this.$axios.$get('list')
  //     // console.log(data)
  //     commit('SET_LIST', data)
  //     // commit('SET_LISTs', data)
  //     const time = moment().format('D MMMM YYYY')
  //     let dif
  //     let ind
  //     let current
  //     for (let i = 0; i < data.length; i++) {
  //       const a = moment(data[i].start, ['D MMMM YYYY'])
  //       const difference = a.diff(time, 'days')
  //       const absolute = Math.abs(difference)
  //       if (difference < 0) {
  //         const absolute = Math.abs(difference)
  //         if (dif === undefined) {
  //           dif = absolute
  //           ind = i
  //         } else if (absolute <= dif) {
  //           dif = absolute
  //           ind = i
  //           console.log('smallest difference is ' + dif + ' ' + 'index is ' + ind)
  //           if (dif > 20) {
  //             current = 'nothing currently active'
  //             commit('SET_CURRENT', current)
  //           } else {
  //             current = 'current suburb is' + ' ' + data[i].suburb
  //             commit('SET_CURRENT', current)
  //           }
  //         }
  //       }
  //     }
  //   }
}

export const getters = {
  getList(state) {
    return state.list
  },
  getCurrent(state) {
    return state.current
  }
}
