import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		modele: {
			ra: "5",
			c0: "0.1",
			f: "0.0001",
			uan: "220",
			ian: "6",
			ien: "240",
			nn: "2100"
		},

		reglages: {
			ua: 0,
			ie: 0,
			cr: 0
		},

		mesures: {
			ia: 0,
			vitesse: 0,
			pabs: 0,
			put: 0
		}
	},
	//
	mutations: {
		SET_MODELE(state, payload) {
			state.modele = payload
		},

		SET_MESURES(state, payload) {
			state.mesures = payload
		},

		SET_UA(state, val) {
			state.reglages.ua = val
		},

		SET_IE(state, val) {
			state.reglages.ie = val
		},

		SET_CR(state, val) {
			state.reglages.cr = val
		},

		SET_MESURES_RESET(state) {
			state.mesures.ia = 0
			state.mesures.vitesse = 0
			state.mesures.pabs = 0
			state.mesures.put = 0
		},

		SET_REGLAGES_RESET(state) {
			state.reglages.ua = 0
			state.reglages.ie = 0
			state.reglages.cr = 0
		}
	},

	//
	actions: {
		setMesuresReset({ commit }) {
			commit("SET_MESURES_RESET")
		},

		setReglagesReset({ commit }) {
			commit("SET_REGLAGES_RESET")
		},

		setModele({ commit }, payload) {
			commit("SET_MODELE", payload)
		},

		setNewUa({ commit }, val) {
			commit("SET_UA", val)
		},

		setNewIe({ commit }, val) {
			commit("SET_IE", val)
		},

		setNewCr({ commit }, val) {
			commit("SET_CR", val)
		},

		process({ commit, getters }) {
			const ua = getters.getReglages.ua
			const ie = getters.getReglages.ie
			const cr = getters.getReglages.cr

			const ra = Number(getters.getModele.ra)
			const c0 = Number(getters.getModele.c0)
			const f = Number(getters.getModele.f)
			const uan = Number(getters.getModele.uan)
			const ian = Number(getters.getModele.ian)
			const ien = Number(getters.getModele.ien)
			const nn = Number(getters.getModele.nn)

			const omega_n = (2 * Math.PI * nn) / 60
			const kphi_n = (uan - ra * ian) / omega_n

			const kphi = (kphi_n * ie) / ien
			console.log(`kphi = ${kphi}`)

			const num = ua * f + (c0 + cr) * kphi
			const den = ra * f + kphi * kphi

			//ia
			let ia = num / den

			if (ia < 0 || ua <= 0) {
				ia = 0
			}

			//vitess
			let omega = (ua - ra * ia) / kphi

			if (omega < 0) {
				omega = 0
			}

			const vitesse = (omega * 60) / (2 * Math.PI)

			const pabs = ua * ia
			const put = cr * omega

			commit("SET_MESURES", {
				ia: Number(ia.toFixed(2)),
				vitesse: Number(vitesse.toFixed(0)),
				pabs: Number(pabs.toFixed(0)),
				put: Number(put.toFixed(0))
			})
		}
	},

	//
	getters: {
		getModele(state) {
			return state.modele
		},

		getReglages(state) {
			return state.reglages
		},

		getMesures(state) {
			return state.mesures
		}
	}
})
