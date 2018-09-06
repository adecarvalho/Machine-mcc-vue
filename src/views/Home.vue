<template>
  <v-container>
    <v-layout align-center justify-center row>

      <v-flex xs12 sm12  md5>
        <v-card>
        <v-img
          :src="imageMcc"
          contain
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Modèle Mcc</h3>
            <div>Ce shéma modélise une machine à courant continu à excitation séparée.</div>
          </div>
        </v-card-title>

      </v-card>

      </v-flex>

    <v-flex xs12 sm12 md4 offset-md2>
      <v-carousel hide-controls hide-delimiters interval="2000">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          contain
        ></v-carousel-item>
      </v-carousel>
    </v-flex>

  </v-layout>
</v-container>

</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					src: require("@/assets/img_machine_2.png")
				},
				{
					src: require("@/assets/img_machine_3.png")
				},
				{
					src: require("@/assets/img_machine_4.png")
				}
			],

			imageMcc: require("@/assets/Modele_mcc.svg")
		}
	}
}
</script>
