sap.designstudio.sdk.DataBuffer.subclass("com.sap.sample.jsondatasource.JsonDataSource", function() {

	var that = this;

	var _hasHeaderRow = false;
	var _hasHeaderColumn = false;
	var _csvfile;
	
	this.init = function() {
		this.defineDimensions([{
			key: "cols",
			text: "City",
			"axis": "COLUMNS",
			"axis_index": 0
		}, {
			key: "rows",
			text: "Date",
			"axis": "ROWS",
			"axis_index": 0
		}], {
			key: "measures",
			text: "Measures",
			containsMeasures: true,
			members: [{
				"key": "measure",
				"text": "Temprature",
				"scalingFactor": 2,
				"formatString": "0.00 EUR;-0.00 EUR"
			}]
		});
	};

	this.csvfile = function(value) {
		if (value === undefined) {
			return _csvfile;
		} else {
			_csvfile = value;
			return this;
		}
	};

	this.hasHeaderRow = function(value) {
		if (value === undefined) {
			return _hasHeaderRow;
		} else {
			_hasHeaderRow = value;
			return this;
		}
	};

	this.hasHeaderColumn = function(value) {
		if (value === undefined) {
			return _hasHeaderColumn;
		} else {
			_hasHeaderColumn = value;
			return this;
		}
	};
	
	

	this.afterUpdate = function() {
		$.ajax({
			async: false,
			url: _csvfile,
		}).done(function(csvText) {
			alert(csvText);
			processCsvText(csvText);
		});
	};

	function processCsvText(csvText) {
		var city = [];
		var day=[];
        
		   city[0]=["","Londen","kiev","Moscow","Morins"];
	       day[0]=["01-12-2014"];
	       
	        for(var i=0;i<csvText.list.length;i++){
	          day[i+1]=parseInt((csvText.list[i].main.temp));
	        }
	        
		  city[1]=day;
		
         alert(city);
		that.fillWithArray(city, that.hasHeaderRow(), that.hasHeaderColumn());
		that.fireUpdate(true);
	}
});
