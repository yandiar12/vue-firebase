<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">VUE-FIRE</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Tutorials</b-nav-item>
          <b-nav-item to="/add">Add Tutorial</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <template v-if="!getUser.loggedIn">
            <b-nav-item to="/login" right>Login</b-nav-item>
            <b-nav-item to="/register" right>Register</b-nav-item>  
          </template>
          
          <b-nav-item-dropdown v-if="getUser.loggedIn" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ getUser.data.displayName }}
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="onSignOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container>
      <b-col class="mt-3">
        <router-view/>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthService from '../services/AuthService'
import { storageData } from '../services/StorageService'

export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('auth', [
        'user'
      ]
    ),
    getUser() {
      return this.user
    }
  },
  methods: {
    onSignOut: async function() {
      await AuthService.signOut().then(() => {
        storageData.removeAuthData()
        this.$router.push('/login')
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
