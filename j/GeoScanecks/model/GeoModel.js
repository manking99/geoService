Ext.define('GeoScanecks.model.GeoModel', {
    extend: 'Ext.data.Model',
    alias: 'widget.GeoModel',

    fields: [{
        name: 'type',
        type: 'string'
    }, {
        name: 'properties',
        type: 'auto'
    }, {
        name: 'geometry',
        type: 'auto'
    }]
});