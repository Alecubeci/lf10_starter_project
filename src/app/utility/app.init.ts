import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) : () => Promise<boolean>{
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.szut.dev/auth',
        realm: 'szut',
        clientId: 'employee-management-service-frontend'
      },
      initOptions : {
        checkLoginIframeInterval: 25,
        checkLoginIframe: false, //Disable to prevent cookies beeing seen as third party tracking cookies
        pkceMethod: 'S256',
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
