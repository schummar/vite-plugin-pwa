import { ref } from 'vue'
import { RegisterSWOptions } from '../type'
import { registerSW } from './register'

export type { RegisterSWOptions }

export function useRegisterSW(options: RegisterSWOptions = {}) {
  const {
    immediate = true,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisterError,
  } = options

  const needRefresh = ref(false)
  const offlineReady = ref(false)

  const updateServiceWorker = registerSW({
    immediate,
    onNeedRefresh() {
      needRefresh.value = true
      onNeedRefresh?.()
    },
    onOfflineReady() {
      offlineReady.value = true
      onOfflineReady?.()
    },
    onRegistered,
    onRegisterError,
  })

  return {
    updateServiceWorker,
    offlineReady,
    needRefresh,
  }
}
