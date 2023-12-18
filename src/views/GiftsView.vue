<script setup>
import { reactive } from 'vue'
import { useGiftsStore } from '../stores/gifts'

const gifts = useGiftsStore()

const gift = reactive({})
</script>

<template>
  <div class="gift">
    <h1 class="gift__title">This is an gift page</h1>
    <div class="gift__block">
      <v-card class="gift__card mx-auto pa-2" max-width="300">
        <v-list>
          <v-list-subheader>Список друзей</v-list-subheader>
          <v-list-item
            v-for="gift in gifts.giftsList"
            :key="gift.id"
            color="primary"
            rounded="shaped"
            class="gift__item item-list"
          >
            <template v-slot:prepend>
              <div class="item-list__title-name">
                {{ gift.title }}
              </div>
            </template>
            <v-btn class="gift__btn-delete" @click="gifts.deleteGift(gift.id)"> X </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="gift__add-block">
      <v-input ref="title" class="mx-auto w-75">
        <v-text-field
          label="Новый друг"
          v-model="gift.title"
          max-width="400"
          hint="Введите имя друга"
          clearable
          persistent-clear
        ></v-text-field>
        <template v-slot:append>
          <v-btn class="mb-3" @click="gifts.addGift(gift)">Добавить</v-btn>
        </template>
      </v-input>
    </div>
  </div>
</template>

<style lang="css" scoped>
.gift {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.gift__block {
  width: 300px;
}
.item-list {
  display: flex;
  justify-content: space-between;
}
.gift__btn-delete:hover {
  background-color: rgb(213, 119, 119);
}
.gift__add-block {
  width: 600px;
}
</style>
