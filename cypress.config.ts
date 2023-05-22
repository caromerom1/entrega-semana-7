import { defineConfig } from "cypress";

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  env: {
    ghostUrl: "http://localhost:2368",
    apiKey: "a418e7a0",
  },
});
