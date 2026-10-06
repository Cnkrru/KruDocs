import { ref } from 'vue'

/* ====================<亮暗>==================== */
type LD = 'light' | 'dark'
const lds: LD[] = ['light', 'dark']

export const RefLd = ref<LD>('dark')

// 挂亮暗类：var.css 用 .light/.dark 类选择器，body 上必须有其一，否则变量全部落空
export const setLd = (ld: LD) => {
  lds.forEach((name) => document.body.classList.remove(name))
  document.body.classList.add(ld)
  RefLd.value = ld
  localStorage.setItem('ld', ld)
}

// 初始化：读 localStorage 偏好，无记录默认暗色
export const initLD = () => {
  const store = localStorage.getItem('ld')
  setLd(lds.includes(store as LD) ? (store as LD) : 'dark')
}
