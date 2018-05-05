<template>
<el-card class="login-card">
  <div slot="header" class="clearfix">
    <span class="login-title">Login</span>
  </div>
  
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="120px">
    <!-- Email -->
    <el-form-item label="Email" prop="email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>

    <!-- Password -->
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>

    <!-- Login Button -->
    <el-form-item>
      <el-button :loading="isRequesting" type="primary" @click="submitForm('loginForm')">Login</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { REQUEST_STATUS } from './../api/constants'

const { REQUESTING, SUCCESS } = REQUEST_STATUS

export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },

      rules: {
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
        ],

        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, message: 'Length must be larger than 6', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['loginRequest']),

    status () { return this.loginRequest.status },
    error () { return this.loginRequest.error },
    isRequesting () { return this.status === REQUESTING }
  },

  watch: {
    status (val, old) {
      if (old === REQUESTING && val === SUCCESS) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },

    error (val) {
      if (val && val.status_code !== 422) { // should check undefied, because when send request, error value will be changed
        this.$notify.error({
          title: 'Login failed',
          message: val.message
        })
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },

    login () {
      this.$store.dispatch('login', this.loginForm)
    },

    hasError (name) {
      return this.error && this.error.errors && this.error.errors[name]
    }
  }
}
</script>

<style lang="css" scoped>
.login-card {
  width: 50%;
  margin: 30px auto;
}

.login-title {
   font-size: 24px;
   font-weight: bold;
}
</style>
