<template>
  <v-app dark>
    <AppBar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>Created by Eric Flores &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
export default {
  name: 'DefaultLayout',
  components: {
    AppBar
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
