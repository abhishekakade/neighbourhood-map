class Helper {

  static baseURL() {
    return "https://api.foursquare.com/v2";
  }

  static auth() {
    const keys = {
      // client_id: "DGGKFI2V0SUIW2GWWAEUKAG3ZTCFZ01DJVAM5XUHNLRV52XD",
      // client_secret: "54CTWF2RYBH2VAORHV0L1UGPPLASCTTYUQ5XY1QNDIX5JPDJ",
      client_id: "LUMR2H0LMIAUA32HFS0YSPMVFJAHST5LD32I5HNKI3I3MDQ3",
      client_secret: "WPSCEJAMHUXPSEQGTW2KEITVJ4KVLIMRKOZLQJ445B5JVTL0",
      v: "20181207"
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
      return (Object.keys(urlPrams).map(key => `${key} = ${urlPrams[key]}`).join("&").split(" ").join(""));
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
      .catch(err => {
        alert(`An error occurred while trying to fetch data from the server: ${err}`)
      });
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

