<template>
    <div>
        <v-row v-if="stats">
            <v-col>
                <h2>Total Proceeds: {{ stats.totalProceeds }} </h2>
            </v-col>
            <v-col>
                <h2>Total Tickets Sold: {{ stats.totalNumberOfTickets }}</h2>
            </v-col>
            <v-col>
                <h2>Total Transactions: {{ stats.totalTransactions }}</h2>
            </v-col>
        </v-row>
        <h2 v-else>
            No Stats
        </h2>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('registrations', ['stats'])
    },
    mounted() {
        this.fetchStats()
    },
    methods: {
        fetchStats() {
            this.$store.dispatch('registrations/fetchStats')
        }
    }
}
</script>