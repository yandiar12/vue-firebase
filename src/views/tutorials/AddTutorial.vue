<template>
  <div>
    <b-alert v-show="message" show
      ><h6>{{ message }}</h6></b-alert
    >

    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-col cols="6">
          <b-form-group
            id="title"
            description="Title for Tutorial"
            label="Title"
            label-for="title"
          >
            <b-form-input id="title" v-model="tutorial.title"></b-form-input>
          </b-form-group>

          <b-form-group
            id="description"
            description="Description for Tutorial"
            label="Description"
            label-for="description"
          >
            <b-form-input id="description" v-model="tutorial.description"></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button variant="success" @click="saveTutorial">
              <b-spinner label="Loading..." v-show="loading"></b-spinner>
              Submit
            </b-button>
            <b-button variant="primary" @click="newTutorial" class="pull-right">
              New
            </b-button>
          </b-form-group>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TutorialService from '../../services/TutorialService'

export default {
  name: 'add-tutorial',
  data() {
    return {
      tutorial: {
        title: '',
        description: '',
        published: false
      },
      loading: false,
      message: undefined
    }
  },
  methods: {
    newTutorial() {
      this.loading = false
      this.message = undefined
      this.tutorial = {
        title: '',
        description: '',
        published: false
      }
    },

    saveTutorial() {
      this.loading = true
      let data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        published: false
      }

      TutorialService.create(data)
        .then((snapshot) => {
          console.log('Create new Tutorial successfully!  ', snapshot)
          this.loading = false
          this.message = 'Create new Tutorial successfully!'
        })
        .catch(e => {
          console.log(e)
          this.loading = false
          this.message = 'Something went wrong!!'
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
