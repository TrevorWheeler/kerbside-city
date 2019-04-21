<template>
  <div class="home">
    <section class="container">
      <div>
        <span class="subtitle">
          Kerbside pickup is currenly taking place in
        </span>
        <span
          v-for="(item, index) in current"
          :key="index"
          class="subtitle locations"
        >
          <a
            target="_blank"
            :href="
              'https://www.google.com/maps/search/?api=1&query=1200' +
                'brisbane' +
                item.suburb
            "
          >
            <span> {{ item.suburb }}</span
            ><span v-if="index + 1 < current.length">,</span
            ><span v-if="index + 1 === current.length">.</span>
          </a>
        </span>
      </div>

      <p class="search">Search for suburb</p>
      <input v-model="search" placeholder="search" />

      <div v-if="search.length > 3">
        <p v-for="(item, index) in filtered" :key="index">
          {{ item.suburb }} <br />
          <span>
            Kerbside pickup starts in {{ item.suburb }} on {{ item.start }}
          </span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      time: '',
      active: '',
      month: '',
      search: ''
    }
  },
  computed: {
    list() {
      return this.$store.getters.getList
    },
    current() {
      return this.$store.getters.getCurrent
    },
    filtered: function() {
      const self = this
      return this.list.filter(function(cust) {
        return cust.suburb.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
      })
    }
  },

  asyncData({ store }) {
    return store.getters.getList
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss">
.home {
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  a {
    text-decoration: none;
    color: black;
  }
}
.container {
  padding: 80px 30px 0;
}

span.locations {
  font-weight: 600;
}

.search {
  margin: 30px 0 0;
}

input {
  margin: 10px 0 20px;
}

.subtitle {
  font-weight: 400;
  font-size: 18px;

  padding-bottom: 15px;
}
</style>
