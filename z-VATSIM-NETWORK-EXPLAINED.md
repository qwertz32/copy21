### Each network request simaware.ca is doing:

<img src="https://images2.imgbox.com/94/29/3vBvSjyq_o.png"/>

# Each one explained

(Search with <b>Ctrl+F</b>, <b>Cmd+F</b>)

## countries.json

```json
{
  "OA": {
    "name": "Afghanistan",
    "prefix": "OA",
    "radar": ""
  },
  "LA": {
    "name": "Albania",
    "prefix": "LA",
    "radar": "Control"
  },
  "DA": {
    "name": "Algeria",
    "prefix": "DA",
    "radar": ""
  },
  "FN": {
    "name": "Angola",
    "prefix": "FN",
    "radar": ""
  },
```

> Gives: **Country code**, **Country name**, **Country prefix**, **Country's radar hierarchy**  
> Usability: **_Low_**

## firs.json

```json
{
  "ADR": {
    "icao": "ADR",
    "name": "Adria Radar",
    "prefix": "",
    "fir": "ADR"
  },
  "ADR_W": {
    "icao": "ADR-W",
    "name": "Adria Radar (West)",
    "prefix": "ADR_W",
    "fir": "ADR-W"
  },
  "ADR-W": {
    "icao": "ADR-W",
    "name": "Adria Radar (West)",
    "prefix": "ADR_W",
    "fir": "ADR-W"
  },
  "ADR_E": {
    "icao": "ADR-E",
    "name": "Adria Radar (East)",
    "prefix": "ADR_E",
    "fir": "ADR-E"
  },
```

> Gives: **Country's radar atc name, prefix, icao and fir name**  
> Usability: **_Medium_**

## uirs.json

```json
{
  "ADR_U": {
    "prefix": "ADR_U",
    "name": "Adria Radar Upper",
    "firs": [
      "LJLA",
      "LDZO",
      "LQSB",
      "LYBA",
      "LWSS",
      "LAAA"
    ]
  },
  "AFRN": {
    "prefix": "AFRN",
    "name": "North Africa Control",
    "firs": [
      "DAAA",
      "DRRR",
      "DTTC",
      "FTTT",
      "GMMM",
      "HLLL"
    ]
  },
  "AFRC": {
    "prefix": "AFRC",
    "name": "Africa Central Control",
    "firs": [
      "FLFI",
      "FNAN",
      "FSSS",
      "FWLL",
      "FZZA",
      "HKNA",
      "HTDC",
      "HUEC"
    ]
  },
  "AFRE": {
    "prefix": "AFRE",
    "name": "East Africa Control",
    "firs": [
      "HAAA",
      "HCSM",
      "HHAA",
      "HSSS"
    ]
  },
  "AFRS": {
    "prefix": "AFRS",
    "name": "Africa South Control",
    "firs": [
      "FACA",
      "FAJA",
      "FBGR",
      "FIMM",
      "FMMM",
      "FQBE",
      "FVHF",
      "FYWH"
    ]
  },
```

> Gives: **?**  
> Usability: **_Low_**

## airports.json

```json
{
  "KABE": {
    "icao": "KABE",
    "iata": "ABE",
    "name": "Lehigh Valley International Airport",
    "city": "Allentown, Pennsylvania",
    "lat": 40.652364,
    "lon": -75.440403,
    "prefix": "ABE"
  },
  "KABI": {
    "icao": "KABI",
    "iata": "ABI",
    "name": "Abilene Regional Airport",
    "city": "Abilene, Texas",
    "lat": 32.411319,
    "lon": -99.681897,
    "prefix": "ABI"
  },
  "KABQ": {
    "icao": "KABQ",
    "iata": "ABQ",
    "name": "Albuquerque International Sunport",
    "city": "Albuquerque, New Mexico",
    "lat": 35.040222,
    "lon": -106.609194,
    "prefix": "ABQ"
  },
  "KABR": {
    "icao": "KABR",
    "iata": "ABR",
    "name": "Aberdeen Regional Airport",
    "city": "Aberdeen, South Dakota",
    "lat": 45.449056,
    "lon": -98.421833,
    "prefix": "ABR"
  },
```

> Gives: **All airport's names, icao codes, iata codes, cities they are located in, prefix and excact location of them**  
> Usability: <span style="color:red">**_High_**</span>

## data.json

A frequently updated file. It's not fetchable nor is accessible. The open alternative is: https://data.vatsim.net/v3/vatsim-data.json

```json
{
  "general": {
    "version": 3,
    "reload": 1,
    "update": "20240218225145",
    "update_timestamp": "2024-02-18T22:51:45.8380094Z",
    "connected_clients": 1251,
    "unique_users": 1172
  },
  "pilots": [
    {
      "cid": 1329420,
      "name": "Chris Woolbright KICT",
      "callsign": "UAL1",
      "server": "CANADA",
      "pilot_rating": 3,
      "military_rating": 0,
      "latitude": 3.79701,
      "longitude": 108.97701,
      "altitude": 39968,
      "groundspeed": 489,
      "transponder": "2200",
      "heading": 230,
      "qnh_i_hg": 29.88,
      "qnh_mb": 1012,
      "flight_plan": {
        "flight_rules": "I",
        "aircraft": "B789/H-VGDW/C",
        "aircraft_faa": "H/B789/L",
        "aircraft_short": "B789",
        "departure": "KSFO",
        "arrival": "WSSS",
        "alternate": "WMKK",
        "cruise_tas": "495",
        "altitude": "34000",
        "deptime": "0645",
        "enroute_time": "1611",
        "fuel_time": "1833",
        "remarks": "PBN/A1B1C1D1L1O1S2 NAV/RNVD1E2A1 REG/N13954 EET/KZSE0032 KZAK0055 51N140W0224 54N150W0312 PAZA0337 56N160W0357 RJJJ0702 RPHI1208 WSJC1413 SEL/HSKR CODE/8852E1 REAL WORLD PILOT. WILL STEP CLIMB AS ABLE.  /V/",
        "route": "MOLEN9 MOLEN AMAKR BOXER FASEL 51N140W 54N150W 56N160W ALUFF EDWAL ONEIL HEDMI M523 IPGUD Y802 OATIS KAGIS A590 JOM M767 TOMAN KARTO1A",
        "revision_id": 2,
        "assigned_transponder": "7455"
      },
      "logon_time": "2024-02-18T05:54:38.0119145Z",
      "last_updated": "2024-02-18T22:51:45.0087117Z"
    },
    {
      "cid": 1560128,
      "name": "1560128 ENVA",
      "callsign": "ETD462",
      "server": "AMSTERDAM",
      "pilot_rating": 0,
      "military_rating": 0,
      "latitude": -37.757,
      "longitude": 140.92234,
      "altitude": 39225,
      "groundspeed": 509,
      "transponder": "1771",
      "heading": 95,
      "qnh_i_hg": 30.14,
      "qnh_mb": 1021,
      "flight_plan": {
        "flight_rules": "I",
        "aircraft": "B789/H-SDE1E2E3FGHIJ2J3J4J5M1RWXY/LB1D1",
        "aircraft_faa": "H/B789/L",
        "aircraft_short": "B789",
        "departure": "OMAA",
        "arrival": "YMML",
        "alternate": "YSSY",
        "cruise_tas": "494",
        "altitude": "31000",
        "deptime": "1005",
        "enroute_time": "1311",
        "fuel_time": "1509",
        "remarks": "PBN/A1B1C1D1L1O1S2 DOF/240218 REG/A6BLL EET/OOMM0015 VABF0054 VOMF0219 VCCF0321 YMMM0503 05S090E0531 11S095E0632 1630S10000E0730 24S108E0851 34S123E1049 SEL/JMFR CODE/8852E1 OPR/ETD PER/D RALT/WIPP YPPH RMK/TCAS /V/",
        "route": "KANIP1N KANIP N318 TOLDA P570 EMURU M300 KADOL/N0500F330 M300 VASTU P895 BIKOK N640 KAT M641 KALOX/N0499F350 M641 DOGAR DCT 05S090E 11S095E 1630S10000E DCT IKASA DCT 24S108E/N0486F370 DCT POKIP DCT BOSLI DCT DOTOP DCT 34S123E DCT RIDLE Y53 WENDY WENDY1A",
        "revision_id": 2,
        "assigned_transponder": "1771"
      },
      "logon_time": "2024-02-18T09:38:55.0904169Z",
      "last_updated": "2024-02-18T22:51:44.1090971Z"
    },
```

> Gives: **All user's position, very exact information about their flight, information about the active controllers, atises, servers, all the prefiled flight plans, facilities and rantings used on their website - generally everything you need**  
> Usability: <span style="color:red">**_High_**</span>

## events.json

A simple events information. An anternative for this is https://phoenix-api.vatsim.net/api/events which gives more exact and accurate info about events.

```json
{
  "past": [
    {
      "id": "10675",
      "start": 1708236000000,
      "end": 1708245000000,
      "name": "Night Shift Presents: Christchurch Control!",
      "airports": []
    },
    {
      "id": "10156",
      "start": 1708232400000,
      "end": 1708246800000,
      "name": "Jing-Hu February",
      "airports": [
        {
          "icao": "ZBAA"
        },
        {
          "icao": "ZSPD"
        }
      ]
    },
    {
      "start": 1708214340000,
      "end": 1708228800000,
      "name": "De-Ice at Detroit",
      "airports": [
        {
          "icao": "KDTW"
        }
      ],
      "id": "9892"
    },
```

> Gives: **Network events, from the past and upcoming ones**  
> Usability: **_Medium_**

## airlines.json

```json
[
  {
    "id": 1,
    "created_at": "2018-09-09 00:47:12",
    "updated_at": "2018-09-10 14:40:07",
    "icao": "N/A",
    "iata": "-",
    "name": "Unknown",
    "country": "\\N",
    "callsign": "",
    "va": null
  },
  {
    "id": 2,
    "created_at": "2018-09-09 00:47:12",
    "updated_at": "2018-09-09 00:47:12",
    "icao": "N/A",
    "iata": "-",
    "name": "Private flight",
    "country": "",
    "callsign": null,
    "va": null
  },
  {
    "id": 3,
    "created_at": "2018-09-09 00:47:12",
    "updated_at": "2018-09-10 14:35:13",
    "icao": "GNL",
    "iata": "",
    "name": "135 Airways",
    "country": "United States",
    "callsign": "GENERAL",
    "va": null
  },
  {
    "id": 4,
    "created_at": "2018-09-09 00:47:12",
    "updated_at": "2018-09-10 14:35:13",
    "icao": "RNX",
    "iata": "1T",
    "name": "1Time Airline",
    "country": "South Africa",
    "callsign": "NEXTIME",
    "va": null
  },
```

> Gives: **Fairly good information about real-world airlines including their icao, iata, name, country of origin and callsign**  
> Usability: **_Medium_**

## regprefixes.json

```json
[
  {
    "country": "Afghanistan",
    "regex": "^YA[A-Z][A-Z][A-Z]\\b"
  },
  {
    "country": "Albania",
    "regex": "^ZA[A-Z][A-Z][A-Z]\\b"
  },
  {
    "country": "Algeria",
    "regex": "^7TV[A-Z][A-Z]\\b|^7TW[A-Z][A-Z]\\b"
  },
  {
    "country": "Andorra",
    "regex": "^C3[A-Z][A-Z][A-Z]\\b"
  },
  {
    "country": "Angola",
    "regex": "^D2[A-Z][A-Z][A-Z]\\b"
  },
  {
    "country": "Anguilla",
    "regex": "^VPA[A-Z][A-Z]\\b"
  },
  {
    "country": "Antigua and Barbuda",
    "regex": "^V2[A-Z][A-Z][A-Z]\\b"
  },
  {
    "country": "Argentina",
    "regex": "^LV[A-Z][A-Z][A-Z]\\b|^LQ[A-Z][A-Z][A-Z]\\b"
  },
```

> Gives: **Specific information about how registration prefixes work in each country**  
> Usability: **_Low_**

## maps.json

Just the copy to vatsim's server of https://tilecache.rainviewer.com/api/maps.json which indicates current and a few past unix timestamps of weather update

```json
[1708289400, 1708290000, 1708290600, 1708291200, 1708291800, 1708292400, 1708293000, 1708293600, 1708294200, 1708294800, 1708295400, 1708296000, 1708296600]
```

> Gives: **Info which is required if you use Rainviewer's maps**

## layers_positions.json

```json
[
  {
    "id": "adr/AD",
    "freq": "130.000",
    "callsign": "Adria Radar",
    "prefix": [
      "ADR"
    ]
  },
  {
    "id": "adr/ADE",
    "freq": "130.550",
    "callsign": "Adria Radar",
    "prefix": [
      "ADR"
    ]
  },
  {
    "id": "adr/ADU",
    "freq": "130.750",
    "callsign": "Adria Radar",
    "prefix": [
      "ADR"
    ]
  },
  {
    "id": "adr/ADW",
    "freq": "130.450",
    "callsign": "Adria Radar",
    "prefix": [
      "ADR"
    ]
  },
  {
    "id": "adr/PRA",
    "freq": "119.175",
    "callsign": "Pristina Approach",
    "prefix": [
      "BKPR"
    ]
  },
  {
    "id": "adr/LAC",
    "freq": "127.500",
    "callsign": "Tirana Control",
    "prefix": [
      "LAAA"
    ]
  },
```

> Gives: **Frequiencies of different atc positions. Also, prefix of that atc, its id and callsign.**  
> Usability: **_Medium_**

## layers.json

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "owner": [
          "adr/LAC",
          "adr/ADE",
          "adr/AD"
        ],
        "facility": "adr",
        "min": 0,
        "max": 114
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                20.609,
                41.991
              ],
              // note that this is shortened
              [
                20.609,
                41.991
              ]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "owner": [
          "adr/LAC",
          "adr/ADE",
          "adr/AD"
        ],
        "facility": "adr",
        "min": 115,
        "max": 244
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                20.609,
                41.991
              ],
              // note that this is shortened
              [
                20.609,
                41.991
              ]
            ]
          ]
        ]
      }
    },
```

> Gives: **Polygon coordinates for (as I can see) the top-level atc's**  
> Usability: **_Low_** - as this info is already in another json file

## firboundaries.json

```json
{
  "type": "FeatureCollection",
  "name": "VATSIM Map",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "ADR",
        "oceanic": "0",
        "label_lon": "16.3",
        "label_lat": "42.9",
        "region": "EMEA",
        "division": "VATEUD"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                18.866667,
                41.133333
              ],
              // note that this is shortened
              [
                18.866667,
                41.133333
              ]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "ADR-E",
        "oceanic": "0",
        "label_lon": "20.8",
        "label_lat": "42.55",
        "region": "EMEA",
        "division": "VATEUD"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                18.866667,
                41.133333
              ],
              // note that this is shortened
              [
                18.866667,
                41.133333
              ]
            ]
          ]
        ]
      }
    },
```

> Gives: **Actually, specific information about atc position, of couse including their polygons but as well inclusing the ID, trueness of it being oceanic control, exact label (nametext) position, region and division**  
> Usability: <span style="color:red">**_High_**</span>

## traconboundaries.json

Approach ATC's info

```json
{
  "type": "FeatureCollection",
  "name": "fix",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "A11",
        "prefix": [
          "ANC"
        ],
        "name": "Anchorage Approach"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -149.716667,
                61.716667
              ],
              // note that this is shortened
              [
                -149.716667,
                61.716667
              ]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "A80",
        "prefix": [
          "AHN"
        ],
        "name": "Atlanta Approach"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -83.63917,
                33.45056
              ],
              // note that this is shortened
              [
                -83.63917,
                33.45056
              ]
            ]
          ]
        ]
      }
    },
```

> Gives: **Guves ID, prefix and coordinates of Approach ATCs**  
> Usability: **_Medium_**

## patrons.json

```json
[
  {
    "cid": 1371434,
    "twitch": "757spy"
  },
  {
    "cid": 1239164,
    "twitch": "Chewwy94"
  },
  {
    "cid": 1258838,
    "twitch": "catstrator"
  },
  {
    "cid": 1314306,
    "twitch": "FlyPrdu"
  },
  {
    "cid": 1227335,
    "twitch": "dirkadurka"
  },
  {
    "cid": 1191671,
    "twitch": "BradM"
  },
```

> Gives: **List of VATSIM Patrons along with the user's cid**  
> Usability: **_Low_**

## streamers.json

```json
{
    "757spy": {
        "twitch": "757spy",
        "title": "Spy Flight | MD82 | KCHS-KORF | Up the East Coast in the Maddog on VATSIM",
        "count": 225
    },
    "104th_Maverick": {
        "twitch": "104th_Maverick",
        "title": "Apache Multicrew | Persian Gulf | 104th Server | Virpil Controls",
        "count": 121
    },
    "SimCaesar": {
        "twitch": "SimCaesar",
        "title": "🥨 GERMANY GROUP FLY ALONGS! 🥨 !route !giveaway !greatday",
        "count": 78
    },
    "Ropenza": {
        "twitch": "Ropenza",
        "title": "MSFS LIVE 🔴 | 🛫ZBAA-RKSI-ZBAA🛬 | Air China Ops + A321N | !av !Roadto36",
        "count": 64
    },
    "stw222": {
        "twitch": "stw222",
        "title": "Indy Departure - Hidden Gateways | !Discord | Vatsim",
        "count": 14
    },
    "SlantAlphaAdventures": {
        "twitch": "SlantAlphaAdventures",
        "title": "[ VATSIM ATC | ORF_F_APP ] Norfolk Approach | \"Hidden Gateways\"!",
        "count": 6
    },
    "baltazar_fap": {
        "twitch": "baltazar_fap",
        "title": "MSFS 2020 Vatsim PERU - DC3 -  Evento Costa Norte",
        "count": 6
    },
    "JDSnowb": {
        "twitch": "JDSnowb",
        "title": "This is your Captain Speaking || KDEN- KSEA on VATSIM || MSFS",
        "count": 4
    }
}
```

> Gives: **List of streamers currently streaming VATSIM flying or ATCing**  
> Usability: **_Low_**

## sigmets.json

```json
{
  "@attributes": {
    "num_results": "33"
  },
  "AIRSIGMET": [
    {
      "raw_text": `WAUS43 KKCI 160845 /*Note that this is shortened*/ CONDS CONTG THRU 21Z.`,
      "valid_time_from": "2023-10-16T08:45:00Z",
      "valid_time_to": "2023-10-16T14:44:59Z",
      "altitude": {
        "@attributes": {
          "min_ft_msl": "20000",
          "max_ft_msl": "42000"
        }
      },
      "hazard": {
        "@attributes": {
          "type": "TURB",
          "severity": "MOD"
        }
      },
      "airsigmet_type": "AIRMET",
      "area": {
        "@attributes": {
          "num_points": "13"
        },
        "point": [
          {
            "longitude": "-98.4904",
            "latitude": "49.0673"
          },
          // Note that this is shortened
          {
            "longitude": "-98.4904",
            "latitude": "49.0673"
          }
        ]
      }
    },
    {
      "raw_text": `WAUS46 KKCI 160845 /* Note that this is shortned */ \nCONDS CONTG THRU 21Z.`,
      "valid_time_from": "2023-10-16T08:45:00Z",
      "valid_time_to": "2023-10-16T14:44:59Z",
      "altitude": {
        "@attributes": {
          "min_ft_msl": "18000",
          "max_ft_msl": "38000"
        }
      },
      "hazard": {
        "@attributes": {
          "type": "TURB",
          "severity": "MOD"
        }
      },
      "airsigmet_type": "AIRMET",
      "area": {
        "@attributes": {
          "num_points": "10"
        },
        "point": [
          {
            "longitude": "-119.3401",
            "latitude": "49.1443"
          },
          // Note that this is shortened
          {
            "longitude": "-119.3401",
            "latitude": "49.1443"
          }
        ]
      }
    },
```

> Gives: **Current Significant Meteorological hazards. Their number, raw text that describes them, valid time of this message, altitude that this might occur at, type of hazard, airsigmet type and area that might be impacted by this in coorinates.**  
> Usability: **_Medium_**
