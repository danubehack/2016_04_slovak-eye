var map = L.map('map', {
		crs : L.CRS.EPSG3857
	}).setView([48.343889, 17.209722], 12);
mapLink =
	'<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
	'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution : '&copy; ' + mapLink + ' Contributors',
	maxZoom : 18,
}).addTo(map);

// GET FEATURE INFO
L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

		onAdd : function (map) {
			// Triggered when the layer is added to a map.
			//   Register a click listener, then do all the upstream WMS things
			L.TileLayer.WMS.prototype.onAdd.call(this, map);
			map.on('click', this.getFeatureInfo, this);
		},

		onRemove : function (map) {
			// Triggered when the layer is removed from a map.
			//   Unregister a click listener, then do all the upstream WMS things
			L.TileLayer.WMS.prototype.onRemove.call(this, map);
			map.off('click', this.getFeatureInfo, this);
		},

		getFeatureInfo : function (evt) {
			// Make an AJAX request to the server and hope for the best
			var url = this.getFeatureInfoUrl(evt.latlng),
			showResults = L.Util.bind(this.showGetFeatureInfo, this);
			$.ajax({
				url : url,
				success : function (data, status, xhr) {
					var err = typeof data === 'string' ? null : data;
					showResults(err, evt.latlng, data);
				},
				error : function (xhr, status, error) {
					showResults(error);
				}
			});
		},

		getFeatureInfoUrl : function (latlng) {
			// Construct a GetFeatureInfo request URL given a point
			var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
			size = this._map.getSize(),

			params = {
				request : 'GetFeatureInfo',
				service : 'WMS',
				srs : 'EPSG:4326',
				styles : this.wmsParams.styles,
				transparent : this.wmsParams.transparent,
				version : this.wmsParams.version,
				format : this.wmsParams.format,
				bbox : this._map.getBounds().toBBoxString(),
				height : size.y,
				width : size.x,
				layers : this.wmsParams.layers,
				query_layers : this.wmsParams.layers,
				info_format : 'application/json'
			};

			params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
			params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

			return this._url + L.Util.getParamString(params, this._url, true);
		},

		showGetFeatureInfo : function (err, latlng, content) {
			if (err) {
				console.log("error" + err);
				var band1 = content.features[0].properties.Band1;
				var band2 = content.features[0].properties.Band2;
				var band3 = content.features[0].properties.Band3;
				var band4 = content.features[0].properties.Band4;

				var ndvi = (band4 - band3) / (band4 + band3);

				swal({
					title : "NDVI Value",
					text : ndvi,
					imageUrl : "logo.PNG"
				});

				console.log(ndvi);

				return;
			} // do nothing if there's an error

			var band1 = content.features[0].properties.Band1;
			var band2 = content.features[0].properties.Band2;
			var band3 = content.features[0].properties.Band3;
			var band4 = content.features[0].properties.Band4;

			var ndvi = (band3 - band2) / (band1 + band4);

			console.log(ndvi);
			var object = content.features[0].properties.Band1;
			console.log(content.features[0].properties.Band1);
			// Otherwise show the content in a popup, or something.
			L.popup({
				maxWidth : 800
			})
			.setLatLng(latlng)
			.setContent(content)
			.openOn(this._map);
		}
	});

L.tileLayer.betterWms = function (url, options) {
	return new L.TileLayer.BetterWMS(url, options);
};

var wmsLayer = L.tileLayer.betterWms('http://bolegweb.geof.unizg.hr/geoserver/gwc/service/wms?', {
		layers : 'slovak-eye:Sentinel_SR',
		transparent : true,
		format : 'image/png'
	}).addTo(map);
