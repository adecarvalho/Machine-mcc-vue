<template>
  <v-container fluid>
    <v-layout align-center justify-center column fill-height>
       <h1> <span class="titre">{{titre}} </span>   </h1> 
    </v-layout>

    <v-layout row align-center justify-center fill-height>
            
        <v-flex xs12 md6>

          <v-card>
            <v-card-text>
              <v-container>
               <!--   -->
                 <v-form ref="form" v-model="valid" lazy-validation >
                  <v-text-field
                  label="Ra la résistance d'induit"
                  v-model='ra'
                  id='ra'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="C0[Nm] le couple de perte"
                  v-model="c0"
                  id='c0'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="F[Nms] le frottement"
                  v-model="f"
                  id='f'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="Uan[V] la tension nominale d'induit"
                  v-model="uan"
                  id='uan'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="Ian[A] le courant nominal d'induit"
                  v-model="ian"
                  id='reactance_xs'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                   <v-text-field
                  label="Ien[mA] le courant nominal d'inducteur"
                  v-model="ien"
                  id='ien'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                   <v-text-field
                  label="Nn[tr/min] la vitesse de rotation nominale"
                  v-model="nn"
                  id='nn'
                  :rules="positifRule"
                  required
                  ></v-text-field>

                  <v-btn :disabled="!valid" @click.prevent="onSubmit" color="info" >
                  Enregistrer
                  </v-btn>
                 </v-form>
                <!--  -->  
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>  
    </v-layout>
</v-container>
</template>


<script>
export default {
	name: "SaisieModele",

	mounted: function() {
		this.load()
	},
	//

	methods: {
		onSubmit: function() {
			this.$store.dispatch("setModele", {
				ra: this.ra,
				c0: this.c0,
				f: this.f,
				uan: this.uan,
				ian: this.ian,
				ien: this.ien,
				nn: this.nn
			})

			this.$router.push("/mesure")
		},
		//
		load: function() {
			const datas = this.$store.getters.getModele

			this.ra = datas.ra
			this.c0 = datas.c0
			this.f = datas.f
			this.uan = datas.uan
			this.ian = datas.ian
			this.ien = datas.ien
			this.nn = datas.nn
		}
	},
	//
	data: function() {
		return {
			valid: false,
			ra: "",
			c0: "",
			f: "",
			uan: "",
			ian: "",
			ien: "",
			nn: "",

			titre: "Saisir le modèle de la MCC",

			positifRule: [
				val => {
					if (isNaN(val)) {
						return "Cette saisie n'est pas un nombre !"
					} else if (val <= 0) {
						return "Ce nombre doit être positif !"
					} else return true
				}
			]
		}
	}
	//
}
</script>

<style scoped>
.titre {
	text-shadow: 3px 3px 5px #555;
	padding: 50px;
}
</style>

