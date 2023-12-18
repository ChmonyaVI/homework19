import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFriendsStore } from '../stores/friends'
import { useGiftsStore } from '../stores/gifts'

export const useDividerStore = defineStore('divider', () => {
  //data
  const dividerList = ref([])

  //computed
  const getDividerListWithNames = computed(() => {
    const friends = useFriendsStore()
    const gifts = useGiftsStore()
    if (dividerList.value.length) {
      return dividerList.value.map((item) => {
        const friend = friends.getFriendById(item.friendId)
        const gift = gifts.getGiftById(item.giftId)
        let friendName = friend ? friend.name : 'unknown'
        let giftName = gift ? gift.title : 'unknown'
        return {
          id: item.id,
          friendName: friendName,
          giftName: giftName
        }
      })
    }
  })
  const getItemByFriendId = (friendId) =>
    computed(() => dividerList.value.find((item) => item.friendId == friendId))
  const getItemByGiftId = (giftId) =>
    computed(() => dividerList.value.find((item) => item.giftId == giftId))

  //actions
  function addItem(dividerObj) {
    dividerList.value.push({
      id: new Date().getTime(),
      ...dividerObj
    })
  }

  function deleteItem(itemId) {
    dividerList.value = dividerList.value.filter((item) => item.id !== itemId)
  }

  function deleteItemByFriendId(friendId) {
    const id = getItemByFriendId(friendId).value.id
    this.deleteItem(id)
  }
  function deleteItemByGiftId(giftId) {
    const id = this.getItemByGiftId(giftId).value.id
    this.deleteItem(id)
  }

  return {
    dividerList,
    getDividerListWithNames,
    getItemByFriendId,
    getItemByGiftId,
    addItem,
    deleteItem,
    deleteItemByFriendId,
    deleteItemByGiftId
  }
})
