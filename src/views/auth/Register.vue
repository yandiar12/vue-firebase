<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col md="4" sm="6">
        <b-card>
          <h3 class="text-center">Sign up</h3>
          <b-alert v-show="message" show>{{ message }}</b-alert>
          <b-form>
            <b-form-group label="Email:" label-for="email">
              <b-form-input type="email" id="email" name="email" v-validate="'required|email'" v-model="form.email" :class="{ 'is-invalid': errors.has('email')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Name:" label-for="name">
              <b-form-input type="text" id="name" name="name" v-validate="'required'" v-model="form.name" :class="{ 'is-invalid': errors.has('name')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('name')">{{ errors.first('name') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password:" label-for="password">
              <b-form-input type="password" id="password" name="password" ref="password" v-validate="'required|min:6'" v-model="form.password" :class="{ 'is-invalid': errors.has('password')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Confirm Password:" label-for="re-password">
              <b-form-input type="password" id="re-password" name="re-password" v-validate="'required|min:6|confirmed:password'" data-vv-as="password" v-model="form.re_password" :class="{ 'is-invalid': errors.has('re-password')}" ></b-form-input>
              <b-form-invalid-feedback class="invalid-feedback" v-if="errors.has('re-password')">{{ errors.first('re-password') }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button block variant="primary" :disabled="loading" @click.prevent="submit">
              <b-spinner small v-show="loading"></b-spinner>
              Sign up
            </b-button>
            <br>
            <router-link tag="a" :to="{ name: 'login' }">Sign in</router-link>

          </b-form>
        </b-card>  
      </b-col>
    </b-row>
  </div>    
</template>

<script>
import AuthService from '../../services/AuthService'

export default {
  name: 'register',
  data() {
    return {
      message: undefined,
      loading: false,
      form: {
        email: '',
        name: '',
        password: '',
        re_password: ''
      }
    }
  },

  methods: {
    submit() {
      this.loading = true
      this.$validator.validate().then(valid => {
        if (valid) {
          // const data = {
          //   email: this.form.email,
          //   name: this.form.name,
          //   passwd: this.form.password
          // }

          AuthService.signUp(this.form.email, this.form.password).then(
            (res) => {
              res.user.updateProfile({
                displayName: this.form.name
              })
                .then(() => {})
              
              this.loading = false
              this.message = "User was successfully created!!"
            },
            error => {
              console.log(error)
              this.loading = false
              if (error.status == 500) {
                this.message = "Something went wrong!"
              } else {
                this.message = error.message
              }
            }
          )
        }
      })
    }
  },
}
</script>

<style>

</style>