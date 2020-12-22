<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="4" sm="6">
        <b-card>
          <h3 class="text-center">Sign in</h3>
          <b-form>
            <b-alert v-show="message" show variant="danger">{{ message }}</b-alert>
            <b-form-group label="Email:" label-for="email">
              <b-form-input type="email" id="email" name="email" v-validate="'required|email'" v-model="form.email" :class="{ 'is-invalid': errors.has('email')}" @keyup.enter="onLogin($event)"></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
              <b-form-input type="password" id="password" name="password" v-validate="'required'" v-model="form.password" :class="{ 'is-invalid': errors.has('password')}" @keyup.enter="onLogin($event)"></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button block variant="primary" @click="onLogin($event)" :disabled="loading">
              <b-spinner small v-show="loading"></b-spinner>
              Sign in
            </b-button>
            <br>
            <router-link tag="a" :to="{ name: 'register' }">Register User</router-link>

          </b-form>
        </b-card>  
      </b-col>
    </b-row>
  </div>    
</template>

<script>
import AuthService from '../../services/AuthService'
import { storageData } from '../../services/StorageService'
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      message: undefined,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    
  },
  methods: {

    onLogin: function(e) {
      e.preventDefault();
      
      this.loading = true
      this.$validator.validate().then(valid => {
          if (valid) {
            AuthService.signIn(this.form.email, this.form.password).then(
              (res) => {
                if (res) {
                  storageData.saveAuthData(res.user)
                  this.$router.push('/')
                } else {
                  console.log(res)
                }
                this.loading = false

                return Promise.resolve()
              },
              error => {
                console.log('Failed login ', error)
                this.message = error.message
                this.loading = false
                return Promise.reject()
              }
            )
          } else {
            this.loading = false
          }
      });
    }
  },
}
</script>

<style>

</style>