import {
  FETCH_DEVICES_STATUS,
  FETCH_ACTIVE_DEVICES,
  FETCH_INACTIVE_DEVICES,
  FETCH_DEVICE_BEGIN,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  actives: 0,
  inactives: 0,
  devicesStates: [],
  dataPies: {
    labels: ["40%", "80%", "40%"],
    series: [40, 80, 40]
  },
  legendPies: {
    names: ["Open", "Bounce", "Unsubscribe"],
    types: ["info", "danger", "warning", "danger"]
  }
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DEVICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

      case FETCH_DEVICES_STATUS:
        let total = 0;
        action.devicesStates.map((value) => (total=total+parseInt(value.count,10)))
        let labels = [];
        let series = [];
        let names = [];
        action.devicesStates.forEach((value) => {
          labels.push(String(Math.round(parseInt(value.count,10)/total*100))+"%");
          series.push(Math.round(parseInt(value.count,10)/total*100));
          names.push(value.status)
        })
      return {
        ...state,
        loading: false,
        devicesStates: action.devicesStates,
        dataPies: {...state.dataPies, labels: labels, series: series},
        legendPies: {...state.legendPies, names: names}
      };

      case FETCH_ACTIVE_DEVICES:
      return {
        ...state,
        loading: false,
        actives: action.actives
      };

      case FETCH_INACTIVE_DEVICES:
      return {
        ...state,
        loading: false,
        inactives: action.inactives
      };


    default:
      return state;
  }
}
