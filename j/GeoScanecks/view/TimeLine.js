Ext.define('GeoScanecks.view.TimeLine', {
    extend: 'Ext.Panel',
    alias: 'widget.TimeLine',

    layout: 'fit',



    initComponent: function() {
        var me = this,
            dtTplList = new Ext.XTemplate(
            '<div class="timeLinePoints">',
             '<tpl for=".">',
                '<div class="blockTmelineWr" >',
                    '<span class="headerTextTimeline">{DateTime}</span>',
                    '<span class="blockTmeline"  id="timeline_{#}"><span>{CountFields}<span></span>',
              '</div>',
             '</tpl>',
            '<div>'
        );

        me.items = [{
            xtype: 'dataview',
            id: 'dataviewList',
            scrollable: true,
            autoScroll: true,
            height: 300,
            deferEmptyText: false,
            itemSelector: '.imgFilesList',
            store: me.store,
            tpl: dtTplList
        }];

        me.callParent(arguments);
    },

    listeners: {
        afterrender: function() {
            var me = this;
            me.update();
        }

    },

    /**
     * Обновление вью
     * @param {Object} rec - 
     */
    update: function() {
        var me = this;

        var max = 0;
        for (var i = 0; i < me.store.data.items.length; i++) {
            if (me.store.data.items[i].data.CountFields > max) {
                max = me.store.data.items[i].data.CountFields;
            }
        }

        var height = 135;

        for (var i = 0; i < me.store.data.items.length; i++) {
            me.store.data.items[i].data.CountFields;
            me.store.data.items[i].data.DateTime;

            var elms = Ext.query('#timeline_' + (i + 1));
            var cnt = me.store.data.items[i].data.CountFields;
            var cof = (cnt * 100) / max;
            var curheight = (height * cof) / 100;

            elms[0].style.height = curheight;
        }
    }
});