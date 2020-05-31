interface Pilot {
  'type': string,
  'id': number,
  'geometry': {
    'type': string,
    'coordinates': [number, number, number]
  },
  'properties': {
    'callsign': string,
    'cid': string,
    'server': string,
    'realname': string,
    'groundspeed': number,
    'heading': number,
    'qnh_mb': number,
    'qnh_i_hg': number,
    'transponder': number,
    'planned_aircraft': string,
    'planned_tascruise': string,
    'planned_depairport': string,
    'planned_altitude': string,
    'planned_destairport': string,
    'planned_flighttype': string,
    'planned_deptime': string,
    'planned_actdeptime': string,
    'planned_hrsenroute': string,
    'planned_minenroute': string,
    'planned_hrsfuel': string,
    'planned_minfuel': string,
    'planned_altairport': string,
    'planned_remarks': string,
    'planned_route': string,
    'planned_depairport_lat': number,
    'planned_depairport_lon': number,
    'planned_destairport_lat': number,
    'planned_destairport_lon': number,
    'time_logon': string,
  }
}

export interface PilotsGeojson {
  type: string,
  cluster: boolean,
  data: {
    id: string,
    type: string,
    features: Pilot[],
  },
}
