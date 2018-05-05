import Vue from 'vue'
import ErrorAlert from '@/components/ErrorAlert'

describe('ErrorAlert.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ErrorAlert)
    const vm = new Constructor({
      propsData: {
        error: {
          status_code: 404,
          message: 'Not found',
          errors: {
            name: ['Field name is required'],
            email: ['Email is invalid format']
          }
        }
      }
    }).$mount()

    expect(vm.$el.querySelector('.error-alert > p').textContent).to.equal('Not found')
    expect(vm.$el.querySelectorAll('.error-alert > ul > li')[0].innerText).to.equal('Field name is required')
    expect(vm.$el.querySelectorAll('.error-alert > ul > li')[1].innerText).to.equal('Email is invalid format')
  })
})
