import { shallowMount } from '@vue/test-utils';
import FlightDetails from '../../src/components/SideBarComponents/FlightDetails.vue';

const sampleContent = {
  properties: {
    callsign: 'VIR31',
    cid: 800000,
    realname: 'Testers Name',
    speed: 215,
    heading: 65,
    flightplan: '{"flight_rules":"IFR","aircraft":"H/A332/L","departure":"KBOS","arrival":"EGCC","alternate":"EGLL","speed":505,"altitude":34000,"route":"LBSTA6 LBSTA DCT EBONY/M078F370 N381B ALLRY/M078F380 NATV DOGAL/N0444F380 NATV BEXET/N0443F370 DCT LIFFY Q37 MALUD MIRS2B ","remarks":" /v/","departure_time":"2020-03-22T00:00:00.000000Z","time_enroute":"00:00","time_fuel":"00:00"}',
    altMslM: 900.944833892106,
    altMslFt: 2956,
    updated_at: '2020-03-22T02:50:46.621287Z',
  },
};

const wrapper = shallowMount(FlightDetails, {
  propsData: {
    content: sampleContent,
  },
});

describe('FlightDetails', () => {
  it('Enables flight tracking', () => {
    expect(wrapper.vm.track).toBe(false);
    const trackButton = wrapper.find('#track-btn');
    trackButton.trigger('click');
    expect(wrapper.vm.track).toBe(true);
  });
});
