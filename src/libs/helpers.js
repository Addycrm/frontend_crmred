const HELPERS = {
    URL_API: process.env.NODE_ENV === 'production'
        ? 'https://admin.homiup.com'
        : 'http://127.0.0.1:8000',

    MIX_METROCUADRADO: "metro_cuadrado",
    MIX_CLASIFICADO_PAIS: "clasificados_el_pais",
    MIX_MERCADOLIBRE: "mercado_libre",
    MIX_FINCARRAIZ: "fincaraiz",
    MIX_PROPPIT: "proppit",

    MIX_API_GOOGLE_KEY_MAP: "",
    MIX_CLIENT_ID_GOOGE_CALENDAR: "",
    MIX_API_KEY_GOOGE_CALENDAR: "",

    isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    },
}

const imgValidateURL = img => {
    return img && img.indexOf('http') == -1 ?
        window.location.origin + '/storage/' + img :
        img;
}

const dataValidate = (value = null) => {
    return !([0, null, 'null', undefined].indexOf(value) != -1);
}

export { HELPERS, imgValidateURL, dataValidate }
