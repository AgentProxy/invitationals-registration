
import Vue from "vue"

export const state = () => ({
    registrations: [],
    stats: null
})

export const mutations = {
    ADD_REGISTRANT(state, registrant) {
        state.registrations.unshift({
            createdAt: new Date(),
            updateAt: new Date(),
            ...registrant
        })
    },
    DELETE_REGISTRANT(state, id) {
        state.registrations = state.registrations.filter((item) => item._id !== id);
    },
    UPDATE_REGISTRANT(state, registrant) {
        const index = state.registrations.findIndex(item => item._id === registrant._id)
        Vue.set(state.registrations, index, registrant)
    },
    SET_REGISTRATIONS(state, registrations) {
        state.registrations = registrations
    },
    SET_STATS(state, stats) {
        state.stats = stats
    }
}

export const actions = {
    async fetchStats({ commit }) {
        // make request
        try {
            const stats = await this.$axios.get('/stats')
            commit('SET_STATS', stats.data)
        }
        catch (err) {
            console.log(err)
            alert('Error getting stats!')
        }
    },
    async fetchRegistrations({ commit }) {
        // make request
        try {
            const registrations = await this.$axios.get('/')
            commit('SET_REGISTRATIONS', registrations.data)
        }
        catch (err) {
            console.log(err)
            alert('Error getting table data!')
        }
    },
    async deleteRegistration({ commit, dispatch }, id) {
        try {
            await this.$axios.delete(`/delete-registration/${id}`)
            commit('DELETE_REGISTRANT', id)
            dispatch('fetchStats')
        } catch (err) {
            console.log(err)
            alert('Error deleting registrant!')
        }
    },
    async newRegistration({ commit, dispatch }, registration) {
        try {
            const newRegistrant = await this.$axios.post('/new-registration', registration)
            commit('ADD_REGISTRANT', newRegistrant.data)
            dispatch('fetchStats')
        } catch (err) {
            console.log(err)
            alert('Error adding new registrant!')
        }
    },
    async updateRegistration({ commit }, payload) {
        try {
            const registrant = await this.$axios.put(`/update-registration/${payload.id}`, payload.body)
            commit('UPDATE_REGISTRANT', registrant.data)
        } catch (err) {
            console.log(err)
            alert('Error updating registrant!')
        }
    }
}