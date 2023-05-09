<template>
    <v-dialog :value="value" persistent max-width="1000px">
        <template v-slot:activator="{ attrs }">
            <v-btn class="float-right" color="orange" dark v-bind="attrs" @click="$emit('input', true)">
                Add Registration
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5"> {{ !isUpdate ? 'New Registrant' : 'Registrant' }}</span>
            </v-card-title>
            <v-card-text>
                <small v-if="!isUpdate">*indicates required field</small>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model.number="form.numberOfTickets" min="1" label="Number Of Tickets*" required
                                type="number" outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model.number="form.ticketPrice" label="Ticket Price*" required type="number"
                                disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Total Amount" readonly persistent-hint hint="Auto computed" type="number"
                                :value="totalAmount"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model.number="form.tenderedAmount" label="Tendered Amount*" type="number"
                                required outlined min="0"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Change" readonly persistent-hint hint="Auto computed" type="number"
                                :value="change" color="green"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea label="Notes" outlined v-model="form.notes"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                    Close
                </v-btn>
                <div v-if="isUpdate">
                    <v-btn color="red" text @click="deleteRegistrant">
                        Delete
                    </v-btn>
                    <v-btn color="success" text @click="updateRegistrant" :disabled="!form.isPendingChange">
                        Change Given
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn color="warning" text @click="save(true)" :disabled="!change">
                        Pending Change
                    </v-btn>
                    <v-btn color="success" text @click="save(false)">
                        Save
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            form: {
                isPendingChange: false,
                notes: '',
                numberOfTickets: 1,
                ticketPrice: 150,
                tenderedAmount: 0
            }
        }
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        initialData: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        value() {
            if (this.value && this.isUpdate) {
                this.form = {
                    isPendingChange: this.initialData.isPendingChange,
                    notes: this.initialData.notes,
                    numberOfTickets: this.initialData.numberOfTickets,
                    ticketPrice: this.initialData.ticketPrice,
                    tenderedAmount: this.initialData.tenderedAmount
                }
            }
        }
    },
    computed: {
        change() {
            const change = this.form.tenderedAmount - this.totalAmount
            return change > 0 ? change : 0
        },
        isUpdate() {
            return this.initialData && Object.keys(this.initialData).length
        },
        totalAmount() {
            return this.form.ticketPrice * this.form.numberOfTickets
        }
    },
    methods: {
        close() {
            this.$emit('input', false)
            this.resetForm()
            if (this.isUpdate) {
                this.$emit('reset-initial-data')
            }
        },
        deleteRegistrant() {
            if (this.isUpdate) {
                const isDelete = confirm('Are you sure you want to delete this row?')
                if (isDelete) {
                    this.$store.dispatch('registrations/deleteRegistration', this.initialData._id)
                }
                this.close()
            }
        },
        updateRegistrant() {
            if (this.isUpdate) {
                this.$store.dispatch('registrations/updateRegistration', {
                    id: this.initialData._id,
                    body: {
                        isPendingChange: false
                    }
                })
                this.close()
            }
        },
        resetForm() {
            this.form = {
                isPendingChange: false,
                notes: '',
                numberOfTickets: 1,
                ticketPrice: 150,
                tenderedAmount: 0
            }
        },
        save(pending = false) {
            if (this.form.tenderedAmount < this.totalAmount) {
                alert('Tendered Amount should be more than Total Amount!')
                return
            }
            this.$store.dispatch('registrations/newRegistration', {
                ...this.form,
                change: this.change,
                isPendingChange: pending,
                totalAmount: this.totalAmount
            })
            this.close()
        }
    }
}
</script>