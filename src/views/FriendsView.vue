<script setup>
import { reactive } from 'vue'
import { useFriendsStore } from '../stores/friends'

const friends = useFriendsStore()

const friend = reactive({})
</script>

<template>
  <div class="friend">
    <h1 class="friend__title">This is an friend page</h1>
    <div class="friend__block">
      <v-card class="friend__card mx-auto pa-2" max-width="300">
        <v-list>
          <v-list-subheader>Список друзей</v-list-subheader>
          <v-list-item
            v-for="friend in friends.friendsList"
            :key="friend.id"
            color="primary"
            rounded="shaped"
            class="friend__item item-list"
          >
            <template v-slot:prepend>
              <div class="item-list__title-name">
                {{ friend.name }}
              </div>
            </template>
            <v-btn class="friend__btn-delete" @click="friends.deleteFriend(friend.id)"> X </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
    <div class="friend__add-block">
      <v-input class="mx-auto w-75">
        <v-text-field
          label="Новый друг"
          v-model="friend.name"
          max-width="400"
          hint="Введите имя друга"
          clearable
          persistent-clear
        ></v-text-field>
        <template v-slot:append>
          <v-btn class="mb-3" @click="friends.addFriend(friend)">Добавить</v-btn>
        </template>
      </v-input>
    </div>
  </div>
</template>

<style>
.friend {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.item-list {
  display: flex;
  justify-content: space-between;
}
.friend__btn-delete:hover {
  background-color: rgb(213, 119, 119);
}
</style>
