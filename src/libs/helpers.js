const HELPERS = {
  URL_API: process.env.NODE_ENV === 'production'
  ? 'https://crmred.co/'
  : 'http://127.0.0.1:8000/',

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

const imgValidateURL = img =>{
  return img && img.indexOf('http') == -1 ?
    window.location.origin +'/storage/'+ img :
    img;
}

const dataValidate = (value = null) => {
  return !([0, null, 'null', undefined].indexOf(value) != -1);
}

export {HELPERS, imgValidateURL, dataValidate}
