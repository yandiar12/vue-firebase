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
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped></style>
