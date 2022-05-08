const { createApp } = Vue

createApp({

  //variables
  data() {
    return {
      btnCollapse: {},
    }
  },

  //antes del render
  created() {
    console.log("created");
  },

  //despues del render
  mounted() {
    this.btnCollapse = document.getElementById("btnCollapse");
  },

  //metodos
  methods: {
    clickButton: (e) => {
      this.btnCollapse.getAttribute("aria-expanded") === "true" ?
      (btnCollapse.innerText = "Read less")
      : (btnCollapse.innerText = "Read more");
    }
  },

  computed: {
    consoleLog: () => {
      console.log("computed")
    }
  },

}).mount('#app')