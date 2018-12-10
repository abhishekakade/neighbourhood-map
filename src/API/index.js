class Helper {

  static baseURL() {
    return "https://api.foursquare.com/v2";
  }

  static auth() {
    const keys = {
      client_id: "DGGKFI2V0SUIW2GWWAEUKAG3ZTCFZ01DJVAM5XUHNLRV52XD",
      client_secret: "54CTWF2RYBH2VAORHV0L1UGPPLASCTTYUQ5XY1QNDIX5JPDJ",
      v: "20180929"
    };

    return Object.keys(keys)
    .map(key => `${key}=${keys[key]}`)
    .join("&");
  }

  static urlBuilder(urlPrams) {
    if(!urlPrams) {
      return "";
    }

    else {
      return (Object.keys(urlPrams).map(key => `${key} = ${urlPrams[key]}`).join("&"));
    }
  }

  static headers() {
    return {
      Accept: "application/json"
    };
  }

  static simpleFetch(endPoint, method, urlPrams) {
    let requestData = {
      method, 
      headers: Helper.headers()
    };

    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`, 
      requestData)
      .then(res => res.json())
      .catch(err => console.error(err));
  }
} 

// console.log(urlPrams);

export default class SquareAPI {
  static search(urlPrams) {
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }

  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}

// client_id: "X3NEVOBHAVHXFCCZ1NFKLQKLUY0CKGE4SH44JDRXBLH15EP4",
// client_secret: "SJWQRFTFA2GIGGJH4PWYVRUHSKBVCCKNRE3DWZZXY1CBFDZZ",