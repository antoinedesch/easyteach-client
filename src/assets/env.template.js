(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "${API_URL}"
  window["env"]["keycloakUrl"] = "${KEYCLOAK_URL}"
  window["env"]["keycloakRealm"] = "${KEYCLOAK_REALM}"
  window["env"]["keycloakClient"] = "${KEYCLOAK_CLIENT}"

})(this);
