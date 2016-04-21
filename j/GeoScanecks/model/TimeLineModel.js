Ext.define('GeoScanecks.model.TimeLineModel', {
    extend: 'Ext.data.Model',
    alias: 'widget.TimeLineModel',

    fields: [{
            name: 'DateTime',
            type: 'string'
        }, {
            name: 'CountFields',
            type: 'int'
        }
    ]
});