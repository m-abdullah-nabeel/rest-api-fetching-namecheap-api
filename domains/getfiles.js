var fs = require('fs');

var allTld = [
    "0db",
    "0z",
    "1",
    "1d",
    "1q",
    "247",
    "35",
    "3dom",
    "49",
    "4free",
    "4k",
    "4sale",
    "4you",
    "80proof",
    "8888",
    "8s",
    "abo",
    "aboutme",
    "ac",
    "aca",
    "academy",
    "accountant",
    "accountants",
    "actor",
    "addme",
    "adult",
    "advisor",
    "ae.org",
    "afam",
    "africa",
    "afz",
    "agency",
    "ags",
    "agua",
    "ahoy",
    "ai",
    "airforce",
    "aj",
    "albums",
    "alto",
    "amg",
    "amor",
    "annex",
    "aotearoa",
    "apartment",
    "apartments",
    "api",
    "app",
    "arbitrator",
    "architect",
    "army",
    "art",
    "artesanal",
    "articles",
    "artificial",
    "asia",
    "associates",
    "assurances",
    "atc",
    "ath",
    "attorney",
    "atwork",
    "auction",
    "audio",
    "augmented",
    "auto",
    "autos",
    "b2b",
    "baas",
    "baby",
    "badly",
    "bakes",
    "band",
    "bar",
    "bargains",
    "batch",
    "beach",
    "beauty",
    "beef",
    "beer",
    "bem",
    "best",
    "bid",
    "bike",
    "bingo",
    "bio",
    "biometric",
    "bitcoinfund",
    "biz",
    "bizdata",
    "bizdev",
    "black",
    "blackfriday",
    "blockchaindapps",
    "blog",
    "blogging",
    "blue",
    "bmp",
    "boats",
    "bob",
    "bond",
    "booked",
    "boredapes",
    "boston",
    "boutique",
    "bqw",
    "br.com",
    "brand",
    "brewery",
    "brokers",
    "btk9",
    "btt",
    "buddhist",
    "build",
    "builders",
    "business",
    "buyaflat",
    "buzz",
    "byn",
    "bz",
    "c",
    "c0m",
    "c4",
    "ca",
    "cab",
    "cabins",
    "cafe",
    "cam",
    "camera",
    "camp",
    "capital",
    "car",
    "cardcollector",
    "cards",
    "care",
    "careers",
    "cares",
    "cars",
    "cash",
    "casino",
    "catering",
    "catgirl",
    "causes",
    "cc",
    "center",
    "ceo",
    "cerrajero",
    "cfd",
    "ch",
    "chat",
    "cheap",
    "cheddar",
    "christmas",
    "church",
    "cism",
    "cita",
    "citizenship",
    "city",
    "ckq",
    "claims",
    "clc",
    "cleaning",
    "clic",
    "click",
    "client",
    "clients",
    "clinic",
    "cliq",
    "clothing",
    "cloud",
    "cloudbot",
    "club",
    "cm",
    "cm3",
    "cn",
    "cn.com",
    "cn3",
    "co",
    "co.bz",
    "co.com",
    "co.in",
    "co.uk",
    "co3",
    "coach",
    "codes",
    "codeschool",
    "coffee",
    "coffees",
    "coinnet",
    "college",
    "com",
    "com.au",
    "com.cn",
    "com.co",
    "com.de",
    "com.es",
    "com.mx",
    "com.pe",
    "com.ph",
    "com.se",
    "com.sg",
    "com.vc",
    "comic",
    "comics",
    "commerce",
    "communion",
    "community",
    "company",
    "complete",
    "computer",
    "computers",
    "concise",
    "condos",
    "conduct",
    "conductor",
    "conf",
    "connectors",
    "connoisseur",
    "construction",
    "consultancy",
    "consulting",
    "contact",
    "contractors",
    "cool",
    "cork",
    "corporation",
    "coupons",
    "courses",
    "crazy",
    "creations",
    "creativity",
    "creator",
    "credit",
    "creditcard",
    "crew",
    "cricket",
    "croatia",
    "cruises",
    "cryp",
    "cryptobets",
    "cryptogamer",
    "cryptoservice",
    "cx",
    "cycle",
    "cymru",
    "cyou",
    "cyprus",
    "d5",
    "d8",
    "dais",
    "damn",
    "dan",
    "dance",
    "datamining",
    "date",
    "dating",
    "day",
    "daytrade",
    "dco",
    "de",
    "de.com",
    "de3",
    "deals",
    "dean",
    "debtless",
    "decent",
    "defi",
    "deficit",
    "degen",
    "degree",
    "delivery",
    "democrat",
    "den",
    "dental",
    "dentist",
    "design",
    "detour",
    "dev",
    "development",
    "dg",
    "dh",
    "diamonds",
    "dids",
    "diet",
    "digital",
    "digitalasset",
    "dilate",
    "direct",
    "directive",
    "directory",
    "discount",
    "discounts",
    "discussion",
    "diva",
    "dlt",
    "dly",
    "doctor",
    "dog",
    "doge",
    "dogecoin",
    "dojo",
    "dolls",
    "doma",
    "domains",
    "dookie",
    "douchebag",
    "down",
    "download",
    "downloads",
    "ducktape",
    "duration",
    "dvd",
    "dweb",
    "dweb3",
    "dy",
    "earth",
    "eathere",
    "eco",
    "economics",
    "economy",
    "edm",
    "education",
    "egame",
    "elect",
    "electronics",
    "elite",
    "email",
    "emj",
    "energy",
    "engaged",
    "engineer",
    "engineering",
    "enterprises",
    "ep",
    "eporn",
    "equipment",
    "ero",
    "es",
    "estate",
    "estates",
    "eternity",
    "etickets",
    "eu",
    "eu.com",
    "event",
    "events",
    "ewallet",
    "ewx",
    "example36",
    "exchange",
    "executive",
    "expert",
    "exposed",
    "express",
    "ext",
    "exu",
    "eyecare",
    "ez",
    "fail",
    "faith",
    "fak",
    "fam",
    "family",
    "fans",
    "faqs",
    "farm",
    "fcb",
    "fd",
    "fe",
    "feedback",
    "feeling",
    "fej",
    "fellowship",
    "ffa",
    "fgz",
    "fia",
    "fiat2btc",
    "fiji",
    "film",
    "filters",
    "finance",
    "financial",
    "financialnews",
    "findme",
    "firstname",
    "fish",
    "fitness",
    "fl3x",
    "flap",
    "flat",
    "flights",
    "florist",
    "flowers",
    "fm",
    "fmw",
    "follow",
    "foot",
    "football",
    "forall",
    "fore",
    "forsale",
    "forum",
    "foundation",
    "fr",
    "fua",
    "fun",
    "fund",
    "fundraising",
    "furniture",
    "futbol",
    "fw",
    "fwd",
    "fyi",
    "gad",
    "gadget",
    "gallery",
    "game",
    "games",
    "gay",
    "gb.net",
    "gdl",
    "gdn",
    "ger",
    "gethigh",
    "getreal",
    "getwell",
    "gg",
    "gic",
    "gift",
    "gifts",
    "gin",
    "gives",
    "glass",
    "global",
    "gmbh",
    "gofor",
    "gold",
    "golf",
    "gonow",
    "goth",
    "gr.com",
    "grandmaster",
    "graphics",
    "gratis",
    "greatoffers",
    "green",
    "gripe",
    "group",
    "grow",
    "gruppen",
    "guey",
    "guidance",
    "guide",
    "guitars",
    "guru",
    "guz",
    "gvz",
    "gyc",
    "gzp",
    "hack",
    "hackathon",
    "hae",
    "hair",
    "haiti",
    "hardrive",
    "haus",
    "hb",
    "health",
    "healthcare",
    "heh",
    "help",
    "helpdesk",
    "hem",
    "hermanos",
    "hf",
    "hgo",
    "hill",
    "hiphop",
    "hire",
    "hiv",
    "hockey",
    "hodlr",
    "holding",
    "holdings",
    "holiday",
    "holidayrental",
    "holidays",
    "homes",
    "horny",
    "host",
    "hosting",
    "hotelguide",
    "house",
    "hpp",
    "hsu",
    "hu.net",
    "hx",
    "i1",
    "ib",
    "ibn",
    "icu",
    "id",
    "ieh",
    "ifv",
    "ih",
    "ik",
    "ill",
    "iloveu",
    "immo",
    "immobilien",
    "in",
    "in.net",
    "inc",
    "income",
    "industries",
    "influencer",
    "info",
    "information",
    "inh",
    "ink",
    "innovator",
    "institute",
    "insure",
    "international",
    "intro",
    "investments",
    "iny",
    "io",
    "ioi",
    "ioo",
    "irish",
    "is",
    "island",
    "ism",
    "isthefuture",
    "iuh",
    "iurl",
    "iw",
    "ize",
    "ja",
    "jao",
    "jeh",
    "jetzt",
    "jewelry",
    "jf",
    "job",
    "jok",
    "joker",
    "jov",
    "jp.net",
    "jpgs",
    "jpn.com",
    "js",
    "jub",
    "juegos",
    "jugar",
    "jun",
    "jy",
    "kaufen",
    "kcx",
    "kennel",
    "kf",
    "kicks",
    "kim",
    "kinetic",
    "kitchen",
    "kiwi",
    "kj",
    "kl",
    "knight",
    "knowledge",
    "kq",
    "krd",
    "ks",
    "kv",
    "kyoto",
    "l33t",
    "la",
    "land",
    "lars",
    "lat",
    "lausanne",
    "law",
    "lawexpert",
    "lawoffice",
    "lawyer",
    "lean",
    "lease",
    "legal",
    "lgbt",
    "li",
    "life",
    "lighting",
    "likeapro",
    "limited",
    "limo",
    "lingo",
    "link",
    "live",
    "livestreaming",
    "ljb",
    "llc",
    "lli",
    "lnx",
    "lo",
    "loan",
    "loans",
    "logo",
    "lol",
    "london",
    "lord",
    "lov",
    "love",
    "lovesyou",
    "ltd",
    "luxury",
    "lw",
    "lyf",
    "lz",
    "maestro",
    "magazine",
    "maison",
    "makeup",
    "management",
    "mansion",
    "market",
    "marketing",
    "mba",
    "me",
    "me.uk",
    "media",
    "mediator",
    "medico",
    "mee",
    "melbourne",
    "memorial",
    "men",
    "ment",
    "menu",
    "mex.com",
    "miami",
    "mined",
    "mission",
    "mke",
    "moar",
    "mobi",
    "moda",
    "moe",
    "mom",
    "money",
    "monster",
    "montage",
    "mooning",
    "mortgage",
    "motherboard",
    "motorcycles",
    "movie",
    "mtl",
    "mvo",
    "mx",
    "mycard",
    "myco",
    "myo",
    "myproxy",
    "myurl",
    "nagoya",
    "nah",
    "name",
    "napavalley",
    "navy",
    "nearme",
    "nerdy",
    "net",
    "net.au",
    "net.cn",
    "net.pe",
    "net.ph",
    "net.vc",
    "network",
    "new",
    "news",
    "nftcartel",
    "nfts",
    "nil",
    "ninja",
    "nl",
    "nom",
    "nom.es",
    "nom.pe",
    "notes",
    "nouns",
    "npm",
    "nu",
    "nuk",
    "numb",
    "nxs",
    "nyc",
    "ob",
    "observer",
    "od",
    "oda",
    "oflinewallet",
    "often",
    "oh",
    "ohmy",
    "oin",
    "okinawa",
    "oncam",
    "one",
    "onewallet",
    "onl",
    "online",
    "onlinenews",
    "oo",
    "oof",
    "oot",
    "optimize",
    "oq",
    "orb",
    "org",
    "org.au",
    "org.cn",
    "org.es",
    "org.mx",
    "org.pe",
    "org.ph",
    "org.uk",
    "org.vc",
    "osaka",
    "oslo",
    "ot",
    "oun",
    "owbo",
    "p",
    "page",
    "paid",
    "pal",
    "partners",
    "parts",
    "party",
    "pe",
    "performer",
    "pest",
    "pgp",
    "ph",
    "photo",
    "photography",
    "photos",
    "pics",
    "picture",
    "pictures",
    "pier",
    "pink",
    "pix",
    "piz",
    "pizza",
    "place",
    "places",
    "plaza",
    "plumbing",
    "plus",
    "ply",
    "poj",
    "poker",
    "porn",
    "ppp",
    "praha",
    "premio",
    "premium",
    "press",
    "prices",
    "pro",
    "prodazha",
    "productions",
    "profiles",
    "project",
    "properties",
    "property",
    "protection",
    "pub",
    "pui",
    "pun",
    "pv",
    "pw",
    "pz",
    "qd",
    "qf",
    "qg",
    "qh",
    "qk",
    "qn",
    "qo",
    "queens",
    "quest",
    "qum",
    "qy",
    "racing",
    "realty",
    "recipes",
    "red",
    "rehab",
    "reise",
    "reisen",
    "reit",
    "rekt",
    "rent",
    "rentals",
    "repair",
    "report",
    "republican",
    "researcher",
    "resources",
    "rest",
    "restaurant",
    "review",
    "reviews",
    "rh",
    "rican",
    "rich",
    "rip",
    "rl",
    "rn",
    "rocks",
    "rogan",
    "row",
    "rpgs",
    "ru.com",
    "rumor",
    "run",
    "runs",
    "rural",
    "russo",
    "ryukyu",
    "rz",
    "sa.com",
    "saas",
    "sale",
    "sales",
    "sarl",
    "sats",
    "say",
    "sbs",
    "school",
    "schule",
    "science",
    "sds",
    "se.net",
    "secrets",
    "security",
    "semi",
    "services",
    "sex",
    "sexblog",
    "sexy",
    "sg",
    "sh",
    "sharing",
    "shiksha",
    "shizzle",
    "shoes",
    "shop",
    "shopping",
    "shoppingcart",
    "shortcut",
    "shot",
    "show",
    "sig",
    "simp",
    "simplicity",
    "singles",
    "site",
    "skin",
    "sniff",
    "so",
    "soccer",
    "social",
    "software",
    "solar",
    "solution",
    "solutions",
    "sos",
    "southafrican",
    "sox",
    "spac",
    "space",
    "specs",
    "squirtfiesta",
    "src",
    "ssl",
    "startup",
    "storage",
    "store",
    "stream",
    "streamer",
    "studio",
    "study",
    "style",
    "substack",
    "sucks",
    "supplies",
    "supply",
    "support",
    "supreme",
    "surgery",
    "sus",
    "swapz",
    "sydney",
    "systems",
    "tattoo",
    "tax",
    "taxfree",
    "taxi",
    "team",
    "tech",
    "techblog",
    "technology",
    "teck",
    "teenager",
    "teepee",
    "tefi",
    "tel",
    "tennis",
    "ter",
    "theater",
    "theatre",
    "thenerd",
    "tickets",
    "tienda",
    "tips",
    "tires",
    "tni",
    "to",
    "today",
    "token",
    "tokyo",
    "tools",
    "top",
    "tours",
    "town",
    "toys",
    "trade",
    "trader",
    "training",
    "trans",
    "travel",
    "trekking",
    "tricks",
    "troll",
    "tube",
    "tuber",
    "turtles",
    "tutorial",
    "tv",
    "tx",
    "u2",
    "ud",
    "ue",
    "uf",
    "uge",
    "uk",
    "uk.com",
    "uk.net",
    "uk3",
    "ultimate",
    "umo",
    "underground",
    "underworld",
    "unit",
    "universe",
    "university",
    "unlock",
    "uno",
    "us",
    "us.com",
    "us.org",
    "us3",
    "use",
    "uui",
    "uzr",
    "vacations",
    "valley",
    "vc",
    "vegas",
    "ventures",
    "vet",
    "viajes",
    "video",
    "viewer",
    "villas",
    "vin",
    "vip",
    "vision",
    "visit",
    "vj",
    "vlog",
    "voice",
    "vote",
    "voto",
    "voyage",
    "vq"
]

var special_tld = [
    "com",	
    "org",
    "net",
    "de",	
    "ru",	
    "uk",	
    "es",	
    "fr",
    "ca",
    "in",		
    "nl",
    "cloud",
    "ch",	
    "info",
    "biz",
    "online",
    "co",
    "io",
    "me",
    "us",
    "blog"
]

all_tldomains = []
for (let i = 0; i < allTld.length; i+= 20) {
    const chunk = allTld.slice(i, i + 20);
    // console.log(chunk)
    all_tldomains.push(chunk)
}

// console.log(all_tldomains)

let jsonVal = {}
jsonVal[`priority_${0}`] = special_tld
all_tldomains.map((row, index)=> {
    jsonVal[`priority_${index+1}`] = row
})

console.log(jsonVal)

fs.writeFile('domains/tld_priority_list.json', JSON.stringify(jsonVal), 'utf8', function (err) {
    console.error(err);
});
