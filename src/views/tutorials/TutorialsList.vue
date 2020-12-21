<template>
  <b-row>
    <b-col cols="md-6">
      <h4>Tutorial List</h4>
      <b-list-group>
        <b-list-group-item
          :class="{active: index == currentIndex}"
          v-for="(tutorial, index) in tutorials" :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >  {{ tutorial.title }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col cols="md-6">
      <div v-if="currentTutorial">
        <tutorial-details :tutorial="currentTutorial" @refreshList="refreshList" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import TutorialService from '../../services/TutorialService'
import TutorialDetails from './TutorialDetails'

export default {
  name: 'tutorial-list',
  components: { TutorialDetails },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      unsubscribe: null
    }
  },
  methods: {
    onDataChange(items) {
      let _tutorials = []

      items.forEach((item) => {
        let id = item.id
        let data = item.data()
        _tutorials.push({
          id: id,
          title: data.title,
          description: data.description,
          published: data.published
        })
      });

      this.tutorials = _tutorials
    },
    refreshList() {
      this.currentTutorial = null
      this.currentIndex = -1
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial
      this.currentIndex = index
    }
  },
  mounted() {
    this.unsubscribe = TutorialService.getAll().orderBy('title', 'asc').onSnapshot(this.onDataChange)
  }, 
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>

<style lang="scss" scoped>

</style>