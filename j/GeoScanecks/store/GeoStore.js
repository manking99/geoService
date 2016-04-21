Ext.define('GeoScanecks.store.GeoStore', {
	extend: 'Ext.data.Store',

	model: 'GeoScanecks.model.GeoModel',

	autoLoad: true,

	/* Чтение из файла json */
	/**/
	proxy: {
		type: 'ajax',
		url: 'data/geo.json', // geo_big.json
		reader: {
			type: 'json',
			root: 'features'
		}
	}
});