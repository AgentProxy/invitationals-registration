<template>
  <div>
    <h1>Registrations</h1>
    <v-row class="py-3">
      <v-col cols="12">
        <RegistrationStats></RegistrationStats>
      </v-col>
    </v-row>
    <v-row class="py-3">
      <v-col cols="12">
        <AddRegistrationDialog v-model="showDialog" :initial-data="initialData" @reset-initial-data="initialData = {}" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <p>*Click row to see details, update or delete</p>
        <RegistrationsTable @show-details="showDetails" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddRegistrationDialog from '@/components/registrations/AddRegistrationDialog.vue';
import RegistrationsTable from '@/components/registrations/RegistrationsTable'
import RegistrationStats from '~/components/registrations/RegistrationStats.vue';
export default {
  name: 'IndexPage',
  components: {
    AddRegistrationDialog,
    RegistrationsTable,
    RegistrationStats
  },
  data() {
    return {
      initialData: {},
      showDialog: false
    }
  },
  methods: {
    showDetails(data) {
      this.showDialog = true;
      this.initialData = data
    }
  }
}
</script>
