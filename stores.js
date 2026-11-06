/* Stores are rendered in this order: country → city → shop.
   `country` must match a key in COUNTRIES (script.js). */
const STORES = [
  {
    country: "de",
    city: "München",
    address: "Westenriederstr 8, 80331 München",
    streetAddress: "Westenriederstr 8",
    postalCode: "80331",
    addressLocality: "München",
    mapsUrl: "https://maps.app.goo.gl/syxYQxwsaHK114BRA"
  },
  {
    country: "de",
    city: "München",
    address: "Paul-Heyse-Straße 23, 80336 München",
    streetAddress: "Paul-Heyse-Straße 23",
    postalCode: "80336",
    addressLocality: "München",
    mapsUrl: "https://maps.app.goo.gl/YHYa54KA5GF26FxX8"
  },
  {
    country: "de",
    city: "Berlin",
    address: "Kurfürstendamm 60, 10707 Berlin",
    streetAddress: "Kurfürstendamm 60",
    postalCode: "10707",
    addressLocality: "Berlin",
    mapsUrl: "https://maps.app.goo.gl/BwWGVc2skENUwdCn8"
  },
  {
    country: "de",
    city: "Berlin",
    address: "Kastanienallee 29–30, 10435 Berlin",
    streetAddress: "Kastanienallee 29–30",
    postalCode: "10435",
    addressLocality: "Berlin",
    mapsUrl: "https://maps.app.goo.gl/xaaMATMQQk1kThLr6"
  },
  {
    country: "de",
    city: "Berlin",
    address: "Kastanienallee 14, 12627 Berlin",
    streetAddress: "Kastanienallee 14",
    postalCode: "12627",
    addressLocality: "Berlin",
    mapsUrl: "https://maps.app.goo.gl/2uerGpZXW3XJo4SF9"
  },
  {
    country: "de",
    city: "Berlin",
    address: "U-Bahnhof Turmstraße, 10551 Berlin",
    streetAddress: "U-Bahnhof Turmstraße",
    postalCode: "10551",
    addressLocality: "Berlin",
    mapsUrl: "https://maps.app.goo.gl/7SxjN89qVKwPL74Q9"
  },
  {
    country: "de",
    city: "Hamburg",
    address: "Dehnhaide 58, 22081 Hamburg",
    streetAddress: "Dehnhaide 58",
    postalCode: "22081",
    addressLocality: "Hamburg",
    mapsUrl: "https://maps.app.goo.gl/SUDriMajhFQd6Qa27"
  },
  {
    country: "de",
    city: "Hamburg",
    address: "Am Kaiserkai 30, 20457 Hamburg",
    streetAddress: "Am Kaiserkai 30",
    postalCode: "20457",
    addressLocality: "Hamburg",
    mapsUrl: "https://maps.app.goo.gl/X3KqGRsFwr5dHo6b7"
  },
  {
    country: "de",
    city: "Frankfurt am Main",
    address: "Klingerstraße 9, 60313 Frankfurt am Main",
    streetAddress: "Klingerstraße 9",
    postalCode: "60313",
    addressLocality: "Frankfurt am Main",
    mapsUrl: "https://maps.app.goo.gl/THouD3pkDGHCTt6s7"
  },
  {
    country: "cz",
    city: "Prague",
    address: "Štěpánská 540/7, 120 00 Nové Město",
    streetAddress: "Štěpánská 540/7",
    postalCode: "120 00",
    addressLocality: "Praha",
    mapsUrl: "https://maps.app.goo.gl/mZ13M8A1fHgXm5DX7"
  },
  {
    country: "cz",
    city: "Prague",
    address: "Na Žertvách 560/25, 180 00 Praha 8-Libeň",
    streetAddress: "Na Žertvách 560/25",
    postalCode: "180 00",
    addressLocality: "Praha",
    mapsUrl: "https://maps.app.goo.gl/4Hbju2WaVAfykwM49"
  }
];
