<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular indeterminate size="64" color="primary" />
  </v-overlay>

  <v-container max-width="800" class="mt-5 mx-auto">
    <v-card-title class="text-center">Управление клиентами</v-card-title>

    <v-card elevation="5" class="pa-0">
      <v-toolbar flat>
        <v-btn icon="mdi-arrow-left" to="/" />
        <v-spacer />
        <v-btn icon="mdi-plus" color="primary" @click="openCreateDialog()" />
      </v-toolbar>

      <v-data-table-server
        :headers="headers"
        :items="customers"
        v-model:options="options"
        :items-length="totalCustomers"
        :loading="pending"
        class="elevation-0"
      >
        <template #item.actions="{ item }">
          <v-icon small class="me-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
          <v-icon small @click="confirmDelete(item)">mdi-delete</v-icon>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>

  <!-- Create / Edit Dialog -->
  <v-dialog v-model="editDialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h5">
        {{ editingCustomer ? 'Редактировать клиента' : 'Создать клиента' }}
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="valid" @submit.prevent="saveCustomer">
          <v-text-field
            v-model="customerForm.customer_name"
            label="Имя клиента"
            :rules="[rules.required]"
            clearable
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeEditDialog">Отмена</v-btn>
        <v-btn color="primary" :disabled="!valid" @click="saveCustomer">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="confirmDeleteDialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">Подтвердите удаление</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить клиента «{{ customerToDelete?.customer_name }}»?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="closeConfirmDialog">Отмена</v-btn>
        <v-btn color="red" @click="deleteConfirmed">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
const config = useRuntimeConfig()

// 1. Headers for v-data-table
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Имя клиента', key: 'customer_name' },
  { title: 'Действия', key: 'actions', sortable: false },
]

// 2. Table options & data
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  sortDesc: [],
})
const customers = ref([])
const totalCustomers = ref(0)

// Loading states
const overlay = ref(false)
const pending = ref(false)

// Dialog & form state
const editDialog = ref(false)
const confirmDeleteDialog = ref(false)
const editingCustomer = ref(false)
const customerForm = reactive({ id: null, customer_name: '' })
const customerToDelete = ref(null)
const valid = ref(false)
const formRef = ref(null)

// Validation rules
const rules = {
  required: v => !!v || 'Обязательное поле',
}

// Fetch customers whenever options change
watch(options, fetchCustomers, { deep: true, immediate: true })

/**
 * Fetch a page of customers from the API, with sorting
 */
async function fetchCustomers() {
  overlay.value = true
  pending.value = true

  const { page, itemsPerPage, sortBy, sortDesc } = options.value
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: itemsPerPage.toString(),
  })
  if (sortBy.length) {
    params.append('ordering', (sortDesc[0] ? '-' : '') + sortBy[0])
  }

  const res = await $fetch(`${config.public.apiUrl}/api/customers/?${params}`, {
    method: 'get',
  })
  // Response shape: { count: N, next: url, previous: url, results: [...] }
  customers.value = res.results
  totalCustomers.value = res.count

  overlay.value = false
  pending.value = false
}

// Open & close dialogs, save & delete logic (unchanged from before)
function openCreateDialog() {
  editingCustomer.value = false
  customerForm.id = null
  customerForm.customer_name = ''
  editDialog.value = true
}

function openEditDialog(item) {
  editingCustomer.value = true
  customerForm.id = item.id
  customerForm.customer_name = item.customer_name
  editDialog.value = true
}

function closeEditDialog() {
  editDialog.value = false
  formRef.value.resetValidation()
}

async function saveCustomer() {
  await formRef.value.validate()
  if (!valid.value) return
  overlay.value = true

  const url = editingCustomer.value
    ? `${config.public.apiUrl}/api/customers/${customerForm.id}/`
    : `${config.public.apiUrl}/api/customers/`
  const method = editingCustomer.value ? 'put' : 'post'

  await $fetch(url, { method, body: { customer_name: customerForm.customer_name } })
  overlay.value = false
  editDialog.value = false
  await fetchCustomers()
}

function confirmDelete(item) {
  customerToDelete.value = item
  confirmDeleteDialog.value = true
}

function closeConfirmDialog() {
  confirmDeleteDialog.value = false
}

async function deleteConfirmed() {
  overlay.value = true
  await $fetch(`${config.public.apiUrl}/api/customers/${customerToDelete.value.id}/`, {
    method: 'DELETE',
  })
  confirmDeleteDialog.value = false
  await fetchCustomers()
  overlay.value = false
}
</script>

<style scoped>
/* Добавьте свои стили по необходимости */
</style>