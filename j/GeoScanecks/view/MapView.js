Ext.define('GeoScanecks.view.MapView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.MapView',

    id: 'mapViewId',

    baseCls: '',
    cls: '',
    bodyCls: '',

    type: 'vbox',
    align: 'stretch',


    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'component',
            baseCls: 'geo-main-map',
            html: '<div id="mapId"></div>',
            padding: 0,
            flex: 1,
        }, {
            xtype: 'container',
            baseCls: 'geo-add-json',
            flex: 2,
            items: [{
                xtype: 'TimeLine',
                id : 'TimeLineId',
                store: me.storeTimeLine 
            }],
            padding: 0
        }];

        me.callParent(arguments);
    },

    listeners: {
        afterrender: function() {
            var me = this;

            var map = L.map('mapId').setView([51.505, -0.09], 2);
            me.map = map;

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

        }
    },

});