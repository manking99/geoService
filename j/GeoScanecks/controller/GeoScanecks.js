Ext.define('GeoScanecks.controller.GeoScanecks', {
	extend: 'Ext.app.Controller',

	id: 'mainController',

	views: [
		'Window1',
		'MapView',
		'TimeLine'
	],
	stores: [
		'GeoStore',
		'TimeLineStore'
	],

	models: [
		'GeoModel',
		'TimeLineModel'
	],

	init: function() {

		var me = this;
		me.model = Ext.create('GeoScanecks.model.GeoModel');

		// Создаём стор обновления элементов по дате
		me.storeTimeLine = Ext.create('GeoScanecks.store.TimeLineStore', {});

		me.store = Ext.create('GeoScanecks.store.GeoStore', {
			listeners: {
				load: function() {
					me.drawDataMap(me.store);
					me.updateMapAfterChange(null , me);
				}
			}
		});

		var wnd_ = Ext.getCmp('mainWindowCmp');
		if (wnd_) {
			wnd_.close();
		}

		me.wnd = Ext.widget('window1', {
			id: 'mainWindowCmp',

			autoShow: false,

			baseCls: '',
			cls: 'loomoon-bg-image',
			bodyCls: 'loomoon-body-bg',

			title: null,

			items: [{
				xtype: 'MapView',
				storeTimeLine: me.storeTimeLine
			}],

			listeners: {
				beforerender: function() {
					var me = this;
					me.center();
				},
				resize: function() {
					var me = this;
					me.center();
				}
			} 
		});

		me.wnd.show();

		me.callParent(arguments);
	},

	/**
	 * Нарисовать объекты на карте
	 * @param {Object} store - объект стора
	 */
	drawDataMap: function(store) {
		var me = this;

		var lngt = store.data.items.length;
		var map = Ext.getCmp('mapViewId').map;
		var arr_obj = [];

		for (var i = 0; i < lngt; i++) {
			var itm = store.data.items[i].data;

			var circl = L.circleMarker([itm.geometry.coordinates[1], itm.geometry.coordinates[0]]);
			circl.feature = itm;
			arr_obj.push(circl);

			//arr_obj.push([itm.geometry.coordinates[1], itm.geometry.coordinates[0]]);
		}

		// для точек
		L.layerGroup(arr_obj).addTo(map);

		// Плагин для отображения карты температур
	//	var heat = L.heatLayer([].concat(arr_obj), {
	//	radius: 25
	//	}).addTo(map);

		

		me.map = map;
		// событие при измениии зума и вида вешаем после того как была добавлена дата
		map.on('zoomend', function(e) {
			me.updateMapAfterChange(e, me);
		});
		map.on('moveend', function(e) {
			me.updateMapAfterChange(e, me);
		});
	},


	/**
	 * Обновление карты после наступления событий
	 * @param {Object} rec - 
	 */
	updateMapAfterChange: function(e, me) {

		var arrPoints = me.getVissiblePoints();

		me.storeTimeLine.loadFromPoints(arrPoints);

		var cmp = Ext.getCmp('TimeLineId');
		cmp.update();
	},
	/**
	 * Получение всех видимых точек
	 * 
	 */
	getVissiblePoints: function() {
		var me = this,
			bnd = me.map.getBounds(),
			arrPoints = [], // все видимые сейчас на экране точки(или слои)
			// проверка что точка видима
			isVisible = function(coodr) {
				return bnd.contains(coodr);
			};

		me.map.eachLayer(function(lr) {
			if (lr._layers) {
				for (var it in lr._layers) {
					if (lr._layers[it]._latlng) {
						isVisible([lr._layers[it]._latlng.lat, lr._layers[it]._latlng.lng]);
					}
				}
			}

			if (lr._latlng) {
				isVisible([lr._latlng.lat, lr._latlng.lng]) ? arrPoints.push(lr) : null;
			}
		});

		return arrPoints;
	}

});