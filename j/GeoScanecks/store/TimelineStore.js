Ext.define('GeoScanecks.store.TimeLineStore', {
	extend: 'Ext.data.Store',

	model: 'GeoScanecks.model.TimeLineModel',

	autoLoad: false,

	loadFromPoints: function(points) {

		var me = this,
			arrObj = [],
			map_ = new Object();

		for (var i = 0; i < points.length; i++) {
			if (points[i].feature.properties.DateTime in map_) {} else {
				map_[points[i].feature.properties.DateTime] = [];
			}

			map_[points[i].feature.properties.DateTime].push(points[i].feature.geometry.coordinates[0] + ":" + points[i].feature.geometry.coordinates[1]);
		}

		for (var it in map_) {
			arrObj.push({
				DateTime: it,
				CountFields: map_[it].length,
			});
		}

		me.loadRawData(arrObj);
		me.sort('DateTime', 'ASC');
	}
});