<template>
<el-card class="register-card">
  <div slot="header" class="clearfix">
    <span class="register-title">Register</span>
  </div>
  
  <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="180px">
    <!-- Name -->
    <el-form-item label="Name" prop="name">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>

    <!-- Email -->
    <el-form-item label="Email" prop="email" :error="emailError">
      <el-input v-model="registerForm.email"></el-input>
    </el-form-item>

    <!-- Password -->
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="registerForm.password"></el-input>
    </el-form-item>

    <!-- Confirm Password -->
    <el-form-item label="Confirm Password" prop="passwordConfirmation">
      <el-input type="password" v-model="registerForm.passwordConfirmation"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :loading="isRequesting" type="primary" @click="submitForm('registerForm')">Register</el-button>
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
    const validatePasswordConfirmation = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('The password confirmation does not match.'))
      } else {
        callback()
      }
    }

    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },

      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
        ],

        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
        ],

        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ],

        passwordConfirmation: [
          { required: true, message: 'Please input confirm password', trigger: 'blur' },
          { validator: validatePasswordConfirmation, trigger: 'blur' }
        ]
      },

      message: ''
    }
  },

  computed: {
    ...mapGetters(['registerRequest']),

    status () { return this.registerRequest.status },
    error () { return this.registerRequest.error },

    isRequesting () { return this.status === REQUESTING },

    emailError () {
      return this.error && this.error.errors && this.error.errors['email'][0] || ''
    }
  },

  watch: {
    status (val, old) {
      if (old === REQUESTING && val === SUCCESS) {
        this.$confirm('Your account have been created successfully.', 'Success', {
          confirmButtonText: 'Goto Login Page',
          cancelButtonText: 'Cancel',
          type: 'success'
        }).then(() => {
          this.$router.replace('/login')
        }).catch(() => {})
      }
    },

    error (val) {
      if (val && val.status_code !== 422) { // should check undefied, because when send request, error value will be changed
        this.$notify.error({
          title: 'Register failed',
          message: val.message
        })
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          return false
        }
      })
    },

    register () {
      this.$store.dispatch('register', this.registerForm)
    },

    hasError (name) {
      return this.error && this.error.errors && this.error.errors[name]
    }
  }
}
</script>

<style lang="css" scoped>
.register-card {
  width: 50%;
  margin: 30px auto;
}

.register-title {
   font-size: 24px;
   font-weight: bold;
}
</style>
