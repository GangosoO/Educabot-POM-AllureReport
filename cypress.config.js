const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);   // Allure plugin configuration
      return config;
    },
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    
    env: {
        endpoint:{
          home: "/inventory.html",
          homePage: "https://www.saucedemo.com/",
          yourCart: "/cart.html",
          checkout: "/checkout-step-one.html",
          checkoutStepTwo: "/checkout-step-two.html",
          completeHeader: "/checkout-complete.html",
        },
      },
    watchForFileChanges: false,
    chromeWebSecurity: false,
},
})
