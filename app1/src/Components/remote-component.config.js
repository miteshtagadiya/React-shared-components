/**
 * remote-component.config.js
 *
 * Dependencies for Remote Components
 */

module.exports = {
  resolve: {
    react: require("react"),
    ["@material-ui/core"]: require("@material-ui/core"),
    ["@material-ui/icons"]: require("@material-ui/icons"),
    ["@material-ui/core/Link"]: require("@material-ui/core/Link"),
    ["@material-ui/core/styles"]: require("@material-ui/core/styles"),
    ["@material-ui/core/Typography"]: require("@material-ui/core/Typography"),
    ["recharts"]: require("recharts")
  }
};
