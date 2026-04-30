// Custom front-end behavior chargé après chat.js. Le code générique expose
// window.appendMessage(role, text) et window.AGENT_GREETING.
//
// Cas d'usage typique : injecter un greeting d'accueil avant que l'utilisateur
// n'ait écrit. Le `role` peut être "assistant", "user", ou "error".

window.appendMessage(
  "assistant",
  "[Premier message d'accueil de l'agent]"
);
