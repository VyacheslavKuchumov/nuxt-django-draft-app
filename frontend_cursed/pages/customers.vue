<template>
  <v-container max-width="800" class="elevation-0 mt-5 ml-auto mr-auto">
    <v-card-title class="text-wrap" align="center">
      Управление клиентами
    </v-card-title>
  </v-container>

  <v-container class="elevation-5 mt-5 ml-auto mr-auto pa-0" max-width="800">
    <v-toolbar flat>
      <v-btn icon="mdi-arrow-left" color="primary" to="/" />
      <v-spacer />
      <v-btn color="primary" icon="mdi-plus" @click="openCreateDialog()" />
    </v-toolbar>

    <v-data-table-server
      :headers="headers"
      :items="customers"
      :loading="pending"
      :items-length="customers.length"

    >
      <template #item.actions="{ item }">
        <v-tooltip text="Редактировать" location="top">
          <template #activator="{ props }">
            <v-icon
              v-bind="props"
              size="small"
              class="me-2"
              @click="openEditDialog(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-tooltip>

        <v-tooltip text="Удалить" location="top">
          <template #activator="{ props }">
            <v-icon
              v-bind="props"
              size="small"
              @click="confirmDelete(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-server>
  </v-container>

  <!-- Create / Edit Dialog -->
  <v-dialog v-model="editDialog" max-width="450px">
    <v-card>
      <v-card-title class="text-h5">
        {{ editingCustomer ? "Редактировать клиента" : "Создать клиента" }}
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
        <v-btn color="primary" :disabled="!valid" @click="saveCustomer">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="confirmDeleteDialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">Подтвердите удаление</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить клиента
        «{{ customerToDelete?.customer_name }}»?
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
import { ref, reactive, computed } from 'vue'
import { useFetch } from '#app'

// Заголовки таблицы
const headers = [
  { text: 'ID', value: 'customer_id' },
  { text: 'Имя клиента', value: 'customer_name' },
  { text: 'Действия', value: 'actions', sortable: false },
]

// Получаем список клиентов
const { data, pending, refresh } = useFetch('/api/customers', { method: 'get' })
const customers = computed(() => data.value ?? [])

// Состояние диалогов и формы
const editDialog = ref(false)
const confirmDeleteDialog = ref(false)
const editingCustomer = ref(false)
const customerForm = reactive({ customer_id: null, customer_name: '' })
const customerToDelete = ref(null)
const valid = ref(false)
const formRef = ref(null)

// Правила валидации
const rules = {
  required: v => !!v || 'Обязательное поле',
}

// Открыть форму создания
function openCreateDialog() {
  editingCustomer.value = false
  customerForm.customer_id = null
  customerForm.customer_name = ''
  editDialog.value = true
}

// Открыть форму редактирования
function openEditDialog(item) {
  editingCustomer.value = true
  customerForm.customer_id = item.customer_id
  customerForm.customer_name = item.customer_name
  editDialog.value = true
}

// Закрыть диалог формы
function closeEditDialog() {
  editDialog.value = false
  formRef.value.resetValidation()
}

// Сохранить клиента (POST или PUT)
async function saveCustomer() {
  await formRef.value.validate()
  if (!valid.value) return

  if (editingCustomer.value) {
    await $fetch(`/api/customers/${customerForm.customer_id}`, {
      method: 'PUT',
      body: { customer_name: customerForm.customer_name },
    })
  } else {
    await $fetch('/api/customers', {
      method: 'POST',
      body: { customer_name: customerForm.customer_name },
    })
  }

  editDialog.value = false
  await refresh()
}

// Подготовка к удалению
function confirmDelete(item) {
  customerToDelete.value = item
  confirmDeleteDialog.value = true
}

// Отмена удаления
function closeConfirmDialog() {
  confirmDeleteDialog.value = false
}

// Подтвердить удаление
async function deleteConfirmed() {
  await $fetch(`/api/customers/${customerToDelete.value.customer_id}`, {
    method: 'DELETE',
  })
  confirmDeleteDialog.value = false
  await refresh()
}
</script>

<style scoped>
/* Добавьте свои стили по необходимости */
</style>
