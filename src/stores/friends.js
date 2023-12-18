import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDividerStore } from './dividerGifts'

export const useFriendsStore = defineStore('friends', () => {
  //data
  const friendsList = ref([
    { id: 1, name: 'Баба Галя' },
    { id: 2, name: 'Дед Петро' },
    { id: 3, name: 'Внук Андрей' },
    { id: 4, name: 'Тетка Зина' },
    { id: 5, name: 'Сестра Галина' }
  ])

  //computed
  const getFriendById = computed(
    () => (friendId) => friendsList.value.find((friend) => friend.id == friendId)
  )

  //actions
  function addFriend(friend) {
    friendsList.value.push({
      id: new Date().getTime(),
      ...friend
    })
  }

  function deleteFriend(friendId) {
    friendsList.value = friendsList.value.filter((friend) => friend.id !== friendId)
    const divider = useDividerStore()
    divider.deleteItemByFriendId(friendId)
  }

  return { friendsList, getFriendById, addFriend, deleteFriend }
})
