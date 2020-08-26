import loadGoogleMapsApi from 'load-google-maps-api';

export default {
  props: {
    apiKey: String,
    lat: Number,
    lng: Number,
    zoom: Number,
    icon: String,
  },

  data: {
    apiKey: null,
    lat: 47.216219,
    lng: 8.095984,
    zoom: 12,
    icon: 'default',
  },

  connected() {
    loadGoogleMapsApi({ key: this.apiKey })
      .then((googleMaps) => {
        this.api = googleMaps;
        this.initialize();
      });
  },

  methods: {

    initialize() {
      this.position = {
        lat: this.$props.lat,
        lng: this.$props.lng,
      };

      this.map = new this.api.Map(this.$el, {
        zoom: this.$props.zoom,
        center: this.position,
      });

      this.size = new this.api.Size(30, 30);

      this.marker = new this.api.Marker({
        position: this.position,
        map: this.map,
      });
    },
  },
};
