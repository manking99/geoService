Ext.Loader.setConfig({
	enabled: true
});

Ext.application({
	name: 'GeoScanecks', 
	appFolder: 'j/GeoScanecks', 

	controllers: [
		'GeoScanecks'
	],

	init: function() {
		var me = this;
	},

	launch: function() {
		return;
	}

});