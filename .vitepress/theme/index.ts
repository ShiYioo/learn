import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import LumNote from './LumNote.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp(context) {
    context.app.component('LumNote', LumNote)
  }
} satisfies Theme
