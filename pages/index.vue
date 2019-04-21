<template>
  <div class="home">
    <header>
      <h1 class="title">Kerbside City</h1>
      <p class="subtitle">
        Kerbside pickup is currenly active in the following suburbs.
      </p>

      <div class="container">
        <a
          v-for="(item, index) in current"
          :key="index"
          class="subtitle"
          target="_blank"
          :href="
            'https://www.google.com/maps/search/?api=1&query=1200' +
              'brisbane' +
              item.suburb
          "
        >
          <span> {{ item.suburb }}</span>
        </a>
      </div>
    </header>
    <section class="search">
      <input
        v-model="search"
        class="search-input"
        placeholder="Search for suburb"
      />
      <div class="container">
        <a v-for="(item, index) in filtered" :key="index">
          {{ item.suburb }}
          <!-- <span>
            Kerbside pickup starts in {{ item.suburb }} on {{ item.start }}
          </span> -->
        </a>
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  header {
    padding: 50px 20px;
    width: 100%;
    background-color: $third;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
        BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
      margin: 0 0 30px;
      text-align: center;
      font-weight: 800;
      font-size: 22px;
      letter-spacing: 1px;
    }
  }
}
.container {
  display: flex;
  padding: 30px 0 0;
  justify-content: space-between;
  flex-wrap: wrap;
}

a {
  width: 100%;
  text-decoration: none;
  background-color: $secondary;
  color: $primary;
  display: flex;
  margin: 10px 0;
  justify-content: center;
  border-radius: 4px;
  padding: 20px;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  span {
    font-size: 20px;
  }
}
.search {
  padding: 50px 20px;
}

.search-input {
  margin: 0 auto;
  display: block;
  background-color: $forth;
  border: 0;
  padding: 20px 50px;
  color: $secondary;
  text-align: center;
}

::placeholder {
  color: $secondary;
  opacity: 0.7;
}

.subtitle {
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  padding-bottom: 15px;
}
</style>
