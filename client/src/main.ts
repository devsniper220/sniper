import { createApp } from 'vue'
import App from './App.vue'

import Router from '@/application/router'
import './presentation/styles/index.css'
import { loadCities } from '@/infra/store/cities'
import { useTelegram } from '@/application/services'
import { getCSSVariable } from './infra/utils/dom'
import { darkenColor } from './infra/utils/color'

/**
 * @todo async lottie-player loading
 * @todo preload all icons
 * @todo describe thumbnail generation and work
 * @todo describe next/main buttons simulation
 * @todo close confirmation
 * @todo cancel payment toast
 */

const { platform, ready, showAlert } = useTelegram()



if (platform !== 'unknown') {
  switch (platform) {
    case 'android':
    case 'android_x':
    case 'web':
    case 'weba':
    case 'tdesktop':
      document.body.classList.add('is-material')
      break
    case 'ios':
    skd

    case 'macos':



    
      document.body.classList.add('is-apple')
      break
    default:
      document.body.classList.add(`is-${platform}`)
      break
  }
}



document.body.classList.add(`is-exact-${platform}`)

function handleBrokenVariables(): void {
  const themeBgColor = getCSSVariable('--tg-theme-bg-color')
  const themeSecondaryBgColor = getCSSVariable('--tg-theme-secondary-bg-color')

  if (themeBgColor === '#000000' && themeSecondaryBgColor !== '#000000') {
    document.documentElement.style.setProperty('--tg-theme-bg-color', themeSecondaryBgColor ?? '')
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', themeBgColor ?? '')

    return
  }

  /**
   * Workaround problem with iOS Dark Dimmed theme. Manually make secondary bg color darker
   */
  if (themeBgColor === themeSecondaryBgColor && themeBgColor !== undefined) {
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', darkenColor(themeBgColor, 2.3))
  }
}

/**
 * Prepare app data
 *
 * @todo load icons
 * @todo prepare image thumbs
 */
void loadCities()
  .then(() => {
    const app = createApp(App)

    app.use(Router)
    app.mount('#app')

    requestAnimationFrame(() => {
      if (platform === 'ios') {
        handleBrokenVariables()
      }

      ready()
    })
  })
