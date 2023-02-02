interface UrlOptions {
    headers: Object
}

export const urlOptions: UrlOptions = {
    headers: {
      Authorization: `Bearer ${process.env.YELPAPIKEY}`,
    },
};

export const YelpUrl: string =
  'https://api.yelp.com/v3/businesses/search?location=NYC&categories=hotels&open_now=true';

export const secondUrl:string = "https://api.yelp.com/v3/businesses/search?term=conrad&location=NYC&categories=hotels&open_now=true"


// export const LAYelpUrl: string =
//   'https://api.yelp.com/v3/businesses/search?term=hotel&location={LA}&limit=10';

// export const MIAMIYelpUrl: string =
//   'https://api.yelp.com/v3/businesses/search?term=hotel&location={MIAMI}&limit=0';