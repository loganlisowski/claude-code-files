export interface StateMapPath {
  id: string;         // State abbreviation (AL, AK, etc.)
  name: string;       // Full state name
  d: string;          // SVG path data
}

// Simplified US state map paths for a viewBox of "0 0 960 600"
// These are approximate/simplified paths that produce a recognizable US map.
export const stateMapPaths: StateMapPath[] = [
  {
    id: "AL",
    name: "Alabama",
    d: "M628,425 L628,468 L622,502 L618,510 L631,512 L632,468 L648,468 L648,425 Z",
  },
  {
    id: "AK",
    name: "Alaska",
    d: "M161,485 L183,485 L183,510 L209,510 L209,525 L183,540 L161,540 L140,525 L120,510 L100,510 L80,525 L60,525 L80,510 L100,498 L120,485 L140,485 Z",
  },
  {
    id: "AZ",
    name: "Arizona",
    d: "M205,430 L280,430 L280,510 L245,520 L205,510 L205,430 Z",
  },
  {
    id: "AR",
    name: "Arkansas",
    d: "M568,430 L625,430 L625,475 L568,475 Z",
  },
  {
    id: "CA",
    name: "California",
    d: "M120,290 L140,280 L152,300 L168,340 L185,385 L200,430 L205,510 L185,500 L160,470 L132,430 L120,380 L108,340 L110,310 Z",
  },
  {
    id: "CO",
    name: "Colorado",
    d: "M290,330 L380,330 L380,400 L290,400 Z",
  },
  {
    id: "CT",
    name: "Connecticut",
    d: "M852,220 L876,212 L882,230 L870,242 L852,238 Z",
  },
  {
    id: "DE",
    name: "Delaware",
    d: "M832,300 L842,290 L846,310 L838,322 Z",
  },
  {
    id: "FL",
    name: "Florida",
    d: "M660,502 L710,485 L740,485 L760,490 L762,502 L740,510 L728,530 L710,555 L695,575 L680,570 L670,545 L660,530 L648,520 L632,515 L632,502 L660,502 Z",
  },
  {
    id: "GA",
    name: "Georgia",
    d: "M648,425 L700,425 L710,485 L660,502 L632,502 L632,468 L648,468 Z",
  },
  {
    id: "HI",
    name: "Hawaii",
    d: "M260,545 L270,540 L278,545 L275,555 L265,558 L258,552 Z M282,535 L290,530 L296,538 L290,545 L282,542 Z M298,525 L310,520 L318,528 L312,535 L300,535 Z",
  },
  {
    id: "ID",
    name: "Idaho",
    d: "M195,175 L225,165 L240,200 L245,260 L245,300 L210,300 L195,275 L190,230 Z",
  },
  {
    id: "IL",
    name: "Illinois",
    d: "M580,265 L610,265 L615,280 L618,330 L615,370 L605,395 L580,400 L575,370 L578,330 L580,290 Z",
  },
  {
    id: "IN",
    name: "Indiana",
    d: "M615,270 L648,270 L648,370 L615,370 L618,330 L615,280 Z",
  },
  {
    id: "IA",
    name: "Iowa",
    d: "M505,260 L575,260 L580,265 L578,320 L505,320 Z",
  },
  {
    id: "KS",
    name: "Kansas",
    d: "M398,365 L505,365 L505,420 L398,420 Z",
  },
  {
    id: "KY",
    name: "Kentucky",
    d: "M615,370 L648,370 L680,360 L720,365 L728,380 L700,395 L650,400 L615,400 L605,395 Z",
  },
  {
    id: "LA",
    name: "Louisiana",
    d: "M568,478 L625,478 L625,510 L640,530 L630,545 L610,540 L595,545 L580,535 L568,520 Z",
  },
  {
    id: "ME",
    name: "Maine",
    d: "M880,110 L900,100 L910,120 L905,155 L890,180 L875,175 L870,150 L872,130 Z",
  },
  {
    id: "MD",
    name: "Maryland",
    d: "M770,300 L832,300 L838,322 L830,330 L810,318 L790,325 L770,320 Z",
  },
  {
    id: "MA",
    name: "Massachusetts",
    d: "M860,198 L890,188 L900,195 L898,205 L880,210 L860,212 Z",
  },
  {
    id: "MI",
    name: "Michigan",
    d: "M610,180 L625,170 L650,175 L665,190 L670,220 L660,250 L648,270 L615,270 L610,248 L620,225 L615,200 Z M580,165 L600,155 L615,170 L610,190 L595,195 L580,185 Z",
  },
  {
    id: "MN",
    name: "Minnesota",
    d: "M478,130 L540,130 L545,150 L545,260 L505,260 L498,240 L478,200 Z",
  },
  {
    id: "MS",
    name: "Mississippi",
    d: "M600,425 L628,425 L628,502 L618,510 L600,510 L592,490 L595,468 L600,450 Z",
  },
  {
    id: "MO",
    name: "Missouri",
    d: "M505,325 L575,325 L580,335 L580,400 L568,430 L548,420 L505,420 L505,365 Z",
  },
  {
    id: "MT",
    name: "Montana",
    d: "M245,130 L370,130 L375,195 L245,200 Z",
  },
  {
    id: "NE",
    name: "Nebraska",
    d: "M370,295 L505,295 L505,365 L398,365 L385,345 L370,330 Z",
  },
  {
    id: "NV",
    name: "Nevada",
    d: "M165,270 L210,260 L210,300 L205,430 L170,380 L155,330 Z",
  },
  {
    id: "NH",
    name: "New Hampshire",
    d: "M868,145 L878,140 L882,170 L876,195 L868,195 L864,170 Z",
  },
  {
    id: "NJ",
    name: "New Jersey",
    d: "M840,255 L850,248 L855,275 L850,300 L840,310 L835,290 Z",
  },
  {
    id: "NM",
    name: "New Mexico",
    d: "M280,410 L370,410 L370,510 L280,510 Z",
  },
  {
    id: "NY",
    name: "New York",
    d: "M780,185 L810,175 L840,180 L860,190 L860,200 L850,220 L852,238 L840,255 L820,255 L800,248 L782,240 L775,220 Z",
  },
  {
    id: "NC",
    name: "North Carolina",
    d: "M680,385 L730,380 L770,370 L810,365 L830,380 L810,395 L760,410 L710,415 L680,410 Z",
  },
  {
    id: "ND",
    name: "North Dakota",
    d: "M380,130 L478,130 L478,200 L380,200 Z",
  },
  {
    id: "OH",
    name: "Ohio",
    d: "M648,270 L700,255 L720,285 L720,350 L700,365 L680,360 L648,370 Z",
  },
  {
    id: "OK",
    name: "Oklahoma",
    d: "M370,410 L398,400 L505,400 L505,450 L435,450 L430,430 L370,430 Z",
  },
  {
    id: "OR",
    name: "Oregon",
    d: "M110,175 L195,175 L190,230 L195,275 L165,270 L130,260 L100,240 L95,210 Z",
  },
  {
    id: "PA",
    name: "Pennsylvania",
    d: "M740,250 L820,240 L830,255 L835,290 L832,300 L770,300 L740,290 Z",
  },
  {
    id: "RI",
    name: "Rhode Island",
    d: "M876,218 L884,215 L886,228 L880,234 Z",
  },
  {
    id: "SC",
    name: "South Carolina",
    d: "M700,410 L740,400 L760,410 L755,435 L730,450 L700,445 L690,425 Z",
  },
  {
    id: "SD",
    name: "South Dakota",
    d: "M380,200 L478,200 L498,240 L505,260 L505,295 L380,295 Z",
  },
  {
    id: "TN",
    name: "Tennessee",
    d: "M605,395 L650,400 L700,395 L728,380 L730,400 L710,415 L680,410 L605,425 Z",
  },
  {
    id: "TX",
    name: "Texas",
    d: "M310,460 L370,430 L430,430 L435,450 L505,450 L505,490 L530,530 L530,555 L505,575 L475,580 L445,570 L415,555 L390,535 L370,510 L340,505 L310,495 Z",
  },
  {
    id: "UT",
    name: "Utah",
    d: "M240,270 L290,270 L290,380 L250,380 L240,350 L240,310 Z",
  },
  {
    id: "VT",
    name: "Vermont",
    d: "M858,152 L868,145 L868,195 L858,198 L852,175 Z",
  },
  {
    id: "VA",
    name: "Virginia",
    d: "M700,340 L770,320 L810,318 L830,330 L830,365 L810,365 L770,370 L730,380 L720,365 Z",
  },
  {
    id: "WA",
    name: "Washington",
    d: "M115,100 L195,100 L200,140 L195,175 L110,175 L105,150 L115,120 Z",
  },
  {
    id: "WV",
    name: "West Virginia",
    d: "M720,300 L755,290 L770,300 L770,320 L755,340 L740,355 L720,350 Z",
  },
  {
    id: "WI",
    name: "Wisconsin",
    d: "M545,155 L575,150 L590,165 L600,190 L605,230 L610,248 L610,265 L580,265 L575,260 L545,260 Z",
  },
  {
    id: "WY",
    name: "Wyoming",
    d: "M270,200 L370,200 L375,270 L290,270 L270,260 Z",
  },
];
