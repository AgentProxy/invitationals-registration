<template>
    <div>
        <v-simple-table v-if="registrations.length">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="(item, index) in tableHeaders" :key="'header-' + index" class="text-center">
                            {{ item.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in registrations" :key="item.id" @click="$emit('show-details', item)">
                        <td :class="setCellClass(item.isPendingChange)" v-for="(data, index) in tableHeaders"
                            :key="data.id + '-' + index" class="text-center">
                            {{ displayData(item, data) }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <h1 v-else> No Data Yet </h1>
    </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('registrations', ['registrations'])
    },
    data() {
        return {
            tableHeaders: [
                {
                    label: 'Transaction Date',
                    value: 'createdAt',
                    type: 'date'
                },
                {
                    label: ' Date Updated',
                    value: 'updatedAt',
                    type: 'date'
                },
                {
                    label: 'Number of Tickets',
                    value: 'numberOfTickets'
                },
                {
                    label: 'Total Amount',
                    value: 'totalAmount'
                },
                {
                    label: 'Tendered Amount',
                    value: 'tenderedAmount'
                },
                {
                    label: 'Change',
                    value: 'change'
                },
                {
                    label: 'Pending Change?',
                    value: 'isPendingChange'
                },
                {
                    label: 'Notes',
                    value: 'notes',
                    type: 'note'
                }
            ]
        }
    },
    mounted() {
        this.$store.dispatch('registrations/fetchRegistrations')
    },
    methods: {
        displayData(item, data) {
            if (data.type === 'note') {
                return item[data.value] && item[data.value].substring(0, 15)
            } else if (data.type === 'date') {
                return moment(item[data.value]).format('LLL')
            } else {
                return item[data.value]
            }
        },
        setCellClass(pending) {
            return pending ? 'red lighten-2' : ''
        }
    }
}
</script>