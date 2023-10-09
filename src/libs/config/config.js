// variables.js
export const URL_LOCAL = process.env.NODE_ENV === 'production'
    ? 'https://crmred.co/'
    : 'http://127.0.0.1:8000/';

export const ROLES_ADMIN = "administrator";
export const ROLES_AGENTE = "agente_elite";
export const ROLES_EMPRESA = "agente_inmobiliario";
export const ROLES_VISITANTE = "visitantes";
export const ROLES_INMOBILIARIA = "inmobiliaria";

export const settings = {
  some: 'Settings'
}

