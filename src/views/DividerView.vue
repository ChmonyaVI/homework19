<script setup>
import { computed, ref, reactive } from 'vue'
import { useFriendsStore } from '../stores/friends'
import { useGiftsStore } from '../stores/gifts'
import { useDividerStore } from '../stores/dividerGifts'

const friends = useFriendsStore()
const gifts = useGiftsStore()
const divider = useDividerStore()

let dividerObj = reactive({})
let message = ref('')

const noDividedGifts = computed(() => !divider.dividerList.length)

function onAdd() {
  if (dividerObj.friendId && dividerObj.giftId) {
    divider.addItem(dividerObj)
    Object.keys(dividerObj).forEach((key) => {
      dividerObj[key] = null
    })
    message.value = ''
  } else {
    message.value = 'Виберіть і друга, і подарунок'
    setTimeout(() => (message.value = ''), 3000)
  }
}
</script>

<template>
  <div class="divider">
    <h1 class="divider__title">This is an divider page</h1>
    <div class="divider__container">
      <div v-if="noDividedGifts">Нет назначеных подарков</div>
      <div v-else>
        <v-list lines="two" density="compact" elevation="5" class="mb-5">
          <v-list-item
            v-for="item in divider.getDividerListWithNames"
            :key="item.id"
            :title="item.friendName + ' - ' + item.giftName"
            prepend-icon="mdi-view-list"
          >
            <template v-slot:append>
              <v-btn
                prepend-icon="mdi-delete"
                density="comfortable"
                class="mb-2"
                @click="divider.deleteItem(item.id)"
              >
                Удалить
              </v-btn>
            </template>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <v-select
      v-model="dividerObj.friendId"
      :items="friends.friendsList"
      label="Друг"
      item-title="name"
      item-value="id"
      variant="solo"
      clearable
    >
    </v-select>
    <v-select
      v-model="dividerObj.giftId"
      :items="gifts.giftsList"
      label="Подарок"
      item-title="title"
      item-value="id"
      variant="solo"
      clearable
    >
    </v-select>

    <v-btn block elevation="8" @click="onAdd">Додати</v-btn>
    <p class="text-center font-italic text-red p-3 mt-5">{{ message }}</p>
  </div>
</template>

<style lang="css" scoped>
.divider {
  margin: 0 auto;
  width: 500px;
}
</style>
