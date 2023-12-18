import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useDividerStore } from './dividerGifts'

export const useGiftsStore = defineStore('gifts', () => {
  //data
  const giftsList = ref([
    { id: 1, title: 'Торт' },
    { id: 2, title: 'Телефон' },
    { id: 3, title: 'Ноутбук' },
    { id: 4, title: 'Шуба' },
    { id: 5, title: 'Шовдра' }
  ])

  //computed
  const getGiftById = computed(() => (giftId) => giftsList.value.find((gift) => gift.id == giftId))

  //actions
  function addGift(gift) {
    giftsList.value.push({
      id: new Date().getTime(),
      ...gift
    })
  }
  function deleteGift(giftId) {
    giftsList.value = giftsList.value.filter((gift) => gift.id !== giftId)
    const divider = useDividerStore()
    divider.deleteItemByGiftId(giftId)
  }

  return { giftsList, getGiftById, addGift, deleteGift }
})
