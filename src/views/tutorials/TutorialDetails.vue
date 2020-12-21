<template>
  <div v-if="currentTutorial">
    <b-alert v-show="message" show><h6>{{ message }}</h6></b-alert>

    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-col cols="6">
          <b-form-group
            id="title"
            description="Title for Tutorial"
            label="Title"
            label-for="title"
          >
            <b-form-input id="title" v-model="currentTutorial.title"></b-form-input>
          </b-form-group>

          <b-form-group
            id="description"
            description="Description for Tutorial"
            label="Description"
            label-for="description"
          >
            <b-form-input id="description" v-model="currentTutorial.description"></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button-group>
              <b-button v-if="currentTutorial.published" @click="updatePublished(false)" variant="primary">
                UnPublish
              </b-button>
              <b-button v-else @click="updatePublished(true)" variant="primary">
                Publish
              </b-button>

              <b-button variant="success" @click="updateTutorial">
                Update
              </b-button>

              <b-button variant="danger" @click="deleteTutorial">
                Delete
              </b-button>
            </b-button-group>
          </b-form-group>
        </b-col>
      </b-col>
    </b-row>
  </div>

  <div v-else>
    <br />
    <b-alert show><h6>Please click on a Tutorial...</h6></b-alert>
  </div>
</template>

<script>
import TutorialService from '../../services/TutorialService'

export default {
  name: 'tutorial-details',
  props: ['tutorial'],
  data() {
    return {
      currentTutorial: null,
      message: ''
    }
  },
  watch: {
    tutorial: function(tutorial) {
      this.currentTutorial = { ...tutorial },
      this.message = ''
    }
  },
  methods: {
    updatePublished(status) {
      TutorialService.update(this.currentTutorial.id, {
        published: status
      })
        .then(() => {
          this.currentTutorial.published = status
          this.message = 'The status was updated successfully!'
        }).catch(e => {
          console.log(e)
          this.message = 'Something went wrong when updating data!'
        })
    },
    updateTutorial() {
      let data  = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description
      }

      TutorialService.update(this.currentTutorial.id, data)
        .then(() => {
          this.message = 'The Tutorial was updated successfully!'
        }).catch(e => {
          console.log(e)
          this.message = 'Something went wrong when updating data!'
        })
    },
    deleteTutorial() {
      TutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.$emit('refreshList')
        })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    this.message = "";
    this.currentTutorial = { ...this.tutorial }
  }
}
</script>

<style lang="scss" scoped>

</style>