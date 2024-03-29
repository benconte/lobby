interface Options {
    headers: Object
}

export const urlParams: RequestInit = {
  headers: {
    Authorization: `Bearer ${process.env.YELPAPIKEY}`,
  },
  method: "GET",
}

export const YelpUrl: string =
  'https://api.yelp.com/v3/businesses/search?location=NYC&categories=hotels&open_now=true';

export const secondUrl:string = "https://api.yelp.com/v3/businesses/search?term=conrad&location=NYC&categories=hotels&open_now=true"


// export const LAYelpUrl: string =
//   'https://api.yelp.com/v3/businesses/search?term=hotel&location={LA}&limit=10';

// export const MIAMIYelpUrl: string =
//   'https://api.yelp.com/v3/businesses/search?term=hotel&location={MIAMI}&limit=0';