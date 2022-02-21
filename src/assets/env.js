(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "http://localhost:8080";
  window["env"]["keycloakUrl"] = "http://localhost:8180/auth";
  window["env"]["keycloakRealm"] = "easyteach-keycloack";
  window["env"]["keycloakClient"] = "easyteach-front-client"

})(this);
