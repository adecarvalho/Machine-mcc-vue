<template>
<v-container fluid>
   <v-layout align-center justify-center row fill-height>
       <h1> <span class="titre">Mesures en charge</span></h1> 
    </v-layout>

<!---->
<v-layout row justify-space-around wrap>
    <v-flex sm12 md3>
      <reglage-slider 
      @onChange="onChangeUa"
      titre="Tension d'induit Ua[V]"
      label="Ua"
      valeurMin='0'
      valeurInitiale='0'
      valeurMax='220'
      valeurStep="1"
      couleur='purple darken-1'>
      </reglage-slider>
    </v-flex>

    <v-flex sm12 md3>
      <reglage-slider 
      @onChange="onChangeIe"
      titre="Courant d'excitation Ie[mA]"
      label="Ie"
      valeurInitiale='0'
      valeurMin='0'
      valeurMax='240'
      valeurStep="1"
      couleur='green darken-1'>
      </reglage-slider>
    </v-flex>

    <v-flex sm12 md3>
      <reglage-slider 
      @onChange="onChangeCr"
      titre="Couple de charge Cr[Nm]"
      label="Cr"
      valeurInitiale='0'
      valeurMin='0'
      valeurMax='10'
      valeurStep="0.1"
      couleur='orange darken-1'>
      </reglage-slider>
    </v-flex>
</v-layout>
<!---->

<v-layout row justify-space-around wrap>
  <v-flex sm12 md4>
   <afficheur-lcd titre="Ia (en A)" :valeur=getMesures.ia></afficheur-lcd> 
  </v-flex>     

  <v-flex sm12 md4>
    <afficheur-lcd titre="Vitesse (en tr/min)" :valeur=getMesures.vitesse></afficheur-lcd>
  </v-flex>  
</v-layout> 


<v-layout row justify-space-around wrap>
  <v-flex sm12 md4>
    <afficheur-lcd titre="Puissance abs (en W)" :valeur=getMesures.pabs></afficheur-lcd> 
  </v-flex>     

  <v-flex sm12 md4>
    <afficheur-lcd titre="Puissance utile (en W)" :valeur=getMesures.put></afficheur-lcd>
  </v-flex>   

</v-layout>

</v-container>
</template>

<script>
import { mapGetters } from "vuex"
import AfficheurLcd from "@/components/afficheur/AfficheurLcd"
import ReglageSlider from "@/components/reglage/ReglageSlider"

export default {
	name: "Mesure",

	components: {
		AfficheurLcd,
		ReglageSlider
	},

	data() {
		return {
			ua: 0,
			ie: 0,
			cr: 0
		}
	},

	computed: {
		...mapGetters(["getMesures"])
	},

	mounted() {
		this.load()
	},

	methods: {
		onChangeUa(val) {
			this.ua = val
			this.$store.dispatch("setNewUa", this.ua)
			this.$store.dispatch("process")
		},
		onChangeIe(val) {
			this.ie = val
			this.$store.dispatch("setNewIe", this.ie)
			this.$store.dispatch("process")
		},
		onChangeCr(val) {
			this.cr = val
			this.$store.dispatch("setNewCr", this.cr)
			this.$store.dispatch("process")
		},

		load() {
			this.$store.dispatch("setMesuresReset")
			this.$store.dispatch("setReglagesReset")
		}
	}
}
</script>

<style scoped>
.titre {
	text-shadow: 3px 3px 5px #555;
}
</style>

