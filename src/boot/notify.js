import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

const notify = {
  instance: null,
  success (message) {
    this.instance = Notify.create({
      message: message === undefined ? 'Operation was successfully executed' : message,
      color: 'positive',
      badgeColor: 'positive',
      icon: 'check',
      timeout: 1000,
      position: 'bottom'
    })
  },
  fail (message) {
    this.instance = Notify.create({
      message: message === undefined ? 'Operation failed due to a technical error' : message,
      color: 'negative',
      badgeColor: 'negative',
      icon: 'error',
      timeout: 2000,
      position: 'bottom'
    })
  },
  close () {
    if(this.instance !== null) {
      this.instance()
    }
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */ { app }) => {
  // something to do
  app.config.globalProperties.$notify = notify
})

export { notify }
