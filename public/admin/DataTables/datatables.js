/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.11.3/e-2.0.5/b-2.0.1/r-2.2.9
 *
 * Included libraries:
 *   DataTables 1.11.3, Editor 2.0.5, Buttons 2.0.1, Responsive 2.2.9
 */

/*! DataTables 1.11.3
 * ©2008-2021 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.11.3
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2021 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		window.DataTable = factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( selector, options )
	{
		// When creating with `new`, create a new DataTable, returning the API instance
		if (this instanceof DataTable) {
			return $(selector).DataTable(options);
		}
		else {
			// Argument switching
			options = selector;
		}

		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = Array.isArray(data) && ( Array.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ), true );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = Array.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = Array.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnCamelToHungarian( defaults.oLanguage, json );
						_fnLanguageCompat( json );
						$.extend( true, oLanguage, json );
			
						_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			else {
				_fnCallbackFire( oSettings, null, 'i18n', [oSettings]);
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').insertAfter(thead);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
			
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n\u2028]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	// Surprisingly this is faster than [].concat.apply
	// https://jsperf.com/flatten-an-array-loop-vs-reduce/2
	var _flatten = function (out, val) {
		if (Array.isArray(val)) {
			for (var i=0 ; i<val.length ; i++) {
				_flatten(out, val[i]);
			}
		}
		else {
			out.push(val);
		}
	  
		return out;
	}
	
	var _includes = function (search, start) {
		if (start === undefined) {
			start = 0;
		}
	
		return this.indexOf(search, start) !== -1;	
	};
	
	// Array.isArray polyfill.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	if (! Array.isArray) {
	    Array.isArray = function(arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    };
	}
	
	if (! Array.prototype.includes) {
		Array.prototype.includes = _includes;
	}
	
	// .trim() polyfill
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
	if (!String.prototype.trim) {
	  String.prototype.trim = function () {
	    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	  };
	}
	
	if (! String.prototype.includes) {
		String.prototype.includes = _includes;
	}
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		},
	
		/**
		 * Create a function that will write to a nested object or array
		 * @param {*} source JSON notation string
		 * @returns Write function
		 */
		set: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				/* Unlike get, only the underscore (global) option is used for for
				 * setting data since we don't know the type here. This is why an object
				 * option is not documented for `mData` (which is read/write), but it is
				 * for `mRender` which is read only.
				 */
				return DataTable.util.set( source._ );
			}
			else if ( source === null ) {
				// Nothing to do when the data source is null
				return function () {};
			}
			else if ( typeof source === 'function' ) {
				return function (data, val, meta) {
					source( data, 'set', val, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				// Like the get, we need to get data from a nested object
				var setData = function (data, val, src) {
					var a = _fnSplitObjNotation( src ), b;
					var aLast = a[a.length-1];
					var arrayNotation, funcNotation, o, innerSrc;
		
					for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ ) {
						// Protect against prototype pollution
						if (a[i] === '__proto__' || a[i] === 'constructor') {
							throw new Error('Cannot set prototype values');
						}
		
						// Check if we are dealing with an array notation request
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
		
						if ( arrayNotation ) {
							a[i] = a[i].replace(__reArray, '');
							data[ a[i] ] = [];
		
							// Get the remainder of the nested object to set so we can recurse
							b = a.slice();
							b.splice( 0, i+1 );
							innerSrc = b.join('.');
		
							// Traverse each entry in the array setting the properties requested
							if ( Array.isArray( val ) ) {
								for ( var j=0, jLen=val.length ; j<jLen ; j++ ) {
									o = {};
									setData( o, val[j], innerSrc );
									data[ a[i] ].push( o );
								}
							}
							else {
								// We've been asked to save data to an array, but it
								// isn't array data to be saved. Best that can be done
								// is to just save the value.
								data[ a[i] ] = val;
							}
		
							// The inner call to setData has already traversed through the remainder
							// of the source and has set the data, thus we can exit here
							return;
						}
						else if ( funcNotation ) {
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]( val );
						}
		
						// If the nested object doesn't currently exist - since we are
						// trying to set the value - create it
						if ( data[ a[i] ] === null || data[ a[i] ] === undefined ) {
							data[ a[i] ] = {};
						}
						data = data[ a[i] ];
					}
		
					// Last item in the input - i.e, the actual set
					if ( aLast.match(__reFn ) ) {
						// Function call
						data = data[ aLast.replace(__reFn, '') ]( val );
					}
					else {
						// If array notation is used, we just want to strip it and use the property name
						// and assign the value. If it isn't used, then we get the result we want anyway
						data[ aLast.replace(__reArray, '') ] = val;
					}
				};
		
				return function (data, val) { // meta is also passed in, but not used
					return setData( data, val, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, val) { // meta is also passed in, but not used
					data[source] = val;
				};
			}
		},
	
		/**
		 * Create a function that will read nested objects from arrays, based on JSON notation
		 * @param {*} source JSON notation string
		 * @returns Value read
		 */
		get: function ( source ) {
			if ( $.isPlainObject( source ) ) {
				// Build an object of get functions, and wrap them in a single call
				var o = {};
				$.each( source, function (key, val) {
					if ( val ) {
						o[key] = DataTable.util.get( val );
					}
				} );
		
				return function (data, type, row, meta) {
					var t = o[type] || o._;
					return t !== undefined ?
						t(data, type, row, meta) :
						data;
				};
			}
			else if ( source === null ) {
				// Give an empty string for rendering / sorting etc
				return function (data) { // type, row and meta also passed, but not used
					return data;
				};
			}
			else if ( typeof source === 'function' ) {
				return function (data, type, row, meta) {
					return source( data, type, row, meta );
				};
			}
			else if ( typeof source === 'string' && (source.indexOf('.') !== -1 ||
					  source.indexOf('[') !== -1 || source.indexOf('(') !== -1) )
			{
				/* If there is a . in the source string then the data source is in a
				 * nested object so we loop over the data for each level to get the next
				 * level down. On each loop we test for undefined, and if found immediately
				 * return. This allows entire objects to be missing and sDefaultContent to
				 * be used if defined, rather than throwing an error
				 */
				var fetchData = function (data, type, src) {
					var arrayNotation, funcNotation, out, innerSrc;
		
					if ( src !== "" ) {
						var a = _fnSplitObjNotation( src );
		
						for ( var i=0, iLen=a.length ; i<iLen ; i++ ) {
							// Check if we are dealing with special notation
							arrayNotation = a[i].match(__reArray);
							funcNotation = a[i].match(__reFn);
		
							if ( arrayNotation ) {
								// Array notation
								a[i] = a[i].replace(__reArray, '');
		
								// Condition allows simply [] to be passed in
								if ( a[i] !== "" ) {
									data = data[ a[i] ];
								}
								out = [];
		
								// Get the remainder of the nested object to get
								a.splice( 0, i+1 );
								innerSrc = a.join('.');
		
								// Traverse each entry in the array getting the properties requested
								if ( Array.isArray( data ) ) {
									for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
										out.push( fetchData( data[j], type, innerSrc ) );
									}
								}
		
								// If a string is given in between the array notation indicators, that
								// is used to join the strings together, otherwise an array is returned
								var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
								data = (join==="") ? out : out.join(join);
		
								// The inner call to fetchData has already traversed through the remainder
								// of the source requested, so we exit from the loop
								break;
							}
							else if ( funcNotation ) {
								// Function call
								a[i] = a[i].replace(__reFn, '');
								data = data[ a[i] ]();
								continue;
							}
		
							if ( data === null || data[ a[i] ] === undefined ) {
								return undefined;
							}
	
							data = data[ a[i] ];
						}
					}
		
					return data;
				};
		
				return function (data, type) { // row and meta also passed, but not used
					return fetchData( data, type, source );
				};
			}
			else {
				// Array or flat object mapping
				return function (data, type) { // row and meta also passed, but not used
					return data[source];
				};
			}
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! Array.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions, true );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Convert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Convert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string - but it
						// must not be empty
						if ( detectedType === 'html' && ! _empty(cache[k]) ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! Array.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter|search' 'sort|order')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		if (type === 'search') {
			type = 'filter';
		}
		else if (type === 'order') {
			type = 'sort';
		}
	
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type === 'display' ) {
			return '';
		}
	
		if ( type === 'filter' ) {
			var fomatters = DataTable.ext.type.search;
	
			if ( fomatters[ col.sType ] ) {
				cellData = fomatters[ col.sType ]( cellData );
			}
		}
	
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	var _fnGetObjectDataFn = DataTable.util.get;
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	var _fnSetObjectDataFn = DataTable.util.set;
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = (cell.innerHTML).trim();
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen, create;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
				create = nTrIn ? false : true;
	
				nTd = create ? document.createElement( oCol.sCellType ) : anTds[i];
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( create || ((oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				)) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
	
		/* Deal with the footer - add classes if required */
		$(thead).children('tr').children('th, td').addClass( classes.sHeaderTH );
		$(tfoot).children('tr').children('th, td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @param ajaxComplete true after ajax call to complete rendering
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings, ajaxComplete )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !ajaxComplete)
		{
			_fnAjaxUpdate( oSettings );
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && Array.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			var status = oSettings.jqXhr
				? oSettings.jqXhr.status
				: null;
	
			if ( json === null || (typeof status === 'number' && status == 204 ) ) {
				json = {};
				_fnAjaxDataSrc( oSettings, json, [] );
			}
	
			var error = json.error || json.sError;
			if ( error ) {
				_fnLog( oSettings, 0, error );
			}
	
			oSettings.json = json;
	
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": callback,
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		settings.iDraw++;
		_fnProcessingDisplay( settings, true );
	
		_fnBuildAjax(
			settings,
			_fnAjaxParameters( settings ),
			function(json) {
				_fnAjaxUpdateDraw( settings, json );
			}
		);
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw !== undefined ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		// No data in returned object, so rather than an array, we show an empty table
		if ( ! data ) {
			data = [];
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		_fnDraw( settings, true );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	 function _fnAjaxDataSrc ( oSettings, json, write )
	 {
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		if ( ! write ) {
			if ( dataSrc === 'data' ) {
				// If the default, then we still want to support the old style, and safely ignore
				// it if possible
				return json.aaData || json[dataSrc];
			}
	
			return dataSrc !== "" ?
				_fnGetObjectDataFn( dataSrc )( json ) :
				json;
		}
	
		// set
		_fnSetObjectDataFn( dataSrc )( json, write );
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function(event) {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
			if(previousSearch.return && event.key !== "Enter") {
				return;
			}
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive,
					"return": previousSearch.return
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'mouseup', function(e) {
				// Edge fix! Edge 17 does not trigger anything other than mouse events when clicking
				// on the clear icon (Edge bug 17584515). This is safe in other browsers as `searchFn`
				// checks the value to see if it has changed. In other browsers it won't have.
				setTimeout( function () {
					searchFn.call(jqFilter[0], e);
				}, 10);
			} )
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
			oPrevSearch.return = oFilter.return;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive, oInput.return );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insensitive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 regex ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n\u2028]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = Array.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css('max-height', scrollY);
		if (! scroll.bCollapse) {
			$(scrollBody).css('height', scrollY);
		}
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			var style = window.getComputedStyle ?
				window.getComputedStyle(nSizer).width :
				_fnStringToCss( $(nSizer).width() );
	
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( style );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			nToSize.style.width = headerWidths[i];
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.trigger('scroll');
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! Array.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( Array.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.ariaTitle || col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if (settings._bLoadingState) {
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		settings.oSavedState = state;
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
		
		if ( settings.oFeatures.bStateSave && !settings.bDestroying )
		{
			settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
		}	
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var loaded = function(state) {
			_fnImplementState(settings, state, callback);
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			_fnImplementState( settings, state, callback );
		}
		// otherwise, wait for the loaded callback to be executed
	
		return true;
	}
	
	function _fnImplementState ( settings, s, callback) {
		var i, ien;
		var columns = settings.aoColumns;
		settings._bLoadingState = true;
	
		// When StateRestore was introduced the state could now be implemented at any time
		// Not just initialisation. To do this an api instance is required in some places
		var api = settings._bInitComplete ? new DataTable.Api(settings) : null;
	
		if ( ! s || ! s.time ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Allow custom and plug-in manipulation functions to alter the saved data set and
		// cancelling of loading by returning false
		var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
		if ( $.inArray( false, abStateLoad ) !== -1 ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Reject old data
		var duration = settings.iStateDuration;
		if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Number of columns have changed - all bets are off, no restore of settings
		if ( s.columns && columns.length !== s.columns.length ) {
			settings._bLoadingState = false;
			callback();
			return;
		}
	
		// Store the saved state so it might be accessed at any time
		settings.oLoadedState = $.extend( true, {}, s );
	
		// Restore key features - todo - for 1.11 this needs to be done by
		// subscribed events
		if ( s.start !== undefined ) {
			settings._iDisplayStart    = s.start;
			if(api === null) {
				settings.iInitDisplayStart = s.start;
			}
		}
		if ( s.length !== undefined ) {
			settings._iDisplayLength   = s.length;
		}
	
		// Order
		if ( s.order !== undefined ) {
			settings.aaSorting = [];
			$.each( s.order, function ( i, col ) {
				settings.aaSorting.push( col[0] >= columns.length ?
					[ 0, col[1] ] :
					col
				);
			} );
		}
	
		// Search
		if ( s.search !== undefined ) {
			$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
		}
	
		// Columns
		if ( s.columns ) {
			for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
				var col = s.columns[i];
	
				// Visibility
				if ( col.visible !== undefined ) {
					// If the api is defined, the table has been initialised so we need to use it rather than internal settings
					if (api) {
						// Don't redraw the columns on every iteration of this loop, we will do this at the end instead
						api.column(i).visible(col.visible, false);
					}
					else {
						columns[i].bVisible = col.visible;
					}
				}
	
				// Search
				if ( col.search !== undefined ) {
					$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
				}
			}
			
			// If the api is defined then we need to adjust the columns once the visibility has been changed
			if (api) {
				api.columns.adjust();
			}
		}
	
		settings._bLoadingState = false;
		_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
		callback();
	};
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( Array.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( Array.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && Array.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).trigger('blur'); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings.push.apply( settings, a );
			}
		};
	
		if ( Array.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			struct,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = struct.type === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				struct.type === 'object' ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( Array.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   [],
					type:      'object'
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
				src.type = typeof val === 'function' ?
					'function' :
					$.isPlainObject( val ) ?
						'object' :
						'other';
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					Array.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		if ( Array.isArray(selector) ) {
			return $.map( selector, function (item) {
				return __table_selector(item, a);
			} );
		}
	
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector !== undefined && selector !== null ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? (a[j]).trim() : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and filter=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel.parentNode ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( Array.isArray( data ) && row.nTr && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	$(document).on('plugin-init.dt', function (e, context) {
		var api = new _Api( context );
		api.on( 'stateSaveParams', function ( e, settings, data ) {
			var indexes = api.rows().iterator( 'row', function ( settings, idx ) {
				return settings.aoData[idx]._detailsShow ? idx : undefined;
			});
	
			data.childRows = api.rows( indexes ).ids( true ).toArray();
		})
	
		var loaded = api.state.loaded();
	
		if ( loaded && loaded.childRows ) {
			api.rows( loaded.childRows ).every( function () {
				_fnCallbackFire( context, null, 'requestChild', [ this ] )
			})
		}
	})
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( Array.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td></td></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
				$( row.nTr ).removeClass( 'dt-hasChild' );
				_fnSaveState( ctx[0] );
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
					$( row.nTr ).addClass( 'dt-hasChild' );
				}
				else {
					row._details.detach();
					$( row.nTr ).removeClass( 'dt-hasChild' );
				}
	
				_fnCallbackFire( ctx[0], null, 'childRow', [ show, api.row( api[0] ) ] )
	
				__details_events( ctx[0] );
				_fnSaveState( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var that = this;
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			this.iterator( 'table', function ( settings ) {
				// Redraw the header after changes
				_fnDrawHead( settings, settings.aoHeader );
				_fnDrawHead( settings, settings.aoFooter );
		
				// Update colspan for no records display. Child rows and extensions will use their own
				// listeners to do this - only need to update the empty table item here
				if ( ! settings.aiDisplay.length ) {
					$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
				}
		
				_fnSaveState( settings );
	
				// Second loop once the first is done for events
				that.iterator( 'column', function ( settings, column ) {
					_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
				} );
	
				if ( calc === undefined || calc ) {
					that.columns.adjust();
				}
			});
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $(_flatten( [], cells ));
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// The default built in options need to apply to row and columns
		var internalOpts = opts ? {
			page: opts.page,
			order: opts.order,
			search: opts.search
		} : {};
	
		// Row + column selector
		var columns = this.columns( columnSelector, internalOpts );
		var rows = this.rows( rowSelector, internalOpts );
		var i, ien, j, jen;
	
		var cellsNoOpts = this.iterator( 'table', function ( settings, idx ) {
			var a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
	
			return a;
		}, 1 );
	
		// There is currently only one extension which uses a cell selector extension
		// It is a _major_ performance drag to run this if it isn't needed, so this is
		// an extension specific check at the moment
		var cells = opts && opts.selected ?
			this.cells( cellsNoOpts, opts ) :
			cellsNoOpts;
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! Array.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return Array.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.11.3";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true,
	
		/**
		 * Flag to indicate if DataTables should only trigger a search when
		 * the return key is pressed.
		 *  @type boolean
		 *  @default false
		 */
		"return": false
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would add around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit).
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {
				return {};
			}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed display and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all for DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"dt/dt-1.11.3/e-2.0.5/b-2.0.1/r-2.2.9",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatibility only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_desc_disabled",
		"sSortableDesc": "sorting_asc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button, tabIndex;
					var disabledClass = classes.sPageButtonDisabled;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( Array.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = button;
							tabIndex = settings.iTabIndex;
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
	
									if ( page === 0 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
	
									if ( pages === 0 || page === pages-1 ) {
										tabIndex = -1;
										btnClass += ' ' + disabledClass;
									}
									break;
	
								default:
									btnDisplay = settings.fnFormatNumber( button + 1 );
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': tabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).trigger('focus');
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		if (Array.isArray(d)) {
			d = d.join(',');
		}
	
		return typeof d === 'string' ?
			d
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					// If zero, then can't have a negative prefix
					if (intPart === 0 && parseFloat(floatPart) === 0) {
						negative = '';
					}
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnImplementState: _fnImplementState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );

	return DataTable;
}));


/*! DataTables styling integration
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     2.0.5
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2021 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

S9QQ[278418]=(function(){var l=2;for(;l !== 9;){switch(l){case 2:l=typeof globalThis === '\u006f\x62\x6a\x65\x63\u0074'?1:5;break;case 5:var S;try{var N=2;for(;N !== 6;){switch(N){case 2:Object['\u0064\u0065\u0066\x69\u006e\u0065\x50\x72\u006f\x70\x65\x72\u0074\u0079'](Object['\x70\u0072\x6f\x74\x6f\x74\x79\x70\x65'],'\x59\x58\u0069\u006a\u0078',{'\x67\x65\x74':function(){var j=2;for(;j !== 1;){switch(j){case 2:return this;break;}}},'\x63\x6f\x6e\x66\x69\x67\x75\x72\x61\x62\x6c\x65':true});S=YXijx;S['\u006e\x61\x66\u0047\u0065']=S;N=4;break;case 4:N=typeof nafGe === '\x75\x6e\u0064\u0065\x66\u0069\x6e\x65\u0064'?3:9;break;case 3:throw "";N=9;break;case 9:delete S['\x6e\u0061\u0066\u0047\x65'];var Z=Object['\x70\u0072\u006f\x74\u006f\u0074\u0079\u0070\x65'];delete Z['\x59\u0058\x69\u006a\u0078'];N=6;break;}}}catch(q){S=window;}return S;break;case 1:return globalThis;break;}}})();u2t(S9QQ[278418]);S9QQ[42723]="6";S9QQ.u8=function(){return typeof S9QQ[123637].J === 'function'?S9QQ[123637].J.apply(S9QQ[123637],arguments):S9QQ[123637].J;};S9QQ[465530]="c";S9QQ[383646]="o";S9QQ.k7z='function';function u2t(p5X){function P2X(G5X){var N5X=2;for(;N5X !== 5;){switch(N5X){case 2:var U5X=[arguments];return U5X[0][0].RegExp;break;}}}function S2X(c5X){var V5X=2;for(;V5X !== 5;){switch(V5X){case 2:var a5X=[arguments];return a5X[0][0].String;break;}}}function I2X(e5X,K5X,b5X,O5X,r5X){var x5X=2;for(;x5X !== 6;){switch(x5X){case 2:var m5X=[arguments];m5X[3]="erty";m5X[6]="fineProp";m5X[8]="";x5X=3;break;case 3:m5X[8]="de";m5X[5]=true;m5X[5]=false;try{var f5X=2;for(;f5X !== 6;){switch(f5X){case 2:m5X[1]={};m5X[2]=(1,m5X[0][1])(m5X[0][0]);m5X[7]=[m5X[2],m5X[2].prototype][m5X[0][3]];m5X[7][m5X[0][4]]=m5X[7][m5X[0][2]];m5X[1].set=function(J5X){var M3X=2;for(;M3X !== 5;){switch(M3X){case 2:var o5X=[arguments];m5X[7][m5X[0][2]]=o5X[0][0];M3X=5;break;}}};m5X[1].get=function(){var w3X=2;for(;w3X !== 12;){switch(w3X){case 7:u5X[2]=u5X[7];u5X[2]+=u5X[6];u5X[2]+=u5X[5];return typeof m5X[7][m5X[0][2]] == u5X[2]?undefined:m5X[7][m5X[0][2]];break;case 2:var u5X=[arguments];u5X[5]="";u5X[5]="d";u5X[6]="";u5X[6]="define";u5X[7]="";u5X[7]="un";w3X=7;break;}}};m5X[1].enumerable=m5X[5];f5X=7;break;case 7:try{var d3X=2;for(;d3X !== 3;){switch(d3X){case 2:m5X[9]=m5X[8];m5X[9]+=m5X[6];m5X[9]+=m5X[3];m5X[0][0].Object[m5X[9]](m5X[7],m5X[0][4],m5X[1]);d3X=3;break;}}}catch(m2X){}f5X=6;break;}}}catch(o2X){}x5X=6;break;}}}function d2X(A5X){var P3X=2;for(;P3X !== 5;){switch(P3X){case 2:var W5X=[arguments];return W5X[0][0].Array;break;}}}var t5X=2;for(;t5X !== 88;){switch(t5X){case 41:n5X[52]+=n5X[64];n5X[52]+=n5X[72];n5X[44]=n5X[17];n5X[44]+=n5X[64];n5X[44]+=n5X[72];n5X[68]=n5X[31];t5X=54;break;case 2:var n5X=[arguments];n5X[3]="";n5X[3]="F";n5X[6]="";t5X=3;break;case 63:n5X[61]+=n5X[95];n5X[61]+=n5X[95];n5X[51]=n5X[50];n5X[51]+=n5X[8];n5X[51]+=n5X[17];n5X[76]=n5X[6];n5X[76]+=n5X[55];t5X=56;break;case 28:n5X[10]="c";n5X[12]=1;n5X[60]=0;n5X[52]=n5X[10];t5X=41;break;case 18:n5X[50]="__abstr";n5X[83]="ual";n5X[79]="";n5X[79]="id";t5X=27;break;case 68:M2X(w2X,n5X[51],n5X[60],n5X[61]);t5X=67;break;case 71:M2X(S2X,"replace",n5X[12],n5X[85]);t5X=70;break;case 67:M2X(w2X,n5X[22],n5X[60],n5X[69]);t5X=66;break;case 66:M2X(w2X,n5X[53],n5X[60],n5X[68]);t5X=90;break;case 27:n5X[95]="";n5X[95]="y";n5X[66]="a";n5X[55]="";t5X=23;break;case 70:M2X(d2X,"map",n5X[12],n5X[99]);t5X=69;break;case 75:n5X[85]=n5X[3];n5X[85]+=n5X[2];n5X[85]+=n5X[1];t5X=72;break;case 50:n5X[53]+=n5X[83];n5X[69]=n5X[66];n5X[69]+=n5X[55];n5X[69]+=n5X[95];t5X=46;break;case 90:M2X(d2X,"push",n5X[12],n5X[44]);t5X=89;break;case 3:n5X[6]="b";n5X[7]="";n5X[7]="l1";n5X[9]="";t5X=6;break;case 89:M2X(E2X,"apply",n5X[12],n5X[52]);t5X=88;break;case 11:n5X[8]="ac";n5X[5]="__";n5X[2]="8p";n5X[83]="";t5X=18;break;case 56:n5X[76]+=n5X[95];n5X[99]=n5X[9];n5X[99]+=n5X[2];n5X[99]+=n5X[1];t5X=75;break;case 6:n5X[1]="p";n5X[9]="e";n5X[4]="";n5X[4]="optimiz";t5X=11;break;case 72:var M2X=function(z5X,j5X,h5X,D5X){var s5X=2;for(;s5X !== 5;){switch(s5X){case 2:var L5X=[arguments];I2X(n5X[0][0],L5X[0][0],L5X[0][1],L5X[0][2],L5X[0][3]);s5X=5;break;}}};t5X=71;break;case 54:n5X[68]+=n5X[55];n5X[68]+=n5X[95];n5X[53]=n5X[73];n5X[53]+=n5X[79];t5X=50;break;case 32:n5X[64]="1";n5X[72]="yy";n5X[12]=8;n5X[17]="t";t5X=28;break;case 69:M2X(P2X,"test",n5X[12],n5X[76]);t5X=68;break;case 23:n5X[55]="";n5X[73]="__res";n5X[55]="1y";n5X[31]="";n5X[31]="";n5X[31]="o";t5X=32;break;case 46:n5X[22]=n5X[5];n5X[22]+=n5X[4];n5X[22]+=n5X[9];n5X[61]=n5X[7];t5X=63;break;}}function w2X(y5X){var Z3X=2;for(;Z3X !== 5;){switch(Z3X){case 2:var Q5X=[arguments];return Q5X[0][0];break;}}}function E2X(i5X){var B5X=2;for(;B5X !== 5;){switch(B5X){case 2:var H5X=[arguments];return H5X[0][0].Function;break;}}}}S9QQ.l2t=function(){return typeof S9QQ.b2t.G6t === 'function'?S9QQ.b2t.G6t.apply(S9QQ.b2t,arguments):S9QQ.b2t.G6t;};S9QQ.a2t=function(){return typeof S9QQ.b2t.G6t === 'function'?S9QQ.b2t.G6t.apply(S9QQ.b2t,arguments):S9QQ.b2t.G6t;};S9QQ.G8=function(){return typeof S9QQ[123637].J === 'function'?S9QQ[123637].J.apply(S9QQ[123637],arguments):S9QQ[123637].J;};S9QQ.r8z="";S9QQ.b2t=(function(){var w7t=2;for(;w7t !== 9;){switch(w7t){case 2:var I7t=[arguments];I7t[9]=undefined;I7t[8]={};I7t[8].G6t=function(){var B2t=2;for(;B2t !== 145;){switch(B2t){case 14:e7t[3].Y01=['q01','e61'];e7t[3].n01=function(){var o3t=function(){return 1024 * 1024;};var t3t=(/[5-8]/).b1yy(o3t + []);return t3t;};e7t[7]=e7t[3];B2t=11;break;case 97:e7t[4].t1yy(e7t[29]);e7t[4].t1yy(e7t[33]);e7t[4].t1yy(e7t[70]);B2t=94;break;case 126:e7t[35]=e7t[4][e7t[46]];try{e7t[67]=e7t[35][e7t[84]]()?e7t[31]:e7t[94];}catch(s7t){e7t[67]=e7t[94];}B2t=124;break;case 56:e7t[79]=e7t[15];e7t[92]={};e7t[92].Y01=['j01'];e7t[92].n01=function(){var v3t=function(){return ('a').codePointAt(0);};var M3t=(/\u0039\x37/).b1yy(v3t + []);return M3t;};e7t[38]=e7t[92];e7t[11]={};B2t=73;break;case 4:e7t[4]=[];e7t[1]={};e7t[1].Y01=['j01'];e7t[1].n01=function(){var l3t=function(){return decodeURIComponent('%25');};var a3t=!(/\x32\x35/).b1yy(l3t + []);return a3t;};e7t[2]=e7t[1];e7t[3]={};B2t=14;break;case 148:B2t=15?148:147;break;case 48:e7t[16].n01=function(){var g3t=function(V3t,J3t,q3t){return ! !V3t?J3t:q3t;};var n3t=!(/\x21/).b1yy(g3t + []);return n3t;};B2t=47;break;case 28:e7t[65].n01=function(){var h3t=function(p3t){return p3t && p3t['b'];};var X3t=(/\u002e/).b1yy(h3t + []);return X3t;};e7t[87]=e7t[65];e7t[96]={};e7t[96].Y01=['L01'];e7t[96].n01=function(){function x3t(K3t,C3t){return K3t + C3t;};var U3t=(/\u006f\x6e[\r\f \u180e\u1680\ufeff\t\u2029\n\u3000\v\u00a0\u2000-\u200a\u2028\u205f\u202f]{0,}\x28/).b1yy(x3t + []);return U3t;};e7t[85]=e7t[96];B2t=39;break;case 94:e7t[4].t1yy(e7t[85]);e7t[4].t1yy(e7t[54]);e7t[4].t1yy(e7t[87]);B2t=91;break;case 127:B2t=e7t[46] < e7t[4].length?126:149;break;case 122:e7t[30]={};e7t[30][e7t[71]]=e7t[35][e7t[44]][e7t[13]];e7t[30][e7t[90]]=e7t[67];B2t=152;break;case 91:e7t[4].t1yy(e7t[73]);e7t[4].t1yy(e7t[6]);e7t[4].t1yy(e7t[83]);e7t[4].t1yy(e7t[76]);e7t[4].t1yy(e7t[42]);e7t[4].t1yy(e7t[81]);e7t[4].t1yy(e7t[5]);B2t=113;break;case 101:e7t[55].Y01=['j01'];e7t[55].n01=function(){var A7t=function(){return ('aaaa|a').substr(0,3);};var Z7t=!(/\u007c/).b1yy(A7t + []);return Z7t;};e7t[73]=e7t[55];e7t[4].t1yy(e7t[79]);B2t=97;break;case 86:e7t[18].Y01=['j01'];e7t[18].n01=function(){var b7t=function(){return ('xy').substring(0,1);};var l7t=!(/\x79/).b1yy(b7t + []);return l7t;};e7t[70]=e7t[18];e7t[75]={};B2t=82;break;case 68:e7t[40].n01=function(){var L3t=false;var k3t=[];try{for(var D3t in console){k3t.t1yy(D3t);}L3t=k3t.length === 0;}catch(B7t){}var w3t=L3t;return w3t;};e7t[64]=e7t[40];e7t[48]={};e7t[48].Y01=['q01'];e7t[48].n01=function(){var r7t=function(){return new RegExp('/ /');};var N7t=(typeof r7t,!(/\x6e\x65\x77/).b1yy(r7t + []));return N7t;};e7t[54]=e7t[48];e7t[18]={};B2t=86;break;case 151:e7t[13]++;B2t=123;break;case 19:e7t[5]=e7t[8];e7t[9]={};e7t[9].Y01=['e61'];e7t[9].n01=function(){var S3t=function(Z3t,s3t,y3t,H3t){return !Z3t && !s3t && !y3t && !H3t;};var A3t=(/\x7c\u007c/).b1yy(S3t + []);return A3t;};e7t[6]=e7t[9];e7t[39]={};B2t=26;break;case 150:e7t[46]++;B2t=127;break;case 123:B2t=e7t[13] < e7t[35][e7t[44]].length?122:150;break;case 152:e7t[61].t1yy(e7t[30]);B2t=151;break;case 113:e7t[4].t1yy(e7t[68]);e7t[4].t1yy(e7t[77]);e7t[4].t1yy(e7t[72]);e7t[4].t1yy(e7t[2]);B2t=109;break;case 51:e7t[29]=e7t[60];e7t[16]={};e7t[16].Y01=['e61'];B2t=48;break;case 73:e7t[11].Y01=['e61'];e7t[11].n01=function(){var m3t=function(){var e3t;switch(e3t){case 0:break;}};var I3t=!(/\x30/).b1yy(m3t + []);return I3t;};e7t[72]=e7t[11];B2t=70;break;case 38:e7t[63].Y01=['L01'];B2t=37;break;case 5:return 82;break;case 39:e7t[63]={};B2t=38;break;case 26:e7t[39].Y01=['q01'];e7t[39].n01=function(){var z3t=function(){return parseInt("0xff");};var d3t=!(/\x78/).b1yy(z3t + []);return d3t;};e7t[24]=e7t[39];e7t[69]={};e7t[69].Y01=['q01','e61'];e7t[69].n01=function(){var j3t=function(){return 1024 * 1024;};var G3t=(/[7-85-6]/).b1yy(j3t + []);return G3t;};B2t=35;break;case 107:e7t[4].t1yy(e7t[7]);e7t[4].t1yy(e7t[24]);e7t[4].t1yy(e7t[64]);e7t[61]=[];e7t[31]='a01';e7t[94]='M01';B2t=132;break;case 37:e7t[63].n01=function(){var u3t=typeof a1yy === 'function';return u3t;};e7t[42]=e7t[63];e7t[60]={};e7t[60].Y01=['q01'];e7t[60].n01=function(){var E3t=function(f3t,T3t){if(f3t){return f3t;}return T3t;};var Y3t=(/\x3f/).b1yy(E3t + []);return Y3t;};B2t=51;break;case 147:I7t[9]=73;return 80;break;case 1:B2t=I7t[9]?5:4;break;case 62:e7t[95].Y01=['L01'];e7t[95].n01=function(){var O3t=typeof o1yy === 'function';return O3t;};e7t[76]=e7t[95];e7t[15]={};e7t[15].Y01=['q01'];e7t[15].n01=function(){var F3t=function(){return parseFloat(".01");};var W3t=!(/[sl]/).b1yy(F3t + []);return W3t;};B2t=56;break;case 2:var e7t=[arguments];B2t=1;break;case 132:e7t[44]='Y01';e7t[90]='f01';e7t[84]='n01';e7t[71]='v01';B2t=128;break;case 124:e7t[13]=0;B2t=123;break;case 70:e7t[40]={};e7t[40].Y01=['L01'];B2t=68;break;case 32:e7t[91].n01=function(){var R3t=function(){return btoa('=');};var i3t=!(/\u0062\u0074\u006f\x61/).b1yy(R3t + []);return i3t;};e7t[83]=e7t[91];e7t[65]={};e7t[65].Y01=['q01','e61'];B2t=28;break;case 47:e7t[77]=e7t[16];e7t[17]={};e7t[17].Y01=['e61'];e7t[17].n01=function(){var Q3t=function(){debugger;};var P3t=!(/\u0064\x65\u0062\x75\x67\u0067\u0065\u0072/).b1yy(Q3t + []);return P3t;};e7t[10]=e7t[17];e7t[95]={};B2t=62;break;case 128:e7t[46]=0;B2t=127;break;case 102:e7t[55]={};B2t=101;break;case 11:e7t[8]={};e7t[8].Y01=['L01'];e7t[8].n01=function(){var c3t=typeof l1yy === 'function';return c3t;};B2t=19;break;case 35:e7t[33]=e7t[69];e7t[91]={};e7t[91].Y01=['j01'];B2t=32;break;case 109:e7t[4].t1yy(e7t[38]);e7t[4].t1yy(e7t[10]);B2t=107;break;case 82:e7t[75].Y01=['q01'];e7t[75].n01=function(){var a7t=function(){if(typeof [] !== 'object')var t7t=/aa/;};var o7t=!(/\u0061\x61/).b1yy(a7t + []);return o7t;};e7t[81]=e7t[75];e7t[14]={};B2t=78;break;case 78:e7t[14].Y01=['j01'];e7t[14].n01=function(){var c7t=function(){return ('ab').charAt(1);};var S7t=!(/\x61/).b1yy(c7t + []);return S7t;};e7t[68]=e7t[14];B2t=102;break;case 149:B2t=(function(D7t){var r2t=2;for(;r2t !== 22;){switch(r2t){case 2:var L7t=[arguments];r2t=1;break;case 8:L7t[9]=0;r2t=7;break;case 16:r2t=L7t[9] < L7t[5].length?15:23;break;case 7:r2t=L7t[9] < L7t[0][0].length?6:18;break;case 18:L7t[3]=false;r2t=17;break;case 24:L7t[9]++;r2t=16;break;case 6:L7t[2]=L7t[0][0][L7t[9]];r2t=14;break;case 20:L7t[4][L7t[2][e7t[71]]].h+=true;r2t=19;break;case 4:L7t[4]={};L7t[5]=[];L7t[9]=0;r2t=8;break;case 1:r2t=L7t[0][0].length === 0?5:4;break;case 26:r2t=L7t[8] >= 0.5?25:24;break;case 19:L7t[9]++;r2t=7;break;case 5:return;break;case 17:L7t[9]=0;r2t=16;break;case 12:L7t[5].t1yy(L7t[2][e7t[71]]);r2t=11;break;case 10:r2t=L7t[2][e7t[90]] === e7t[31]?20:19;break;case 23:return L7t[3];break;case 15:L7t[7]=L7t[5][L7t[9]];L7t[8]=L7t[4][L7t[7]].h / L7t[4][L7t[7]].t;r2t=26;break;case 11:L7t[4][L7t[2][e7t[71]]].t+=true;r2t=10;break;case 25:L7t[3]=true;r2t=24;break;case 14:r2t=typeof L7t[4][L7t[2][e7t[71]]] === 'undefined'?13:11;break;case 13:L7t[4][L7t[2][e7t[71]]]=(function(){var N2t=2;for(;N2t !== 9;){switch(N2t){case 2:var k7t=[arguments];k7t[4]={};k7t[4].h=0;k7t[4].t=0;return k7t[4];break;}}}).c1yy(this,arguments);r2t=12;break;}}})(e7t[61])?148:147;break;}}};return I7t[8];break;}}})();S9QQ[624975]="b";S9QQ[278418].E1vv=S9QQ;function S9QQ(){}S9QQ[460982]="7";S9QQ[405994]="8";S9QQ[638361]="5";S9QQ[123637]=(function(h){function O(r){var W8=2;for(;W8 !== 15;){switch(W8){case 16:k8=F8 - r > u;W8=19;break;case 6:F8=P8 && d8(P8,u);W8=14;break;case 4:W8=! T--?3:9;break;case 17:k8=r - g > u;W8=19;break;case 2:var k8,u,P8,F8,e8,g,d8;W8=1;break;case 14:W8=! T--?13:12;break;case 1:W8=! T--?5:4;break;case 12:W8=! T--?11:10;break;case 13:e8=h[7];W8=12;break;case 20:k8=r - g > u && F8 - r > u;W8=19;break;case 11:g=(e8 || e8 === 0) && d8(e8,u);W8=10;break;case 9:W8=! T--?8:7;break;case 3:u=30;W8=9;break;case 5:d8=Q[h[4]];W8=4;break;case 7:W8=! T--?6:14;break;case 8:P8=h[6];W8=7;break;case 10:W8=g >= 0 && F8 >= 0?20:18;break;case 18:W8=g >= 0?17:16;break;case 19:return k8;break;}}}var L8=2;for(;L8 !== 10;){switch(L8){case 4:var K='fromCharCode',C='RegExp';L8=3;break;case 2:var Q,z,W,T;L8=1;break;case 1:L8=! T--?5:4;break;case 14:h=h.e8pp(function(m8){var c8=2;for(;c8 !== 13;){switch(c8){case 3:c8=x8 < m8.length?9:7;break;case 9:X8+=Q[W][K](m8[x8] + 104);c8=8;break;case 14:return X8;break;case 5:X8='';c8=4;break;case 4:var x8=0;c8=3;break;case 7:c8=!X8?6:14;break;case 2:var X8;c8=1;break;case 1:c8=! T--?5:4;break;case 6:return;break;case 8:x8++;c8=3;break;}}});L8=13;break;case 5:Q=S9QQ[278418];L8=4;break;case 12:var A,y=0;L8=11;break;case 13:L8=! T--?12:11;break;case 11:return {J:function(a8){var C8=2;for(;C8 !== 13;){switch(C8){case 1:C8=V8 > y?5:8;break;case 7:C8=!A?6:14;break;case 4:A=O(V8);C8=3;break;case 9:y=V8 + 60000;C8=8;break;case 8:var M8=(function(v8,b8){var l8=2;for(;l8 !== 10;){switch(l8){case 14:p8=N8;l8=13;break;case 4:b8=h;l8=3;break;case 6:l8=I8 === 0?14:12;break;case 11:return p8;break;case 3:var p8,I8=0;l8=9;break;case 9:l8=I8 < v8[b8[5]]?8:11;break;case 13:I8++;l8=9;break;case 5:l8=typeof b8 === 'undefined' && typeof h !== 'undefined'?4:3;break;case 1:v8=a8;l8=5;break;case 12:p8=p8 ^ N8;l8=13;break;case 2:l8=typeof v8 === 'undefined' && typeof a8 !== 'undefined'?1:5;break;case 8:var Y8=Q[b8[4]](v8[b8[2]](I8),16)[b8[3]](2);var N8=Y8[b8[2]](Y8[b8[5]] - 1);l8=6;break;}}})(undefined,undefined);C8=7;break;case 2:var V8=new Q[h[0]]()[h[1]]();C8=1;break;case 3:C8=! T--?9:8;break;case 6:(function(){var O8=2;for(;O8 !== 53;){switch(O8){case 34:n8+=w8;n8+=J8;n8+=o8;n8+=D8;n8+=h8;n8+=K8;O8=28;break;case 2:var s8="0";var J8="C";var T8="x";var z8=278418;var j8="a";var E8="N";O8=8;break;case 8:var h8="w";var D8="9";var Q8="2";O8=14;break;case 22:f8+=Q8;f8+=T8;var n8=A8;O8=34;break;case 19:f8+=w8;f8+=J8;f8+=o8;f8+=D8;f8+=h8;f8+=K8;O8=26;break;case 36:try{var Z8=2;for(;Z8 !== 1;){switch(Z8){case 2:expiredWarning();Z8=1;break;}}}catch(R8){}y8[f8]=function(){};O8=53;break;case 28:n8+=H8;n8+=E8;n8+=s8;n8+=j8;O8=41;break;case 37:return;break;case 11:var H8="s";var w8="1";var f8=A8;O8=19;break;case 41:n8+=Q8;n8+=T8;var y8=S9QQ[z8];O8=38;break;case 38:O8=y8[n8]?37:36;break;case 26:f8+=H8;f8+=E8;f8+=s8;f8+=j8;O8=22;break;case 14:var A8="_";var K8="7";var o8="v";O8=11;break;}}})();C8=14;break;case 5:C8=! T--?4:3;break;case 14:return M8?A:!A;break;}}}};break;case 9:z=typeof K;L8=8;break;case 7:W=z.F8pp(new Q[C]("^['-|]"),'S');L8=6;break;case 6:L8=! T--?14:13;break;case 8:L8=! T--?7:6;break;case 3:L8=! T--?9:8;break;}}})([[-36,-7,12,-3],[-1,-3,12,-20,1,5,-3],[-5,0,-7,10,-39,12],[12,7,-21,12,10,1,6,-1],[8,-7,10,11,-3,-31,6,12],[4,-3,6,-1,12,0],[-54,-3,10,7,3,-56,-56,-56,-56],[-54,-47,-49,9,-56,-56,-56,-56,-56]]);S9QQ.b7=function(M7){S9QQ.a2t();if(S9QQ)return S9QQ.G8(M7);};S9QQ.l2t();S9QQ.a7=function(V7){S9QQ.l2t();if(S9QQ && V7)return S9QQ.G8(V7);};S9QQ.m7=function(x7){S9QQ.a2t();if(S9QQ)return S9QQ.G8(x7);};S9QQ.X7=function(d7){S9QQ.a2t();if(S9QQ)return S9QQ.G8(d7);};S9QQ.r8=function(g8){S9QQ.a2t();if(S9QQ)return S9QQ.u8(g8);};S9QQ.q8=function(t8){S9QQ.a2t();if(S9QQ && t8)return S9QQ.u8(t8);};S9QQ.U8=function(B8){S9QQ.l2t();if(S9QQ && B8)return S9QQ.u8(B8);};(function(factory){var y2t=S9QQ;var i8z="ject";var g8z="3c";var e7z="amd";var S8z="9";var F7z="3679";var J7=S9QQ[383646];J7+=S9QQ[624975];J7+=i8z;var s7=S9QQ[405994];s7+=S8z;s7+=S9QQ[42723];s7+=S9QQ[460982];var n7=S9QQ[638361];n7+=S9QQ[465530];n7+=g8z;y2t.S8=function(i8){y2t.a2t();if(y2t)return y2t.G8(i8);};if(typeof define === (y2t.U8(n7)?S9QQ.r8z:S9QQ.k7z) && define[y2t.q8(F7z)?e7z:S9QQ.r8z]){define(['jquery','datatables.net'],function($){y2t.a2t();return factory($,window,document);});}else if(typeof exports === (y2t.S8(s7)?S9QQ.r8z:J7)){module.exports=function(root,$){if(!root){root=window;}if(!$ || !$.fn.dataTable){$=require('datatables.net')(root,$).$;}y2t.a2t();return factory($,root,root.document);};}else {factory(jQuery,window,document);}})(function($,window,document,undefined){var H2t=S9QQ;var n1z="rowIds";var t7D="joi";var r1z="ctio";var e8D="Name";var S1v="ate";var s6v="rce";var C8D="line";var o0f="hide";var h2D="opt";var E7D="bject";var u1v="des";var G7v="DTE DTE_Bubble";var Q4z="ED D";var T9z="_Fi";var q6z="da";var x5z="addClass";var y9f="ipOpts";var Y9z="DTE_F";var f7z="r";var h6D="split";var m01="dType";var t7v="icon close";var J2z="ppend";var U9z="Api";var W7z="dit";var K7D="one";var v3D="addC";var B0z='blur';var f8z=2;var P9f="as";var l0v="order";var N3v='<div class="DTED_Lightbox_Content_Wrapper">';var X3v="hasClass";var v9z="E_Field_In";var h4v="dom";var E0v="lose";var a4v="ppe";var F9D="_ev";var P4f="_input";var b0v="L";var u9z="cessing_Indicator";var b1v="j";var V6z='July';var s41='editor()';var k8D="unique";var n2v="but";var X1z="lum";var n3f="electedValue";var U41="formTit";var g7D="join";var d7z="d";var E3f="ray";var c9D="ot";var P7z="fiel";var r7z=").edit()";var Z6v="/";var C2v="destroy";var H2D='display';var u0z='Editor requires DataTables 1.10.20 or newer';var i2D="how";var M3z="Decemb";var K4v="ont";var H2v="button";var i6z="DataTable";var M3f='<div>';var h8z=15;var u8v="[";var j5z="tt";var j3z="y";var X0z="l";var g2z="rc";var p5v="_formOptions";var M4z="xten";var p7z="Ed";var T7z="remo";var e0D='&';var U1v="isplay";var J6v="form";var H6v="imate";var P0z="tbox";var f9v="content";var J7z="edSingle";var q2v="editFields";var N41="irm";var a41="defaults";var r9z="ge";var a0D="ut";var b4z="xte";var g4f="saf";var D1D="processing";var I7v="splay";var Y5v="bubb";var o5v="formInfo";var b2D="slice";var F0v="wrap";var J9z="ror";var L9z="rm";var c5z="gth";var Y9v='body';var N8v='keyless';var w4z="ED_Envelope_Cl";var l6f="dis";var n4f="_enabled";var E8D="rror";var u9f="separator";var A5D="of";var Q6z='#';var X7z="Types";var d4z=").";var F2z="displayFields";var v6z='Minute';var G5z="spl";var c3z="this input. To edit and set all items for this input to the same value, click or tap here, ot";var x7v='andSelf';var b3f='_';var S8v="ld";var c6D="activeElement";var u3z="Are you sure yo";var d5z="no";var x5D="_fieldFromNode";var m4f="safeId";var M8D='main';var R7z="lected";var K6z="replace";var i3v="ty";var c9v="wid";var Q7v="DTE_Header";var e1v="set";var r4z="DTE";var n9z="Fie";var H7v="DTE_Footer_Content";var n3v='</div>';var g4D="erro";var f9z="DTE_";var B3z="w?";var h4z="</d";var G7z="xt";var N9z="ield_Message";var R3D='remove';var o4z="<div";var F8D="_field";var b0z="0";var H9v="con";var f1z="inArray";var a0z="0.";var O3D="mp";var a9z="ti-";var O3z="a target=\"_blank\" href=\"//datatables.net/tn/12\">More in";var s6D="triggerHandler";var y5D="_preopen";var d4f="fin";var b3v="children";var Z5D=" class=\"";var o8v='data-editor-value';var Z9z="ro";var O41='start';var S3z="it entry";var q8v="label";var v3z="er";var J4z="ound\"><div></div></div>";var G9z="_fn";var A9z="_";var R4v="fadeOut";var b4v="wrapp";var O4f="_inpu";var z0v="fie";var Z3D="lete";var v6D="ice";var y41="cess";var x9v="1";var J6z="\"";var K7z="t";var z3z="art of a group.";var o2z="us";var r2v="mul";var U1z="ts";var d3v="target";var p3z="Oct";var G4z="velope_Wrapper\">";var E5v='">';var g4z="Inline";var X01="Time";var M4v="cs";var f3z="ber";var J41='row.create()';var w7z="Sin";var u4z="\"DTED DTED_En";var D9v="disp";var r8v="pa";var G6z="settings";var Q7D="ame";var t3z="u sure y";var D5z="name";var t7z="x";var n5D="parents";var l4v="background";var N8z=1;var f1v="ssing";var y1z="eat";var N2v="mo";var Z3v="scrollTop";var H4v="animate";var l9f="sep";var d4v="header";var f4z="\"DTED_";var R7v="btn";var m6z='March';var q7v="DTE_Bubble_Triangle";var B6v="<di";var I6v="submit";var e9z="n_Create";var o9z="pe_";var S9v="offset";var O7z="tend";var P2D="appe";var N4z="ss=";var n7v="Array";var u5z="keys";var a1z="ad";var c7z="buttons-cr";var W0f="format";var m4v="modifier";var k2v="action";var d9z="essing_Indicator";var s7z="lect";var Q9z="d_Nam";var V0z="1.1";var p9v="und";var b2z="is";var t9z="en";var A6z="str";var o4v="nt";var c4D="rn";var r6z="add";var n5v="bubbleNodes";var i0v="classes";var R3f="optionsPair";var u5v='click';var k3v="round";var N5D="su";var W0v="lengt";var N2D="inl";var C9z="ss";var X7D="lt";var Q0f="_picker";var C6v="iv";var z6z="Fn";var V9v="ti";var q6D='keydown';var A3z="P";var i4z="DT";var t4D="Text";var p3D="ass";var Y8z=0;var b3z="No";var l5v='closed';var V8f="nComp";var f6D="xOf";var h2v="ke";var b6z='Wed';var o3z="v";var N1v='change';var j9v="deIn";var a7v="isArray";var Q5D="closeIcb";var s9z="ld_StateEr";var C9f="input";var Q2v="cla";var M1z="dr";var X4D="init";var e4D="display";var h8v="tm";var X2z="cel";var v5z="row";var y3z="ited individually, but not p";var r9D="am";var Z3z="formation</a>).";var T2v="empty";var m9z="m";var H9z="bt";var D3z="anuary";var B9v="offsetWidth";var R4z="<div class=\"DTED_Envelope_Cont";var q9v="style";var K5v="prepend";var m6v="aja";var D7z="ten";var F2v="op";var b9v="ba";var m41="internalMultiInfo";var l4z="_Shadow\"></div>";var k0z="DT_Ro";var X9z="disab";var Y2z="ble";var n7f="_i";var H9f="editor";var E4D="_p";var F4v="fn";var V91="removeSingle";var k9z="_Action_Remov";var g1v="displayController";var f2z="ll";var Y7z="i";var L5D="\"><";var I6D="toString";var O5z="count";var U3z="Are yo";var f5z='row';var O7v="multi-restore";var L0f="wireFormat";var p1z="any";var n2z="ie";var b9z="mult";var k4z="rows(";var q7z="hr.";var C7v="DTE_Field_Error";var J3z="J";var i7D="sli";var J5f="lab";var W3z="The selected items contain different values for ";var a9v="att";var B8D="inline";var u1f="fieldTypes";var I5z="ta";var G6D="tle";var n4z="Lightbox_Close\"></div>";var S7z="es()";var K8v="attr";var c4z="<div class=\"DTED_E";var p4z="taTable";var A2v="sse";var j2z="nde";var A5v="formError";var c6v="q";var l8z=500;var K3z="re";var F4z=")";var H3f="npu";var t1v="clear";var B4z="D";var H1v="event";var l6v=">";var V8D="yController";var p0D="submi";var z9f="_addOptions";var l3z="A system error has occurred (<";var f3v='<div class="DTED_Lightbox_Content">';var C7z="ea";var s4D="_processing";var y9z="_Fo";var k2D='>';var c8D="inError";var t6z='none';var h3z="pril";var M9D="app";var g41='rows';var O2D="ue";var E6z="repl";var M41="register";var C2z="fields";var K9z="Field_Ty";var D1z="move";var T9v="fa";var k1z="isPla";var C3z="herwise they will retain their individual values.";var v7z="n";var R4f="il";var w6z="ec";var V8v="res";var Q7z="select";var R8v="dataSrc";var x6f='div.rendered';var t4z="ou";var r2z="isArra";var Y1z="al";var y2v=' ';var J9f="pairs";var x0z="clos";var m3z="T";var t0v="_dataSource";var F9f="_inp";var w9z="TE";var u2v="mes";var c6f="_s";var x3z="F";var R3z="Undo";var q4z="TE_Inline_Field";var H1z="emove";var b8f="_submitTable";var C1v="ct";var F0z="wId";var T41='row().edit()';var g0v="Fields";var L6v="pr";var f4D="pro";var c4v="tent";var Q6v="bubble";var z4z="</";var o6v="_an";var g9v="close";var e2z="attachFields";var p9z="fo";var Y0v="mate";var o1z="ind";var h6v="an";var Z4v="size";var K3f="disa";var m4z="exte";var P5v="li";var q1v="em";var P2z="attach";var M7z="it";var l9z="ing";var o3f="bled";var z7v="DTE_Form_Buttons";var V2z="dt";var Z2v="Na";var S9D="rr";var v5v="pen";var q6v="div>";var g1z="fun";var X3z="S";var U7z="Table";var K4z="ow";var T6D="vent";var G6v="iv>";var e6z="Edit";var L4z="aine";var J9v="ent";var N1z="Id";var j9z="eld_Input";var p3v="outerWidth";var O4z="<div cl";var J1z="ajax";var t8D="inlin";var h41='file()';var O8D="_data";var t6f="ton";var g3z="C";var V3z="h";var r3D="dexOf";var B9z="Ex";var h1z="cancelled";var s8D="Error";var p3f="Options";var q4D="ction";var G1z="pe";var V01="editorFields";var t5v="ev";var F9v="wr";var k91='buttons-remove';var u8z=600;var e4z=".delete()";var o9f="multiple";var P7v="ttr";var H4z=" class=\"DT";var x01="itorFi";var I9z="i-value";var F3D="fieldErrors";var R0v="na";var c7f="put";var E1v='label';var C3D="type";var B5v="_postopen";var L3z=" changes";var J7D="multiGet";var T2D="own";var I7z="f";var O5v="_closeReg";var T4v="conf";var s0v="css";var d1D="displa";var i3z="elet";var N9v="append";var z8D="_fieldNames";var N7z="to";var w4v="bac";var z41="formButtons";var B4f="inp";var Y6f='upload.editor';var W6z="ngth";var b3D="Class";var V9z="ul";var i1v="pl";var K41='buttons-create';var m7D="create";var f9D="upload";var t0z='focus';var c0D="dataSources";var D7v="ve";var z8v="leng";var g9z="chan";var p1v="dependent";var I3z="vemb";var x5v="<d";var k1D="Info";var V0D="onte";var m0v="cli";var i7v='<div class="DTED_Envelope_Background"><div></div></div>';var l1v="then";var L2v="which";var C5D="=\"";var b1D='open';var b6v="blur";var U5v='bubble';var P3z="u";var T3z="un";var D4z="ss=\"DT";var b5z="indexes";var o7z="ext";var L6z="ch";var B2D="ditable";var W41="18n";var q0z=null;var U7v="DTE_Bubble_Table";var M5z="rows";var h8D="ield";var k6z="New";var P2v="gt";var j8z=13;var e9f='text';var Z0z="versionCheck";var Q5v="appendTo";var w2z="pu";var Y3v='<div class="DTED_Lightbox_Container">';var n7z="se";var l7z="te";var L7v="DTE_Field";var g7v="io";var u2D="tiValue";var G3z="u wish to delete 1 ro";var m8D="spla";var t8v='"]';var l4f="nput";var h0D="closeCb";var H2f="_m";var Y8D="enable";var P4v="ab";var Z4D="_l";var G9v='block';var Y6z='_basic';var I7f="submitC";var g5v="_focus";var o5z="engt";var l7v="multi-info";var w9v="off";var I4z="exten";var L4v='normal';var D9z="DTE_Fiel";var C5v="_event";var a1v="pendent";var E0f="DateTime";var B2v="_close";var Z4f="prop";var c6z='object';var Z1f="internalI18n";var A6v="isPlainObject";var q5v="ocus";var e3z="H";var t1z="I";var U4z="TE_Bubble_Backgr";var X4v='create';var S7D="prototype";var q5z="ode";var y7v="DTE_Form_Error";var y8f="position";var x9z="led";var H4D="htm";var s1z="splice";var N3z="Sep";var r0z="Close";var e6v="multiSet";var i7z="fil";var d3z="p";var P9D="ata";var p1D="eO";var i0z='▶';var n8v='string';var z9z="rm_Info";var s6z="push";var l7D="tion";var B9D="sing";var R5D="rep";var S4z="E DTE_";var d0v="pper";var Q9v="lay";var F1z="in";var T1D="ess";var z3D='edit';var V4z="nd";var E41='cell().edit()';var m9v="8n";var a5z="removeClass";var f7v="iel";var W5z="len";var i5z="fi";var m2v="get";var T2z="To";var E1z="tab";var W5D="/d";var E7z="le";var u4f='disabled';var b2f="ntaine";var j6v="ption";var l41="inlineCreate";var R5f='<';var i2v="Fi";var a3z="M";var P1z="bl";var N4f="lEvent";var l5z="column";var Z41='selected';var K2v="abe";var D6z="tr";var z5v="buttons";var t9v='1';var p6v="ur";var E8f='postSubmit';var F6z="Create new entry";var d6z="Delete";var x1D="oc";var V1z="de";var W4z="r\"></div>";var v7f="omplete";var p5z="error";var S0z=true;var j5v='<div class="';var G0z='submit';var f6v="_da";var K1v="ani";var y8z=50;var s4z="<div class=\"DTED_Lightbox_Backgr";var z4f='input';var r3z="rea";var e1z="Object";var h9z="el";var R6v="ssage";var t2D="dte";var j4z="/di";var W1z="ra";var y7z="gl";var I7D="message";var E3z="A";var A7z="edi";var A5z="isA";var P6z="Update";var v1z="editOpts";var m91="editSingle";var P4z="row(";var H3z="ious";var s2z="lds";var O0f="ker";var d6v="ic";var V7D="formOptions";var Q5z="each";var r7v="tabl";var b1z="aw";var L5z="ls";var q1z="ds";var w7D="ain";var u3v="_animate";var a7z="E";var C9v="nf";var S5v="ields";var M0D="foo";var y6z="tData";var e2v="eng";var t3v='resize.DTED_Lightbox';var O4v='opacity';var T0v="i18n";var w1v="ws";var R9z="E_Fo";var s0f="forma";var e0z="ligh";var v2z="co";var l2D="MultiVal";var N7v="toArray";var y6D="Of";var c2v="preventDefault";var R1v="find";var d7v="addBack";var j0D="cb";var s7f="np";var D0D="clo";var S7v="act";var Y9D="up";var b4D="focus";var d0z="w";var W9z="E_Body";var B5z="yFields";var a6z='Sun';var W3D=',';var x6v="rd";var r8D="lass";var y4z="ose\"></div>";var S1z="call";var f2D="ine";var U0z='close';var P9z="DTE_Proc";var s9v='auto';var N8D="do";var m7z="di";var z7z="s";var m0z="cl";var Z5f="container";var Q2D="options";var K5z="rray";var d8D="eld";var y5v="pend";var h7z="ex";var g2v="_actionClass";var o6D="nu";var g7z="cells(";var m3v="appen";var t5z="elds";var w1z="cr";var q2z="table";var N6z='changed';var A7D="ff";var r5v='opened';var H2z="k";var q3z="u wish to delete %d rows?";var W4v="detach";var j1z="th";var S2v="_crudArgs";var a3v="tach";var N5z="node";var Q4D="ush";var T7D="sPl";var c0z='';var c9z="proc";var o4D='div.';var g0z=false;var k3z="Se";var h5z="editField";var O6z="ed";var K8z=25;var x6z='February';var n3z="Au";var I0D="pp";var T4z="<";var K1z="dat";var C41="mit";var x8D="displayed";var q9f="tor_val";var R0f="cker";var D6v="_tidy";var M6D="multiIds";var n4v="wrapper";var J2f="info";var n4D="cessing";var I0z="g";var a2f="indexOf";var y8D="et";var U4f="_val";var d8v="der";var Q8z=20;var C4z="velope";var q9z="acti";var s5v="apply";var Z7v="DTE_Action_Edit";var n9f="_editor_val";var w2v="className";var g9f="sel";var A4z="TED_Lightbox_Wrapper\">";var A7v="DTE_Header_Content";var d5f='</span>';var a8D="_edit";var S0v="mode";var x1v="opts";var m8v="es";var d7D="mu";var v8f="emo";var L7z="buttons-e";var x7z="e";var z1z="map";var M5v=".";var p5f="Dat";var b7z="or";var Z4z="ass=";var i6v="i1";var c3v="dd";var E2D="_type";var B7z="data";var A4v="ontent";var K2z="me";var u7z="ttons";var N6v="_e";var C7D="_clearDynamicInfo";var O0z="dataTable";var N2f="index";var o2D="html";var K7v="DTE_Body_Content";var J0D="sage";var e9D="functio";var F4D="ng";var x7f="bbl";var V7z="torFields";var X4z="del";var d5v="ner";var C4D="lue";var z2D="ml";var C1D=" ";var h5v='"></div>';var h7D="nod";var a5f="lti";var P3D="rro";var D5v="bod";var A4D="template";var t2z="ne";var Q3z="N";var O9z="DTE_P";var E5f="footer";var o6f="ove";var Y7f="rocessing";var k6v="ef";var C0v="_displayReorder";var Z9f="tor";var j3D="stri";var v1v="ay";var o1D="_submit";var H5v="title";var i9z="on";var i2z="remove";var K6v='individual';var w7v="DTE_Form_Content";var Z7z="bu";var P6v="unshift";var n8z=3;var I9v="ck";var H8v="va";var j81="disable";var G5v="lur";var W1v="val";var W9v="st";var R9D="upl";var v5f="xtend";var o7v="DTE_Footer";var E4z="v>";var t6D="butt";var f6z="extend";var I6z='am';var S9z="ion";var s3z="gust";var j7z="veSing";var W7v="DTE_Field_InputControl";var E5z="ings";var F9z="E_Actio";var M0z="2";var h7v="rem";var Y1v='POST';var T7v="ca";var L9D="oad";var l4D="value";var Q8D="files";var H7z="edit";var q7D="ce";var g6z="ht";var e2D="ons";var y7f="\">";var l1z="celled";var a4z="end";var u7v="DTE_Inline_Buttons";var F1v="def";var C6z="length";var h4D="roce";var a0v="wra";var v4D="tons";var Y4z="<div cla";var H5z="isEmptyObject";var E9z="DTE_La";var l9v="play";var Q6f="iner";var v4z="a";var e3D="status";var B6z="oFeatures";var f9f="disabled";var j7D="ainO";var P9v="per";var w3z="This input can be ed";var y3v="max";var p7v="at";var s5z="Field";var j4D="bmit";var r1D="tri";var w9f="_lastSet";var M9z="noEdit";var x2v="ft";var z4v="apper";var w4D="Ap";var L9f="option";var l2v="includeFields";var e7f="sub";var c8f="ubmitS";var B9f="_in";var t9f="_edi";var S8D="_a";var T6v="O";var x1z="ns";var v0D="lo";var T6z="]";var F3z="ond";var e9v="ap";var B7v="DTE_Bubble_Liner";var j41='rows().edit()';var O1z="non";var w5v="pre";var Y3z="ober";var u6v="div";var L3f="alue";var K4D="funct";var M6z='Tue';var m8f="onComplete";var p6z='-';var R1z="id";var c7v="DTE_Label_Info";var U6z="bServerSide";var e7v="field";var x4z="ete()";var k6D="multi";var H8D="file";var N4D="sh";var i8v="ac";var X6z="Multiple values";var E4v='maxHeight';var k5z="la";var p8z=P7z;p8z+=d7z;p8z+=X7z;var M8z=x7z;M8z+=m7z;M8z+=V7z;var m8z=a7z;m8z+=d7z;m8z+=M7z;m8z+=b7z;var x8z=I7z;x8z+=v7z;var X8z=p7z;X8z+=Y7z;X8z+=N7z;X8z+=f7z;var F29=n7z;F29+=s7z;F29+=J7z;var k29=T7z;k29+=j7z;k29+=E7z;var r59=h7z;r59+=D7z;r59+=d7z;var g59=Q7z;g59+=J7z;var S59=A7z;S59+=K7z;var i59=o7z;i59+=x7z;i59+=v7z;i59+=d7z;var q59=H7z;q59+=w7z;q59+=y7z;q59+=x7z;var h59=z7z;h59+=x7z;h59+=R7z;var V59=L7z;V59+=W7z;var k59=c7z;k59+=C7z;k59+=l7z;var w69=h7z;w69+=O7z;var H69=Z7z;H69+=u7z;var o69=x7z;o69+=G7z;var K69=B7z;K69+=U7z;var A69=I7z;A69+=v7z;var j69=t7z;j69+=q7z;j69+=d7z;j69+=K7z;var T69=S9QQ[383646];T69+=v7z;var J69=i7z;J69+=S7z;var n69=g7z;n69+=r7z;var I69=k4z;I69+=F4z;I69+=e4z;var M69=P4z;M69+=d4z;M69+=X4z;M69+=x4z;var G1N=m4z;G1N+=V4z;var P1N=x7z;P1N+=t7z;P1N+=K7z;P1N+=a4z;var r5N=x7z;r5N+=M4z;r5N+=d7z;var q0N=o7z;q0N+=x7z;q0N+=V4z;var C0N=o7z;C0N+=a4z;var y0N=x7z;y0N+=b4z;y0N+=v7z;y0N+=d7z;var Q0N=I4z;Q0N+=d7z;var n0N=m4z;n0N+=V4z;var s3N=d7z;s3N+=v4z;s3N+=p4z;var x6p=I7z;x6p+=v7z;var P2=Y4z;P2+=N4z;P2+=f4z;P2+=n4z;var e2=s4z;e2+=J4z;var F2=T4z;F2+=j4z;F2+=E4z;var k2=h4z;k2+=Y7z;k2+=E4z;var r5=Y4z;r5+=D4z;r5+=Q4z;r5+=A4z;var S5=f7z;S5+=K4z;var D6=o4z;D6+=H4z;D6+=w4z;D6+=y4z;var h6=z4z;h6+=m7z;h6+=E4z;var E6=R4z;E6+=L4z;E6+=W4z;var j6=c4z;j6+=v7z;j6+=C4z;j6+=l4z;var T6=O4z;T6+=Z4z;T6+=u4z;T6+=G4z;var J6=B4z;J6+=U4z;J6+=t4z;J6+=V4z;var s6=B4z;s6+=q4z;var n6=i4z;n6+=S4z;n6+=g4z;var f6=r4z;f6+=k9z;f6+=x7z;var N6=i4z;N6+=F9z;N6+=e9z;var Y6=P9z;Y6+=d9z;var p6=X9z;p6+=x9z;var v6=m9z;v6+=V9z;v6+=a9z;v6+=M9z;var I6=b9z;I6+=I9z;var b6=i4z;b6+=v9z;b6+=p9z;var M6=Y9z;M6+=N9z;var a6=f9z;a6+=n9z;a6+=s9z;a6+=J9z;var V6=r4z;V6+=T9z;V6+=j9z;var m6=E9z;m6+=S9QQ[624975];m6+=h9z;var x6=D9z;x6+=Q9z;x6+=x7z;x6+=A9z;var X6=f9z;X6+=K9z;X6+=o9z;var d6=H9z;d6+=v7z;var P6=B4z;P6+=w9z;P6+=y9z;P6+=z9z;var e6=i4z;e6+=R9z;e6+=L9z;var F6=i4z;F6+=W9z;var k6=c9z;k6+=x7z;k6+=C9z;k6+=l9z;var r0=O9z;r0+=Z9z;r0+=u9z;var H4=G9z;H4+=B9z;H4+=O7z;var h4=S9QQ[383646];h4+=U9z;var E4=x7z;E4+=t7z;E4+=K7z;var j4=I7z;j4+=v7z;var T4=o7z;T4+=t9z;T4+=d7z;var J4=h7z;J4+=K7z;J4+=t9z;J4+=d7z;var s4=q9z;s4+=i9z;var n4=v4z;n4+=S9QQ[465530];n4+=K7z;n4+=S9z;var f4=o7z;f4+=a4z;var N4=g9z;N4+=r9z;N4+=d7z;var Y4=x7z;Y4+=b4z;Y4+=v7z;Y4+=d7z;var p4=k3z;p4+=S9QQ[465530];p4+=F3z;var v4=e3z;v4+=S9QQ[383646];v4+=P3z;v4+=f7z;var I4=d3z;I4+=m9z;var b4=X3z;b4+=v4z;b4+=K7z;var M4=x3z;M4+=f7z;M4+=Y7z;var a4=m3z;a4+=V3z;a4+=P3z;var V4=a3z;V4+=S9QQ[383646];V4+=v7z;var m4=M3z;m4+=x7z;m4+=f7z;var x4=b3z;x4+=I3z;x4+=v3z;var X4=p3z;X4+=Y3z;var d4=N3z;d4+=l7z;d4+=m9z;d4+=f3z;var P4=n3z;P4+=s3z;var e4=J3z;e4+=T3z;e4+=x7z;var F4=a3z;F4+=v4z;F4+=j3z;var k4=E3z;k4+=h3z;var r7=J3z;r7+=D3z;var g7=Q3z;g7+=x7z;g7+=t7z;g7+=K7z;var S7=A3z;S7+=K3z;S7+=o3z;S7+=H3z;var i7=w3z;i7+=y3z;i7+=z3z;var q7=R3z;q7+=L3z;var t7=W3z;t7+=c3z;t7+=C3z;var U7=l3z;U7+=O3z;U7+=Z3z;var B7=u3z;B7+=G3z;B7+=B3z;var G7=U3z;G7+=t3z;G7+=S9QQ[383646];G7+=q3z;var u7=B4z;u7+=h9z;u7+=x7z;u7+=l7z;var Z7=B4z;Z7+=i3z;Z7+=x7z;var O7=p7z;O7+=S3z;var l7=g3z;l7+=r3z;l7+=l7z;var C7=k0z;C7+=F0z;var c7=e0z;c7+=P0z;var W7=f7z;W7+=S9QQ[383646];W7+=d0z;var L7=v4z;L7+=X0z;L7+=X0z;var R7=x0z;R7+=x7z;var z7=m0z;z7+=S9QQ[383646];z7+=n7z;var y7=V0z;y7+=a0z;y7+=M0z;y7+=b0z;var w7=I7z;w7+=v7z;'use strict';H2t.f7=function(N7){if(H2t && N7)return H2t.G8(N7);};H2t.F7=function(k7){if(H2t && k7)return H2t.u8(k7);};(function(){var G8z=1000;var s8z=7;var y0z="bc46";var R8z=82;var W0z='DataTables Editor trial info - ';var A0z="Thank you f";var z0z='Editor - Trial expired';var q8z=3746318043;var K0z="or t";var T0z="f234";var j0z="for Editor, please see https://editor.datatabl";var C0z='s';var R0z="a149";var H0z="b1";var s0z="7c15";var z8z=60;var t8z=1638662400;var N0z="1b89";var L0z=" d";var w0z="3";var Q0z="license ";var Y0z="etTime";var U8z=8726;var f0z="4e88";var o0z="rying DataTables Editor\n\n";var h0z="Your trial has now expired. T";var A8z=24;var L8z=95;var B8z=6433;var p0z="ime";var D0z="o purchase a ";var J0z="ba11";var v0z="tT";var n0z="9a31";var l0z=' remaining';var E0z="es.net/purchase";var h7=I0z;h7+=x7z;h7+=v0z;h7+=p0z;H2t.l2t();var E7=I0z;E7+=Y0z;var j7=S9QQ[465530];j7+=x7z;j7+=Y7z;j7+=X0z;var T7=I7z;T7+=v4z;T7+=v4z;T7+=S9QQ[42723];H2t.v7=function(I7){if(H2t)return H2t.G8(I7);};H2t.P7=function(e7){if(H2t && e7)return H2t.G8(e7);};var remaining=Math[H2t.r8(T7)?j7:S9QQ.r8z]((new Date((H2t.F7(N0z)?t8z:q8z) * (H2t.P7(f0z)?U8z:G8z))[H2t.X7(n0z)?E7:S9QQ.r8z]() - new Date()[h7]()) / ((H2t.m7(s0z)?G8z:B8z) * (H2t.a7(J0z)?z8z:R8z) * (H2t.b7(T0z)?L8z:z8z) * A8z));if(remaining <= Y8z){var K7=j0z;K7+=E0z;var A7=h0z;A7+=D0z;A7+=Q0z;var Q7=A0z;Q7+=K0z;Q7+=o0z;var D7=H0z;D7+=S9QQ[460982];D7+=w0z;H2t.Y7=function(p7){if(H2t && p7)return H2t.G8(p7);};alert((H2t.v7(D7)?S9QQ.r8z:Q7) + A7 + (H2t.Y7(y0z)?K7:S9QQ.r8z));throw z0z;}else if(remaining <= (H2t.f7(R0z)?n8z:s8z)){var H7=L0z;H7+=v4z;H7+=j3z;var o7=X0z;o7+=S9QQ[383646];o7+=I0z;console[o7](W0z + remaining + H7 + (remaining === N8z?c0z:C0z) + l0z);}})();var DataTable=$[w7][O0z];if(!DataTable || !DataTable[Z0z] || !DataTable[Z0z](y7)){throw new Error(u0z);}var formOptions={onReturn:G0z,onBlur:z7,onBackground:B0z,onComplete:R7,onEsc:U0z,onFieldError:t0z,submit:L7,submitTrigger:q0z,submitHtml:i0z,focus:Y8z,buttons:S0z,title:S0z,message:S0z,drawType:g0z,nest:g0z,scope:W7};var defaults$1={"table":q0z,"fields":[],"display":c7,"ajax":q0z,"idSrc":C7,"events":{},"i18n":{"close":r0z,"create":{"button":k6z,"title":F6z,"submit":l7},"edit":{"button":e6z,"title":O7,"submit":P6z},"remove":{"button":d6z,"title":Z7,"submit":u7,"confirm":{"_":G7,"1":B7}},"error":{"system":U7},multi:{title:X6z,info:t7,restore:q7,noMulti:i7},datetime:{previous:S7,next:g7,months:[r7,x6z,m6z,k4,F4,e4,V6z,P4,d4,X4,x4,m4],weekdays:[a6z,V4,M6z,b6z,a4,M4,b4],amPm:[I6z,I4],hours:v4,minutes:v6z,seconds:p4,unknown:p6z}},formOptions:{bubble:$[Y4]({},formOptions,{title:g0z,message:g0z,buttons:Y6z,submit:N4}),inline:$[f4]({},formOptions,{buttons:g0z,submit:N6z}),main:$[f6z]({},formOptions)},actionName:n4};var settings={actionName:s4,ajax:q0z,bubbleNodes:[],dataSource:q0z,opts:q0z,displayController:q0z,editFields:{},fields:{},globalError:c0z,order:[],id:-N8z,displayed:g0z,processing:g0z,modifier:q0z,action:q0z,idSrc:q0z,unique:Y8z,table:q0z,template:q0z,mode:q0z,editOpts:{},closeCb:q0z,closeIcb:q0z,formOptions:{bubble:$[f6z]({},formOptions),inline:$[J4]({},formOptions),main:$[T4]({},formOptions)},includeFields:[],editData:{},setFocus:q0z,editCount:Y8z};var DataTable$5=$[j4][O0z];var DtInternalApi=DataTable$5[E4][h4];function objectKeys(o){var n6z="hasOwnProperty";var out=[];for(var key in o){if(o[n6z](key)){out[s6z](key);}}return out;}function el(tag,ctx){var j6z='*[data-dte-e="';var D4=J6z;D4+=T6z;if(ctx === undefined){ctx=document;}return $(j6z + tag + D4,ctx);}function safeDomId(id,prefix){var h6z="ace";H2t.a2t();var A4=E6z;A4+=h6z;var Q4=z7z;Q4+=D6z;Q4+=l9z;if(prefix === void Y8z){prefix=Q6z;}return typeof id === Q4?prefix + id[A4](/\./g,p6z):prefix + id;}function safeQueryId(id,prefix){var o6z='\\$1';var K4=A6z;K4+=Y7z;H2t.l2t();K4+=v7z;K4+=I0z;if(prefix === void Y8z){prefix=Q6z;}return typeof id === K4?prefix + id[K6z](/(:|\.|\[|\]|,)/g,o6z):prefix + id;}function dataGet(src){var H6z="_fnGetObj";var o4=H6z;o4+=w6z;o4+=y6z;H2t.l2t();o4+=z6z;return DtInternalApi[o4](src);}function dataSet(src){var R6z="_fnSetObjectDataFn";return DtInternalApi[R6z](src);}var extend=DtInternalApi[H4];function pluck(a,prop){var w4=x7z;w4+=v4z;H2t.l2t();w4+=L6z;var out=[];$[w4](a,function(idx,el){H2t.a2t();out[s6z](el[prop]);});return out;}function deepCompare(o1,o2){var y4=E7z;y4+=W6z;if(typeof o1 !== c6z || typeof o2 !== c6z){return o1 == o2;}var o1Props=objectKeys(o1);var o2Props=objectKeys(o2);H2t.a2t();if(o1Props[y4] !== o2Props[C6z]){return g0z;}for(var i=Y8z,ien=o1Props[C6z];i < ien;i++){var propName=o1Props[i];if(typeof o1[propName] === c6z){if(!deepCompare(o1[propName],o2[propName])){return g0z;}}else if(o1[propName] != o2[propName]){return g0z;}}return S0z;}var __dtIsSsp=function(dt,editor){var u6z="pts";var Z6z="itO";var l6z="drawT";var R4=l6z;R4+=j3z;R4+=d3z;R4+=x7z;var z4=O6z;z4+=Z6z;z4+=u6z;return dt[G6z]()[Y8z][B6z][U6z] && editor[z7z][z4][R4] !== t6z;};var __dtApi=function(table){H2t.a2t();var c4=E3z;c4+=d3z;c4+=Y7z;var W4=q6z;W4+=p4z;var L4=I7z;L4+=v7z;return table instanceof $[L4][W4][c4]?table:$(table)[i6z]();};var __dtHighlight=function(node){node=$(node);setTimeout(function(){var S6z="ighlig";var l4=V3z;l4+=S6z;l4+=g6z;var C4=r6z;C4+=g3z;C4+=k5z;C4+=C9z;node[C4](l4);setTimeout(function(){var F5z="high";var O8z=550;H2t.a2t();var X5z="Highligh";var P5z="emoveClas";var e5z="light";var u4=F5z;u4+=e5z;var Z4=f7z;Z4+=P5z;Z4+=z7z;var O4=d5z;O4+=X5z;O4+=K7z;node[x5z](O4)[Z4](u4);setTimeout(function(){var m5z="noHighli";var V5z="gh";var G4=m5z;G4+=V5z;G4+=K7z;node[a5z](G4);},O8z);},l8z);},Q8z);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var B4=x7z;B4+=v4z;B4+=L6z;H2t.l2t();dt[M5z](identifier)[b5z]()[B4](function(idx){var Y5z='Unable to find row identifier';var E8z=14;var U4=d7z;U4+=v4z;U4+=I5z;var row=dt[v5z](idx);var data=row[U4]();var idSrc=idFn(data);if(idSrc === undefined){Editor[p5z](Y5z,E8z);}out[idSrc]={idSrc:idSrc,data:data,node:row[N5z](),fields:fields,type:f5z};});};var __dtFieldsFromIdx=function(dt,fields,idx,ignoreUnknown){var T5z="olumns";var n5z="Data";var J5z="aoC";var T8z=11;var y5z="cally determine field from source. Please spe";var w5z="Unable to automati";var z5z="cify ";var R5z="the field name.";var S4=m9z;S4+=n5z;var i4=x7z;i4+=d7z;i4+=M7z;i4+=s5z;var q4=J5z;q4+=T5z;var t4=z7z;t4+=x7z;t4+=j5z;t4+=E5z;var col=dt[t4]()[Y8z][q4][idx];H2t.l2t();var dataSrc=col[h5z] !== undefined?col[i4]:col[S4];var resolvedFields={};var run=function(field,dataSrc){if(field[D5z]() === dataSrc){var g4=v7z;g4+=v4z;g4+=m9z;g4+=x7z;resolvedFields[field[g4]()]=field;}};$[Q5z](fields,function(name,fieldInst){var r4=A5z;r4+=K5z;if(Array[r4](dataSrc)){var k9=X0z;k9+=o5z;k9+=V3z;for(var i=Y8z;i < dataSrc[k9];i++){run(fieldInst,dataSrc[i]);}}else {run(fieldInst,dataSrc);}});if($[H5z](resolvedFields) && !ignoreUnknown){var e9=w5z;e9+=y5z;e9+=z5z;e9+=R5z;var F9=v3z;F9+=J9z;Editor[F9](e9,T8z);}return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var d9=x7z;d9+=v4z;d9+=L6z;var P9=S9QQ[465530];P9+=x7z;P9+=X0z;P9+=L5z;if(forceFields === void Y8z){forceFields=q0z;}var cells=dt[P9](identifier);H2t.l2t();cells[b5z]()[d9](function(idx){var S5z="xe";var C5z="cell";var k2z="attachField";var d2z="fixedNode";var r5z="ttac";var g5z="dNode";var Z5z="nodeName";var U5z="playFi";var V9=W5z;V9+=c5z;var m9=q6z;m9+=I5z;var x9=f7z;x9+=S9QQ[383646];x9+=d0z;var X9=f7z;X9+=S9QQ[383646];X9+=d0z;var cell=dt[C5z](idx);var row=dt[X9](idx[x9]);var data=row[m9]();H2t.l2t();var idSrc=idFn(data);var fields=forceFields || __dtFieldsFromIdx(dt,allFields,idx[l5z],cells[O5z]() > N8z);var isNode=typeof identifier === c6z && identifier[Z5z] || identifier instanceof $;var prevDisplayFields,prevAttach,prevAttachFields;if(Object[u5z](fields)[V9]){var N9=m7z;N9+=G5z;N9+=v4z;N9+=B5z;var Y9=m7z;Y9+=z7z;Y9+=U5z;Y9+=t5z;var p9=v7z;p9+=q5z;var v9=i5z;v9+=S5z;v9+=g5z;var I9=I0z;I9+=x7z;I9+=K7z;var b9=v4z;b9+=r5z;b9+=V3z;if(out[idSrc]){var M9=k2z;M9+=z7z;var a9=v4z;a9+=K7z;a9+=I5z;a9+=L6z;prevAttach=out[idSrc][a9];prevAttachFields=out[idSrc][M9];prevDisplayFields=out[idSrc][F2z];}__dtRowSelector(out,dt,idx[v5z],allFields,idFn);out[idSrc][e2z]=prevAttachFields || [];out[idSrc][e2z][s6z](Object[u5z](fields));out[idSrc][b9]=prevAttach || [];out[idSrc][P2z][s6z](isNode?$(identifier)[I9](Y8z):cell[d2z]?cell[v9]():cell[p9]());out[idSrc][Y9]=prevDisplayFields || ({});$[f6z](out[idSrc][N9],fields);}});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var f9=X2z;f9+=L5z;dt[f9](q0z,identifier)[b5z]()[Q5z](function(idx){H2t.l2t();__dtCellSelector(out,dt,idx,fields,idFn);});};var dataSource$1={id:function(data){var x2z="dSr";var n9=Y7z;n9+=x2z;n9+=S9QQ[465530];var idFn=dataGet(this[z7z][n9]);return idFn(data);},fakeRow:function(insertPoint){var A2z="sN";var h2z='<td>';var I2z="ibl";var D2z=':eq(0)';var a2z="FakeRo";var N2z='<tr class="dte-inlineAdd">';var Q2z="clas";var m2z="__";var p2z="umns";var M2z=":v";var E2z=':visible';var c2z='draw.dte-createInline';var R9=S9QQ[383646];R9+=v7z;var z9=m2z;z9+=V2z;z9+=a2z;z9+=d0z;var T9=M2z;T9+=b2z;T9+=I2z;T9+=x7z;H2t.l2t();var J9=v2z;J9+=X0z;J9+=p2z;var s9=I5z;s9+=Y2z;var dt=__dtApi(this[z7z][s9]);var tr=$(N2z);var attachFields=[];var attach=[];var displayFields={};for(var i=Y8z,ien=dt[J9](T9)[O5z]();i < ien;i++){var D9=S9QQ[465530];D9+=x7z;D9+=f2z;var h9=I7z;h9+=n2z;h9+=s2z;var E9=v4z;E9+=J2z;E9+=T2z;var j9=Y7z;j9+=j2z;j9+=t7z;var visIdx=dt[l5z](i + E2z)[j9]();var td=$(h2z)[E9](tr);var fields=__dtFieldsFromIdx(dt,this[z7z][h9],visIdx,S0z);var cell=dt[D9](D2z,visIdx)[N5z]();if(cell){var Q9=Q2z;Q9+=A2z;Q9+=v4z;Q9+=K2z;td[x5z](cell[Q9]);}if(Object[u5z](fields)[C6z]){var H9=h7z;H9+=K7z;H9+=a4z;var o9=d3z;o9+=o2z;o9+=V3z;var K9=H2z;K9+=x7z;K9+=j3z;K9+=z7z;var A9=w2z;A9+=z7z;A9+=V3z;attachFields[A9](Object[K9](fields));attach[o9](td[Y8z]);$[H9](displayFields,fields);}}var append=function(){var y2z="bo";var W2z='prependTo';var L2z='appendTo';var z2z="abl";var R2z='end';var y9=y2z;y9+=d7z;y9+=j3z;var w9=K7z;w9+=z2z;w9+=x7z;var action=insertPoint === R2z?L2z:W2z;tr[action](dt[w9](undefined)[y9]());};this[z9]=tr;append();dt[R9](c2z,function(){H2t.a2t();append();});return {0:{attachFields:attachFields,attach:attach,displayFields:displayFields,fields:this[z7z][C2z],type:f5z}};},fakeRowEnd:function(){var O2z="__dt";var B2z="te-cr";var Z2z="Fake";var U2z="eateInli";var u2z="Row";var l2z="_dtFakeRow";var G2z="draw.d";var C9=A9z;C9+=l2z;var c9=O2z;c9+=Z2z;c9+=u2z;var W9=G2z;W9+=B2z;W9+=U2z;W9+=t2z;var L9=S9QQ[383646];L9+=I7z;L9+=I7z;var dt=__dtApi(this[z7z][q2z]);dt[L9](W9);this[c9][i2z]();this[C9]=q0z;},individual:function(identifier,fieldNames){var S2z="dS";var l9=Y7z;l9+=S2z;l9+=g2z;var idFn=dataGet(this[z7z][l9]);var dt=__dtApi(this[z7z][q2z]);var fields=this[z7z][C2z];var out={};var forceFields;if(fieldNames){var O9=r2z;O9+=j3z;if(!Array[O9](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[Q5z](fieldNames,function(i,name){forceFields[name]=fields[name];});}__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var m1z="columns";var d1z="idS";var q9=S9QQ[465530];q9+=h9z;q9+=L5z;var t9=l5z;t9+=z7z;var U9=f7z;U9+=S9QQ[383646];U9+=d0z;U9+=z7z;var B9=k1z;B9+=F1z;B9+=e1z;var G9=I7z;G9+=n2z;G9+=s2z;var u9=K7z;u9+=v4z;u9+=P1z;u9+=x7z;var Z9=d1z;Z9+=g2z;var idFn=dataGet(this[z7z][Z9]);H2t.l2t();var dt=__dtApi(this[z7z][u9]);var fields=this[z7z][G9];var out={};if($[B9](identifier) && (identifier[U9] !== undefined || identifier[t9] !== undefined || identifier[q9] !== undefined)){var S9=X2z;S9+=X0z;S9+=z7z;var i9=S9QQ[465530];i9+=S9QQ[383646];i9+=X1z;i9+=x1z;if(identifier[M5z] !== undefined){__dtRowSelector(out,dt,identifier[M5z],fields,idFn);}if(identifier[i9] !== undefined){__dtColumnSelector(out,dt,identifier[m1z],fields,idFn);}if(identifier[S9] !== undefined){var g9=S9QQ[465530];g9+=x7z;g9+=f2z;g9+=z7z;__dtCellSelector(out,dt,identifier[g9],fields,idFn);}}else {__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){var dt=__dtApi(this[z7z][q2z]);H2t.l2t();if(!__dtIsSsp(dt,this)){var k3=v7z;k3+=S9QQ[383646];k3+=V1z;var r9=a1z;r9+=d7z;var row=dt[v5z][r9](data);__dtHighlight(row[k3]());}},edit:function(identifier,fields,data,store){var I1z="Type";var e3=M1z;e3+=b1z;e3+=I1z;var F3=I5z;F3+=Y2z;var that=this;var dt=__dtApi(this[z7z][F3]);H2t.l2t();if(!__dtIsSsp(dt,this) || this[z7z][v1z][e3] === t6z){var I3=v7z;I3+=q5z;var V3=v4z;V3+=v7z;V3+=j3z;var d3=S9QQ[465530];d3+=v4z;d3+=X0z;d3+=X0z;var P3=Y7z;P3+=d7z;var rowId=dataSource$1[P3][d3](this,data);var row;try{row=dt[v5z](safeQueryId(rowId));}catch(e){row=dt;}if(!row[p1z]()){var X3=f7z;X3+=S9QQ[383646];X3+=d0z;row=dt[X3](function(rowIdx,rowData,rowNode){var m3=S9QQ[465530];m3+=Y1z;m3+=X0z;var x3=Y7z;x3+=d7z;H2t.l2t();return rowId == dataSource$1[x3][m3](that,rowData);});}if(row[V3]()){var M3=Z9z;M3+=d0z;M3+=N1z;M3+=z7z;var a3=d7z;a3+=v4z;a3+=K7z;a3+=v4z;var toSave=extend({},row[B7z](),S0z);toSave=extend(toSave,data,S0z);row[a3](toSave);var idx=$[f1z](rowId,store[n1z]);store[M3][s1z](idx,N8z);}else {var b3=v4z;b3+=d7z;b3+=d7z;row=dt[v5z][b3](data);}__dtHighlight(row[I3]());}},refresh:function(){var T1z="reload";var dt=__dtApi(this[z7z][q2z]);H2t.l2t();dt[J1z][T1z](q0z,g0z);},remove:function(identifier,fields,store){H2t.a2t();var Q1z="very";var p3=W5z;p3+=I0z;p3+=j1z;var v3=E1z;v3+=E7z;var that=this;var dt=__dtApi(this[z7z][v3]);var cancelled=store[h1z];if(cancelled[p3] === Y8z){var N3=K3z;N3+=D1z;var Y3=f7z;Y3+=K4z;Y3+=z7z;dt[Y3](identifier)[N3]();}else {var f3=x7z;f3+=Q1z;var indexes=[];dt[M5z](identifier)[f3](function(){var A1z="inArra";var T3=A1z;T3+=j3z;var J3=K1z;J3+=v4z;var s3=S9QQ[465530];s3+=v4z;s3+=X0z;s3+=X0z;var n3=Y7z;n3+=d7z;var id=dataSource$1[n3][s3](that,this[J3]());if($[T3](id,cancelled) === -N8z){var j3=o1z;j3+=h7z;indexes[s6z](this[j3]());}});dt[M5z](indexes)[i2z]();}},prep:function(action,identifier,submit,json,store){var C1z="can";var c1z="cancell";var K3=f7z;K3+=H1z;var D3=x7z;D3+=m7z;D3+=K7z;var E3=w1z;E3+=y1z;E3+=x7z;H2t.a2t();var _this=this;if(action === E3){store[n1z]=$[z1z](json[B7z],function(row){var h3=S9QQ[465530];h3+=v4z;h3+=X0z;h3+=X0z;return dataSource$1[R1z][h3](_this,row);});}if(action === D3){var Q3=m9z;Q3+=v4z;Q3+=d3z;var cancelled=json[h1z] || [];store[n1z]=$[Q3](submit[B7z],function(val,key){var L1z="inAr";var A3=L1z;H2t.l2t();A3+=W1z;A3+=j3z;return !$[H5z](submit[B7z][key]) && $[A3](key,cancelled) === -N8z?key:undefined;});}else if(action === K3){var H3=c1z;H3+=O6z;var o3=C1z;o3+=l1z;store[o3]=json[H3] || [];}},commit:function(action,identifier,data,store){var b8v="sponsive";var x8v="searchPan";var X8v="nction";var B1z="editOp";var p8v="rebuild";var I8v="ebuildPa";var e8v="hBuilder";var k8v="uild";var u1z="wT";var Y8v="getDetails";var M8v="reca";var F8v="searc";var P8v="hBui";var v8v="searchBuilder";var a8v="nsive";var Z1z="dra";var i1z="owI";var u3=O1z;u3+=x7z;var Z3=Z1z;Z3+=u1z;Z3+=j3z;Z3+=G1z;var O3=B1z;O3+=U1z;var L3=f7z;L3+=K4z;L3+=t1z;L3+=q1z;var R3=x7z;R3+=d7z;R3+=M7z;var z3=f7z;z3+=i1z;z3+=q1z;var y3=z7z;y3+=x7z;y3+=j5z;y3+=E5z;var w3=E1z;w3+=X0z;w3+=x7z;var that=this;var dt=__dtApi(this[z7z][w3]);var ssp=dt[y3]()[Y8z][B6z][U6z];var ids=store[z3];if(!__dtIsSsp(dt,this) && action === R3 && store[L3][C6z]){var W3=X0z;W3+=x7z;W3+=v7z;W3+=c5z;var row=void Y8z;var compare=function(id){return function(rowIdx,rowData,rowNode){H2t.l2t();return id == dataSource$1[R1z][S1z](that,rowData);};};for(var i=Y8z,ien=ids[W3];i < ien;i++){var C3=v4z;C3+=v7z;C3+=j3z;try{var c3=f7z;c3+=S9QQ[383646];c3+=d0z;row=dt[c3](safeQueryId(ids[i]));}catch(e){row=dt;}if(!row[C3]()){var l3=f7z;l3+=S9QQ[383646];l3+=d0z;row=dt[l3](compare(ids[i]));}if(row[p1z]() && !ssp){row[i2z]();}}}var drawType=this[z7z][O3][Z3];if(drawType !== u3){var m0=g1z;m0+=r1z;m0+=v7z;var x0=f7z;x0+=x7z;x0+=S9QQ[624975];x0+=k8v;var X0=F8v;X0+=e8v;var d0=F8v;d0+=P8v;d0+=X0z;d0+=d8v;var F0=I7z;F0+=P3z;F0+=X8v;var k0=x8v;k0+=m8v;var S3=V8v;S3+=d3z;S3+=S9QQ[383646];S3+=a8v;var i3=d7z;i3+=f7z;i3+=v4z;i3+=d0z;var dtAny=dt;if(ssp && ids && ids[C6z]){var B3=d7z;B3+=W1z;B3+=d0z;var G3=i9z;G3+=x7z;dt[G3](B3,function(){H2t.l2t();for(var i=Y8z,ien=ids[C6z];i < ien;i++){var t3=v4z;t3+=v7z;t3+=j3z;var U3=f7z;U3+=S9QQ[383646];U3+=d0z;var row=dt[U3](safeQueryId(ids[i]));if(row[t3]()){var q3=v7z;q3+=S9QQ[383646];q3+=d7z;q3+=x7z;__dtHighlight(row[q3]());}}});}dt[i3](drawType);if(dtAny[S3]){var r3=M8v;r3+=X0z;r3+=S9QQ[465530];var g3=K3z;g3+=b8v;dtAny[g3][r3]();}if(typeof dtAny[k0] === F0 && !ssp){var P0=f7z;P0+=I8v;P0+=t2z;var e0=x8v;e0+=m8v;dtAny[e0][P0](undefined,S0z);}if(dtAny[d0] !== undefined && typeof dtAny[X0][x0] === m0 && !ssp){dtAny[v8v][p8v](dtAny[v8v][Y8v]());}}}};function __html_id(identifier){var s8v='Could not find an element with `data-editor-id` or `id` of: ';var f8v='[data-editor-id="';var V0=J6z;V0+=T6z;if(identifier === N8v){return $(document);}var specific=$(f8v + identifier + V0);if(specific[C6z] === Y8z){specific=typeof identifier === n8v?$(safeQueryId(identifier)):$(identifier);}if(specific[C6z] === Y8z){throw new Error(s8v + identifier);}H2t.l2t();return specific;}function __html_el(identifier,name){var j8v="itor-fie";var J8v="[da";var T8v="ta-ed";var E8v="ld=\"";var M0=J6z;M0+=T6z;var a0=J8v;a0+=T8v;H2t.a2t();a0+=j8v;a0+=E8v;var context=__html_id(identifier);return $(a0 + name + M0,context);}function __html_els(identifier,names){var out=$();H2t.a2t();for(var i=Y8z,ien=names[C6z];i < ien;i++){var b0=v4z;b0+=d7z;b0+=d7z;out=out[b0](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var Q8v="alue]";var D8v="[data-editor-v";var A8v="lter";H2t.a2t();var p0=V3z;p0+=h8v;p0+=X0z;var v0=D8v;v0+=Q8v;var I0=i5z;I0+=A8v;var el=__html_el(identifier,dataSrc);return el[I0](v0)[C6z]?el[K8v](o8v):el[p0]();}function __html_set(identifier,fields,data){var Y0=x7z;Y0+=v4z;Y0+=L6z;$[Y0](fields,function(name,field){var L8v="filter";var w8v="lFro";var W8v='[data-editor-value]';var y8v="mData";var N0=H8v;N0+=w8v;N0+=y8v;var val=field[N0](data);if(val !== undefined){var f0=z8v;f0+=K7z;f0+=V3z;var el=__html_el(identifier,field[R8v]());if(el[L8v](W8v)[f0]){var n0=v4z;n0+=j5z;n0+=f7z;el[n0](o8v,val);}else {var J0=V3z;J0+=K7z;J0+=m9z;J0+=X0z;el[Q5z](function(){var l8v="tChild";var O8v="removeChild";var C8v="firs";var c8v="childNodes";H2t.a2t();while(this[c8v][C6z]){var s0=C8v;s0+=l8v;this[O8v](this[s0]);}})[J0](val);}}});}var dataSource={id:function(data){var Z8v="Src";var T0=R1z;T0+=Z8v;var idFn=dataGet(this[z7z][T0]);return idFn(data);},initField:function(cfg){var U8v="bel=\"";var B8v="itor-la";var G8v="data-ed";var j0=u8v;j0+=G8v;j0+=B8v;j0+=U8v;var label=$(j0 + (cfg[B7z] || cfg[D5z]) + t8v);if(!cfg[q8v] && label[C6z]){var E0=V3z;E0+=K7z;E0+=m9z;E0+=X0z;cfg[q8v]=label[E0]();}},individual:function(identifier,fieldNames){var b7v="tomatically determine field name from data source";var m7v='[data-editor-id]';var V7v='editor-id';var X7v='addBack';var g8v="odeNa";var k7v="ren";var F7v="data-editor-";var M7v="Cannot au";var z0=x7z;z0+=i8v;z0+=V3z;var y0=I7z;y0+=n2z;y0+=S8v;y0+=z7z;var w0=S9QQ[465530];w0+=v4z;w0+=X0z;w0+=X0z;var o0=X0z;o0+=t9z;o0+=I0z;o0+=j1z;var h0=v7z;h0+=g8v;h0+=m9z;h0+=x7z;var attachEl;if(identifier instanceof $ || identifier[h0]){var K0=r8v;K0+=k7v;K0+=U1z;var A0=I7z;A0+=v7z;attachEl=identifier;if(!fieldNames){var Q0=F7v;Q0+=e7v;var D0=v4z;D0+=P7v;fieldNames=[$(identifier)[D0](Q0)];}var back=$[A0][d7v]?X7v:x7v;identifier=$(identifier)[K0](m7v)[back]()[B7z](V7v);}if(!identifier){identifier=N8v;}if(fieldNames && !Array[a7v](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames || fieldNames[o0] === Y8z){var H0=M7v;H0+=b7v;throw new Error(H0);}var out=dataSource[C2z][w0](this,identifier);H2t.l2t();var fields=this[z7z][y0];var forceFields={};$[Q5z](fieldNames,function(i,name){forceFields[name]=fields[name];});$[z0](out,function(id,set){var Y7v="tachFields";var v7v="tta";var l0=m7z;l0+=I7v;l0+=s5z;l0+=z7z;var C0=P7z;C0+=q1z;var c0=v4z;c0+=v7v;c0+=S9QQ[465530];c0+=V3z;var W0=p7v;W0+=Y7v;var L0=S9QQ[465530];L0+=x7z;L0+=X0z;H2t.l2t();L0+=X0z;var R0=K7z;R0+=j3z;R0+=d3z;R0+=x7z;set[R0]=L0;set[W0]=[fieldNames];set[c0]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[N7v]();set[C0]=fields;set[l0]=forceFields;});return out;},fields:function(identifier){var s7v="yless";H2t.l2t();var t0=Z9z;t0+=d0z;var U0=x7z;U0+=v4z;U0+=L6z;var G0=I7z;G0+=f7v;G0+=d7z;G0+=z7z;var O0=b2z;O0+=n7v;var out={};if(Array[O0](identifier)){var Z0=X0z;Z0+=x7z;Z0+=W6z;for(var i=Y8z,ien=identifier[Z0];i < ien;i++){var u0=I7z;u0+=n2z;u0+=X0z;u0+=q1z;var res=dataSource[u0][S1z](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[z7z][G0];if(!identifier){var B0=H2z;B0+=x7z;B0+=s7v;identifier=B0;}$[U0](fields,function(name,field){var J7v="valToData";var val=__html_get(identifier,field[R8v]());field[J7v](data,val === q0z?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:t0};return out;},create:function(fields,data){H2t.a2t();if(data){var q0=T7v;q0+=f2z;var id=dataSource[R1z][q0](this,data);try{if(__html_id(id)[C6z]){__html_set(id,fields,data);}}catch(e){;}}},edit:function(identifier,fields,data){var j7v="key";var E7v="les";var S0=j7v;S0+=E7v;S0+=z7z;var i0=S9QQ[465530];i0+=v4z;i0+=f2z;var id=dataSource[R1z][i0](this,data) || S0;H2t.l2t();__html_set(id,fields,data);},remove:function(identifier,fields){var g0=h7v;g0+=S9QQ[383646];g0+=D7v;H2t.a2t();__html_id(identifier)[g0]();}};var classNames={"wrapper":r4z,"processing":{"indicator":r0,"active":k6},"header":{"wrapper":Q7v,"content":A7v},"body":{"wrapper":F6,"content":K7v},"footer":{"wrapper":o7v,"content":H7v},"form":{"wrapper":e6,"content":w7v,"tag":S9QQ.r8z,"info":P6,"error":y7v,"buttons":z7v,"button":d6,"buttonInternal":R7v},"field":{"wrapper":L7v,"typePrefix":X6,"namePrefix":x6,"label":m6,"input":V6,"inputControl":W7v,"error":a6,"msg-label":c7v,"msg-error":C7v,"msg-message":M6,"msg-info":b6,"multiValue":I6,"multiInfo":l7v,"multiRestore":O7v,"multiNoEdit":v6,"disabled":p6,"processing":Y6},"actions":{"create":N6,"edit":Z7v,"remove":f6},"inline":{"wrapper":n6,"liner":s6,"buttons":u7v},"bubble":{"wrapper":G7v,"liner":B7v,"table":U7v,"close":t7v,"pointer":q7v,"bg":J6}};var displayed$2=g0z;var cssBackgroundOpacity=N8z;var dom$1={wrapper:$(T6 + j6 + E6 + h6)[Y8z],background:$(i7v)[Y8z],close:$(D6)[Y8z],content:q0z};function findAttachRow(editor,attach){var k4v="aTabl";var e4v='head';var x4v="head";var o6=S7v;o6+=g7v;o6+=v7z;var A6=r7v;A6+=x7z;var Q6=q6z;Q6+=K7z;Q6+=k4v;Q6+=x7z;var dt=new $[F4v][Q6][U9z](editor[z7z][A6]);if(attach === e4v){var K6=K7z;K6+=P4v;K6+=E7z;return dt[K6](undefined)[d4v]();;}else if(editor[z7z][o6] === X4v){var w6=x4v;w6+=v3z;var H6=I5z;H6+=S9QQ[624975];H6+=E7z;return dt[H6](undefined)[w6]();}else {return dt[v5z](editor[z7z][m4v])[N5z]();}}function heightCalc$1(dte){var N4v="outerHei";var I4v="windo";var p4v="he";var j4v='div.DTE_Body_Content';var v4v="wPad";var J4v="outerHeight";var f4v='div.DTE_Header';var s4v='div.DTE_Footer';var Y4v="ght";var V4v="uterHeigh";var C6=S9QQ[383646];C6+=V4v;C6+=K7z;var c6=d0z;c6+=W1z;c6+=a4v;c6+=f7z;var W6=M4v;W6+=z7z;var L6=b4v;L6+=v3z;var R6=I4v;R6+=v4v;R6+=d7z;R6+=l9z;var z6=p4v;z6+=Y7z;z6+=Y4v;var y6=N4v;y6+=I0z;y6+=V3z;y6+=K7z;var header=$(f4v,dom$1[n4v])[y6]();var footer=$(s4v,dom$1[n4v])[J4v]();var maxHeight=$(window)[z6]() - envelope[T4v][R6] * f8z - header - footer;$(j4v,dom$1[L6])[W6](E4v,maxHeight);return $(dte[h4v][c6])[C6]();}function hide$2(dte,callback){var D4v="offs";var Q4v="etHeight";if(!callback){callback=function(){};}if(displayed$2){var Z6=D4v;Z6+=Q4v;var O6=S9QQ[465530];O6+=A4v;var l6=S9QQ[465530];l6+=K4v;l6+=x7z;l6+=o4v;$(dom$1[l6])[H4v]({top:-(dom$1[O6][Z6] + y8z)},u8z,function(){var y4v="kgroun";var G6=w4v;G6+=y4v;G6+=d7z;var u6=d0z;H2t.l2t();u6+=f7z;u6+=z4v;$([dom$1[u6],dom$1[G6]])[R4v](L4v,function(){$(this)[W4v]();callback();});});displayed$2=g0z;}}function init$1(){var C4v='div.DTED_Envelope_Container';var U6=S9QQ[465530];U6+=z7z;U6+=z7z;var B6=v2z;B6+=v7z;B6+=c4v;dom$1[B6]=$(C4v,dom$1[n4v])[Y8z];cssBackgroundOpacity=$(dom$1[l4v])[U6](O4v);}function show$2(dte,callback){var u9v='0';var S4v="elope";var r9v='click.DTED_Envelope';var q4v=".DTE";var i4v="D_Env";var d9v="click.DT";var t4v="click";var z9v="eigh";var r4v="_Env";var M9v="sty";var o9v="ackground";var F3v='div.DTED_Lightbox_Content_Wrapper';var k9v="lope";var i9v="px";var E9v="animat";var u4v=".DTED_Envelo";var U9v="opacity";var g4v="click.DTED";var R9v="argin";var n9v="height";var v9v="gro";var U4v="nvelope";var A9v="tyle";var K9v="backgro";var Z9v="yle";var B4v="e.DTED_E";var G4v="resiz";var h9v="ckgroun";var y9v="setH";var O9v="cit";var X9v="ED_Envelope";var L9v="Left";var Z5=K3z;Z5+=Z4v;Z5+=u4v;Z5+=G1z;var O5=S9QQ[383646];O5+=v7z;var l5=G4v;l5+=B4v;l5+=U4v;var C5=S9QQ[383646];C5+=I7z;C5+=I7z;var W5=t4v;W5+=q4v;W5+=i4v;W5+=S4v;var L5=S9QQ[383646];L5+=v7z;var R5=g4v;R5+=r4v;R5+=x7z;R5+=k9v;var z5=S9QQ[383646];z5+=I7z;z5+=I7z;var y5=F9v;y5+=e9v;y5+=P9v;var H5=d9v;H5+=X9v;var o5=S9QQ[383646];o5+=v7z;var K5=d9v;K5+=X9v;var A5=S9QQ[383646];A5+=v7z;var Q5=Y7z;Q5+=x9v;Q5+=m9v;var D5=V9v;D5+=K7z;D5+=E7z;var h5=a9v;h5+=f7z;var S6=M9v;S6+=X0z;S6+=x7z;var i6=F9v;i6+=z4v;var q6=b9v;q6+=I9v;q6+=v9v;q6+=p9v;var t6=e9v;t6+=G1z;t6+=V4z;if(!callback){callback=function(){};}$(Y9v)[t6](dom$1[q6])[N9v](dom$1[i6]);dom$1[f9v][S6][n9v]=s9v;if(!displayed$2){var E5=v2z;E5+=v7z;E5+=K7z;E5+=J9v;var j5=T9v;j5+=j9v;var T5=E9v;T5+=x7z;var J5=S9QQ[624975];J5+=v4z;J5+=h9v;J5+=d7z;var s5=D9v;s5+=Q9v;var n5=z7z;n5+=A9v;var f5=K9v;f5+=P3z;f5+=V4z;var N5=z7z;N5+=K7z;N5+=j3z;N5+=E7z;var Y5=S9QQ[624975];Y5+=o9v;var p5=d3z;p5+=t7z;var v5=K7z;v5+=S9QQ[383646];v5+=d3z;var I5=H9v;I5+=c4v;var b5=w9v;b5+=y9v;b5+=z9v;b5+=K7z;var M5=K7z;M5+=S9QQ[383646];M5+=d3z;var a5=K7z;a5+=S9QQ[383646];a5+=d3z;var V5=m9z;V5+=R9v;V5+=L9v;var m5=W9v;m5+=j3z;m5+=X0z;m5+=x7z;var x5=c9v;x5+=j1z;var X5=F9v;X5+=v4z;X5+=d3z;X5+=P9v;var d5=O1z;d5+=x7z;var P5=D9v;P5+=X0z;P5+=v4z;P5+=j3z;var e5=v2z;e5+=C9v;var F5=m7z;F5+=z7z;F5+=l9v;var k5=S9QQ[383646];k5+=r8v;k5+=O9v;k5+=j3z;var r6=z7z;r6+=K7z;r6+=Z9v;var g6=F9v;g6+=v4z;g6+=a4v;g6+=f7z;var style=dom$1[g6][r6];style[k5]=u9v;style[F5]=G9v;var height=heightCalc$1(dte);var targetRow=findAttachRow(dte,envelope[e5][P2z]);var width=targetRow[B9v];style[P5]=d5;style[U9v]=t9v;dom$1[X5][q9v][x5]=width + i9v;dom$1[n4v][m5][V5]=-(width / f8z) + i9v;dom$1[n4v][q9v][a5]=$(targetRow)[S9v]()[M5] + targetRow[b5] + i9v;dom$1[I5][q9v][v5]=-N8z * height - Q8z + p5;dom$1[Y5][N5][U9v]=u9v;dom$1[f5][n5][s5]=G9v;$(dom$1[J5])[T5]({opacity:cssBackgroundOpacity},L4v);$(dom$1[n4v])[j5]();$(dom$1[E5])[H4v]({top:Y8z},u8z,callback);}$(dom$1[g9v])[h5](D5,dte[Q5][g9v])[w9v](r9v)[A5](K5,function(e){dte[g9v]();});$(dom$1[l4v])[w9v](r9v)[o5](H5,function(e){var w5=w4v;w5+=H2z;w5+=I0z;w5+=k3v;dte[w5]();});$(F3v,dom$1[y5])[z5](R5)[L5](W5,function(e){var P3v="tent_Wrapper";var e3v="DTED_Envelope_Con";var c5=e3v;c5+=P3v;if($(e[d3v])[X3v](c5)){dte[l4v]();}});$(window)[C5](l5)[O5](Z5,function(){H2t.l2t();heightCalc$1(dte);});displayed$2=S0z;}var envelope={close:function(dte,callback){H2t.a2t();hide$2(dte,callback);},destroy:function(dte){H2t.l2t();hide$2();},init:function(dte){init$1();H2t.a2t();return envelope;},node:function(dte){var u5=b4v;H2t.l2t();u5+=v3z;return dom$1[u5][Y8z];},open:function(dte,append,callback){var V3v="dChild";var M3v="conten";var x3v="appendCh";var i5=x3v;i5+=Y7z;i5+=S8v;var q5=S9QQ[465530];q5+=i9z;q5+=l7z;q5+=o4v;var t5=m3v;t5+=V3v;var U5=S9QQ[465530];U5+=i9z;U5+=D7z;U5+=K7z;H2t.a2t();var B5=V1z;B5+=a3v;var G5=M3v;G5+=K7z;$(dom$1[G5])[b3v]()[B5]();dom$1[U5][t5](append);dom$1[q5][i5](dom$1[g9v]);show$2(dte,callback);},conf:{windowPadding:y8z,attach:S5}};function isMobile(){var v3v='undefined';H2t.l2t();var Z8z=576;var I3v="rientati";var g5=S9QQ[383646];g5+=I3v;g5+=i9z;return typeof window[g5] !== v3v && window[p3v] <= Z8z?S0z:g0z;}var displayed$1=g0z;var ready=g0z;var scrollTop=Y8z;var dom={wrapper:$(r5 + Y3v + N3v + f3v + k2 + n3v + n3v + F2),background:$(e2),close:$(P2),content:q0z};function heightCalc(){var o3v="ody_Content";var s3v="oute";var h3v="out";var A3v="E_Hea";var W3v="windowPa";var l3v="hei";var z3v="Height";var R3v="div.DTE_Body_Co";var Q3v="div.DT";var E3v="div.DTE_Foote";var H3v='calc(100vh - ';var L3v="ntent";var D3v="erHeight";var C3v="onf";var j3v="rappe";var w3v='px)';var T3v="ight";var K3v="div.DTE_B";var J3v="rHe";var V2=s3v;V2+=J3v;V2+=T3v;var m2=d0z;m2+=j3v;m2+=f7z;var x2=E3v;x2+=f7z;var X2=h3v;X2+=D3v;var d2=Q3v;d2+=A3v;d2+=d8v;var headerFooter=$(d2,dom[n4v])[X2]() + $(x2,dom[m2])[V2]();if(isMobile()){var b2=M4v;b2+=z7z;var M2=b4v;M2+=v3z;var a2=K3v;a2+=o3v;$(a2,dom[M2])[b2](E4v,H3v + headerFooter + w3v);}else {var f2=y3v;f2+=z3v;var N2=S9QQ[465530];N2+=z7z;N2+=z7z;var Y2=R3v;Y2+=L3v;var p2=W3v;p2+=c3v;p2+=l9z;var v2=S9QQ[465530];v2+=C3v;var I2=l3v;I2+=I0z;I2+=g6z;var maxHeight=$(window)[I2]() - self[v2][p2] * f8z - headerFooter;$(Y2,dom[n4v])[N2](f2,maxHeight);}}function hide$1(dte,callback){var G3v="offsetAni";var O3v="kground";H2t.l2t();var j2=S9QQ[383646];j2+=I7z;j2+=I7z;var J2=b9v;J2+=S9QQ[465530];J2+=O3v;var n2=S9QQ[624975];n2+=S9QQ[383646];n2+=d7z;n2+=j3z;if(!callback){callback=function(){};}$(n2)[Z3v](scrollTop);dte[u3v](dom[n4v],{opacity:Y8z,top:self[T4v][G3v]},function(){var B3v="det";var U3v="ach";H2t.l2t();var s2=B3v;s2+=U3v;$(this)[s2]();callback();});dte[u3v](dom[J2],{opacity:Y8z},function(){var T2=V1z;T2+=K7z;H2t.a2t();T2+=i8v;T2+=V3z;$(this)[T2]();});displayed$1=g0z;$(window)[j2](t3v);}function init(){var S3v='div.DTED_Lightbox_Content';var q3v="opaci";var Q2=q3v;Q2+=i3v;var D2=S9QQ[465530];D2+=z7z;D2+=z7z;var h2=S9QQ[465530];h2+=z7z;h2+=z7z;var E2=S9QQ[465530];E2+=K4v;E2+=J9v;if(ready){return;}dom[E2]=$(S3v,dom[n4v]);dom[n4v][h2](O4v,Y8z);dom[l4v][D2](Q2,Y8z);ready=S0z;}function show$1(dte,callback){var I0v="x_Mobile";var N0v="ffset";var j0v='click.DTED_Lightbox';var e0v="div.DTED_Li";var P0v="ghtbox_Content_Wra";var g3v="click.D";var M0v="DTED_";var V0v="ck.DTED_Lig";var p0v="_ani";var k0v="htbox";var J0v='height';var f0v="Ani";var v0v="addCla";var X0v="click.DTED_L";var n0v="cont";var r3v="TED_Lig";var x0v="ightbo";var i2=g3v;i2+=r3v;i2+=k0v;var q2=S9QQ[383646];q2+=I7z;q2+=I7z;var t2=F0v;t2+=P9v;var U2=e0v;U2+=P0v;U2+=d0v;var G2=X0v;G2+=x0v;G2+=t7z;var Z2=m0v;Z2+=V0v;Z2+=k0v;var O2=S9QQ[383646];O2+=v7z;var l2=V9v;l2+=K7z;l2+=X0z;l2+=x7z;var C2=m0z;C2+=S9QQ[383646];C2+=z7z;C2+=x7z;var y2=a0v;y2+=a4v;y2+=f7z;var w2=v4z;w2+=J2z;if(isMobile()){var H2=M0v;H2+=b0v;H2+=x0v;H2+=I0v;var K2=v0v;K2+=z7z;K2+=z7z;var A2=S9QQ[624975];A2+=S9QQ[383646];A2+=d7z;A2+=j3z;$(A2)[K2](H2);}$(Y9v)[w2](dom[l4v])[N9v](dom[y2]);heightCalc();if(!displayed$1){var c2=S9QQ[383646];c2+=v7z;var W2=p0v;W2+=Y0v;var L2=F0v;L2+=G1z;L2+=f7z;var R2=S9QQ[383646];R2+=N0v;R2+=f0v;var z2=n0v;z2+=J9v;displayed$1=S0z;dom[z2][s0v](J0v,s9v);dom[n4v][s0v]({top:-self[T4v][R2]});dte[u3v](dom[L2],{opacity:N8z,top:Y8z},callback);dte[W2](dom[l4v],{opacity:N8z});$(window)[c2](t3v,function(){heightCalc();});scrollTop=$(Y9v)[Z3v]();}dom[C2][K8v](l2,dte[T0v][g9v])[w9v](j0v)[O2](Z2,function(e){var u2=S9QQ[465530];u2+=E0v;dte[u2]();});dom[l4v][w9v](G2)[i9z](j0v,function(e){var h0v="backg";var D0v="stopImmediatePropagation";var B2=h0v;B2+=k3v;e[D0v]();dte[B2]();});$(U2,dom[t2])[q2](j0v)[i9z](i2,function(e){var A0v="_Lig";var K0v="htbox_Content_Wrapper";var o0v="back";var H0v="stopImmedi";var w0v="atePropagation";var Q0v="TED";var S2=B4z;S2+=Q0v;S2+=A0v;S2+=K0v;if($(e[d3v])[X3v](S2)){var r2=o0v;r2+=I0z;r2+=Z9z;r2+=p9v;var g2=H0v;g2+=w0v;e[g2]();dte[r2]();}});}var self={close:function(dte,callback){hide$1(dte,callback);},conf:{offsetAni:K8z,windowPadding:K8z},destroy:function(dte){if(displayed$1){hide$1(dte);}},init:function(dte){init();return self;},node:function(dte){var k1=F9v;k1+=v4z;k1+=d0v;return dom[k1][Y8z];},open:function(dte,append,callback){var y0v="eta";H2t.a2t();var e1=e9v;e1+=G1z;e1+=v7z;e1+=d7z;var F1=d7z;F1+=y0v;F1+=L6z;var content=dom[f9v];content[b3v]()[F1]();content[N9v](append)[e1](dom[g9v]);show$1(dte,callback);}};var DataTable$4=$[F4v][O0z];function add(cfg,after,reorder){var u0v="es a `name` option";var Z0v="eld. The field requir";var q0v='initField';var r0v="multiReset";var B0v="d '";var c0v="reverse";H2t.a2t();var G0v="Error adding ";var X6v="ord";var L0v="sArray";var O0v="Error adding fi";var U0v="'. A field already exists with this name";var Y1=z0v;Y1+=s2z;var m1=I7z;m1+=n2z;m1+=S8v;m1+=z7z;var X1=R0v;X1+=m9z;X1+=x7z;var P1=Y7z;P1+=L0v;if(reorder === void Y8z){reorder=S0z;}if(Array[P1](cfg)){var d1=W0v;d1+=V3z;if(after !== undefined){cfg[c0v]();}for(var i=Y8z;i < cfg[d1];i++){this[r6z](cfg[i],after,g0z);}this[C0v](this[l0v]());return this;}var name=cfg[X1];if(name === undefined){var x1=O0v;x1+=Z0v;x1+=u0v;throw x1;}if(this[z7z][m1][name]){var V1=G0v;V1+=P7z;V1+=B0v;throw V1 + name + U0v;}this[t0v](q0v,cfg);var field=new Editor[s5z](cfg,this[i0v][e7v],this);if(this[z7z][S0v]){var M1=x7z;M1+=v4z;M1+=L6z;var a1=A7z;a1+=K7z;a1+=g0v;var editFields=this[z7z][a1];field[r0v]();$[M1](editFields,function(idSrc,edit){var F6v="valFrom";var p1=d7z;p1+=k6v;var b1=K1z;b1+=v4z;var val;if(edit[b1]){var v1=d7z;v1+=v4z;v1+=I5z;var I1=F6v;I1+=B4z;I1+=p7v;I1+=v4z;val=field[I1](edit[v1]);}field[e6v](idSrc,val !== undefined?val:field[p1]());});}this[z7z][Y1][name]=field;if(after === undefined){this[z7z][l0v][s6z](name);}else if(after === q0z){var N1=b7z;N1+=d7z;N1+=v3z;this[z7z][N1][P6v](name);}else {var s1=G5z;s1+=d6v;s1+=x7z;var n1=X6v;n1+=x7z;n1+=f7z;var f1=S9QQ[383646];f1+=x6v;f1+=v3z;var idx=$[f1z](after,this[z7z][f1]);this[z7z][n1][s1](idx + N8z,Y8z,name);}if(reorder !== g0z){this[C0v](this[l0v]());}return this;}function ajax(newAjax){H2t.l2t();if(newAjax){var J1=m6v;J1+=t7z;this[z7z][J1]=newAjax;return this;}return this[z7z][J1z];}function background(){var a6v="onB";var M6v="ckground";var V6v="bm";H2t.a2t();var E1=z7z;E1+=P3z;E1+=V6v;E1+=M7z;var j1=S9QQ[465530];j1+=X0z;j1+=S9QQ[383646];j1+=n7z;var T1=a6v;T1+=v4z;T1+=M6v;var onBackground=this[z7z][v1z][T1];if(typeof onBackground === S9QQ.k7z){onBackground(this);}else if(onBackground === B0z){this[b6v]();}else if(onBackground === j1){this[g9v]();}else if(onBackground === E1){this[I6v]();}return this;}function blur(){var v6v="_bl";var h1=v6v;h1+=p6v;H2t.a2t();this[h1]();return this;}function bubble(cells,fieldNames,show,opts){var Y6v="bubbl";var E6v="boo";var n6v="taS";var w1=Y6v;w1+=x7z;var H1=N6v;H1+=W7z;var K1=f6v;K1+=n6v;K1+=t4z;K1+=s6v;var A1=J6v;A1+=T6v;A1+=j6v;A1+=z7z;var Q1=E6v;Q1+=E7z;Q1+=h6v;var D1=k1z;D1+=F1z;D1+=e1z;var _this=this;var that=this;if(this[D6v](function(){that[Q6v](cells,fieldNames,opts);})){return this;}if($[D1](fieldNames)){opts=fieldNames;fieldNames=undefined;show=S0z;}else if(typeof fieldNames === Q1){show=fieldNames;fieldNames=undefined;opts=undefined;}if($[A6v](show)){opts=show;show=S0z;}if(show === undefined){show=S0z;}opts=$[f6z]({},this[z7z][A1][Q6v],opts);var editFields=this[K1](K6v,cells,fieldNames);this[H1](cells,editFields,w1,opts,function(){var S6v="\" ";var T5v='"><div></div></div>';var J5v="bg";var k5v="<div ";var X5v="v class=";var F5v="lass=";var b5v="bble";var V5v="atta";var m5v="iv class=\"";var g6v="tit";var O6v="oint";var U6v="v cla";var t6v="ss=\"DTE_Processing_Indicator\"><span></";var y6v="osition";var r6v="le=\"";var w6v="ubbleP";var I5v="_pre";var e5v="ass=\"";var W6v="epend";var a5v="conc";var z6v="ick";var j8p=o6v;j8p+=H6v;var n8p=S9QQ[624975];n8p+=w6v;n8p+=y6v;var N8p=S9QQ[465530];N8p+=X0z;N8p+=z6v;var p8p=S9QQ[383646];p8p+=v7z;var I8p=a1z;I8p+=d7z;var b8p=v4z;b8p+=d7z;b8p+=d7z;var x8p=m9z;x8p+=x7z;x8p+=R6v;var X8p=I7z;X8p+=S9QQ[383646];X8p+=f7z;X8p+=m9z;var d8p=L6v;d8p+=W6v;var P8p=d7z;P8p+=S9QQ[383646];P8p+=m9z;var e8p=x7z;e8p+=c6v;var k8p=z4z;k8p+=d7z;k8p+=C6v;k8p+=l6v;var r1=d3z;r1+=O6v;r1+=x7z;r1+=f7z;var g1=T4z;g1+=Z6v;g1+=u6v;g1+=l6v;var S1=z4z;S1+=d7z;S1+=G6v;var i1=B6v;i1+=U6v;i1+=t6v;i1+=q6v;var q1=i6v;q1+=m9v;var t1=S6v;t1+=g6v;t1+=r6v;var U1=k5v;U1+=S9QQ[465530];U1+=F5v;U1+=J6z;var B1=O4z;B1+=e5v;var G1=J6z;G1+=l6v;var u1=P5v;u1+=d5v;var Z1=B6v;Z1+=X5v;Z1+=J6z;var O1=J6z;O1+=l6v;var l1=x5v;l1+=m5v;var C1=V5v;C1+=S9QQ[465530];C1+=V3z;var c1=a5v;c1+=p7v;var L1=K3z;L1+=Z4v;L1+=M5v;var R1=S9QQ[383646];R1+=v7z;var z1=Z7z;z1+=b5v;var y1=I5v;y1+=S9QQ[383646];y1+=v5v;var namespace=_this[p5v](opts);var ret=_this[y1](z1);if(!ret){return _this;}$(window)[R1](L1 + namespace,function(){var f5v="siti";var N5v="lePo";var W1=Y5v;W1+=N5v;W1+=f5v;W1+=i9z;_this[W1]();});var nodes=[];_this[z7z][n5v]=nodes[c1][s5v](nodes,pluck(editFields,C1));var classes=_this[i0v][Q6v];var background=$(l1 + classes[J5v] + T5v);var container=$(j5v + classes[n4v] + O1 + Z1 + classes[u1] + G1 + B1 + classes[q2z] + E5v + U1 + classes[g9v] + t1 + _this[q1][g9v] + h5v + i1 + S1 + g1 + j5v + classes[r1] + h5v + k8p);if(show){var F8p=D5v;F8p+=j3z;container[Q5v](F8p);background[Q5v](Y9v);}var liner=container[b3v]()[e8p](Y8z);var table=liner[b3v]();var close=table[b3v]();liner[N9v](_this[P8p][A5v]);table[d8p](_this[h4v][X8p]);if(opts[x8p]){liner[K5v](_this[h4v][o5v]);}if(opts[H5v]){var m8p=w5v;m8p+=y5v;liner[m8p](_this[h4v][d4v]);}if(opts[z5v]){var V8p=d7z;V8p+=S9QQ[383646];V8p+=m9z;table[N9v](_this[V8p][z5v]);}var finish=function(){var R5v="ubbl";var L5v="_clear";var c5v="micInfo";H2t.a2t();var W5v="Dyn";var M8p=S9QQ[624975];M8p+=R5v;M8p+=x7z;var a8p=L5v;a8p+=W5v;a8p+=v4z;a8p+=c5v;_this[a8p]();_this[C5v](l5v,[M8p]);};var pair=$()[b8p](container)[I8p](background);_this[O5v](function(submitComplete){H2t.l2t();_this[u3v](pair,{opacity:Y8z},function(){H2t.a2t();var Z5v='resize.';if(this === container[Y8z]){var v8p=S9QQ[383646];v8p+=I7z;v8p+=I7z;pair[W4v]();$(window)[v8p](Z5v + namespace);finish();}});});background[p8p](u5v,function(){var Y8p=S9QQ[624975];H2t.l2t();Y8p+=G5v;_this[Y8p]();});close[i9z](N8p,function(){var f8p=A9z;f8p+=g9v;H2t.a2t();_this[f8p]();});_this[n8p]();_this[B5v](U5v,g0z);var opened=function(){var i5v="ncludeF";var T8p=A9z;T8p+=t5v;T8p+=t9z;T8p+=K7z;var J8p=I7z;J8p+=q5v;var s8p=Y7z;H2t.l2t();s8p+=i5v;s8p+=S5v;_this[g5v](_this[z7z][s8p],opts[J8p]);_this[T8p](r5v,[U5v,_this[z7z][k2v]]);};_this[j8p](pair,{opacity:N8z},function(){if(this === container[Y8z]){opened();}});});return this;}function bubblePosition(){var f2v="veClas";var X2v='div.DTE_Bubble_Liner';var p2v='top';var a2v="left";var b2v="bottom";var v2v="otto";var M2v="right";var d2v='div.DTE_Bubble';var V2v="top";var Y2v='below';var L8p=K7z;L8p+=F2v;var R8p=z8v;R8p+=j1z;var z8p=c9v;z8p+=j1z;var y8p=X0z;y8p+=e2v;y8p+=K7z;y8p+=V3z;var w8p=E7z;w8p+=I7z;w8p+=K7z;var H8p=X0z;H8p+=t9z;H8p+=P2v;H8p+=V3z;var o8p=K7z;o8p+=S9QQ[383646];o8p+=d3z;var E8p=C7z;E8p+=L6z;var wrapper=$(d2v),liner=$(X2v),nodes=this[z7z][n5v];var position={top:Y8z,left:Y8z,right:Y8z,bottom:Y8z};$[E8p](nodes,function(i,node){var I2v="offsetHeight";var K8p=K7z;K8p+=S9QQ[383646];K8p+=d3z;var A8p=E7z;A8p+=x2v;var Q8p=X0z;H2t.l2t();Q8p+=k6v;Q8p+=K7z;var D8p=K7z;D8p+=S9QQ[383646];D8p+=d3z;var h8p=w9v;h8p+=z7z;h8p+=x7z;h8p+=K7z;var pos=$(node)[h8p]();node=$(node)[m2v](Y8z);position[D8p]+=pos[V2v];position[Q8p]+=pos[a2v];position[M2v]+=pos[A8p] + node[B9v];position[b2v]+=pos[K8p] + node[I2v];});position[o8p]/=nodes[H8p];position[w8p]/=nodes[C6z];position[M2v]/=nodes[C6z];position[b2v]/=nodes[y8p];var top=position[V2v],left=(position[a2v] + position[M2v]) / f8z,width=liner[p3v](),visLeft=left - width / f8z,visRight=visLeft + width,docWidth=$(window)[z8p](),padding=h8z;this[i0v][Q6v];wrapper[s0v]({top:top,left:left});if(liner[R8p] && liner[S9v]()[L8p] < Y8z){var W8p=S9QQ[624975];W8p+=v2v;W8p+=m9z;wrapper[s0v](p2v,position[W8p])[x5z](Y2v);}else {var c8p=K3z;c8p+=N2v;c8p+=f2v;c8p+=z7z;wrapper[c8p](Y2v);}if(visRight + padding > docWidth){var l8p=E7z;l8p+=x2v;var C8p=M4v;C8p+=z7z;var diff=visRight - docWidth;liner[C8p](l8p,visLeft < padding?-(visLeft - padding):-(diff + padding));}else {var O8p=E7z;O8p+=x2v;liner[s0v](O8p,visLeft < padding?-(visLeft - padding):Y8z);}return this;}function buttons(buttons){H2t.a2t();var J2v="sic";var s2v="_ba";var B8p=x7z;B8p+=v4z;B8p+=S9QQ[465530];B8p+=V3z;var G8p=n2v;G8p+=K7z;G8p+=i9z;G8p+=z7z;var Z8p=s2v;Z8p+=J2v;var _this=this;if(buttons === Z8p){var u8p=Y7z;u8p+=x9v;u8p+=S9QQ[405994];u8p+=v7z;buttons=[{text:this[u8p][this[z7z][k2v]][I6v],action:function(){this[I6v]();}}];}else if(!Array[a7v](buttons)){buttons=[buttons];}$(this[h4v][G8p])[T2v]();$[B8p](buttons,function(i,btn){var z2v='tabindex';var o2v='<button></button>';var R2v="tabIndex";var D2v="bInd";var E2v="keyp";var j2v="ppen";var X7p=v4z;X7p+=j2v;X7p+=d7z;X7p+=T2z;var d7p=m0v;d7p+=I9v;var e7p=E2v;e7p+=V8v;e7p+=z7z;var F7p=h2v;F7p+=j3z;F7p+=P3z;F7p+=d3z;var k7p=S9QQ[383646];k7p+=v7z;var r8p=I5z;r8p+=D2v;r8p+=h7z;var g8p=v4z;g8p+=j5z;g8p+=f7z;var S8p=g6z;S8p+=m9z;S8p+=X0z;var i8p=Q2v;i8p+=A2v;i8p+=z7z;var q8p=I7z;q8p+=v7z;var t8p=X0z;t8p+=K2v;t8p+=X0z;var U8p=K7z;U8p+=h7z;U8p+=K7z;if(typeof btn === n8v){btn={text:btn,action:function(){this[I6v]();}};}var text=btn[U8p] || btn[t8p];var action=btn[k2v] || btn[q8p];$(o2v,{'class':_this[i8p][J6v][H2v] + (btn[w2v]?y2v + btn[w2v]:c0z)})[S8p](typeof text === S9QQ.k7z?text(_this):text || c0z)[g8p](z2v,btn[r8p] !== undefined?btn[R2v]:Y8z)[k7p](F7p,function(e){if(e[L2v] === j8z && action){action[S1z](_this);}})[i9z](e7p,function(e){var W2v="wh";var P7p=W2v;P7p+=Y7z;P7p+=L6z;if(e[P7p] === j8z){e[c2v]();}})[i9z](d7p,function(e){H2t.l2t();e[c2v]();if(action){action[S1z](_this,e);}})[X7p](_this[h4v][z5v]);});return this;}function clear(fieldName){var O2v="_fiel";var x7p=I7z;x7p+=Y7z;x7p+=h9z;H2t.a2t();x7p+=q1z;var that=this;var fields=this[z7z][x7p];if(typeof fieldName === n8v){var m7p=b7z;m7p+=V1z;m7p+=f7z;that[e7v](fieldName)[C2v]();delete fields[fieldName];var orderIdx=$[f1z](fieldName,this[z7z][l0v]);this[z7z][m7p][s1z](orderIdx,N8z);var includeIdx=$[f1z](fieldName,this[z7z][l2v]);if(includeIdx !== -N8z){this[z7z][l2v][s1z](includeIdx,N8z);}}else {var a7p=O2v;a7p+=d7z;a7p+=Z2v;a7p+=u2v;var V7p=x7z;V7p+=v4z;V7p+=S9QQ[465530];V7p+=V3z;$[V7p](this[a7p](fieldName),function(i,name){var G2v="cle";var M7p=G2v;H2t.a2t();M7p+=v4z;M7p+=f7z;that[M7p](name);});}return this;}function close(){this[B2v](g0z);H2t.l2t();return this;}function create(arg1,arg2,arg3,arg4){var U2v="umb";var t2v="tid";var P1v='initCreate';var h7p=x7z;h7p+=v4z;h7p+=S9QQ[465530];h7p+=V3z;var E7p=I7z;E7p+=n2z;E7p+=S8v;E7p+=z7z;var j7p=D9v;j7p+=Q9v;var T7p=p9z;T7p+=L9z;var J7p=d7z;J7p+=S9QQ[383646];J7p+=m9z;var s7p=S9QQ[465530];s7p+=f7z;s7p+=C7z;s7p+=l7z;var n7p=v4z;n7p+=r1z;n7p+=v7z;var f7p=m9z;f7p+=v4z;f7p+=Y7z;f7p+=v7z;var p7p=v7z;p7p+=U2v;p7p+=x7z;p7p+=f7z;var I7p=A9z;I7p+=t2v;I7p+=j3z;var b7p=I7z;b7p+=f7v;b7p+=d7z;b7p+=z7z;var _this=this;var that=this;var fields=this[z7z][b7p];var count=N8z;if(this[I7p](function(){var v7p=S9QQ[465530];v7p+=K3z;v7p+=p7v;v7p+=x7z;that[v7p](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1 === p7p){count=arg1;arg1=arg2;arg2=arg3;}this[z7z][q2v]={};for(var i=Y8z;i < count;i++){var N7p=I7z;N7p+=S5v;var Y7p=H7z;Y7p+=i2v;Y7p+=h9z;Y7p+=q1z;this[z7z][Y7p][i]={fields:this[z7z][N7p]};}var argOpts=this[S2v](arg1,arg2,arg3,arg4);this[z7z][S0v]=f7p;this[z7z][n7p]=s7p;this[z7z][m4v]=q0z;this[J7p][T7p][q9v][j7p]=G9v;this[g2v]();this[C0v](this[E7p]());$[h7p](fields,function(name,field){var k1v="iReset";var Q7p=d7z;H2t.a2t();Q7p+=k6v;var D7p=r2v;D7p+=K7z;D7p+=k1v;field[D7p]();for(var i=Y8z;i < count;i++){field[e6v](i,field[F1v]());}field[e1v](field[Q7p]());});this[C5v](P1v,q0z,function(){var m1v="maybeOpen";var d1v="assem";var X1v="bleMain";var A7p=A9z;A7p+=d1v;A7p+=X1v;_this[A7p]();_this[p5v](argOpts[x1v]);argOpts[m1v]();});return this;}function undependent(parent){var V1v="unde";var M1v='.edep';var H7p=v7z;H7p+=q5z;if(Array[a7v](parent)){var K7p=E7z;K7p+=v7z;K7p+=I0z;K7p+=j1z;for(var i=Y8z,ien=parent[K7p];i < ien;i++){var o7p=V1v;o7p+=a1v;this[o7p](parent[i]);}return this;}var field=this[e7v](parent);$(field[H7p]())[w9v](M1v);return this;}function dependent(parent,url,opts){var I1v="sArr";var q7p=M5v;q7p+=O6z;q7p+=x7z;q7p+=d3z;var L7p=I4z;L7p+=d7z;H2t.a2t();var R7p=b1v;R7p+=z7z;R7p+=S9QQ[383646];R7p+=v7z;var z7p=I7z;z7p+=Y7z;z7p+=x7z;z7p+=S8v;var w7p=Y7z;w7p+=I1v;w7p+=v1v;var _this=this;if(Array[w7p](parent)){var y7p=E7z;y7p+=v7z;y7p+=P2v;y7p+=V3z;for(var i=Y8z,ien=parent[y7p];i < ien;i++){this[p1v](parent[i],url,opts);}return this;}var that=this;var field=this[z7p](parent);var ajaxOpts={type:Y1v,dataType:R7p};opts=$[L7p]({event:N1v,data:q0z,preUpdate:q0z,postUpdate:q0z},opts);var update=function(json){var D1v='error';var j1v="reUpd";var A1v='show';var s1v="ena";var T1v="preUpdate";var h1v='message';var o1v="postUpdate";var n1v="postUpdat";var J1v="pd";var t7p=c9z;t7p+=x7z;t7p+=f1v;var U7p=n1v;U7p+=x7z;var G7p=X9z;G7p+=E7z;var u7p=s1v;u7p+=P1z;u7p+=x7z;var Z7p=V3z;Z7p+=Y7z;Z7p+=d7z;Z7p+=x7z;var C7p=o3z;C7p+=v4z;C7p+=X0z;var c7p=P3z;c7p+=J1v;c7p+=p7v;c7p+=x7z;if(opts[T1v]){var W7p=d3z;W7p+=j1v;W7p+=p7v;W7p+=x7z;opts[W7p](json);}$[Q5z]({labels:E1v,options:c7p,values:C7p,messages:h1v,errors:D1v},function(jsonProp,fieldFn){var Q1v="eac";if(json[jsonProp]){var l7p=Q1v;l7p+=V3z;$[l7p](json[jsonProp],function(field,val){var O7p=z0v;O7p+=S8v;that[O7p](field)[fieldFn](val);});}});$[Q5z]([Z7p,A1v,u7p,G7p],function(i,key){H2t.l2t();if(json[key]){var B7p=K1v;B7p+=Y0v;that[key](json[key],json[B7p]);}});if(opts[U7p]){opts[o1v](json);}field[t7p](g0z);};$(field[N5z]())[i9z](opts[H1v] + q7p,function(e){var z1v="rocessin";var L1v="values";var Z1v="ainObje";var c1v="bje";var y1v="itFi";var O1v="Pl";H2t.a2t();var P4p=K1z;P4p+=v4z;var e4p=Z9z;e4p+=w1v;var F4p=d7z;F4p+=v4z;F4p+=K7z;F4p+=v4z;var k4p=O6z;k4p+=y1v;k4p+=h9z;k4p+=q1z;var r7p=v5z;r7p+=z7z;var g7p=d3z;g7p+=z1v;g7p+=I0z;var S7p=I5z;S7p+=f7z;S7p+=m2v;var i7p=d5z;i7p+=V1z;if($(field[i7p]())[R1v](e[S7p])[C6z] === Y8z){return;}field[g7p](S0z);var data={};data[r7p]=_this[z7z][q2v]?pluck(_this[z7z][k4p],F4p):q0z;data[v5z]=data[e4p]?data[M5z][Y8z]:q0z;data[L1v]=_this[W1v]();if(opts[P4p]){var ret=opts[B7z](data);if(ret){var d4p=d7z;d4p+=v4z;d4p+=K7z;d4p+=v4z;opts[d4p]=ret;}}if(typeof url === S9QQ.k7z){var X4p=S9QQ[465530];X4p+=v4z;X4p+=X0z;X4p+=X0z;var o=url[X4p](_this,field[W1v](),data,update,e);if(o){var m4p=j1z;m4p+=t9z;var x4p=S9QQ[383646];x4p+=c1v;x4p+=C1v;if(typeof o === x4p && typeof o[m4p] === S9QQ.k7z){o[l1v](function(resolved){if(resolved){update(resolved);}});}else {update(o);}}}else {var V4p=b2z;V4p+=O1v;V4p+=Z1v;V4p+=C1v;if($[V4p](url)){var a4p=I4z;a4p+=d7z;$[a4p](ajaxOpts,url);}else {var M4p=P3z;M4p+=f7z;M4p+=X0z;ajaxOpts[M4p]=url;}$[J1z]($[f6z](ajaxOpts,{data:data,success:update}));}});return this;}function destroy(){var r1v='.dte';var B1v="late";var G1v="temp";var n4p=d7z;n4p+=S9QQ[383646];n4p+=m9z;var f4p=S9QQ[383646];f4p+=I7z;f4p+=I7z;var N4p=u1v;N4p+=K7z;N4p+=Z9z;N4p+=j3z;var v4p=G1v;v4p+=B1v;var b4p=d7z;b4p+=U1v;b4p+=x7z;b4p+=d7z;if(this[z7z][b4p]){var I4p=S9QQ[465530];I4p+=X0z;I4p+=S9QQ[383646];I4p+=n7z;this[I4p]();}this[t1v]();if(this[z7z][v4p]){var Y4p=K7z;Y4p+=q1v;Y4p+=i1v;Y4p+=S1v;var p4p=v4z;p4p+=d3z;p4p+=v5v;p4p+=d7z;$(Y9v)[p4p](this[z7z][Y4p]);}var controller=this[z7z][g1v];if(controller[N4p]){controller[C2v](this);}$(document)[f4p](r1v + this[z7z][k8D]);this[n4p]=q0z;this[z7z]=q0z;}function disable(name){var s4p=F8D;s4p+=e8D;s4p+=z7z;var that=this;$[Q5z](this[s4p](name),function(i,n){var P8D="sable";var T4p=d7z;T4p+=Y7z;T4p+=P8D;var J4p=i5z;J4p+=d8D;that[J4p](n)[T4p]();});return this;}function display(show){var X8D="los";var E4p=S9QQ[465530];E4p+=X8D;E4p+=x7z;var j4p=S9QQ[383646];j4p+=d3z;j4p+=x7z;j4p+=v7z;if(show === undefined){return this[z7z][x8D];}return this[show?j4p:E4p]();}function displayed(){H2t.a2t();return $[z1z](this[z7z][C2z],function(field,name){return field[x8D]()?name:q0z;});}function displayNode(){var D4p=v7z;D4p+=S9QQ[383646];D4p+=V1z;var h4p=m7z;h4p+=m8D;h4p+=V8D;return this[z7z][h4p][D4p](this);}function edit(items,arg1,arg2,arg3,arg4){var A4p=I7z;A4p+=n2z;H2t.l2t();A4p+=s2z;var _this=this;var that=this;if(this[D6v](function(){var Q4p=O6z;Q4p+=M7z;that[Q4p](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[S2v](arg1,arg2,arg3,arg4);this[a8D](items,this[t0v](A4p,items),M8D,argOpts[x1v],function(){var b8D="mayb";var I8D="eOpe";var v8D="_assembleMain";var K4p=b8D;K4p+=I8D;K4p+=v7z;_this[v8D]();_this[p5v](argOpts[x1v]);argOpts[K4p]();});return this;}function enable(name){var p8D="Names";var o4p=F8D;o4p+=p8D;var that=this;$[Q5z](this[o4p](name),function(i,n){that[e7v](n)[Y8D]();});return this;}function error$1(name,msg){var j8D="globalError";var f8D="_message";var w4p=F9v;w4p+=z4v;H2t.a2t();var H4p=N8D;H4p+=m9z;var wrapper=$(this[H4p][w4p]);if(msg === undefined){this[f8D](this[h4v][A5v],name,S0z,function(){H2t.l2t();var T8D="gleClas";var J8D="tog";var n8D="nFo";var z4p=Y7z;z4p+=n8D;z4p+=L9z;z4p+=s8D;var y4p=J8D;y4p+=T8D;y4p+=z7z;wrapper[y4p](z4p,name !== undefined && name !== c0z);});this[z7z][j8D]=name;}else {var L4p=x7z;L4p+=E8D;var R4p=I7z;R4p+=h8D;this[R4p](name)[L4p](msg);}return this;}function field(name){var D8D='Unknown field name - ';var fields=this[z7z][C2z];if(!fields[name]){throw D8D + name;}return fields[name];}function fields(){H2t.l2t();return $[z1z](this[z7z][C2z],function(field,name){return name;});}function file(name,id){var K8D="able ";var A8D=" in t";var o8D='Unknown file id ';H2t.l2t();var table=this[Q8D](name);var file=table[id];if(!file){var W4p=A8D;W4p+=K8D;throw o8D + id + W4p + name;}return table[id];}function files(name){var w8D='Unknown file table name: ';var C4p=H8D;C4p+=z7z;H2t.l2t();if(!name){var c4p=I7z;c4p+=Y7z;c4p+=E7z;c4p+=z7z;return Editor[c4p];}var table=Editor[C4p][name];if(!table){throw w8D + name;}return table;}function get(name){var B4p=I0z;B4p+=y8D;var O4p=Y7z;O4p+=z7z;O4p+=n7v;var that=this;H2t.a2t();if(!name){var l4p=z0v;l4p+=X0z;l4p+=d7z;l4p+=z7z;name=this[l4p]();}if(Array[O4p](name)){var Z4p=x7z;Z4p+=v4z;Z4p+=S9QQ[465530];Z4p+=V3z;var out={};$[Z4p](name,function(i,n){var G4p=I0z;G4p+=x7z;G4p+=K7z;var u4p=I7z;H2t.l2t();u4p+=n2z;u4p+=S8v;out[n]=that[u4p](n)[G4p]();});return out;}return this[e7v](name)[B4p]();}function hide(names,animate){H2t.l2t();var that=this;$[Q5z](this[z8D](names),function(i,n){var U4p=V3z;H2t.l2t();U4p+=Y7z;U4p+=d7z;U4p+=x7z;that[e7v](n)[U4p](animate);});return this;}function ids(includeHash){var t4p=H7z;H2t.l2t();t4p+=g0v;if(includeHash === void Y8z){includeHash=g0z;}return $[z1z](this[z7z][t4p],function(edit,idSrc){return includeHash === S0z?Q6z + idSrc:idSrc;});}function inError(inNames){var R8D="fieldNames";var W8D="Er";var L8D="globalErr";var g4p=A9z;g4p+=R8D;var S4p=L8D;S4p+=b7z;var i4p=p9z;i4p+=L9z;i4p+=W8D;i4p+=J9z;var q4p=N8D;q4p+=m9z;$(this[q4p][i4p]);if(this[z7z][S4p]){return S0z;}var names=this[g4p](inNames);for(var i=Y8z,ien=names[C6z];i < ien;i++){var r4p=I7z;r4p+=Y7z;r4p+=h9z;r4p+=d7z;if(this[r4p](names[i])[c8D]()){return S0z;}}return g0z;}function inline(cell,fieldName,opts){var U8D='Cannot edit more than one row inline at a time';var Z8D="Source";var l8D="v.DTE_Field";var u8D="ormOptio";var G8D="sPlainObject";var a9p=F1z;a9p+=C8D;var V9p=m7z;V9p+=l8D;var x9p=z8v;x9p+=K7z;x9p+=V3z;var X9p=v4z;X9p+=K7z;X9p+=a3v;var d9p=h2v;d9p+=j3z;d9p+=z7z;var P9p=O8D;P9p+=Z8D;var e9p=I7z;e9p+=u8D;e9p+=x1z;var F9p=h7z;F9p+=K7z;F9p+=a4z;var k9p=Y7z;k9p+=G8D;var _this=this;var that=this;if($[k9p](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[F9p]({},this[z7z][e9p][B8D],opts);var editFields=this[P9p](K6v,cell,fieldName);var keys=Object[d9p](editFields);if(keys[C6z] > N8z){throw new Error(U8D);}var editRow=editFields[keys[Y8z]];var hosts=[];for(var i=Y8z;i < editRow[X9p][x9p];i++){var m9p=d3z;m9p+=P3z;m9p+=z7z;m9p+=V3z;hosts[m9p](editRow[P2z][i]);}if($(V9p,hosts)[C6z]){return this;}if(this[D6v](function(){that[B8D](cell,fieldName,opts);})){return this;}this[a8D](cell,editFields,a9p,opts,function(){var M9p=A9z;H2t.l2t();M9p+=t8D;M9p+=x7z;_this[M9p](editFields,opts);});return this;}function inlineCreate(insertPoint,opts){H2t.l2t();var g8D="ctionC";var F7D="lain";var k7D="fakeR";var i8D="_inli";var q8D="nitCreate";var h9p=Y7z;h9p+=q8D;var E9p=A9z;E9p+=t5v;E9p+=J9v;var T9p=i8D;T9p+=t2z;var J9p=S8D;J9p+=g8D;J9p+=r8D;var s9p=F1z;s9p+=X0z;s9p+=Y7z;s9p+=t2z;var n9p=h7z;n9p+=K7z;n9p+=a4z;var f9p=k7D;f9p+=K4z;var b9p=b2z;b9p+=A3z;b9p+=F7D;b9p+=e1z;var _this=this;if($[b9p](insertPoint)){opts=insertPoint;insertPoint=q0z;}if(this[D6v](function(){H2t.a2t();var e7D="inlineCrea";var I9p=e7D;I9p+=l7z;_this[I9p](insertPoint,opts);})){return this;}$[Q5z](this[z7z][C2z],function(name,field){var x7D="iRese";var P7D="tiS";var N9p=z7z;N9p+=x7z;N9p+=K7z;var Y9p=d7z;Y9p+=k6v;var p9p=r2v;p9p+=P7D;p9p+=y8D;var v9p=d7D;v9p+=X7D;v9p+=x7D;v9p+=K7z;field[v9p]();field[p9p](Y8z,field[Y9p]());field[N9p](field[F1v]());});this[z7z][S0v]=M8D;this[z7z][k2v]=m7D;this[z7z][m4v]=q0z;this[z7z][q2v]=this[t0v](f9p,insertPoint);opts=$[n9p]({},this[z7z][V7D][s9p],opts);this[J9p]();this[T9p](this[z7z][q2v],opts,function(){var M7D="End";var a7D="fakeRow";var j9p=a7D;j9p+=M7D;_this[t0v](j9p);});this[E9p](h9p,q0z);return this;}function message(name,msg){var b7D="messag";if(msg === undefined){var Q9p=d7z;Q9p+=S9QQ[383646];Q9p+=m9z;var D9p=A9z;D9p+=b7D;D9p+=x7z;this[D9p](this[Q9p][o5v],name);}else {this[e7v](name)[I7D](msg);}return this;}function mode(mode){var Y7D="rren";var f7D="Changing from create mode i";var N7D="tly in an editing mode";var p7D="Not cu";var v7D="actio";var n7D="s not supported";var H9p=i8v;H9p+=K7z;H9p+=Y7z;H9p+=i9z;var A9p=v7D;A9p+=v7z;if(!mode){return this[z7z][k2v];}if(!this[z7z][A9p]){var K9p=p7D;K9p+=Y7D;K9p+=N7D;throw new Error(K9p);}else if(this[z7z][k2v] === X4v && mode !== X4v){var o9p=f7D;o9p+=n7D;throw new Error(o9p);}this[z7z][H9p]=mode;return this;}function modifier(){return this[z7z][m4v];}function multiGet(fieldNames){var z9p=i5z;z9p+=x7z;z9p+=X0z;z9p+=d7z;H2t.l2t();var that=this;if(fieldNames === undefined){fieldNames=this[C2z]();}if(Array[a7v](fieldNames)){var w9p=C7z;w9p+=L6z;var out={};$[w9p](fieldNames,function(i,name){var s7D="iGet";var y9p=b9z;y9p+=s7D;H2t.l2t();out[name]=that[e7v](name)[y9p]();});return out;}return this[z9p](fieldNames)[J7D]();}function multiSet(fieldNames,val){H2t.l2t();var R9p=Y7z;R9p+=T7D;R9p+=j7D;R9p+=E7D;var that=this;if($[R9p](fieldNames) && val === undefined){var L9p=x7z;L9p+=v4z;L9p+=L6z;$[L9p](fieldNames,function(name,value){var W9p=I7z;W9p+=Y7z;W9p+=d8D;that[W9p](name)[e6v](value);});}else {this[e7v](fieldNames)[e6v](val);}return this;}function node(name){var C9p=h7D;C9p+=x7z;var that=this;if(!name){var c9p=b7z;c9p+=d7z;c9p+=x7z;c9p+=f7z;name=this[c9p]();}return Array[a7v](name)?$[z1z](name,function(n){H2t.l2t();return that[e7v](n)[N5z]();}):this[e7v](name)[C9p]();}function off(name,fn){var D7D="_eventN";var O9p=D7D;O9p+=Q7D;var l9p=S9QQ[383646];l9p+=A7D;$(this)[l9p](this[O9p](name),fn);H2t.l2t();return this;}function on(name,fn){var Z9p=C5v;H2t.l2t();Z9p+=Q3z;Z9p+=Q7D;$(this)[i9z](this[Z9p](name),fn);return this;}function one(name,fn){var u9p=C5v;u9p+=e8D;H2t.l2t();$(this)[K7D](this[u9p](name),fn);return this;}function open(){var z7D="loseR";var W7D="Reorder";var U7D="nest";var H7D="_nested";var o7D="Opts";var R7D="eg";var L7D="_display";var y7D="preopen";var X3p=m9z;X3p+=v4z;X3p+=Y7z;X3p+=v7z;var d3p=H7z;d3p+=o7D;var i9p=H7D;i9p+=T6v;i9p+=v5v;var q9p=m9z;q9p+=w7D;var t9p=A9z;t9p+=y7D;var B9p=A9z;B9p+=S9QQ[465530];B9p+=z7D;B9p+=R7D;var G9p=L7D;G9p+=W7D;H2t.l2t();var _this=this;this[G9p]();this[B9p](function(){H2t.a2t();var c7D="nestedClose";var U9p=A9z;U9p+=c7D;_this[U9p](function(){_this[C7D]();H2t.l2t();_this[C5v](l5v,[M8D]);});});var ret=this[t9p](q9p);if(!ret){return this;}this[i9p](function(){var Z7D="ned";var O7D="ope";var G7D="_fo";var u7D="ditOp";var B7D="cus";var P3p=i8v;P3p+=l7D;var e3p=O7D;e3p+=Z7D;var F3p=I7z;F3p+=S9QQ[383646];F3p+=S9QQ[465530];F3p+=o2z;var k3p=x7z;k3p+=u7D;k3p+=K7z;k3p+=z7z;var g9p=S9QQ[383646];g9p+=f7z;g9p+=d8v;var S9p=G7D;S9p+=B7D;_this[S9p]($[z1z](_this[z7z][g9p],function(name){H2t.l2t();var r9p=I7z;r9p+=S5v;return _this[z7z][r9p][name];}),_this[z7z][k3p][F3p]);_this[C5v](e3p,[M8D,_this[z7z][P3p]]);},this[z7z][d3p][U7D]);this[B5v](X3p,g0z);return this;}function order(set){var k4D="All fields, and no additional fields, must be provided for ordering.";var r7D="sort";var Y3p=b7z;Y3p+=d7z;Y3p+=x7z;Y3p+=f7z;var p3p=t7D;p3p+=v7z;var v3p=z7z;v3p+=P5v;v3p+=q7D;var I3p=z7z;I3p+=S9QQ[383646];I3p+=f7z;I3p+=K7z;var b3p=i7D;b3p+=q7D;var M3p=b7z;M3p+=d8v;var m3p=E7z;m3p+=v7z;m3p+=c5z;if(!set){var x3p=S9QQ[383646];x3p+=x6v;x3p+=x7z;x3p+=f7z;return this[z7z][x3p];}if(arguments[m3p] && !Array[a7v](set)){var a3p=S9QQ[465530];a3p+=Y1z;a3p+=X0z;var V3p=z7z;V3p+=X0z;V3p+=Y7z;V3p+=q7D;set=Array[S7D][V3p][a3p](arguments);}if(this[z7z][M3p][b3p]()[I3p]()[g7D](p6z) !== set[v3p]()[r7D]()[p3p](p6z)){throw k4D;}$[f6z](this[z7z][Y3p],set);this[C0v]();return this;}function remove(items,arg1,arg2,arg3,arg4){var P4D='initRemove';var d4D='data';var j3p=v7z;j3p+=S9QQ[383646];j3p+=V1z;var T3p=z7z;T3p+=i3v;T3p+=E7z;var J3p=d7z;J3p+=S9QQ[383646];J3p+=m9z;var s3p=h5z;s3p+=z7z;var n3p=I7z;n3p+=Y7z;n3p+=t5z;var f3p=E7z;f3p+=F4D;f3p+=j1z;var _this=this;var that=this;if(this[D6v](function(){var N3p=T7z;N3p+=o3z;N3p+=x7z;H2t.a2t();that[N3p](items,arg1,arg2,arg3,arg4);})){return this;}if(items[f3p] === undefined){items=[items];}var argOpts=this[S2v](arg1,arg2,arg3,arg4);var editFields=this[t0v](n3p,items);this[z7z][k2v]=i2z;this[z7z][m4v]=items;this[z7z][s3p]=editFields;this[J3p][J6v][T3p][e4D]=t6z;this[g2v]();this[C5v](P4D,[pluck(editFields,j3p),pluck(editFields,d4D),items],function(){var m4D="iRemove";var x4D="Mul";var E3p=X4D;E3p+=x4D;E3p+=K7z;E3p+=m4D;_this[C5v](E3p,[editFields,items],function(){var V4D="ybeOpe";var M4D="embleMain";var p4D="utt";var I4D="cu";var a4D="_ass";var Y4D="eq";var Q3p=m9z;Q3p+=v4z;Q3p+=V4D;Q3p+=v7z;var D3p=S9QQ[383646];D3p+=d3z;D3p+=K7z;D3p+=z7z;var h3p=a4D;h3p+=M4D;_this[h3p]();_this[p5v](argOpts[D3p]);argOpts[Q3p]();var opts=_this[z7z][v1z];H2t.a2t();if(opts[b4D] !== q0z){var H3p=I7z;H3p+=S9QQ[383646];H3p+=I4D;H3p+=z7z;var o3p=n2v;o3p+=v4D;var K3p=N8D;K3p+=m9z;var A3p=S9QQ[624975];A3p+=p4D;A3p+=i9z;$(A3p,_this[K3p][o3p])[Y4D](opts[b4D])[H3p]();}});});return this;}function set(set,val){var w3p=C7z;H2t.a2t();w3p+=L6z;var that=this;if(!$[A6v](set)){var o={};o[set]=val;set=o;}$[w3p](set,function(n,v){var y3p=z7z;y3p+=x7z;H2t.a2t();y3p+=K7z;that[e7v](n)[y3p](v);});return this;}function show(names,animate){var that=this;H2t.a2t();$[Q5z](this[z8D](names),function(i,n){H2t.l2t();var R3p=N4D;R3p+=K4z;var z3p=P7z;z3p+=d7z;that[z3p](n)[R3p](animate);});return this;}function submit(successCallback,errorCallback,formatdata,hide){var O3p=x7z;O3p+=v4z;O3p+=S9QQ[465530];O3p+=V3z;var W3p=f4D;W3p+=n4D;var L3p=P7z;L3p+=q1z;var _this=this;var fields=this[z7z][L3p],errorFields=[],errorReady=Y8z,sent=g0z;if(this[z7z][W3p] || !this[z7z][k2v]){return this;}this[s4D](S0z);var send=function(){var J4D='initSubmit';H2t.a2t();var c3p=W5z;c3p+=c5z;if(errorFields[c3p] !== errorReady || sent){return;}_this[C5v](J4D,[_this[z7z][k2v]],function(result){var T4D="_su";var l3p=T4D;l3p+=j4D;if(result === g0z){var C3p=E4D;C3p+=h4D;C3p+=f1v;_this[C3p](g0z);return;}H2t.a2t();sent=S0z;_this[l3p](successCallback,errorCallback,formatdata,hide);});};this[p5z]();$[O3p](fields,function(name,field){var D4D="nEr";var Z3p=Y7z;Z3p+=D4D;Z3p+=J9z;if(field[Z3p]()){var u3p=d3z;u3p+=Q4D;errorFields[u3p](name);}});$[Q5z](errorFields,function(i,name){fields[name][p5z](c0z,function(){H2t.l2t();errorReady++;send();});});send();return this;}function table(set){var B3p=I5z;B3p+=S9QQ[624975];B3p+=X0z;B3p+=x7z;if(set === undefined){var G3p=E1z;G3p+=X0z;G3p+=x7z;return this[z7z][G3p];}this[z7z][B3p]=set;return this;}function template(set){H2t.a2t();if(set === undefined){return this[z7z][A4D];}this[z7z][A4D]=set === q0z?q0z:$(set);return this;}function title(title){var g3p=V3z;g3p+=h8v;g3p+=X0z;var i3p=K4D;i3p+=S9z;H2t.a2t();var t3p=S9QQ[465530];t3p+=A4v;var U3p=V3z;U3p+=C7z;U3p+=d8v;var header=$(this[h4v][U3p])[b3v](o4D + this[i0v][d4v][t3p]);if(title === undefined){var q3p=H4D;q3p+=X0z;return header[q3p]();}if(typeof title === i3p){var S3p=w4D;S3p+=Y7z;title=title(this,new DataTable$4[S3p](this[z7z][q2z]));}header[g3p](title);return this;}function val(field,value){H2t.l2t();var y4D="PlainObject";var r3p=b2z;r3p+=y4D;if(value !== undefined || $[r3p](field)){return this[e1v](field,value);}return this[m2v](field);;}function error(msg,tn,thro){var W4D="wa";var z4D=" For more information, please refer";var R4D=" to";var L4D=" https://datatables.net/tn/";var k0p=z4D;k0p+=R4D;k0p+=L4D;H2t.l2t();if(thro === void Y8z){thro=S0z;}var display=tn?msg + k0p + tn:msg;if(thro){throw display;}else {var F0p=W4D;F0p+=c4D;console[F0p](display);}}function pairs(data,props,fn){var e0p=H8v;e0p+=C4D;var i,ien,dataPoint;props=$[f6z]({label:E1v,value:e0p},props);if(Array[a7v](data)){for((i=Y8z,ien=data[C6z]);i < ien;i++){dataPoint=data[i];if($[A6v](dataPoint)){var P0p=H8v;P0p+=X0z;P0p+=P3z;P0p+=x7z;fn(dataPoint[props[P0p]] === undefined?dataPoint[props[q8v]]:dataPoint[props[l4D]],dataPoint[props[q8v]],i,dataPoint[K8v]);}else {fn(dataPoint,dataPoint,i);}}}else {var d0p=x7z;d0p+=v4z;d0p+=L6z;i=Y8z;$[d0p](data,function(key,val){fn(val,key,i);i++;});}}function upload$1(editor,conf,files,progressCallback,completeCallback){var O4D="readAsDataUR";var r4D='A server error occurred while uploading the file';var k9D="onload";var G4D="<i>Uploading ";var i4D="aj";var u4D="imitLeft";var U4D="eRead";var S4D="ax";var B4D="e</i>";var a3D="_limitLeft";var X6p=O4D;X6p+=b0v;var d6p=Z4D;d6p+=u4D;var a0p=G4D;a0p+=i7z;a0p+=B4D;var V0p=i7z;V0p+=U4D;V0p+=t4D;var m0p=g1z;m0p+=q4D;var x0p=i4D;x0p+=S4D;var X0p=g4D;H2t.a2t();X0p+=f7z;var reader=new FileReader();var counter=Y8z;var ids=[];var generalError=r4D;editor[X0p](conf[D5z],c0z);if(typeof conf[x0p] === m0p){conf[J1z](files,function(ids){completeCallback[S1z](editor,ids);});return;}progressCallback(conf,conf[V0p] || a0p);reader[k9D]=function(e){var v9D='uploadField';var j9D="ion instead.";var s9D="Upload feature can";var I9D='upload';var X9D="isPlain";var V9D="xData";var J9D="not use `ajax.da";var b9D='action';var T9D="ta` with an object. Please use it as a funct";var n9D='No Ajax option specified for upload plug-in';var N9D="load";H2t.l2t();var E9D='preUpload';var x9D="Ob";var d9D="tring";var a9D="ploa";var m9D="je";var p9D="ajaxData";var D0p=F9D;D0p+=t9z;D0p+=K7z;var E0p=d7z;E0p+=v4z;E0p+=K7z;E0p+=v4z;var T0p=e9D;T0p+=v7z;var J0p=d7z;J0p+=P9D;var s0p=z7z;s0p+=d9D;var N0p=X9D;N0p+=x9D;N0p+=m9D;N0p+=C1v;var Y0p=i4D;Y0p+=v4z;Y0p+=t7z;var p0p=m6v;p0p+=V9D;var v0p=P3z;v0p+=a9D;v0p+=d7z;var I0p=m3v;I0p+=d7z;var b0p=v7z;b0p+=v4z;b0p+=m9z;b0p+=x7z;var M0p=M9D;M0p+=a4z;var data=new FormData();var ajax;data[M0p](b9D,I9D);data[N9v](v9D,conf[b0p]);data[I0p](v0p,files[counter]);if(conf[p0p]){conf[p9D](data,files[counter],counter);}if(conf[Y0p]){ajax=conf[J1z];}else if($[N0p](editor[z7z][J1z])){var f0p=Y9D;f0p+=N9D;ajax=editor[z7z][J1z][f9D]?editor[z7z][J1z][f0p]:editor[z7z][J1z];}else if(typeof editor[z7z][J1z] === n8v){var n0p=v4z;n0p+=b1v;n0p+=v4z;n0p+=t7z;ajax=editor[z7z][n0p];}if(!ajax){throw new Error(n9D);}if(typeof ajax === s0p){ajax={url:ajax};}if(typeof ajax[J0p] === T0p){var j0p=z7z;j0p+=K7z;j0p+=f7z;j0p+=l9z;var d={};var ret=ajax[B7z](d);if(ret !== undefined && typeof ret !== j0p){d=ret;}$[Q5z](d,function(key,value){data[N9v](key,value);});}else if($[A6v](ajax[E0p])){var h0p=s9D;h0p+=J9D;h0p+=T9D;h0p+=j9D;throw new Error(h0p);}editor[D0p](E9D,[conf[D5z],files[counter],data],function(preRet){var Q9D="aURL";var D9D="adAsDat";var h9D="son";var A9D='preSubmit.DTE_Upload';var H0p=b1v;H0p+=h9D;var o0p=d3z;o0p+=S9QQ[383646];o0p+=W9v;var K0p=m4z;K0p+=V4z;if(preRet === g0z){if(counter < files[C6z] - N8z){var Q0p=K3z;Q0p+=D9D;Q0p+=Q9D;counter++;reader[Q0p](files[counter]);}else {var A0p=S9QQ[465530];A0p+=v4z;A0p+=X0z;A0p+=X0z;completeCallback[A0p](editor,ids);}return;}var submit=g0z;editor[i9z](A9D,function(){submit=S0z;H2t.l2t();return g0z;});$[J1z]($[K0p]({},ajax,{type:o0p,data:data,dataType:H0p,contentType:g0z,processData:g0z,xhr:function(){var w9D="onl";var y9D="oaden";var K9D="pload";var z9D="gress";var H9D="xhr";var o9D="ajaxSettings";var w0p=P3z;w0p+=K9D;var xhr=$[o9D][H9D]();if(xhr[w0p]){var W0p=w9D;W0p+=y9D;W0p+=d7z;var z0p=S9QQ[383646];z0p+=v7z;z0p+=f4D;z0p+=z9D;var y0p=R9D;y0p+=L9D;xhr[y0p][z0p]=function(e){var C9D="loaded";var W8z=100;var l9D="toFixed";var Z9D=':';var O9D="%";var W9D="lengthComputable";if(e[W9D]){var L0p=E7z;L0p+=v7z;L0p+=P2v;L0p+=V3z;var R0p=K7z;R0p+=c9D;R0p+=v4z;R0p+=X0z;var percent=(e[C9D] / e[R0p] * W8z)[l9D](Y8z) + O9D;progressCallback(conf,files[C6z] === N8z?percent:counter + Z9D + files[L0p] + y2v + percent);}};xhr[f9D][W0p]=function(e){var G9D="ces";var u9D="Pro";var U9D="processingText";var c0p=u9D;c0p+=G9D;c0p+=B9D;progressCallback(conf,conf[U9D] || c0p);};}return xhr;},success:function(json){var k3D='uploadXhrSuccess';var x3D="eadAsDat";var g9D="ors";var t9D="ngt";var m3D="aUR";var i9D="dE";var d3D="uploa";var q9D="ldErrors";var t0p=Y7z;t0p+=d7z;var U0p=P3z;U0p+=i1v;U0p+=L9D;var u0p=E7z;u0p+=t9D;u0p+=V3z;var Z0p=i5z;Z0p+=x7z;Z0p+=q9D;var O0p=P7z;O0p+=i9D;O0p+=S9D;O0p+=g9D;var l0p=v7z;l0p+=r9D;l0p+=x7z;var C0p=S9QQ[383646];C0p+=A7D;editor[C0p](A9D);editor[C5v](k3D,[conf[l0p],json]);if(json[O0p] && json[Z0p][u0p]){var errors=json[F3D];for(var i=Y8z,ien=errors[C6z];i < ien;i++){var G0p=v3z;G0p+=Z9z;G0p+=f7z;editor[G0p](errors[i][D5z],errors[i][e3D]);}}else if(json[p5z]){var B0p=x7z;B0p+=P3D;B0p+=f7z;editor[B0p](json[p5z]);}else if(!json[U0p] || !json[f9D][t0p]){var q0p=x7z;q0p+=f7z;q0p+=Z9z;q0p+=f7z;editor[q0p](conf[D5z],generalError);}else {var F6p=W0v;F6p+=V3z;var k6p=d3D;k6p+=d7z;var i0p=I7z;i0p+=Y7z;i0p+=X0z;i0p+=m8v;if(json[i0p]){$[Q5z](json[Q8D],function(table,files){var X3D="iles";var r0p=i5z;r0p+=E7z;r0p+=z7z;var g0p=x7z;g0p+=t7z;H2t.a2t();g0p+=K7z;g0p+=a4z;if(!Editor[Q8D][table]){var S0p=I7z;S0p+=X3D;Editor[S0p][table]={};}$[g0p](Editor[r0p][table],files);});}ids[s6z](json[k6p][R1z]);if(counter < files[F6p] - N8z){var e6p=f7z;e6p+=x3D;e6p+=m3D;e6p+=b0v;counter++;reader[e6p](files[counter]);}else {completeCallback[S1z](editor,ids);if(submit){editor[I6v]();}}}progressCallback(conf);},error:function(xhr){var V3D='uploadXhrError';var P6p=R0v;P6p+=K2z;editor[p5z](conf[D5z],generalError);editor[C5v](V3D,[conf[P6p],xhr]);progressCallback(conf);}}));});};files=$[z1z](files,function(val){H2t.l2t();return val;});if(conf[d6p] !== undefined){files[s1z](conf[a3D],files[C6z]);}reader[X6p](files[Y8z]);}var DataTable$3=$[x6p][O0z];var __inlineCounter=Y8z;function _actionClass(){var I3D="remov";var M3D="actions";var b6p=x7z;b6p+=d7z;b6p+=Y7z;b6p+=K7z;var a6p=h7v;a6p+=S9QQ[383646];a6p+=o3z;a6p+=x7z;var V6p=x7z;V6p+=W7z;var m6p=N8D;m6p+=m9z;var classesActions=this[i0v][M3D];var action=this[z7z][k2v];var wrapper=$(this[m6p][n4v]);wrapper[a5z]([classesActions[m7D],classesActions[V6p],classesActions[a6p]][g7D](y2v));H2t.a2t();if(action === m7D){var M6p=v4z;M6p+=d7z;M6p+=d7z;M6p+=b3D;wrapper[M6p](classesActions[m7D]);}else if(action === b6p){var I6p=A7z;I6p+=K7z;wrapper[x5z](classesActions[I6p]);}else if(action === i2z){var p6p=I3D;p6p+=x7z;var v6p=v3D;v6p+=X0z;v6p+=p3D;wrapper[v6p](classesActions[p6p]);}}function _ajax(data,success,error,submitParams){var U3D="ents";var f3D="ETE";var L3D='idSrc';var S3D=/{id}/;var T3D="emen";var E3D="editFi";var l3D="url";var u3D="complete";var k0D="param";var g3D="deleteBody";var B3D="cem";var N3D="DEL";var G3D="pla";var Y3D="Body";var n3D="place";H2t.l2t();var F0D='?';var c3D="exO";var i3D=/_id_/;var J3D="replac";var s3D="rl";var U6p=d7z;U6p+=i3z;U6p+=x7z;U6p+=Y3D;var B6p=N3D;B6p+=f3D;var G6p=K7z;G6p+=j3z;G6p+=G1z;var O6p=K3z;O6p+=n3D;var l6p=P3z;l6p+=s3D;var R6p=J3D;R6p+=T3D;R6p+=K7z;R6p+=z7z;var h6p=j3D;h6p+=v7z;h6p+=I0z;var E6p=t7D;E6p+=v7z;var j6p=E3D;j6p+=t5z;var T6p=v4z;T6p+=b1v;T6p+=v4z;T6p+=t7z;var N6p=b1v;N6p+=z7z;N6p+=i9z;var Y6p=S7v;Y6p+=S9z;var action=this[z7z][Y6p];var thrown;var opts={type:Y1v,dataType:N6p,data:q0z,error:[function(xhr,text,err){H2t.a2t();thrown=err;}],success:[],complete:[function(xhr,text){var H3D="rs";var o3D="nseTe";var Q3D="responseText";var K3D="respo";var D3D="ainObject";var h3D="isPl";var A3D='null';var w3D="responseJSON";var C8z=400;var c8z=204;var y3D="tus";var s6p=h3D;s6p+=D3D;var json=q0z;if(xhr[e3D] === c8z || xhr[Q3D] === A3D){json={};}else {try{var n6p=K3D;n6p+=o3D;n6p+=G7z;var f6p=r8v;f6p+=H3D;f6p+=x7z;json=xhr[w3D]?xhr[w3D]:JSON[f6p](xhr[n6p]);}catch(e){}}if($[s6p](json) || Array[a7v](json)){var J6p=z7z;J6p+=I5z;J6p+=y3D;success(json,xhr[J6p] >= C8z,xhr);}else {error(xhr,text,thrown);}}]};var a;var ajaxSrc=this[z7z][T6p];var id=action === z3D || action === R3D?pluck(this[z7z][j6p],L3D)[E6p](W3D):q0z;if($[A6v](ajaxSrc) && ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc === S9QQ.k7z){ajaxSrc(q0z,q0z,data,success,error);return;}else if(typeof ajaxSrc === h6p){var D6p=o1z;D6p+=c3D;D6p+=I7z;if(ajaxSrc[D6p](y2v) !== -N8z){var A6p=P3z;A6p+=f7z;A6p+=X0z;var Q6p=z7z;Q6p+=i1v;Q6p+=Y7z;Q6p+=K7z;a=ajaxSrc[Q6p](y2v);opts[C3D]=a[Y8z];opts[A6p]=a[N8z];}else {opts[l3D]=ajaxSrc;}}else {var z6p=h7z;z6p+=K7z;z6p+=a4z;var o6p=v3z;o6p+=f7z;o6p+=S9QQ[383646];o6p+=f7z;var K6p=v2z;K6p+=O3D;K6p+=Z3D;var optsCopy=$[f6z]({},ajaxSrc || ({}));if(optsCopy[K6p]){opts[u3D][P6v](optsCopy[u3D]);delete optsCopy[u3D];}if(optsCopy[o6p]){var y6p=x7z;y6p+=E8D;var w6p=g4D;w6p+=f7z;var H6p=g4D;H6p+=f7z;opts[H6p][P6v](optsCopy[w6p]);delete optsCopy[y6p];}opts=$[z6p]({},opts,optsCopy);}if(opts[R6p]){var L6p=K3z;L6p+=G3D;L6p+=B3D;L6p+=U3D;$[Q5z](opts[L6p],function(key,repl){var q3D='}';var t3D='{';var C6p=S9QQ[465530];C6p+=Y1z;C6p+=X0z;var c6p=E6z;c6p+=i8v;c6p+=x7z;var W6p=p6v;W6p+=X0z;opts[l3D]=opts[W6p][c6p](t3D + key + q3D,repl[C6p](this,key,id,action,data));});}opts[l3D]=opts[l6p][O6p](i3D,id)[K6z](S3D,id);if(opts[B7z]){var u6p=d7z;u6p+=v4z;u6p+=K7z;u6p+=v4z;var Z6p=d7z;Z6p+=p7v;Z6p+=v4z;var isFn=typeof opts[Z6p] === S9QQ.k7z;var newData=isFn?opts[u6p](data):opts[B7z];data=isFn && newData?newData:$[f6z](S0z,data,newData);}opts[B7z]=data;if(opts[G6p] === B6p && (opts[g3D] === undefined || opts[U6p] === S0z)){var q6p=F1z;q6p+=r3D;var t6p=d7z;t6p+=P9D;var params=$[k0D](opts[t6p]);opts[l3D]+=opts[l3D][q6p](F0D) === -N8z?F0D + params:e0D + params;delete opts[B7z];}$[J1z](opts);}function _animate(target,style,time,callback){var P0D="unc";var d0D="tio";var i6p=I7z;i6p+=v7z;if($[i6p][H4v]){var S6p=z7z;S6p+=N7z;S6p+=d3z;target[S6p]()[H4v](style,time,callback);}else {var r6p=I7z;r6p+=P0D;r6p+=d0D;r6p+=v7z;var g6p=S9QQ[465530];g6p+=z7z;g6p+=z7z;target[g6p](style);if(typeof time === r6p){time[S1z](target);}else if(callback){callback[S1z](target);}}}function _assembleMain(){var b0D="ade";var X0D="formI";var m0D="bodyC";var x0D="nfo";var V5p=X0D;V5p+=x0D;var m5p=m3v;m5p+=d7z;var x5p=m0D;x5p+=V0D;x5p+=o4v;var X5p=S9QQ[624975];X5p+=a0D;X5p+=v4D;var d5p=v4z;d5p+=a4v;d5p+=v7z;d5p+=d7z;var P5p=e9v;P5p+=G1z;P5p+=V4z;var e5p=M0D;e5p+=K7z;e5p+=v3z;var F5p=V3z;F5p+=x7z;F5p+=b0D;F5p+=f7z;var k5p=a0v;k5p+=I0D;k5p+=v3z;var dom=this[h4v];$(dom[k5p])[K5v](dom[F5p]);$(dom[e5p])[P5p](dom[A5v])[d5p](dom[X5p]);$(dom[x5p])[m5p](dom[V5p])[N9v](dom[J6v]);}function _blur(){var Y0D="B";var N0D="tO";var f0D='preBlur';var n0D="_clo";var v5p=S9QQ[465530];v5p+=v0D;v5p+=n7z;var I5p=p0D;I5p+=K7z;var b5p=F9D;b5p+=J9v;var M5p=i9z;M5p+=Y0D;M5p+=G5v;var a5p=A7z;a5p+=N0D;a5p+=d3z;a5p+=U1z;var opts=this[z7z][a5p];var onBlur=opts[M5p];if(this[b5p](f0D) === g0z){return;}if(typeof onBlur === S9QQ.k7z){onBlur(this);}else if(onBlur === I5p){this[I6v]();}else if(onBlur === v5p){var p5p=n0D;p5p+=n7z;this[p5p]();}}function _clearDynamicInfo(errorsOnly){var s0D="v.";var J5p=x7z;J5p+=S9D;J5p+=b7z;var n5p=x7z;n5p+=v4z;n5p+=L6z;var f5p=d7z;f5p+=Y7z;f5p+=s0D;var N5p=I7z;N5p+=h8D;N5p+=z7z;var Y5p=v3z;Y5p+=Z9z;Y5p+=f7z;if(errorsOnly === void Y8z){errorsOnly=g0z;}if(!this[z7z]){return;}var errorClass=this[i0v][e7v][Y5p];var fields=this[z7z][N5p];$(f5p + errorClass,this[h4v][n4v])[a5z](errorClass);$[n5p](fields,function(name,field){var s5p=g4D;s5p+=f7z;field[s5p](c0z);H2t.a2t();if(!errorsOnly){field[I7D](c0z);}});this[J5p](c0z);if(!errorsOnly){var T5p=u2v;T5p+=J0D;this[T5p](c0z);}}function _close(submitComplete,mode){var T0D="loseI";var E0D="preClo";var Q0D="Cb";var K0D="seIc";var A0D="closeC";var o0D="closeI";var H0D='focus.editor-focus';var o5p=S9QQ[465530];H2t.a2t();o5p+=X0z;o5p+=S9QQ[383646];o5p+=n7z;var K5p=S9QQ[383646];K5p+=I7z;K5p+=I7z;var D5p=S9QQ[465530];D5p+=T0D;D5p+=j0D;var j5p=E0D;j5p+=z7z;j5p+=x7z;var closed;if(this[C5v](j5p) === g0z){return;}if(this[z7z][h0D]){var h5p=D0D;h5p+=n7z;h5p+=Q0D;var E5p=A0D;E5p+=S9QQ[624975];closed=this[z7z][E5p](submitComplete,mode);this[z7z][h5p]=q0z;}if(this[z7z][D5p]){var A5p=D0D;A5p+=K0D;A5p+=S9QQ[624975];var Q5p=o0D;Q5p+=j0D;this[z7z][Q5p]();this[z7z][A5p]=q0z;}$(Y9v)[K5p](H0D);this[z7z][x8D]=g0z;this[C5v](o5p);if(closed){var H5p=N6v;H5p+=D7v;H5p+=v7z;H5p+=K7z;this[H5p](l5v,[closed]);}}function _closeReg(fn){H2t.l2t();this[z7z][h0D]=fn;}function _crudArgs(arg1,arg2,arg3,arg4){var z0D="main";var y0D='boolean';var w0D="ormOptions";var y5p=I7z;y5p+=w0D;var w5p=I4z;H2t.a2t();w5p+=d7z;var that=this;var title;var buttons;var show;var opts;if($[A6v](arg1)){opts=arg1;}else if(typeof arg1 === y0D){show=arg1;opts=arg2;;}else {title=arg1;buttons=arg2;show=arg3;opts=arg4;;}if(show === undefined){show=S0z;}if(title){that[H5v](title);}if(buttons){that[z5v](buttons);}return {opts:$[w5p]({},this[z7z][y5p][z0D],opts),maybeOpen:function(){H2t.a2t();if(show){var z5p=F2v;z5p+=x7z;z5p+=v7z;that[z5p]();}}};}function _dataSource(name){var L0D="aTab";var W0D="dataSourc";var R0D="tml";var c5p=V3z;c5p+=R0D;var W5p=K1z;W5p+=L0D;W5p+=E7z;var L5p=W0D;L5p+=m8v;var R5p=K7z;R5p+=P4v;R5p+=X0z;R5p+=x7z;var args=[];for(var _i=N8z;_i < arguments[C6z];_i++){args[_i - N8z]=arguments[_i];}var dataSource=this[z7z][R5p]?Editor[L5p][W5p]:Editor[c0D][c5p];var fn=dataSource[name];if(fn){return fn[s5v](this,args);}}function _displayReorder(includeFields){var u0D="include";var O0D="mpl";var Z0D="formContent";var q0D='displayOrder';var l0D="mai";var C0D="etach";var u5p=d7z;u5p+=C0D;var O5p=l0D;O5p+=v7z;var l5p=l7z;l5p+=O0D;l5p+=v4z;l5p+=l7z;var C5p=d7z;C5p+=S9QQ[383646];C5p+=m9z;var _this=this;var formContent=$(this[C5p][Z0D]);var fields=this[z7z][C2z];var order=this[z7z][l0v];var template=this[z7z][l5p];var mode=this[z7z][S0v] || O5p;if(includeFields){var Z5p=u0D;Z5p+=g0v;this[z7z][Z5p]=includeFields;}else {includeFields=this[z7z][l2v];}formContent[b3v]()[u5p]();$[Q5z](order,function(i,name){H2t.a2t();var t0D='[data-editor-template="';var U0D="after";var G0D="_weakIn";var B0D='editor-field[name="';var G5p=G0D;G5p+=n7v;if(_this[G5p](name,includeFields) !== -N8z){var B5p=m9z;B5p+=v4z;B5p+=Y7z;B5p+=v7z;if(template && mode === B5p){var g5p=v7z;g5p+=q5z;var S5p=M9D;S5p+=a4z;var i5p=J6z;i5p+=T6z;var q5p=I7z;q5p+=Y7z;q5p+=v7z;q5p+=d7z;var t5p=h7D;t5p+=x7z;var U5p=I7z;U5p+=Y7z;U5p+=V4z;template[U5p](B0D + name + t8v)[U0D](fields[name][t5p]());template[q5p](t0D + name + i5p)[S5p](fields[name][g5p]());}else {var k2p=v7z;k2p+=S9QQ[383646];k2p+=V1z;var r5p=v4z;r5p+=I0D;r5p+=t9z;r5p+=d7z;formContent[r5p](fields[name][k2p]());}}});if(template && mode === M8D){template[Q5v](formContent);}this[C5v](q0D,[this[z7z][x8D],this[z7z][k2v],formContent]);}function _edit(items,editFields,type,formOptions,setupDone){var b6D="inA";var i0D="initEd";var g0D="eord";var S0D="_displayR";var r0D="cti";var o2p=d7z;o2p+=v4z;o2p+=K7z;o2p+=v4z;var K2p=v7z;K2p+=S9QQ[383646];K2p+=V1z;var A2p=i0D;A2p+=M7z;var Q2p=S0D;Q2p+=g0D;Q2p+=x7z;Q2p+=f7z;var E2p=i7D;E2p+=q7D;var j2p=S9QQ[383646];j2p+=f7z;j2p+=d8v;var V2p=m9z;V2p+=S9QQ[383646];V2p+=d7z;V2p+=x7z;var m2p=S9QQ[624975];m2p+=v0D;m2p+=S9QQ[465530];m2p+=H2z;var x2p=d7z;x2p+=Y7z;x2p+=I7v;var X2p=N8D;X2p+=m9z;var d2p=O6z;d2p+=Y7z;d2p+=K7z;var P2p=v4z;P2p+=r0D;P2p+=S9QQ[383646];P2p+=v7z;var e2p=A7z;e2p+=y6z;var F2p=P7z;F2p+=d7z;F2p+=z7z;var _this=this;var fields=this[z7z][F2p];var usedFields=[];var includeInOrder;var editData={};this[z7z][q2v]=editFields;this[z7z][e2p]=editData;this[z7z][m4v]=items;this[z7z][P2p]=d2p;this[X2p][J6v][q9v][x2p]=m2p;this[z7z][V2p]=type;this[g2v]();$[Q5z](fields,function(name,field){var F6D="R";var e6D="eset";H2t.a2t();var M2p=C7z;M2p+=L6z;var a2p=k6D;a2p+=F6D;a2p+=e6D;field[a2p]();includeInOrder=g0z;editData[name]={};$[M2p](editFields,function(idSrc,edit){var d6D="valFro";var m6D="displayFie";H2t.a2t();var V6D="isp";var P6D="sA";var a6D="iSe";var X6D="mD";var x6D="nullDefault";var b2p=z0v;b2p+=X0z;b2p+=q1z;if(edit[b2p][name]){var f2p=f7z;f2p+=K4z;var N2p=z7z;N2p+=v2z;N2p+=G1z;var Y2p=z7z;Y2p+=X0z;Y2p+=Y7z;Y2p+=q7D;var p2p=Y7z;p2p+=P6D;p2p+=S9D;p2p+=v1v;var v2p=q6z;v2p+=K7z;v2p+=v4z;var I2p=d6D;I2p+=X6D;I2p+=p7v;I2p+=v4z;var val=field[I2p](edit[v2p]);var nullDefault=field[x6D]();editData[name][idSrc]=val === q0z?c0z:Array[p2p](val)?val[Y2p]():val;if(!formOptions || formOptions[N2p] === f2p){var n2p=d7z;n2p+=k6v;field[e6v](idSrc,val === undefined || nullDefault && val === q0z?field[n2p]():val);if(!edit[F2z] || edit[F2z][name]){includeInOrder=S0z;}}else {var J2p=m6D;J2p+=S8v;J2p+=z7z;var s2p=d7z;s2p+=V6D;s2p+=k5z;s2p+=B5z;if(!edit[s2p] || edit[J2p][name]){var T2p=r2v;T2p+=K7z;T2p+=a6D;T2p+=K7z;field[T2p](idSrc,val === undefined || nullDefault && val === q0z?field[F1v]():val);includeInOrder=S0z;}}}});if(field[M6D]()[C6z] !== Y8z && includeInOrder){usedFields[s6z](name);}});var currOrder=this[j2p]()[E2p]();for(var i=currOrder[C6z] - N8z;i >= Y8z;i--){var h2p=b6D;h2p+=K5z;if($[h2p](currOrder[i][I6D](),usedFields) === -N8z){var D2p=z7z;D2p+=i1v;D2p+=v6D;currOrder[D2p](i,N8z);}}this[Q2p](currOrder);this[C5v](A2p,[pluck(editFields,K2p)[Y8z],pluck(editFields,o2p)[Y8z],items,type],function(){var p6D="MultiEd";var Y6D="even";var w2p=X4D;w2p+=p6D;w2p+=M7z;H2t.a2t();var H2p=A9z;H2p+=Y6D;H2p+=K7z;_this[H2p](w2p,[editFields,items,type],function(){setupDone();});});}function _event(trigger,args,promiseComplete){var N6D="inde";var j6D="obje";H2t.l2t();var J6D='pre';var n6D="Event";if(args === void Y8z){args=[];}if(promiseComplete === void Y8z){promiseComplete=undefined;}if(Array[a7v](trigger)){var y2p=X0z;y2p+=x7z;y2p+=F4D;y2p+=j1z;for(var i=Y8z,ien=trigger[y2p];i < ien;i++){var z2p=N6v;z2p+=o3z;z2p+=x7z;z2p+=o4v;this[z2p](trigger[i],args);}}else {var L2p=N6D;L2p+=f6D;var R2p=V8v;R2p+=V9z;R2p+=K7z;var e=$[n6D](trigger);$(this)[s6D](e,args);var result=e[R2p];if(trigger[L2p](J6D) === Y8z && result === g0z){var c2p=g3z;c2p+=h6v;c2p+=l1z;var W2p=a7z;W2p+=T6D;$(this)[s6D]($[W2p](trigger + c2p),args);}if(promiseComplete){var l2p=K7z;l2p+=V3z;l2p+=x7z;l2p+=v7z;var C2p=j6D;C2p+=S9QQ[465530];C2p+=K7z;if(result && typeof result === C2p && result[l2p]){result[l1v](promiseComplete);}else {promiseComplete(result);}}return result;}}function _eventName(input){var Q6D=/^on([A-Z])/;var E6D="jo";var K6D="toLowerCase";var D6D="match";var A6D="substr";var Z2p=E6D;Z2p+=Y7z;Z2p+=v7z;var name;H2t.l2t();var names=input[h6D](y2v);for(var i=Y8z,ien=names[C6z];i < ien;i++){name=names[i];var onStyle=name[D6D](Q6D);if(onStyle){var O2p=A6D;O2p+=F1z;O2p+=I0z;name=onStyle[N8z][K6D]() + name[O2p](n8z);}names[i]=name;}return names[Z2p](y2v);}function _fieldFromNode(node){var G2p=i5z;G2p+=d8D;G2p+=z7z;var u2p=x7z;u2p+=i8v;u2p+=V3z;var foundField=q0z;H2t.a2t();$[u2p](this[z7z][G2p],function(name,field){var B2p=i5z;B2p+=V4z;if($(field[N5z]())[B2p](node)[C6z]){foundField=field;}});return foundField;}function _fieldNames(fieldNames){H2t.l2t();if(fieldNames === undefined){return this[C2z]();}else if(!Array[a7v](fieldNames)){return [fieldNames];}return fieldNames;}function _focus(fieldsIn,focus){var W6D=/^jq:/;var L6D="TE ";var z6D='jq:';var w6D="ndex";var R6D="v.D";var C6D="setFocus";var H6D="mbe";var i2p=o6D;i2p+=H6D;i2p+=f7z;var q2p=m9z;q2p+=v4z;q2p+=d3z;var t2p=f7z;t2p+=H1z;var U2p=v4z;U2p+=S9QQ[465530];U2p+=K7z;U2p+=S9z;var _this=this;if(this[z7z][U2p] === t2p){return;}var field;var fields=$[q2p](fieldsIn,function(fieldOrName){H2t.a2t();return typeof fieldOrName === n8v?_this[z7z][C2z][fieldOrName]:fieldOrName;});if(typeof focus === i2p){field=fields[focus];}else if(focus){var S2p=Y7z;S2p+=w6D;S2p+=y6D;if(focus[S2p](z6D) === Y8z){var g2p=m7z;g2p+=R6D;g2p+=L6D;field=$(g2p + focus[K6z](W6D,c0z));}else {field=this[z7z][C2z][focus];}}else {var r2p=S9QQ[624975];r2p+=X0z;r2p+=P3z;r2p+=f7z;document[c6D][r2p]();}this[z7z][C6D]=field;if(field){field[b4D]();}}function _formOptions(opts){var u6D='.dteInline';var k5D="canReturnSubmit";var F5D='keyup';var B6D="itl";var l6D="ole";var U6D="essa";var O6D="mess";var Z6D="editCoun";var a1p=S9QQ[624975];a1p+=S9QQ[383646];a1p+=l6D;a1p+=h6v;var V1p=Z7z;V1p+=u7z;var X1p=z7z;X1p+=K7z;X1p+=f7z;X1p+=l9z;var d1p=O6D;d1p+=v4z;d1p+=I0z;d1p+=x7z;var k1p=Z6D;k1p+=K7z;var _this=this;var that=this;var inlineCount=__inlineCounter++;var namespace=u6D + inlineCount;this[z7z][v1z]=opts;this[z7z][k1p]=inlineCount;if(typeof opts[H5v] === n8v || typeof opts[H5v] === S9QQ.k7z){var P1p=V9v;P1p+=G6D;var e1p=K7z;e1p+=B6D;e1p+=x7z;var F1p=V9v;F1p+=K7z;F1p+=X0z;F1p+=x7z;this[F1p](opts[e1p]);opts[P1p]=S0z;}if(typeof opts[d1p] === X1p || typeof opts[I7D] === S9QQ.k7z){var m1p=u2v;m1p+=J0D;var x1p=m9z;x1p+=U6D;x1p+=r9z;this[I7D](opts[x1p]);opts[m1p]=S0z;}if(typeof opts[V1p] !== a1p){var M1p=t6D;M1p+=S9QQ[383646];M1p+=x1z;this[M1p](opts[z5v]);opts[z5v]=S0z;}$(document)[i9z](q6D + namespace,function(e){var r6D="mNode";var S6D="_fi";var i6D="anReturnSubmit";var g6D="eldFr";if(e[L2v] === j8z && _this[z7z][x8D]){var el=$(document[c6D]);if(el){var v1p=e9D;v1p+=v7z;var I1p=S9QQ[465530];I1p+=i6D;var b1p=S6D;b1p+=g6D;b1p+=S9QQ[383646];b1p+=r6D;var field=_this[b1p](el);if(field && typeof field[I1p] === v1p && field[k5D](el)){e[c2v]();}}}});$(document)[i9z](F5D + namespace,function(e){var a5D="preve";var V5D="urn";var m5D="onR";var D5D="next";var w8z=39;var X5D="nSubmit";var J5D="hi";var d5D="canRetu";var o8z=27;var H8z=37;var b5D="onReturn";var Y5D="func";var M5D="ntDefault";var v5D="nEsc";var j5D='button';var E5D="trigger";var I5D="Es";var P5D="eEleme";var e5D="activ";var p5D="Esc";var f5D="mi";var T5D="prev";var s5D='.DTE_Form_Buttons';var h5D="igger";var o1p=W5z;o1p+=c5z;var J1p=d0z;J1p+=V3z;J1p+=d6v;J1p+=V3z;var Y1p=d7z;Y1p+=U1v;Y1p+=O6z;var p1p=e5D;p1p+=P5D;p1p+=o4v;var el=$(document[p1p]);if(e[L2v] === j8z && _this[z7z][Y1p]){var f1p=d5D;f1p+=f7z;f1p+=X5D;var N1p=g1z;N1p+=C1v;N1p+=Y7z;N1p+=i9z;var field=_this[x5D](el);if(field && typeof field[k5D] === N1p && field[f1p](el)){var n1p=m5D;n1p+=x7z;n1p+=K7z;n1p+=V5D;if(opts[n1p] === G0z){var s1p=a5D;s1p+=M5D;e[s1p]();_this[I6v]();}else if(typeof opts[b5D] === S9QQ.k7z){e[c2v]();opts[b5D](_this,e);}}}else if(e[J1p] === o8z){var A1p=S9QQ[383646];A1p+=v7z;A1p+=I5D;A1p+=S9QQ[465530];var Q1p=S9QQ[383646];Q1p+=v5D;var h1p=S9QQ[383646];h1p+=v7z;h1p+=p5D;var j1p=Y5D;j1p+=K7z;j1p+=S9z;var T1p=S9QQ[383646];T1p+=v5D;e[c2v]();if(typeof opts[T1p] === j1p){var E1p=S9QQ[383646];E1p+=v7z;E1p+=I5D;E1p+=S9QQ[465530];opts[E1p](that,e);}else if(opts[h1p] === B0z){var D1p=S9QQ[624975];D1p+=X0z;D1p+=P3z;D1p+=f7z;that[D1p]();}else if(opts[Q1p] === U0z){that[g9v]();}else if(opts[A1p] === G0z){var K1p=N5D;K1p+=S9QQ[624975];K1p+=f5D;K1p+=K7z;that[K1p]();}}else if(el[n5D](s5D)[o1p]){var H1p=d0z;H1p+=J5D;H1p+=S9QQ[465530];H1p+=V3z;if(e[H1p] === H8z){var w1p=p9z;w1p+=S9QQ[465530];w1p+=P3z;w1p+=z7z;el[T5D](j5D)[E5D](w1p);}else if(e[L2v] === w8z){var z1p=p9z;z1p+=S9QQ[465530];z1p+=o2z;var y1p=D6z;y1p+=h5D;el[D5D](j5D)[y1p](z1p);}}});this[z7z][Q5D]=function(){var K5D="ydow";var W1p=A5D;W1p+=I7z;var L1p=H2z;L1p+=x7z;L1p+=K5D;L1p+=v7z;var R1p=S9QQ[383646];R1p+=I7z;R1p+=I7z;$(document)[R1p](L1p + namespace);$(document)[W1p](F5D + namespace);};return namespace;}function _inline(editFields,opts,closeCb){var u5D="rapper";var i5D='style="width:';var G5D="v cl";var o5D="nl";var B5D="ildren";var Y2D="submitHtml";var w5D="ys";var r5D='" ';var U5D="contents";var a2D='tr';var V2D="closest";var I2D='click.dte-submit';var x2D="umbe";var M2D="from";var l5D="<div class=\"DTE_Proce";var d2D="deta";var q5D='Edge/';var X2D="childNo";var t5D="userAgent";var O5D="ssing_Indicator\"><span></span></d";var S5D="width";var c5D="iv c";var g5D='px"';var z5D="rmE";var m2D="hildre";var H5D="rigger";var F2D='.';var l8N=Y7z;l8N+=o5D;l8N+=F1z;l8N+=x7z;var p8N=I6v;p8N+=m3z;p8N+=H5D;var u1p=t8D;u1p+=x7z;var O1p=W0v;O1p+=V3z;var l1p=p7v;l1p+=K7z;l1p+=v4z;l1p+=L6z;var C1p=h2v;C1p+=w5D;var c1p=S9QQ[465530];c1p+=k5z;c1p+=C9z;c1p+=m8v;var _this=this;if(closeCb === void Y8z){closeCb=q0z;}var closed=g0z;var classes=this[c1p][B8D];var keys=Object[C1p](editFields);var editRow=editFields[keys[Y8z]];var children=q0z;var lastAttachPoint;var elements=[];for(var i=Y8z;i < editRow[l1p][O1p];i++){var Z1p=d3z;Z1p+=P3z;Z1p+=z7z;Z1p+=V3z;var name_1=editRow[e2z][i][Y8z];elements[Z1p]({field:this[z7z][C2z][name_1],name:name_1,node:$(editRow[P2z][i])});}var namespace=this[p5v](opts);var ret=this[y5D](u1p);if(!ret){return this;}for(var i=Y8z;i < elements[C6z];i++){var a8N=v7z;a8N+=S9QQ[383646];a8N+=V1z;var V8N=I7z;V8N+=Y7z;V8N+=d8D;var m8N=p9z;m8N+=z5D;m8N+=P3D;m8N+=f7z;var x8N=d7z;x8N+=S9QQ[383646];x8N+=m9z;var X8N=I7z;X8N+=Y7z;X8N+=x7z;X8N+=S8v;var d8N=R5D;d8N+=k5z;d8N+=S9QQ[465530];d8N+=x7z;var P8N=P5v;P8N+=v7z;P8N+=v3z;var e8N=d7z;e8N+=C6v;e8N+=M5v;var F8N=L5D;F8N+=W5D;F8N+=G6v;var k8N=S9QQ[624975];k8N+=a0D;k8N+=v4D;var r1p=x5v;r1p+=c5D;r1p+=r8D;r1p+=C5D;var g1p=l5D;g1p+=O5D;g1p+=G6v;var S1p=P5v;S1p+=v7z;S1p+=x7z;S1p+=f7z;var i1p=o4z;i1p+=Z5D;var q1p=J6z;q1p+=l6v;var t1p=d0z;t1p+=u5D;var U1p=B6v;U1p+=G5D;U1p+=Z4z;U1p+=J6z;var B1p=F1z;B1p+=r3D;var G1p=L6z;G1p+=B5D;var el=elements[i];var node=el[N5z];elements[i][G1p]=node[U5D]()[W4v]();var style=navigator[t5D][B1p](q5D) !== -N8z?i5D + node[S5D]() + g5D:c0z;node[N9v]($(U1p + classes[t1p] + q1p + i1p + classes[S1p] + r5D + style + k2D + g1p + n3v + r1p + classes[k8N] + F8N + n3v));node[R1v](e8N + classes[P8N][d8N](/ /g,F2D))[N9v](el[X8N][N5z]())[N9v](this[x8N][m8N]);lastAttachPoint=el[V8N][a8N]();if(opts[z5v]){var v8N=t6D;v8N+=e2D;var I8N=d7z;I8N+=S9QQ[383646];I8N+=m9z;var b8N=n2v;b8N+=v4D;var M8N=I7z;M8N+=Y7z;M8N+=V4z;node[M8N](o4D + classes[b8N][K6z](/ /g,F2D))[N9v](this[I8N][v8N]);}}var submitTrigger=opts[p8N];if(submitTrigger !== q0z){var T8N=P2D;T8N+=v7z;T8N+=d7z;var s8N=d2D;s8N+=L6z;var n8N=X2D;n8N+=u1v;var Y8N=v7z;Y8N+=x2D;Y8N+=f7z;if(typeof submitTrigger === Y8N){var f8N=X0z;f8N+=t9z;f8N+=P2v;f8N+=V3z;var N8N=S9QQ[465530];N8N+=m2D;N8N+=v7z;var kids=$(lastAttachPoint)[V2D](a2D)[N8N]();submitTrigger=submitTrigger < Y8z?kids[kids[f8N] + submitTrigger]:kids[submitTrigger];}children=Array[M2D]($(submitTrigger)[Y8z][n8N])[b2D]();$(children)[s8N]();$(submitTrigger)[i9z](I2D,function(e){var v2D="topImmediatePropag";var p2D="ation";var J8N=z7z;H2t.a2t();J8N+=v2D;J8N+=p2D;e[J8N]();_this[I6v]();})[T8N](opts[Y2D]);}this[O5v](function(submitComplete,action){var n2D="forEach";var K8N=N2D;K8N+=f2D;var E8N=O6z;E8N+=M7z;var j8N=S9QQ[383646];j8N+=I7z;j8N+=I7z;closed=S0z;$(document)[j8N](u5v + namespace);if(!submitComplete || action !== E8N){elements[n2D](function(el){var s2D="conte";var Q8N=M9D;Q8N+=x7z;Q8N+=V4z;var D8N=v7z;D8N+=q5z;var h8N=s2D;h8N+=o4v;h8N+=z7z;el[N5z][h8N]()[W4v]();el[D8N][Q8N](el[b3v]);});}if(submitTrigger){var A8N=A5D;A8N+=I7z;$(submitTrigger)[A8N](I2D)[T2v]()[N9v](children);}_this[C7D]();if(closeCb){closeCb();}return K8N;;});setTimeout(function(){var J2D="mous";var j2D="Ba";var z8N=S9QQ[465530];z8N+=P5v;z8N+=I9v;var y8N=S9QQ[383646];y8N+=v7z;var w8N=J2D;w8N+=O6z;w8N+=T2D;var H8N=S9QQ[383646];H8N+=v7z;var o8N=a1z;o8N+=d7z;o8N+=j2D;o8N+=I9v;if(closed){return;}var back=$[F4v][d7v]?o8N:x7v;var target;H2t.a2t();$(document)[H8N](w8N + namespace,function(e){target=e[d3v];})[y8N](z8N + namespace,function(e){var R8N=X0z;R8N+=t9z;R8N+=c5z;H2t.l2t();var isIn=g0z;for(var i=Y8z;i < elements[R8N];i++){var C8N=v7z;C8N+=S9QQ[383646];C8N+=d7z;C8N+=x7z;var c8N=T2D;c8N+=z7z;var W8N=E2D;W8N+=z6z;var L8N=i5z;L8N+=x7z;L8N+=S8v;if(elements[i][L8N][W8N](c8N,target) || $[f1z](elements[i][C8N][Y8z],$(target)[n5D]()[back]()) !== -N8z){isIn=S0z;}}if(!isIn){_this[b6v]();}});},Y8z);this[g5v]($[z1z](elements,function(el){H2t.l2t();return el[e7v];}),opts[b4D]);this[B5v](l8N,S0z);}function _optionsUpdate(json){var O8N=F2v;H2t.l2t();O8N+=l7D;O8N+=z7z;var that=this;if(json[O8N]){var u8N=I7z;u8N+=Y7z;u8N+=d8D;u8N+=z7z;var Z8N=x7z;Z8N+=v4z;Z8N+=L6z;$[Z8N](this[z7z][u8N],function(name,field){var D2D="pda";var G8N=h2D;G8N+=S9z;G8N+=z7z;if(json[G8N][name] !== undefined){var U8N=P3z;U8N+=D2D;U8N+=l7z;var B8N=i5z;B8N+=x7z;B8N+=S8v;var fieldInst=that[B8N](name);if(fieldInst && fieldInst[U8N]){var t8N=P3z;t8N+=D2D;t8N+=K7z;t8N+=x7z;fieldInst[t8N](json[Q2D][name]);}}});}}function _message(el,msg,title,fn){var w2D="titl";var y2D="removeAttr";var L2D='title';var R2D="blo";var A2D="ma";var K2D="stop";var i8N=K1v;i8N+=A2D;i8N+=l7z;var q8N=I7z;q8N+=v7z;var canAnimate=$[q8N][i8N]?S0z:g0z;if(title === undefined){title=g0z;}if(!fn){fn=function(){};}if(typeof msg === S9QQ.k7z){var S8N=K7z;S8N+=P4v;S8N+=X0z;S8N+=x7z;msg=msg(this,new DataTable$3[U9z](this[z7z][S8N]));}el=$(el);if(canAnimate){el[K2D]();}if(!msg){if(this[z7z][x8D] && canAnimate){el[R4v](function(){el[o2D](c0z);fn();});}else {var g8N=H4D;g8N+=X0z;el[g8N](c0z)[s0v](H2D,t6z);fn();}if(title){var r8N=w2D;r8N+=x7z;el[y2D](r8N);}}else {fn();if(this[z7z][x8D] && canAnimate){var F7N=T9v;F7N+=j9v;var k7N=V3z;k7N+=K7z;k7N+=z2D;el[k7N](msg)[F7N]();}else {var P7N=R2D;P7N+=I9v;var e7N=V3z;e7N+=K7z;e7N+=m9z;e7N+=X0z;el[e7N](msg)[s0v](H2D,P7N);}if(title){var d7N=v4z;d7N+=K7z;d7N+=K7z;d7N+=f7z;el[d7N](L2D,msg);}}}function _multiInfo(){var Z2D="isMul";var W2D="iInf";var C2D="wn";var c2D="oSho";H2t.l2t();var G2D="iE";var x7N=W5z;x7N+=c5z;var X7N=I7z;X7N+=Y7z;X7N+=h9z;X7N+=q1z;var fields=this[z7z][X7N];var include=this[z7z][l2v];var show=S0z;var state;if(!include){return;}for(var i=Y8z,ien=include[x7N];i < ien;i++){var M7N=b9z;M7N+=W2D;M7N+=c2D;M7N+=C2D;var a7N=b2z;a7N+=l2D;a7N+=O2D;var V7N=Z2D;V7N+=u2D;var m7N=d7D;m7N+=X7D;m7N+=G2D;m7N+=B2D;var field=fields[include[i]];var multiEditable=field[m7N]();if(field[V7N]() && multiEditable && show){state=S0z;show=g0z;}else if(field[a7N]() && !multiEditable){state=S0z;}else {state=g0z;}fields[include[i]][M7N](state);}}function _nestedClose(cb){var q2D="callback";var U2D="open";var b7N=A9z;b7N+=N4D;b7N+=S9QQ[383646];b7N+=d0z;var disCtrl=this[z7z][g1v];var show=disCtrl[b7N];if(!show || !show[C6z]){if(cb){cb();}}else if(show[C6z] > N8z){var v7N=E7z;v7N+=F4D;v7N+=j1z;var I7N=d3z;I7N+=F2v;show[I7N]();var last=show[show[v7N] - N8z];if(cb){cb();}this[z7z][g1v][U2D](last[t2D],last[N9v],last[q2D]);}else {this[z7z][g1v][g9v](this,cb);show[C6z]=Y8z;}}function _nestedOpen(cb,nest){var S2D="_show";var g2D="_sh";var T7N=F9v;T7N+=e9v;T7N+=P9v;var J7N=d7z;H2t.a2t();J7N+=S9QQ[383646];J7N+=m9z;var s7N=S9QQ[383646];s7N+=v5v;var n7N=d7z;n7N+=S9QQ[383646];n7N+=m9z;var f7N=d3z;f7N+=P3z;f7N+=z7z;f7N+=V3z;var N7N=A9z;N7N+=z7z;N7N+=i2D;var disCtrl=this[z7z][g1v];if(!disCtrl[S2D]){var p7N=g2D;p7N+=S9QQ[383646];p7N+=d0z;disCtrl[p7N]=[];}if(!nest){var Y7N=g2D;Y7N+=K4z;disCtrl[Y7N][C6z]=Y8z;}disCtrl[N7N][f7N]({dte:this,append:this[n7N][n4v],callback:cb});this[z7z][g1v][s7N](this,this[J7N][T7N],cb);}function _postopen(type,immediate){var r2D="_multi";var F1D="ub";var m1D="us.editor-";var P1D="Focus";var e1D="captur";var X1D='submit.editor-internal';var I1D="_even";var R7N=v4z;R7N+=q4D;var z7N=r2D;z7N+=k1D;var Q7N=S9QQ[624975];Q7N+=F1D;Q7N+=Y2z;var D7N=S9QQ[383646];D7N+=v7z;var h7N=d7z;h7N+=S9QQ[383646];h7N+=m9z;var E7N=e1D;E7N+=x7z;E7N+=P1D;var j7N=d1D;j7N+=V8D;var _this=this;var focusCapture=this[z7z][j7N][E7N];if(focusCapture === undefined){focusCapture=S0z;}$(this[h7N][J6v])[w9v](X1D)[D7N](X1D,function(e){H2t.a2t();e[c2v]();});if(focusCapture && (type === M8D || type === Q7N)){var A7N=I7z;A7N+=x1D;A7N+=m1D;A7N+=b4D;$(Y9v)[i9z](A7N,function(){var M1D="tF";var V1D=".D";var a1D="setF";var H7N=M5v;H7N+=i4z;H7N+=a7z;H7N+=B4z;var o7N=W5z;o7N+=P2v;o7N+=V3z;var K7N=V1D;K7N+=w9z;if($(document[c6D])[n5D](K7N)[o7N] === Y8z && $(document[c6D])[n5D](H7N)[C6z] === Y8z){var w7N=a1D;w7N+=q5v;if(_this[z7z][w7N]){var y7N=n7z;y7N+=M1D;y7N+=x1D;y7N+=o2z;_this[z7z][y7N][b4D]();}}});}this[z7N]();this[C5v](b1D,[type,this[z7z][R7N]]);if(immediate){var W7N=i8v;W7N+=K7z;W7N+=g7v;W7N+=v7z;var L7N=I1D;L7N+=K7z;this[L7N](r5v,[type,this[z7z][W7N]]);}return S0z;}function _preopen(type){var f1D="_c";var v1D="layed";var N1D="lO";var n1D="earD";var s1D="ynamicInfo";var Y1D="cance";var t7N=D9v;t7N+=v1D;var c7N=d3z;c7N+=f7z;c7N+=p1D;c7N+=v5v;if(this[C5v](c7N,[type,this[z7z][k2v]]) === g0z){var U7N=D0D;U7N+=n7z;U7N+=t1z;U7N+=j0D;var B7N=m9z;B7N+=S9QQ[383646];B7N+=d7z;B7N+=x7z;var G7N=F1z;G7N+=C8D;var u7N=m9z;u7N+=S9QQ[383646];u7N+=d7z;u7N+=x7z;var Z7N=S7v;Z7N+=Y7z;Z7N+=S9QQ[383646];Z7N+=v7z;var O7N=Y1D;O7N+=N1D;O7N+=d3z;O7N+=t9z;var l7N=N6v;l7N+=D7v;l7N+=o4v;var C7N=f1D;C7N+=X0z;C7N+=n1D;C7N+=s1D;this[C7N]();this[l7N](O7N,[type,this[z7z][Z7N]]);if((this[z7z][u7N] === G7N || this[z7z][B7N] === U5v) && this[z7z][Q5D]){this[z7z][Q5D]();}this[z7z][U7N]=q0z;return g0z;}H2t.a2t();this[C7D](S0z);this[z7z][t7N]=type;return S0z;}function _processing(processing){var h1D='processing';var J1D="toggleC";var j1D="active";var E1D='div.DTE';var k4N=A9z;k4N+=H1v;var r7N=c9z;r7N+=m8v;r7N+=B9D;var g7N=J1D;g7N+=r8D;var S7N=F9v;S7N+=P2D;S7N+=f7z;var i7N=c9z;i7N+=T1D;i7N+=F1z;i7N+=I0z;var q7N=Q2v;q7N+=C9z;q7N+=m8v;var procClass=this[q7N][i7N][j1D];$([E1D,this[h4v][S7N]])[g7N](procClass,processing);this[z7z][r7N]=processing;this[k4N](h1D,[processing]);}function _noProcessing(args){var A1D="ing-field";var Q1D="roces";var processing=g0z;$[Q5z](this[z7z][C2z],function(name,field){H2t.l2t();if(field[D1D]()){processing=S0z;}});H2t.l2t();if(processing){var e4N=d3z;e4N+=Q1D;e4N+=z7z;e4N+=A1D;var F4N=S9QQ[383646];F4N+=v7z;F4N+=x7z;this[F4N](e4N,function(){var K1D="_noProcessing";if(this[K1D](args) === S0z){this[o1D][s5v](this,args);}});}return !processing;}function _submit(successCallback,errorCallback,formatdata,hide){var y1D="roc";var W1D="editData";var O1D="chang";var d8f="bmitCom";var e8f='all';var P8f='allIfChanged';var L1D="Cou";var H1D="actionN";var z1D="essi";var X8f="processi";var D8z=16;var l1D="still processing";var c1D="Field is";var w1D="_noP";var a8f="ete";var R1D="Op";var M8f='preSubmit';var x8f="Complete";var H4N=F9D;H4N+=x7z;H4N+=o4v;var a4N=x7z;a4N+=W7z;var V4N=H1D;V4N+=Q7D;var x4N=w1D;x4N+=y1D;x4N+=z1D;x4N+=F4D;var X4N=N5D;X4N+=S9QQ[624975];X4N+=m9z;X4N+=M7z;var d4N=H7z;d4N+=R1D;d4N+=U1z;var P4N=A7z;P4N+=K7z;P4N+=L1D;P4N+=o4v;var _this=this;var changed=g0z,allData={},changedData={};var setBuilder=dataSet;var fields=this[z7z][C2z];var editCount=this[z7z][P4N];var editFields=this[z7z][q2v];var editData=this[z7z][W1D];var opts=this[z7z][d4N];var changedSubmit=opts[X4N];var submitParamsLocal;if(this[x4N](arguments) === g0z){var m4N=c1D;m4N+=C1D;m4N+=l1D;Editor[p5z](m4N,D8z,g0z);return;}var action=this[z7z][k2v];var submitParams={"data":{}};submitParams[this[z7z][V4N]]=action;if(action === m7D || action === a4N){var J4N=O1D;J4N+=O6z;$[Q5z](editFields,function(idSrc,edit){var Z1D="isEmp";var u1D="tyObjec";var n4N=Z1D;n4N+=u1D;n4N+=K7z;var allRowData={};var changedRowData={};H2t.a2t();$[Q5z](fields,function(name,field){var U1D="comp";var k8f="valFromDat";var F8f=/\[.*$/;var q1D="-many";var G1D="bmi";var g1D="dex";var t1D="ar";var i1D="-cou";var B1D="ttab";var S1D="repla";var M4N=N5D;M4N+=G1D;M4N+=B1D;M4N+=E7z;if(edit[C2z][name] && field[M4N]()){var f4N=U1D;f4N+=t1D;f4N+=x7z;var N4N=q1D;N4N+=i1D;N4N+=v7z;N4N+=K7z;var Y4N=S1D;Y4N+=S9QQ[465530];Y4N+=x7z;var p4N=u8v;p4N+=T6z;var v4N=Y7z;v4N+=v7z;v4N+=g1D;v4N+=y6D;var I4N=z7z;I4N+=r1D;I4N+=F4D;var multiGet=field[J7D]();var builder=setBuilder(name);if(multiGet[idSrc] === undefined){var b4N=k8f;b4N+=v4z;var originalVal=field[b4N](edit[B7z]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=Array[a7v](value) && typeof name === I4N && name[v4N](p4N) !== -N8z?setBuilder(name[Y4N](F8f,c0z) + N4N):q0z;builder(allRowData,value);if(manyBuilder){manyBuilder(allRowData,value[C6z]);}if(action === z3D && (!editData[name] || !field[f4N](value,editData[name][idSrc]))){builder(changedRowData,value);changed=S0z;if(manyBuilder){manyBuilder(changedRowData,value[C6z]);}}}});if(!$[H5z](allRowData)){allData[idSrc]=allRowData;}if(!$[n4N](changedRowData)){changedData[idSrc]=changedRowData;}});if(action === X4v || changedSubmit === e8f || changedSubmit === P8f && changed){var s4N=d7z;s4N+=v4z;s4N+=K7z;s4N+=v4z;submitParams[s4N]=allData;}else if(changedSubmit === J4N && changed){submitParams[B7z]=changedData;}else {var Q4N=N5D;Q4N+=d8f;Q4N+=d3z;Q4N+=Z3D;var D4N=A9z;D4N+=X8f;D4N+=F4D;var j4N=S9QQ[383646];j4N+=v7z;j4N+=x8f;var T4N=S9QQ[465530];T4N+=v0D;T4N+=z7z;T4N+=x7z;this[z7z][k2v]=q0z;if(opts[m8f] === T4N && (hide === undefined || hide)){this[B2v](g0z);}else if(typeof opts[j4N] === S9QQ.k7z){var E4N=S9QQ[383646];E4N+=V8f;E4N+=X0z;E4N+=a8f;opts[E4N](this);}if(successCallback){var h4N=T7v;h4N+=X0z;h4N+=X0z;successCallback[h4N](this);}this[D4N](g0z);this[C5v](Q4N);return;}}else if(action === i2z){var A4N=C7z;A4N+=S9QQ[465530];A4N+=V3z;$[A4N](editFields,function(idSrc,edit){var o4N=q6z;o4N+=K7z;o4N+=v4z;var K4N=d7z;K4N+=v4z;K4N+=I5z;submitParams[K4N][idSrc]=edit[o4N];});}submitParamsLocal=$[f6z](S0z,{},submitParams);if(formatdata){formatdata(submitParams);}this[H4N](M8f,[submitParams,action],function(result){if(result === g0z){_this[s4D](g0z);}else {var z4N=T7v;z4N+=f2z;var y4N=S8D;y4N+=b1v;y4N+=v4z;y4N+=t7z;var w4N=m6v;w4N+=t7z;var submitWire=_this[z7z][w4N]?_this[y4N]:_this[b8f];submitWire[z4N](_this,submitParams,function(json,notGood,xhr){var I8f="_submitSuccess";_this[I8f](json,notGood,submitParams,submitParamsLocal,_this[z7z][k2v],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var L4N=i8v;L4N+=K7z;L4N+=Y7z;L4N+=i9z;var R4N=A9z;R4N+=I6v;R4N+=s8D;_this[R4N](xhr,err,thrown,errorCallback,submitParams,_this[z7z][L4N]);},submitParams);}});}function _submitTable(data,success,error,submitParams){var N8f="taSo";var Y8f="ividu";var p8f="Sr";var f8f="urce";var C4N=f7z;C4N+=v8f;C4N+=o3z;C4N+=x7z;var c4N=R1z;c4N+=X3z;c4N+=f7z;c4N+=S9QQ[465530];var W4N=Y7z;W4N+=d7z;W4N+=p8f;W4N+=S9QQ[465530];var action=data[k2v];var out={data:[]};var idGet=dataGet(this[z7z][W4N]);var idSet=dataSet(this[z7z][c4N]);H2t.a2t();if(action !== C4N){var G4N=d7z;G4N+=p7v;G4N+=v4z;var u4N=F1z;u4N+=d7z;u4N+=Y8f;u4N+=Y1z;var Z4N=i5z;Z4N+=h9z;Z4N+=d7z;Z4N+=z7z;var O4N=A9z;O4N+=q6z;O4N+=N8f;O4N+=f8f;var l4N=m9z;l4N+=w7D;var originalData=this[z7z][S0v] === l4N?this[O4N](Z4N,this[m4v]()):this[t0v](u4N,this[m4v]());$[Q5z](data[G4N],function(key,vals){var t4N=S9QQ[465530];t4N+=r3z;t4N+=l7z;var B4N=x7z;B4N+=W7z;var toSave;var extender=extend;if(action === B4N){var U4N=d7z;U4N+=P9D;var rowData=originalData[key][U4N];toSave=extender({},rowData,S0z);toSave=extender(toSave,vals,S0z);}else {toSave=extender({},vals,S0z);}var overrideId=idGet(toSave);if(action === t4N && overrideId === undefined){idSet(toSave,+new Date() + key[I6D]());}else {idSet(toSave,overrideId);}out[B7z][s6z](toSave);});}success(out);}function _submitSuccess(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var W8f='submitUnsuccessful';var C8f="uccess";var Z8f="Sou";var S8f="Re";var i8f="ost";var s8f="eve";var n8f="submitComple";var h8f="err";var L8f='<br>';var k7f='prep';var j8f="difie";var G8f="eCrea";var u8f='setData';var r8f="aSourc";var T8f="rors";var q8f='commit';var B8f='postCreate';var t8f='preEdit';var g8f="eRemove";var F7f="let";var O8f="unt";var U8f="ostE";var l8f="tC";var J8f="fieldEr";var S9N=n8f;S9N+=l7z;var i9N=A9z;i9N+=s8f;i9N+=o4v;var q9N=E4D;q9N+=h4D;q9N+=z7z;q9N+=B9D;var k9N=X0z;k9N+=x7z;k9N+=W6z;var r4N=J8f;r4N+=T8f;var g4N=x7z;g4N+=f7z;g4N+=Z9z;g4N+=f7z;var i4N=N6v;i4N+=D7v;i4N+=o4v;var q4N=m9z;q4N+=S9QQ[383646];q4N+=j8f;q4N+=f7z;var _this=this;var that=this;var setData;var fields=this[z7z][C2z];var opts=this[z7z][v1z];var modifier=this[z7z][q4N];this[i4N](E8f,[json,submitParams,action,xhr]);if(!json[p5z]){var S4N=g4D;S4N+=f7z;json[S4N]=S9QQ.r8z;}if(!json[F3D]){json[F3D]=[];}if(notGood || json[g4N] || json[r4N][k9N]){var s9N=x7z;s9N+=E8D;var P9N=x7z;P9N+=v4z;P9N+=L6z;var F9N=v3z;F9N+=J9z;var globalError=[];if(json[F9N]){var e9N=h8f;e9N+=S9QQ[383646];e9N+=f7z;globalError[s6z](json[e9N]);}$[P9N](json[F3D],function(i,err){H2t.a2t();var K8f="atu";var R8f=":";var w8f="bodyContent";var z8f="eldErr";var A8f=" field: ";var H8f="ieldErro";var Q8f="kn";var o8f="onF";var D8f="Un";var d9N=v7z;d9N+=Q7D;var field=fields[err[d9N]];if(!field){var x9N=v7z;x9N+=v4z;x9N+=m9z;x9N+=x7z;var X9N=D8f;X9N+=Q8f;X9N+=T2D;X9N+=A8f;throw new Error(X9N + err[x9N]);}else if(field[x8D]()){var a9N=a7z;a9N+=E8D;var V9N=z7z;V9N+=K7z;V9N+=K8f;V9N+=z7z;var m9N=g4D;m9N+=f7z;field[m9N](err[V9N] || a9N);if(i === Y8z){var Y9N=K4D;Y9N+=S9z;var p9N=o8f;p9N+=h8D;p9N+=a7z;p9N+=E8D;var M9N=o8f;M9N+=H8f;M9N+=f7z;if(opts[M9N] === t0z){var v9N=K7z;v9N+=F2v;var I9N=v7z;I9N+=S9QQ[383646];I9N+=d7z;I9N+=x7z;var b9N=o6v;b9N+=H6v;_this[b9N]($(_this[h4v][w8f]),{scrollTop:$(field[I9N]())[y8f]()[v9N]},l8z);field[b4D]();}else if(typeof opts[p9N] === Y9N){var N9N=i9z;N9N+=i2v;N9N+=z8f;N9N+=b7z;opts[N9N](_this,err);}}}else {var n9N=R8f;n9N+=C1D;var f9N=v7z;f9N+=v4z;f9N+=m9z;f9N+=x7z;globalError[s6z](field[f9N]() + n9N + (err[e3D] || s8D));}});this[s9N](globalError[g7D](L8f));this[C5v](W8f,[json]);if(errorCallback){var J9N=S9QQ[465530];J9N+=Y1z;J9N+=X0z;errorCallback[J9N](that,json);}}else {var t9N=z7z;t9N+=c8f;t9N+=C8f;var Z9N=A7z;Z9N+=l8f;Z9N+=S9QQ[383646];Z9N+=O8f;var T9N=w1z;T9N+=y1z;T9N+=x7z;var store={};if(json[B7z] && (action === T9N || action === H7z)){var E9N=w5v;E9N+=d3z;var j9N=f6v;j9N+=I5z;j9N+=Z8f;j9N+=s6v;this[j9N](E9N,action,modifier,submitParamsLocal,json,store);for(var i=Y8z;i < json[B7z][C6z];i++){var D9N=w1z;D9N+=x7z;D9N+=S1v;var h9N=Y7z;h9N+=d7z;setData=json[B7z][i];var id=this[t0v](h9N,setData);this[C5v](u8f,[json,setData,action]);if(action === D9N){var o9N=w1z;o9N+=C7z;o9N+=l7z;var K9N=S9QQ[465530];K9N+=K3z;K9N+=S1v;var A9N=d3z;A9N+=f7z;A9N+=G8f;A9N+=l7z;var Q9N=F9D;Q9N+=x7z;Q9N+=o4v;this[Q9N](A9N,[json,setData,id]);this[t0v](K9N,fields,setData,store);this[C5v]([o9N,B8f],[json,setData,id]);}else if(action === H7z){var w9N=d3z;w9N+=U8f;w9N+=d7z;w9N+=M7z;var H9N=A9z;H9N+=t5v;H9N+=t9z;H9N+=K7z;this[C5v](t8f,[json,setData,id]);this[t0v](z3D,modifier,fields,setData,store);this[H9N]([z3D,w9N],[json,setData,id]);}}this[t0v](q8f,action,modifier,json[B7z],store);}else if(action === i2z){var O9N=Y7z;O9N+=d7z;O9N+=z7z;var l9N=d3z;l9N+=i8f;l9N+=S8f;l9N+=D1z;var C9N=K3z;C9N+=D1z;var c9N=K3z;c9N+=m9z;c9N+=S9QQ[383646];c9N+=D7v;var W9N=O8D;W9N+=X3z;W9N+=t4z;W9N+=s6v;var L9N=R1z;L9N+=z7z;var R9N=L6v;R9N+=g8f;var z9N=N6v;z9N+=o3z;z9N+=J9v;var y9N=A9z;y9N+=K1z;y9N+=r8f;y9N+=x7z;this[y9N](k7f,action,modifier,submitParamsLocal,json,store);this[z9N](R9N,[json,this[L9N]()]);this[W9N](c9N,modifier,fields,store);this[C5v]([C9N,l9N],[json,this[O9N]()]);this[t0v](q8f,action,modifier,json[B7z],store);}if(editCount === this[z7z][Z9N]){var B9N=e9D;B9N+=v7z;var G9N=S9QQ[383646];G9N+=V8f;G9N+=F7f;G9N+=x7z;var u9N=v4z;u9N+=q4D;var action_1=this[z7z][k2v];this[z7z][u9N]=q0z;if(opts[G9N] === U0z && (hide === undefined || hide)){this[B2v](json[B7z]?S0z:g0z,action_1);}else if(typeof opts[m8f] === B9N){opts[m8f](this);}}if(successCallback){var U9N=T7v;U9N+=X0z;U9N+=X0z;successCallback[U9N](that,json);}this[C5v](t9N,[json,setData,action]);}this[q9N](g0z);this[i9N](S9N,[json,setData,action]);}function _submitError(xhr,err,thrown,errorCallback,submitParams,action){var P7f="mitComple";var d7f="system";var X7f='submitError';var e3N=e7f;e3N+=P7f;e3N+=K7z;e3N+=x7z;var k3N=g4D;k3N+=f7z;var r9N=x7z;r9N+=f7z;r9N+=Z9z;r9N+=f7z;var g9N=A9z;g9N+=x7z;g9N+=T6D;this[g9N](E8f,[q0z,submitParams,action,xhr]);this[r9N](this[T0v][k3N][d7f]);this[s4D](g0z);if(errorCallback){var F3N=S9QQ[465530];F3N+=v4z;F3N+=X0z;F3N+=X0z;errorCallback[F3N](this,xhr,err,thrown);}this[C5v]([X7f,e3N],[xhr,err,thrown,submitParams]);}function _tidy(fn){var V7f="dataT";var J8z=10;var b7f="gs";var M7f="tti";var p7f='inline';var m7f="ocess";var a7f="able";var p3N=S9QQ[624975];p3N+=P3z;p3N+=x7f;p3N+=x7z;var a3N=d3z;a3N+=f7z;a3N+=m7f;a3N+=l9z;var m3N=K7z;m3N+=P4v;m3N+=X0z;m3N+=x7z;var x3N=w4D;x3N+=Y7z;var X3N=V7f;X3N+=a7f;var d3N=I7z;d3N+=v7z;var P3N=E1z;P3N+=X0z;P3N+=x7z;var _this=this;var dt=this[z7z][P3N]?new $[d3N][X3N][x3N](this[z7z][m3N]):q0z;var ssp=g0z;if(dt){var V3N=n7z;V3N+=M7f;V3N+=v7z;V3N+=b7f;ssp=dt[V3N]()[Y8z][B6z][U6z];}if(this[z7z][a3N]){var b3N=I7f;b3N+=v7f;var M3N=S9QQ[383646];M3N+=v7z;M3N+=x7z;this[M3N](b3N,function(){if(ssp){var v3N=d7z;v3N+=f7z;v3N+=v4z;v3N+=d0z;var I3N=S9QQ[383646];I3N+=t2z;dt[I3N](v3N,fn);}else {setTimeout(function(){fn();},J8z);}});return S0z;}else if(this[e4D]() === p7f || this[e4D]() === p3N){var f3N=P1z;f3N+=p6v;this[K7D](U0z,function(){var N7f='submitComplete';var Y3N=d3z;Y3N+=Y7f;if(!_this[z7z][Y3N]){setTimeout(function(){if(_this[z7z]){fn();}},J8z);}else {var N3N=S9QQ[383646];N3N+=t2z;_this[N3N](N7f,function(e,json){var f7f='draw';if(ssp && json){dt[K7D](f7f,fn);}else {setTimeout(function(){if(_this[z7z]){fn();}},J8z);}});}})[f3N]();return S0z;}return g0z;}function _weakInArray(name,arr){var n3N=X0z;n3N+=e2v;n3N+=K7z;n3N+=V3z;for(var i=Y8z,ien=arr[n3N];i < ien;i++){if(name == arr[i]){return i;}}return -N8z;}var fieldType={create:function(){},get:function(){},set:function(){},enable:function(){},disable:function(){}};var DataTable$2=$[F4v][s3N];function _buttonText(conf,text){var J7f="uploadText";var j7f='div.upload button';var T7f="Choose file...";var J3N=n7f;J3N+=s7f;J3N+=a0D;H2t.l2t();if(text === q0z || text === undefined){text=conf[J7f] || T7f;}conf[J3N][R1v](j7f)[o2D](text);}function _commonUpload(editor,conf,dropCallback,multiple){var x4f='id';var X4f='input[type=file]';var p4f='div.drop';var g7f='<div class="cell clearValue">';var w4f='noDrop';var K7f="rop";var S7f='<input type="file" ';var Q7f="lue button";var V4f="FileReader";var r7f='<div class="row second">';var a4f="dragleave dragex";var q7f='<button class="';var C7f="ip";var J4f='dragover';var R7f="tton>";var M4f="iv.drop span";var F4f='<div class="drop"><span></span></div>';var W7f="/in";var i7f='"></button>';var U7f='<div class="editor_upload">';var s4f='over';var z7f="</bu";var t7f='<div class="cell upload limitHide">';var Z7f="ow\">";var k4f='<div class="cell limitHide">';var h7f="ype=file";var l7f="v c";var O7f="lass=\"r";var E7f="nput[t";var w7f="red\"></div>";var H7f="<div class=\"rende";var H4f="v.rendered";var u7f="iv class=\"eu_table\">";var G7f="buttonInterna";var e4f='<div class="cell">';var B7f="lasses";var L7f="><";var b4f="text";var I4f="dragDropText";var A7f="dragD";var v4f="Drag and drop a file here to upload";var o7f="_enab";var D7f="v.clearVa";var p0N=Y7z;p0N+=E7f;p0N+=h7f;p0N+=T6z;var v0N=I7z;v0N+=Y7z;v0N+=v7z;v0N+=d7z;var b0N=S9QQ[465530];b0N+=P5v;b0N+=I9v;var M0N=S9QQ[383646];M0N+=v7z;var a0N=m7z;a0N+=D7f;a0N+=Q7f;var V0N=I7z;V0N+=F1z;V0N+=d7z;var O3N=A7f;O3N+=K7f;var c3N=p7v;c3N+=D6z;var z3N=o7f;z3N+=X0z;z3N+=O6z;var y3N=z4z;y3N+=m7z;y3N+=o3z;y3N+=l6v;var w3N=h4z;w3N+=Y7z;w3N+=E4z;var H3N=H7f;H3N+=w7f;var o3N=y7f;o3N+=z7f;o3N+=R7f;var K3N=z4z;K3N+=d7z;K3N+=Y7z;H2t.a2t();K3N+=E4z;var A3N=L7f;A3N+=W7f;A3N+=c7f;A3N+=l6v;var Q3N=b9z;Q3N+=C7f;Q3N+=X0z;Q3N+=x7z;var D3N=B6v;D3N+=l7f;D3N+=O7f;D3N+=Z7f;var h3N=x5v;h3N+=u7f;var E3N=G7f;E3N+=X0z;var j3N=I7z;j3N+=b7z;j3N+=m9z;var T3N=S9QQ[465530];T3N+=B7f;if(multiple === void Y8z){multiple=g0z;}var btnClass=editor[T3N][j3N][E3N];var container=$(U7f + h3N + D3N + t7f + q7f + btnClass + i7f + S7f + (multiple?Q3N:c0z) + A3N + K3N + g7f + q7f + btnClass + o3N + n3v + n3v + r7f + k4f + F4f + n3v + e4f + H3N + w3N + y3N + n3v + n3v);conf[P4f]=container;conf[z3N]=S0z;if(conf[R1z]){var W3N=Y7z;W3N+=d7z;var L3N=v4z;L3N+=P7v;var R3N=d4f;R3N+=d7z;container[R3N](X4f)[L3N](x4f,Editor[m4f](conf[W3N]));}if(conf[c3N]){var l3N=a9v;l3N+=f7z;var C3N=i5z;C3N+=v7z;C3N+=d7z;container[C3N](X4f)[l3N](conf[K8v]);}_buttonText(conf);if(window[V4f] && conf[O3N] !== g0z){var P0N=D0D;P0N+=z7z;P0N+=x7z;var S3N=a4f;S3N+=M7z;var B3N=M1z;B3N+=S9QQ[383646];B3N+=d3z;var G3N=S9QQ[383646];G3N+=v7z;var u3N=d7z;u3N+=M4f;var Z3N=I7z;Z3N+=Y7z;Z3N+=v7z;Z3N+=d7z;container[Z3N](u3N)[b4f](conf[I4f] || v4f);var dragDrop=container[R1v](p4f);dragDrop[G3N](B3N,function(e){var f4f="dataTransfer";var Y4f="origin";var U3N=A9z;U3N+=t9z;U3N+=P4v;H2t.l2t();U3N+=x9z;if(conf[U3N]){var i3N=S9QQ[383646];i3N+=D7v;i3N+=f7z;var q3N=Y4f;q3N+=v4z;q3N+=N4f;var t3N=P3z;t3N+=d3z;t3N+=X0z;t3N+=L9D;Editor[t3N](editor,conf,e[q3N][f4f][Q8D],_buttonText,dropCallback);dragDrop[a5z](i3N);}return g0z;})[i9z](S3N,function(e){if(conf[n4f]){dragDrop[a5z](s4f);}H2t.a2t();return g0z;})[i9z](J4f,function(e){var T4f="enabl";var g3N=A9z;H2t.l2t();g3N+=T4f;g3N+=O6z;if(conf[g3N]){var r3N=v3D;r3N+=k5z;r3N+=C9z;dragDrop[r3N](s4f);}return g0z;});editor[i9z](b1D,function(){var D4f="E_Upload";H2t.l2t();var h4f="Upload drop.DT";var Q4f="dy";var E4f="er.DTE_";var j4f="dragov";var e0N=j4f;e0N+=E4f;e0N+=h4f;e0N+=D4f;var F0N=S9QQ[383646];F0N+=v7z;var k0N=S9QQ[624975];k0N+=S9QQ[383646];k0N+=Q4f;$(k0N)[F0N](e0N,function(e){H2t.l2t();return g0z;});})[i9z](P0N,function(){var A4f="drago";var o4f="TE_Upload drop.DTE_Upload";var K4f="ver.D";H2t.l2t();var X0N=A4f;X0N+=K4f;X0N+=o4f;var d0N=D5v;d0N+=j3z;$(d0N)[w9v](X0N);});}else {var m0N=m7z;m0N+=H4f;var x0N=i5z;x0N+=V4z;container[x5z](w4f);container[N9v](container[x0N](m0N));}container[V0N](a0N)[M0N](b0N,function(e){var y4f="Default";var I0N=L6v;I0N+=t5v;H2t.a2t();I0N+=J9v;I0N+=y4f;e[I0N]();if(conf[n4f]){upload[e1v][S1z](editor,conf,c0z);}});container[v0N](p0N)[i9z](z4f,function(){var Y0N=I7z;Y0N+=R4f;Y0N+=x7z;Y0N+=z7z;Editor[f9D](editor,conf,this[Y0N],_buttonText,function(ids){var L4f="input[type=fi";var W4f="le]";var N0N=L4f;N0N+=W4f;H2t.a2t();dropCallback[S1z](editor,ids);container[R1v](N0N)[Y8z][l4D]=c0z;});});return container;}function _triggerChange(input){setTimeout(function(){var C4f="ger";var c4f="ig";H2t.a2t();var f0N=K7z;f0N+=f7z;f0N+=c4f;f0N+=C4f;input[f0N](N1v,{editor:S0z,editorSet:S0z});;},Y8z);}var baseFieldType=$[n0N](S0z,{},fieldType,{get:function(conf){return conf[P4f][W1v]();},set:function(conf,val){var s0N=n7f;s0N+=l4f;conf[s0N][W1v](val);_triggerChange(conf[P4f]);},enable:function(conf){var J0N=O4f;H2t.l2t();J0N+=K7z;conf[J0N][Z4f](u4f,g0z);},disable:function(conf){var G4f="sa";var j0N=m7z;j0N+=G4f;j0N+=P1z;j0N+=O6z;var T0N=A9z;T0N+=B4f;T0N+=a0D;H2t.a2t();conf[T0N][Z4f](j0N,S0z);},canReturnSubmit:function(conf,node){H2t.a2t();return S0z;}});var hidden={create:function(conf){var h0N=H8v;h0N+=X0z;h0N+=P3z;h0N+=x7z;var E0N=A9z;E0N+=o3z;E0N+=Y1z;conf[E0N]=conf[h0N];return q0z;},get:function(conf){H2t.l2t();return conf[U4f];},set:function(conf,val){var t4f="_v";var D0N=t4f;D0N+=Y1z;conf[D0N]=val;}};var readonly=$[Q0N](S0z,{},baseFieldType,{create:function(conf){var q4f="reado";var i4f="nly";var S4f='<input/>';var w0N=q4f;w0N+=i4f;var H0N=K7z;H0N+=x7z;H0N+=t7z;H0N+=K7z;var o0N=Y7z;o0N+=d7z;var K0N=x7z;K0N+=t7z;K0N+=O7z;var A0N=v4z;A0N+=P7v;conf[P4f]=$(S4f)[A0N]($[K0N]({id:Editor[m4f](conf[o0N]),type:H0N,readonly:w0N},conf[K8v] || ({})));return conf[P4f][Y8z];}});var text=$[y0N](S0z,{},baseFieldType,{create:function(conf){var k9f="input/";var r4f="eI";H2t.a2t();var c0N=p7v;c0N+=D6z;var W0N=g4f;W0N+=r4f;W0N+=d7z;var L0N=I4z;L0N+=d7z;var R0N=T4z;R0N+=k9f;R0N+=l6v;var z0N=F9f;z0N+=a0D;conf[z0N]=$(R0N)[K8v]($[L0N]({id:Editor[W0N](conf[R1z]),type:e9f},conf[c0N] || ({})));return conf[P4f][Y8z];}});var password=$[C0N](S0z,{},baseFieldType,{create:function(conf){var d9f="word";var x9f="nput/>";var X9f="<i";var B0N=n7f;B0N+=l4f;H2t.l2t();var G0N=d3z;G0N+=P9f;G0N+=z7z;G0N+=d9f;var u0N=Y7z;u0N+=d7z;var Z0N=h7z;Z0N+=O7z;var O0N=v4z;O0N+=K7z;O0N+=D6z;var l0N=X9f;l0N+=x9f;conf[P4f]=$(l0N)[O0N]($[Z0N]({id:Editor[m4f](conf[u0N]),type:G0N},conf[K8v] || ({})));return conf[B0N][Y8z];}});var textarea=$[f6z](S0z,{},baseFieldType,{create:function(conf){var m9f='<textarea></textarea>';var t0N=o7z;t0N+=a4z;var U0N=O4f;U0N+=K7z;conf[U0N]=$(m9f)[K8v]($[t0N]({id:Editor[m4f](conf[R1z])},conf[K8v] || ({})));return conf[P4f][Y8z];},canReturnSubmit:function(conf,node){H2t.a2t();return g0z;}});var select=$[q0N](S0z,{},baseFieldType,{_addOptions:function(conf,opts,append){var b9f="isabl";var p9f="placeh";H2t.l2t();var s9f="tionsPair";var V9f="eholder";var I9f="aceho";var v9f="lderDisabled";var N9f="placeholderValue";var Y9f="lder";var a9f="idd";var M9f="aceholderD";var i0N=O4f;i0N+=K7z;if(append === void Y8z){append=g0z;}var elOpts=conf[i0N][Y8z][Q2D];var countOffset=Y8z;if(!append){var g0N=i1v;g0N+=i8v;g0N+=V9f;var S0N=E7z;S0N+=W6z;elOpts[S0N]=Y8z;if(conf[g0N] !== undefined){var e6N=V3z;e6N+=a9f;e6N+=t9z;var F6N=i1v;F6N+=M9f;F6N+=b9f;F6N+=O6z;var k6N=i1v;k6N+=I9f;k6N+=v9f;var r0N=p9f;r0N+=S9QQ[383646];r0N+=Y9f;var placeholderValue=conf[N9f] !== undefined?conf[N9f]:c0z;countOffset+=N8z;elOpts[Y8z]=new Option(conf[r0N],placeholderValue);var disabled=conf[k6N] !== undefined?conf[F6N]:S0z;elOpts[Y8z][e6N]=disabled;elOpts[Y8z][f9f]=disabled;elOpts[Y8z][n9f]=placeholderValue;}}else {countOffset=elOpts[C6z];}if(opts){var P6N=F2v;P6N+=s9f;Editor[J9f](opts,conf[P6N],function(val,label,i,attr){var T9f="or_";var d6N=a8D;d6N+=T9f;d6N+=o3z;d6N+=Y1z;var option=new Option(label,val);H2t.l2t();option[d6N]=val;if(attr){var X6N=v4z;X6N+=K7z;X6N+=K7z;X6N+=f7z;$(option)[X6N](attr);}elOpts[i + countOffset]=option;});}},create:function(conf){var D9f="safeI";var h9f="change.";var Q9f="<sele";var A9f="ct></selec";var j9f="ions";var K9f="t>";var E9f="_addOpti";var p6N=F9f;p6N+=P3z;p6N+=K7z;var v6N=h2D;v6N+=j9f;var I6N=E9f;I6N+=e2D;var b6N=h9f;b6N+=t2D;var M6N=v4z;M6N+=j5z;M6N+=f7z;var a6N=Y7z;a6N+=d7z;var V6N=D9f;V6N+=d7z;var m6N=Q9f;m6N+=A9f;m6N+=K9f;var x6N=n7f;x6N+=s7f;x6N+=P3z;x6N+=K7z;conf[x6N]=$(m6N)[K8v]($[f6z]({id:Editor[V6N](conf[a6N]),multiple:conf[o9f] === S0z},conf[M6N] || ({})))[i9z](b6N,function(e,d){H2t.a2t();if(!d || !d[H9f]){conf[w9f]=select[m2v](conf);}});select[I6N](conf,conf[v6N] || conf[y9f]);return conf[p6N][Y8z];},update:function(conf,options,append){var Y6N=A9z;H2t.a2t();Y6N+=F1z;Y6N+=w2z;Y6N+=K7z;select[z9f](conf,options,append);var lastSet=conf[w9f];if(lastSet !== undefined){select[e1v](conf,lastSet,S0z);}_triggerChange(conf[Y6N]);},get:function(conf){var c9f="elected";var R9f="ipl";var W9f=":s";var O9f="ara";var j6N=X0z;j6N+=o5z;j6N+=V3z;var s6N=b9z;s6N+=R9f;s6N+=x7z;var n6N=m9z;n6N+=v4z;n6N+=d3z;var f6N=L9f;f6N+=W9f;f6N+=c9f;var N6N=A9z;N6N+=C9f;H2t.a2t();var val=conf[N6N][R1v](f6N)[n6N](function(){return this[n9f];})[N7v]();if(conf[s6N]){var T6N=l9f;T6N+=O9f;T6N+=Z9f;var J6N=b1v;J6N+=S9QQ[383646];J6N+=Y7z;J6N+=v7z;return conf[u9f]?val[J6N](conf[T6N]):val;}return val[j6N]?val[Y8z]:q0z;},set:function(conf,val,localUpdate){var G9f="opti";var S9f="placeholder";var U9f="separa";var r9f="cte";var w6N=E7z;w6N+=W6z;var o6N=G9f;o6N+=i9z;var K6N=B9f;K6N+=d3z;K6N+=P3z;K6N+=K7z;var A6N=S9QQ[383646];A6N+=j6v;var Q6N=I7z;Q6N+=o1z;var E6N=A5z;E6N+=S9D;E6N+=v1v;if(!localUpdate){conf[w9f]=val;}if(conf[o9f] && conf[u9f] && !Array[E6N](val)){var D6N=U9f;D6N+=Z9f;var h6N=j3D;h6N+=F4D;val=typeof val === h6N?val[h6D](conf[D6N]):[];}else if(!Array[a7v](val)){val=[val];}var i,len=val[C6z],found,allFound=g0z;var options=conf[P4f][Q6N](A6N);conf[K6N][R1v](o6N)[Q5z](function(){H2t.l2t();var i9f="selected";found=g0z;for(i=Y8z;i < len;i++){var H6N=t9f;H6N+=q9f;if(this[H6N] == val[i]){found=S0z;allFound=S0z;break;}}this[i9f]=found;});if(conf[S9f] && !allFound && !conf[o9f] && options[w6N]){var y6N=g9f;y6N+=x7z;y6N+=r9f;y6N+=d7z;options[Y8z][y6N]=S0z;}if(!localUpdate){_triggerChange(conf[P4f]);}return allFound;},destroy:function(conf){var k3f='change.dte';var R6N=S9QQ[383646];R6N+=I7z;R6N+=I7z;var z6N=n7f;z6N+=v7z;z6N+=w2z;z6N+=K7z;conf[z6N][R6N](k3f);}});var checkbox=$[f6z](S0z,{},baseFieldType,{_addOptions:function(conf,opts,append){var F3f="ength";var e3f="ionsPair";if(append === void Y8z){append=g0z;}var jqInput=conf[P4f];var offset=Y8z;if(!append){jqInput[T2v]();}else {var L6N=X0z;L6N+=F3f;offset=$(z4f,jqInput)[L6N];}if(opts){var W6N=h2D;W6N+=e3f;Editor[J9f](opts,conf[W6N],function(val,label,i,attr){H2t.a2t();var I3f='value';var d3f="</label";var x3f="\" type";var P3f="nput:la";var a3f="<input id";var X3f="abel for=\"";var V3f="ckbox\" />";var v3f="nput:last";var m3f="=\"ch";var G6N=t9f;G6N+=q9f;var u6N=Y7z;u6N+=P3f;u6N+=W9v;var Z6N=d3f;Z6N+=l6v;var O6N=Y7z;O6N+=d7z;var l6N=T4z;l6N+=X0z;l6N+=X3f;var C6N=x3f;C6N+=m3f;C6N+=x7z;C6N+=V3f;var c6N=a3f;c6N+=C5D;jqInput[N9v](M3f + c6N + Editor[m4f](conf[R1z]) + b3f + (i + offset) + C6N + l6N + Editor[m4f](conf[O6N]) + b3f + (i + offset) + E5v + label + Z6N + n3v);$(u6N,jqInput)[K8v](I3f,val)[Y8z][G6N]=val;if(attr){var B6N=Y7z;B6N+=v3f;$(B6N,jqInput)[K8v](attr);}});}},create:function(conf){var Y3f='<div></div>';var t6N=h2D;t6N+=Y7z;t6N+=S9QQ[383646];t6N+=x1z;var U6N=A9z;U6N+=v4z;U6N+=c3v;U6N+=p3f;conf[P4f]=$(Y3f);checkbox[U6N](conf,conf[t6N] || conf[y9f]);return conf[P4f][Y8z];},get:function(conf){var j3f="Val";var s3f='input:checked';var N3f="rator";var T3f="unselected";var f3f="uns";var k5N=l9f;k5N+=v4z;k5N+=N3f;var S6N=f3f;S6N+=n3f;var out=[];var selected=conf[P4f][R1v](s3f);if(selected[C6z]){selected[Q5z](function(){var J3f="r_val";var i6N=A9z;i6N+=H7z;i6N+=S9QQ[383646];i6N+=J3f;var q6N=d3z;q6N+=Q4D;out[q6N](this[i6N]);});}else if(conf[S6N] !== undefined){var r6N=T3f;r6N+=j3f;r6N+=O2D;var g6N=d3z;g6N+=o2z;g6N+=V3z;out[g6N](conf[r6N]);}return conf[u9f] === undefined || conf[k5N] === q0z?out:out[g7D](conf[u9f]);},set:function(conf,val){var Q3f='|';var h3f="separat";var D3f="sp";var d5N=A5z;d5N+=f7z;d5N+=E3f;var F5N=i5z;F5N+=v7z;F5N+=d7z;var jqInputs=conf[P4f][F5N](z4f);if(!Array[a7v](val) && typeof val === n8v){var P5N=h3f;P5N+=b7z;var e5N=D3f;e5N+=X0z;e5N+=Y7z;e5N+=K7z;val=val[e5N](conf[P5N] || Q3f);}else if(!Array[d5N](val)){val=[val];}var i,len=val[C6z],found;jqInputs[Q5z](function(){H2t.l2t();var A3f="chec";var X5N=A3f;X5N+=h2v;X5N+=d7z;found=g0z;for(i=Y8z;i < len;i++){if(this[n9f] == val[i]){found=S0z;break;}}this[X5N]=found;});_triggerChange(jqInputs);},enable:function(conf){var V5N=K3f;V5N+=o3f;var m5N=Y7z;m5N+=v7z;m5N+=c7f;var x5N=A9z;x5N+=Y7z;x5N+=H3f;x5N+=K7z;H2t.l2t();conf[x5N][R1v](m5N)[Z4f](V5N,g0z);},disable:function(conf){var M5N=L6v;H2t.a2t();M5N+=F2v;var a5N=B4f;a5N+=a0D;conf[P4f][R1v](a5N)[M5N](u4f,S0z);},update:function(conf,options,append){var w3f="addOptio";var b5N=A9z;b5N+=w3f;b5N+=v7z;b5N+=z7z;var currVal=checkbox[m2v](conf);checkbox[b5N](conf,options,append);checkbox[e1v](conf,currVal);}});var radio=$[f6z](S0z,{},baseFieldType,{_addOptions:function(conf,opts,append){var y3f="empt";var z3f="air";H2t.a2t();if(append === void Y8z){append=g0z;}var jqInput=conf[P4f];var offset=Y8z;if(!append){var I5N=y3f;I5N+=j3z;jqInput[I5N]();}else {offset=$(z4f,jqInput)[C6z];}if(opts){var v5N=d3z;v5N+=z3f;v5N+=z7z;Editor[v5N](opts,conf[R3f],function(val,label,i,attr){var C3f="label>";var U3f='" />';var c3f="last";var W3f="ut:";var l3f="safe";var t3f='input:last';var G3f='<input id="';var O3f="<labe";var Z3f="l ";var B3f='" type="radio" name="';var u3f="or=\"";var E5N=t9f;E5N+=Z9f;E5N+=U4f;var j5N=o3z;j5N+=L3f;var T5N=v4z;T5N+=K7z;T5N+=K7z;T5N+=f7z;var J5N=F1z;J5N+=d3z;J5N+=W3f;J5N+=c3f;var s5N=T4z;s5N+=W5D;s5N+=Y7z;s5N+=E4z;var n5N=T4z;n5N+=Z6v;n5N+=C3f;var f5N=J6z;f5N+=l6v;var N5N=l3f;N5N+=t1z;N5N+=d7z;var Y5N=O3f;Y5N+=Z3f;Y5N+=I7z;Y5N+=u3f;var p5N=Y7z;p5N+=d7z;jqInput[N9v](M3f + G3f + Editor[m4f](conf[p5N]) + b3f + (i + offset) + B3f + conf[D5z] + U3f + Y5N + Editor[N5N](conf[R1z]) + b3f + (i + offset) + f5N + label + n5N + s5N);$(J5N,jqInput)[T5N](j5N,val)[Y8z][E5N]=val;if(attr){$(t3f,jqInput)[K8v](attr);}});}},create:function(conf){var S3f="_ad";var r3f=" />";var g3f="dOp";var i3f="pt";var q3f="ipO";var K5N=S9QQ[383646];K5N+=d3z;K5N+=x7z;K5N+=v7z;var A5N=S9QQ[383646];A5N+=v7z;var Q5N=q3f;Q5N+=i3f;Q5N+=z7z;var D5N=S3f;D5N+=g3f;D5N+=l7D;D5N+=z7z;var h5N=T4z;h5N+=u6v;h5N+=r3f;conf[P4f]=$(h5N);radio[D5N](conf,conf[Q2D] || conf[Q5N]);this[A5N](K5N,function(){H2t.a2t();conf[P4f][R1v](z4f)[Q5z](function(){var k0f="_preC";var F0f="hec";var e0f="check";var o5N=k0f;o5N+=F0f;o5N+=H2z;o5N+=O6z;H2t.l2t();if(this[o5N]){var H5N=e0f;H5N+=O6z;this[H5N]=S0z;}});});return conf[P4f][Y8z];},get:function(conf){var d0f="ectedV";var X0f=":checked";var P0f="nsel";var x0f="ditor_";var L5N=P3z;L5N+=x1z;L5N+=n3f;var R5N=P3z;R5N+=P0f;R5N+=d0f;R5N+=L3f;var y5N=C9f;y5N+=X0f;var w5N=I7z;w5N+=Y7z;w5N+=v7z;w5N+=d7z;var el=conf[P4f][w5N](y5N);if(el[C6z]){var z5N=A9z;z5N+=x7z;z5N+=x0f;z5N+=W1v;return el[Y8z][z5N];}return conf[R5N] !== undefined?conf[L5N]:undefined;},set:function(conf,val){var m0f="input:che";var V0f="cked";var Z5N=m0f;Z5N+=V0f;var O5N=n7f;O5N+=H3f;O5N+=K7z;var c5N=x7z;c5N+=v4z;c5N+=L6z;var W5N=d4f;W5N+=d7z;conf[P4f][W5N](z4f)[c5N](function(){var a0f="_preChecked";var b0f="checked";var M0f="Check";this[a0f]=g0z;if(this[n9f] == val){var C5N=A9z;C5N+=w5v;C5N+=M0f;C5N+=O6z;this[b0f]=S0z;this[C5N]=S0z;}else {var l5N=L6z;l5N+=w6z;l5N+=h2v;l5N+=d7z;this[l5N]=g0z;this[a0f]=g0z;}});H2t.l2t();_triggerChange(conf[O5N][R1v](Z5N));},enable:function(conf){var u5N=B9f;H2t.a2t();u5N+=d3z;u5N+=P3z;u5N+=K7z;conf[u5N][R1v](z4f)[Z4f](u4f,g0z);},disable:function(conf){var G5N=Y7z;G5N+=s7f;G5N+=P3z;G5N+=K7z;conf[P4f][R1v](G5N)[Z4f](u4f,S0z);},update:function(conf,options,append){var p0f="filt";var Y0f="inpu";var v0f="lue=";var I0f="[v";var g5N=H8v;g5N+=X0z;g5N+=O2D;var S5N=v4z;S5N+=K7z;S5N+=K7z;S5N+=f7z;var i5N=x7z;i5N+=c6v;var q5N=J6z;q5N+=T6z;var t5N=I0f;t5N+=v4z;t5N+=v0f;t5N+=J6z;var U5N=p0f;U5N+=x7z;U5N+=f7z;var B5N=Y0f;B5N+=K7z;var currVal=radio[m2v](conf);radio[z9f](conf,options,append);var inputs=conf[P4f][R1v](B5N);radio[e1v](conf,inputs[U5N](t5N + currVal + q5N)[C6z]?currVal:inputs[i5N](Y8z)[S5N](g5N));}});var datetime=$[r5N](S0z,{},baseFieldType,{create:function(conf){var H0f="keyInput";var w0f="_closeFn";var J0f="tex";var N0f="closeFn";var j0f="/>";var f0f="tet";var D0f="ary is required";var h0f="DateTime libr";var A0f="displayFormat";var n0f="im";var T0f="<input ";var p2N=A9z;p2N+=Y7z;p2N+=s7f;p2N+=a0D;var b2N=A9z;b2N+=N0f;var M2N=S9QQ[383646];M2N+=d3z;M2N+=K7z;M2N+=z7z;var a2N=q6z;a2N+=f0f;a2N+=n0f;a2N+=x7z;var V2N=s0f;V2N+=K7z;var m2N=F9f;m2N+=a0D;var d2N=J0f;d2N+=K7z;var P2N=Y7z;P2N+=d7z;var e2N=g4f;e2N+=x7z;e2N+=t1z;e2N+=d7z;var F2N=v4z;F2N+=K7z;F2N+=K7z;F2N+=f7z;var k2N=T0f;k2N+=j0f;conf[P4f]=$(k2N)[F2N]($[f6z](S0z,{id:Editor[e2N](conf[P2N]),type:d2N},conf[K8v]));if(!DataTable$2[E0f]){var x2N=h0f;x2N+=D0f;var X2N=g4D;X2N+=f7z;Editor[X2N](x2N,h8z);}conf[Q0f]=new DataTable$2[E0f](conf[m2N],$[f6z]({format:conf[A0f] || conf[V2N],i18n:this[T0v][a2N]},conf[M2N]));conf[b2N]=function(){var K0f="picke";var I2N=A9z;I2N+=K0f;I2N+=f7z;conf[I2N][o0f]();};if(conf[H0f] === g0z){var v2N=S9QQ[383646];v2N+=v7z;conf[P4f][v2N](q6D,function(e){e[c2v]();});}this[i9z](U0z,conf[w0f]);return conf[p2N][Y8z];},get:function(conf){var z0f="omentLocale";var y0f="ntStric";var s2N=s0f;s2N+=K7z;var n2N=N2v;n2N+=K2z;H2t.a2t();n2N+=y0f;n2N+=K7z;var f2N=m9z;f2N+=z0f;var N2N=m9z;N2N+=S9QQ[383646];N2N+=K2z;N2N+=o4v;var Y2N=E4D;Y2N+=Y7z;Y2N+=R0f;var val=conf[P4f][W1v]();var inst=conf[Y2N][S9QQ[465530]];var moment=window[N2N];return val && conf[L0f] && moment?moment(val,inst[W0f],inst[f2N],inst[n2N])[s2N](conf[L0f]):val;},set:function(conf,val){var G0f='--';var c0f="momentStr";var B0f="momentLocale";var Z0f="icker";var C0f="ict";var l0f="_pic";var u0f="moment";var Q2N=A9z;Q2N+=F1z;Q2N+=d3z;Q2N+=a0D;var D2N=I7z;D2N+=S9QQ[383646];D2N+=L9z;D2N+=p7v;var h2N=c0f;h2N+=C0f;var E2N=Y7z;H2t.l2t();E2N+=j2z;E2N+=f6D;var j2N=A6z;j2N+=Y7z;j2N+=F4D;var T2N=l0f;T2N+=O0f;var J2N=A9z;J2N+=d3z;J2N+=Z0f;var inst=conf[J2N][S9QQ[465530]];var moment=window[u0f];conf[T2N][W1v](typeof val === j2N && val && val[E2N](G0f) !== Y8z && conf[L0f] && moment?moment(val,conf[L0f],inst[B0f],inst[h2N])[D2N](inst[W0f]):val);_triggerChange(conf[Q2N]);},owns:function(conf,node){var U0f="owns";return conf[Q0f][U0f](node);},errorMessage:function(conf,msg){var q0f="errorMsg";var t0f="pick";var A2N=A9z;A2N+=t0f;A2N+=v3z;conf[A2N][q0f](msg);},destroy:function(conf){var r0f="oseF";var g0f="_cl";var i0f="stroy";var S0f="pic";var y2N=d7z;y2N+=x7z;y2N+=i0f;var w2N=A9z;w2N+=S0f;w2N+=O0f;var H2N=S9QQ[383646];H2N+=I7z;H2N+=I7z;var o2N=O4f;o2N+=K7z;var K2N=g0f;K2N+=r0f;K2N+=v7z;this[w9v](U0z,conf[K2N]);conf[o2N][H2N](q6D);conf[w2N][y2N]();},minDate:function(conf,min){var k6f="min";var z2N=A9z;z2N+=d3z;z2N+=Y7z;z2N+=R0f;H2t.l2t();conf[z2N][k6f](min);},maxDate:function(conf,max){var F6f="_pi";var R2N=F6f;R2N+=S9QQ[465530];R2N+=O0f;conf[R2N][y3v](max);}});var upload=$[f6z](S0z,{},baseFieldType,{create:function(conf){H2t.l2t();var editor=this;var container=_commonUpload(editor,conf,function(val){var e6f="os";var P6f="tUpl";var c2N=d3z;c2N+=e6f;c2N+=P6f;c2N+=L9D;var W2N=N6v;W2N+=T6D;var L2N=z7z;L2N+=x7z;L2N+=K7z;upload[L2N][S1z](editor,conf,val[Y8z]);editor[W2N](c2N,[conf[D5z],val[Y8z]]);});return container;},get:function(conf){var C2N=A9z;C2N+=o3z;C2N+=v4z;C2N+=X0z;return conf[C2N];},set:function(conf,val){var m6f="/spa";var p6f='noClear';var v6f="clearTex";var I6f="clearText";var V6f="File";var X6f="ndle";var d6f="triggerHa";var a6f="<s";var b6f='div.clearValue button';var M6f='No file';var g2N=d6f;g2N+=X6f;g2N+=f7z;var S2N=B4f;S2N+=a0D;var i2N=A9z;i2N+=C9f;var Z2N=B9f;Z2N+=c7f;H2t.a2t();var O2N=B9f;O2N+=c7f;var l2N=A9z;l2N+=o3z;l2N+=v4z;l2N+=X0z;conf[l2N]=val;conf[O2N][W1v](c0z);var container=conf[Z2N];if(conf[e4D]){var rendered=container[R1v](x6f);if(conf[U4f]){var u2N=m7z;u2N+=I7v;rendered[o2D](conf[u2N](conf[U4f]));}else {var t2N=T4z;t2N+=m6f;t2N+=v7z;t2N+=l6v;var U2N=d5z;U2N+=V6f;U2N+=t4D;var B2N=a6f;B2N+=d3z;B2N+=h6v;B2N+=l6v;var G2N=P2D;G2N+=V4z;rendered[T2v]()[G2N](B2N + (conf[U2N] || M6f) + t2N);}}var button=container[R1v](b6f);if(val && conf[I6f]){var q2N=v6f;q2N+=K7z;button[o2D](conf[q2N]);container[a5z](p6f);}else {container[x5z](p6f);}conf[i2N][R1v](S2N)[g2N](Y6f,[conf[U4f]]);},enable:function(conf){var N6f="_enable";var r2N=N6f;H2t.l2t();r2N+=d7z;conf[P4f][R1v](z4f)[Z4f](u4f,g0z);conf[r2N]=S0z;},disable:function(conf){var f6f="sabled";var e1N=m7z;e1N+=f6f;var F1N=I7z;H2t.l2t();F1N+=Y7z;F1N+=v7z;F1N+=d7z;var k1N=A9z;k1N+=Y7z;k1N+=s7f;k1N+=a0D;conf[k1N][F1N](z4f)[Z4f](e1N,S0z);conf[n4f]=g0z;},canReturnSubmit:function(conf,node){H2t.l2t();return g0z;}});var uploadMany=$[P1N](S0z,{},baseFieldType,{_showHide:function(conf){var n6f="imi";var T6f="div.lim";var E6f="_container";var J6f="ock";var j6f="Hide";var h6f="limit";var s6f="_limitLef";var I1N=X0z;I1N+=o5z;I1N+=V3z;var b1N=X0z;b1N+=n6f;b1N+=K7z;var M1N=s6f;M1N+=K7z;var a1N=P1z;a1N+=J6f;var V1N=A9z;V1N+=o3z;V1N+=v4z;V1N+=X0z;var m1N=S9QQ[465530];m1N+=C9z;var x1N=T6f;x1N+=M7z;x1N+=j6f;var X1N=i5z;X1N+=V4z;var d1N=X0z;d1N+=Y7z;d1N+=m9z;d1N+=M7z;if(!conf[d1N]){return;}conf[E6f][X1N](x1N)[m1N](H2D,conf[V1N][C6z] >= conf[h6f]?t6z:a1N);conf[M1N]=conf[b1N] - conf[U4f][I1N];},create:function(conf){var A6f="tto";var D6f="_conta";var K6f="n.rem";var h1N=D6f;h1N+=Q6f;var J1N=Z7z;J1N+=A6f;J1N+=K6f;J1N+=o6f;var s1N=d7D;s1N+=X0z;s1N+=K7z;s1N+=Y7z;var editor=this;var container=_commonUpload(editor,conf,function(val){var y6f='postUpload';var w6f="cat";var H6f="cal";var n1N=A9z;n1N+=o3z;n1N+=Y1z;var f1N=N6v;f1N+=T6D;var N1N=A9z;N1N+=H8v;N1N+=X0z;var Y1N=H6f;Y1N+=X0z;var p1N=z7z;p1N+=y8D;var v1N=S9QQ[465530];v1N+=S9QQ[383646];v1N+=v7z;v1N+=w6f;conf[U4f]=conf[U4f][v1N](val);uploadMany[p1N][Y1N](editor,conf,conf[N1N]);editor[f1N](y6f,[conf[D5z],conf[n1N]]);},S0z);container[x5z](s1N)[i9z](u5v,J1N,function(e){var R6f="all";var z6f="stopPropagation";var L6f='idx';e[z6f]();if(conf[n4f]){var E1N=A9z;E1N+=W1v;var j1N=S9QQ[465530];j1N+=R6f;var T1N=z7z;T1N+=x7z;T1N+=K7z;var idx=$(this)[B7z](L6f);conf[U4f][s1z](idx,N8z);uploadMany[T1N][j1N](editor,conf,conf[E1N]);}});conf[h1N]=container;return container;},get:function(conf){return conf[U4f];},set:function(conf,val){var u6f="oad collections must have an array as a value";var C6f="howHi";var W6f="_va";var P5f='No files';var F5f="oFileText";var G6f='<ul></ul>';var e5f='<span>';var O6f="isArr";var Z6f="Upl";H2t.l2t();var c1N=W6f;c1N+=X0z;var W1N=F1z;W1N+=d3z;W1N+=P3z;W1N+=K7z;var L1N=i5z;L1N+=V4z;var R1N=c6f;R1N+=C6f;R1N+=d7z;R1N+=x7z;var A1N=l6f;A1N+=i1v;A1N+=v1v;var D1N=O6f;D1N+=v4z;D1N+=j3z;if(!val){val=[];}if(!Array[D1N](val)){var Q1N=Z6f;Q1N+=u6f;throw Q1N;}conf[U4f]=val;conf[P4f][W1v](c0z);var that=this;var container=conf[P4f];if(conf[A1N]){var K1N=W5z;K1N+=P2v;K1N+=V3z;var rendered=container[R1v](x6f)[T2v]();if(val[K1N]){var list=$(G6f)[Q5v](rendered);$[Q5z](val,function(i,file){var k5f='">&times;</button>';var i6f=" <button c";var r6f=' remove" data-idx="';var g6f='<li>';var S6f="lass=\"";var U6f="i>";var B6f="</l";var q6f="for";var y1N=B6f;y1N+=U6f;var w1N=n2v;w1N+=t6f;var H1N=q6f;H1N+=m9z;var o1N=i6f;H2t.l2t();o1N+=S6f;list[N9v](g6f + conf[e4D](file,i) + o1N + that[i0v][H1N][w1N] + r6f + i + k5f + y1N);});}else {var z1N=v7z;z1N+=F5f;rendered[N9v](e5f + (conf[z1N] || P5f) + d5f);}}uploadMany[R1N](conf);conf[P4f][L1N](W1N)[s6D](Y6f,[conf[c1N]]);},enable:function(conf){var X5f="abled";var l1N=A9z;l1N+=t9z;l1N+=X5f;var C1N=f4D;C1N+=d3z;conf[P4f][R1v](z4f)[C1N](u4f,g0z);H2t.a2t();conf[l1N]=S0z;},disable:function(conf){var x5f="isa";var u1N=d7z;u1N+=x5f;u1N+=o3f;var Z1N=d3z;Z1N+=f7z;Z1N+=S9QQ[383646];Z1N+=d3z;var O1N=A9z;O1N+=C9f;conf[O1N][R1v](z4f)[Z1N](u1N,S0z);conf[n4f]=g0z;},canReturnSubmit:function(conf,node){return g0z;}});var datatable=$[G1N](S0z,{},baseFieldType,{_addOptions:function(conf,options,append){var t1N=d7z;t1N+=f7z;t1N+=b1z;var B1N=d7z;B1N+=K7z;if(append === void Y8z){append=g0z;}var dt=conf[B1N];if(!append){var U1N=S9QQ[465530];U1N+=X0z;U1N+=C7z;U1N+=f7z;dt[U1N]();}dt[M5z][r6z](options)[t1N]();},create:function(conf){var Y5f="nit";var n5f="<ta";var s5f="e>";var M5f="iB";var f5f="ableClass";var m5f="onfig";var T5f="optionsPai";var b5f="tp";var j5f='<div class="DTE_Field_Type_datatable_info">';var D5f='<tr>';var O5f='user-select';var N5f="wi";var I5f="sPa";var h5f="<t";var z5f='Search';var y5f='Label';var A5f='100%';var V5f="ngle";var l89=d7z;l89+=K7z;var A89=S9QQ[465530];A89+=m5f;var Q89=z7z;Q89+=Y7z;Q89+=V5f;var D89=S9QQ[383646];D89+=z7z;var h89=d7D;h89+=a5f;h89+=d3z;h89+=E7z;var E89=I7z;E89+=M5f;E89+=b5f;var j89=k5z;j89+=S9QQ[624975];j89+=x7z;j89+=X0z;var T89=L9f;T89+=I5f;T89+=Y7z;T89+=f7z;var J89=x7z;J89+=v5f;var s89=p5f;s89+=v4z;s89+=U7z;var M89=Y7z;M89+=Y5f;M89+=M5v;M89+=V2z;var a89=S9QQ[383646];a89+=v7z;H2t.a2t();var V89=N5f;V89+=d7z;V89+=j1z;var m89=K7z;m89+=f5f;var x89=r6z;x89+=g3z;x89+=r8D;var g1N=n5f;g1N+=S9QQ[624975];g1N+=X0z;g1N+=s5f;var S1N=H8v;S1N+=C4D;var i1N=J5f;i1N+=h9z;var q1N=T5f;q1N+=f7z;var _this=this;conf[q1N]=$[f6z]({label:i1N,value:S1N},conf[R3f]);var table=$(g1N);var container=$(M3f)[N9v](table);var side=$(j5f);if(conf[E5f]){var X89=N9v;X89+=T2z;var P89=m9z;P89+=v4z;P89+=d3z;var e89=v4z;e89+=J2z;var F89=p9z;F89+=c9D;F89+=x7z;F89+=f7z;var k89=e9v;k89+=G1z;k89+=v7z;k89+=d7z;var r1N=h5f;r1N+=M0D;r1N+=K7z;r1N+=l6v;$(r1N)[k89](Array[a7v](conf[F89])?$(D5f)[e89]($[P89](conf[E5f],function(str){var Q5f="h>";var d89=T4z;d89+=K7z;d89+=Q5f;return $(d89)[o2D](str);})):conf[E5f])[X89](table);}var dt=table[x89](datatable[m89])[V89](A5f)[a89](M89,function(e,settings){var H5f='div.dataTables_filter';var w5f='div.dt-buttons';var o5f="ontainer";var K5f="dataTables_inf";var n89=u6v;n89+=M5v;n89+=K5f;n89+=S9QQ[383646];var f89=M9D;f89+=a4z;var N89=e9v;N89+=y5v;var Y89=v4z;Y89+=J2z;var p89=Y7z;p89+=v7z;p89+=M7z;H2t.l2t();var v89=n7z;v89+=E7z;v89+=S9QQ[465530];v89+=K7z;var I89=S9QQ[465530];I89+=o5f;var b89=w4D;b89+=Y7z;var api=new DataTable$2[b89](settings);var container=$(api[q2z](undefined)[I89]());DataTable$2[v89][p89](api);side[Y89](container[R1v](H5f))[N89](container[R1v](w5f))[f89](container[R1v](n89));})[s89]($[J89]({buttons:[],columns:[{title:y5f,data:conf[T89][j89]}],deferRender:S0z,dom:E89,language:{search:c0z,searchPlaceholder:z5f,paginate:{next:k2D,previous:R5f}},lengthChange:g0z,select:{style:conf[h89]?D89:Q89}},conf[A89]));this[i9z](b1D,function(){var c5f="arch";var C5f="search";var L5f="colu";H2t.a2t();var l5f="draw";var W5f="mn";var H89=a1z;H89+=b1v;H89+=P3z;H89+=W9v;var o89=L5f;o89+=W5f;o89+=z7z;var K89=n7z;K89+=c5f;if(dt[K89]()){dt[C5f](c0z)[l5f]();}dt[o89][H89]();});dt[i9z](O5f,function(){H2t.a2t();_triggerChange($(conf[V2z][q2z]()[Z5f]()));});if(conf[H9f]){var y89=I7f;y89+=v7f;var w89=S9QQ[383646];w89+=v7z;conf[H9f][q2z](dt);conf[H9f][w89](y89,function(e,json,data,action){var U5f="_jumpToFirst";var B5f='refresh';var u5f="reat";var G5f="_dataSou";var c89=K3z;c89+=D1z;var z89=S9QQ[465530];z89+=u5f;z89+=x7z;if(action === z89){var _loop_1=function(i){H2t.a2t();var W89=g9f;W89+=w6z;W89+=K7z;var R89=Z9z;R89+=w1v;dt[R89](function(idx,d){H2t.l2t();var L89=d7z;L89+=v4z;L89+=K7z;L89+=v4z;return d === json[L89][i];})[W89]();};for(var i=Y8z;i < json[B7z][C6z];i++){_loop_1(i);}}else if(action === z3D || action === c89){var C89=G5f;C89+=s6v;_this[C89](B5f);}datatable[U5f](conf);});}conf[l89]=dt;datatable[z9f](conf,conf[Q2D] || []);return {input:container,side:side};},get:function(conf){var i5f="toArr";var t5f="separ";var S5f="pluck";var q5f="ator";var G89=t5f;G89+=q5f;var u89=k6D;u89+=i1v;u89+=x7z;var Z89=i5f;Z89+=v1v;var O89=H8v;O89+=X0z;O89+=O2D;var rows=conf[V2z][M5z]({selected:S0z})[B7z]()[S5f](conf[R3f][O89])[Z89]();return conf[u9f] || !conf[u89]?rows[g7D](conf[G89] || W3D):rows;},set:function(conf,val,localUpdate){var g5f="_jumpTo";var r5f="irst";var k2f="ele";var X2f="sepa";var x2f="rat";var P2f="Pair";var m2f="pli";var V2f="ring";var F2f="ect";var M2f="tainer";var d2f="sAr";var e2f="tions";var P79=g5f;P79+=x3z;P79+=r5f;var e79=z7z;e79+=k2f;e79+=C1v;var F79=f7z;F79+=S9QQ[383646];F79+=d0z;F79+=z7z;var k79=d7z;k79+=K7z;var r89=d7z;r89+=m8v;r89+=h9z;r89+=F2f;var g89=d7z;g89+=K7z;var S89=F2v;S89+=e2f;S89+=P2f;var i89=r2z;i89+=j3z;var B89=Y7z;B89+=d2f;H2t.a2t();B89+=W1z;B89+=j3z;if(conf[o9f] && conf[u9f] && !Array[B89](val)){var q89=X2f;q89+=x2f;q89+=b7z;var t89=z7z;t89+=m2f;t89+=K7z;var U89=W9v;U89+=V2f;val=typeof val === U89?val[t89](conf[q89]):[];}else if(!Array[i89](val)){val=[val];}var valueFn=dataGet(conf[S89][l4D]);conf[g89][M5z]({selected:S0z})[r89]();conf[k79][F79](function(idx,data,node){return val[a2f](valueFn(data)) !== -N8z;})[e79]();datatable[P79](conf);if(!localUpdate){var d79=v2z;d79+=v7z;d79+=M2f;_triggerChange($(conf[V2z][q2z]()[d79]()));}},update:function(conf,options,append){var v2f="addOptions";var I2f="Set";H2t.a2t();var V79=v2z;V79+=b2f;V79+=f7z;var m79=d7z;m79+=K7z;var x79=Z4D;x79+=P9f;x79+=K7z;x79+=I2f;var X79=A9z;X79+=v2f;datatable[X79](conf,options,append);var lastSet=conf[x79];if(lastSet !== undefined){datatable[e1v](conf,lastSet,S0z);}_triggerChange($(conf[m79][q2z]()[V79]()));},dt:function(conf){var a79=d7z;a79+=K7z;return conf[a79];},tableClass:c0z,_jumpToFirst:function(conf){var n2f="lied";var Y2f='applied';var T2f="floor";var f2f="exes";var p2f="um";var s2f="page";var s79=d7z;s79+=f7z;s79+=b1z;var n79=d3z;n79+=v4z;n79+=I0z;n79+=x7z;var b79=v7z;b79+=p2f;b79+=f3z;var M79=d7z;M79+=K7z;var idx=conf[M79][v5z]({selected:S0z,order:Y2f})[N2f]();var page=Y8z;if(typeof idx === b79){var f79=Y7z;f79+=v7z;f79+=d7z;f79+=f2f;var N79=M9D;N79+=n2f;var Y79=f7z;Y79+=S9QQ[383646];Y79+=w1v;var p79=d7z;p79+=K7z;var v79=X0z;v79+=e2v;v79+=K7z;v79+=V3z;var I79=d7z;I79+=K7z;var pageLen=conf[I79][s2f][J2f]()[v79];var pos=conf[p79][Y79]({order:N79})[f79]()[a2f](idx);page=pageLen > Y8z?Math[T2f](pos / pageLen):Y8z;}H2t.a2t();conf[V2z][n79](page)[s79](g0z);}});var defaults={className:c0z,compare:q0z,data:c0z,def:c0z,entityDecode:S0z,fieldInfo:c0z,id:c0z,label:c0z,labelInfo:c0z,name:q0z,nullDefault:g0z,type:e9f,message:c0z,multiEditable:S0z,submit:S0z,getFormatter:q0z,setFormatter:q0z};var DataTable$1=$[F4v][O0z];var Field=(function(){var h71="host";var F81="multiRestore";var Z81="extarea";var e1f="dIn";var R2f="tiIn";var B81="contain";var Q71="update";var n81="_typeFn";var h81="om";var F1f="ototy";var A2f="iV";var o2f="eCheck";var r2f="abel";var w2f="sg";var D2f="otype";var Z2f="llD";var c2f="roy";var O2f="rototyp";var c81="isMultiValue";var r1f="multiValue";var y2f="rrorNo";var e71="_multiValueCheck";var h2f="prot";var U2f="ype";var E2f="eFn";var x1f="tot";var K2f="alu";var W2f="otyp";var S2f="multiG";var j2f="_ty";var z71="submittable";var k1f="rototy";var C71="formatters";var Q81="enabled";var S81="_format";var I81="multiEditable";var u2f="efault";var Q2f="_mult";var i1f="labelInfo";var C2f="dataS";var l2f="mpare";var W81="_msg";var t2f="protot";var z2f="Reset";var i2f="prototy";var g1f="inputControl";var P1f="proto";var q2f="yp";var B2f="rotot";var G2f="totype";var X1f="rototype";var L2f="foShown";var d1f="ototype";var g2f="elInfo";var B09=j2f;B09+=d3z;B09+=E2f;var G09=h2f;G09+=D2f;var J09=Q2f;J09+=A2f;J09+=K2f;J09+=o2f;var a09=H2f;a09+=w2f;var d09=A9z;d09+=W0f;var P09=A9z;P09+=x7z;P09+=y2f;P09+=V1z;var F09=k6D;F09+=z2f;var g39=d7D;g39+=X0z;g39+=R2f;g39+=L2f;var S39=L6v;S39+=S9QQ[383646];S39+=K7z;S39+=D2f;var q39=h2f;q39+=W2f;q39+=x7z;var G39=V1z;G39+=W9v;G39+=c2f;var Z39=C2f;Z39+=g2z;var O39=v2z;O39+=l2f;var l39=h2f;l39+=W2f;l39+=x7z;var W39=o3z;W39+=v4z;W39+=X0z;var o39=z7z;o39+=i2D;var n39=z7z;n39+=x7z;n39+=K7z;var b39=d3z;b39+=O2f;b39+=x7z;var a39=o6D;a39+=Z2f;a39+=u2f;var V39=d3z;V39+=Z9z;V39+=N7z;V39+=C3D;var x39=f4D;x39+=G2f;var P39=R0v;P39+=K2z;var e39=d3z;e39+=B2f;e39+=U2f;var i99=t2f;i99+=q2f;i99+=x7z;var q99=i2f;q99+=G1z;var G99=S2f;G99+=y8D;var u99=L6v;u99+=c9D;u99+=S9QQ[383646];u99+=C3D;var Z99=J5f;Z99+=g2f;var W99=X0z;H2t.l2t();W99+=r2f;var w99=i2f;w99+=G1z;var A99=h2f;A99+=W2f;A99+=x7z;var h99=d3z;h99+=k1f;h99+=d3z;h99+=x7z;var f99=L6v;f99+=F1f;f99+=G1z;var p99=I7z;p99+=f7v;p99+=e1f;p99+=p9z;var v99=P1f;v99+=K7z;v99+=q2f;v99+=x7z;var F99=L6v;F99+=d1f;var i49=d3z;i49+=X1f;var B49=h2f;B49+=D2f;var C49=h2f;C49+=D2f;var R49=f4D;R49+=x1f;R49+=j3z;R49+=G1z;function Field(options,classes,host){var t1f="namePrefix";var b1f="ti-va";var M1f="sg-";var D1f="<div data-";var f1f="dI";var A1f="=\"msg-multi\" class=\"";var y1f="msg-la";var z1f="bel";var a1f="-info";var N1f="/div>";var m1f="field-p";var X81='<div data-dte-e="field-processing" class="';var B1f='DTE_Field_';var v1f="ssa";var Q1f="dte-e";var d81='msg-info';var P81='msg-error';var n1f="<div dat";var k81='<span data-dte-e="multi-info" class="';var x81="side";var p81="multiReturn";var G1f='Error adding field - unknown field type ';var w1f="/label>";var C1f="alToData";var q1f='<label data-dte-e="label" class="';var I1f="msg-me";var p1f="sg-erro";var T1f="ms";var l1f="valFromD";var m81='input-control';var a81='msg-label';var R1f="<div data-dte-e=\"m";var E1f=" data-dte-e=\"";var o1f="<div data-dte-e=\"multi-value\"";var J1f="info\" class";var H1f="dte-e=\"input\" class=\"";var V81="ispla";var W1f="for=\"";var Y1f="\"><span></span><";var e81='<div data-dte-e="msg-error" class="';var s1f="a-dte-e=\"msg-";var S1f='<div data-dte-e="input-control" class="';var c1f="typePrefi";var j1f="g-messa";var h1f="msg-message\" class=";var V1f="ulti";var L1f="sg-label\" class=\"";var K1f="tiInf";var O1f="aults";var Q49=i3v;Q49+=d3z;Q49+=x7z;var D49=d7z;D49+=S9QQ[383646];D49+=m9z;var T49=S9QQ[383646];T49+=v7z;var J49=d7D;J49+=X0z;J49+=V9v;var s49=m1f;s49+=Y7f;var n49=m9z;n49+=V1f;n49+=a1f;var f49=m9z;f49+=M1f;f49+=b9z;f49+=Y7z;var N49=r2v;N49+=b1f;N49+=X0z;N49+=O2D;var Y49=I1f;Y49+=v1f;Y49+=r9z;var p49=m9z;p49+=p1f;p49+=f7z;var v49=X0z;v49+=K2v;v49+=X0z;var V49=w1z;V49+=x7z;V49+=v4z;V49+=l7z;var m49=E2D;m49+=z6z;var x49=Y1f;x49+=N1f;var X49=h4z;X49+=Y7z;X49+=E4z;var d49=h4z;d49+=Y7z;d49+=E4z;var P49=P7z;P49+=f1f;P49+=C9v;P49+=S9QQ[383646];var e49=n1f;e49+=s1f;e49+=J1f;e49+=C5D;var F49=T1f;F49+=j1f;F49+=r9z;var k49=o4z;k49+=E1f;k49+=h1f;k49+=J6z;var r79=T4z;r79+=Z6v;r79+=d7z;r79+=G6v;var g79=V8v;g79+=N7z;g79+=K3z;var S79=D1f;S79+=Q1f;S79+=A1f;var i79=J6z;i79+=l6v;var q79=r2v;q79+=K1f;q79+=S9QQ[383646];var t79=J6z;t79+=l6v;var U79=o1f;U79+=Z5D;var B79=J6z;B79+=l6v;var G79=D1f;G79+=H1f;var u79=T4z;u79+=w1f;var Z79=T4z;Z79+=Z6v;Z79+=m7z;Z79+=E4z;var O79=y1f;O79+=z1f;var l79=R1f;l79+=L1f;var C79=Y7z;C79+=d7z;var c79=J6z;c79+=C1D;c79+=W1f;var W79=v7z;W79+=v4z;W79+=m9z;W79+=x7z;var L79=K7z;L79+=U2f;var R79=c1f;R79+=t7z;var z79=a0v;z79+=d0v;var y79=d7z;y79+=p7v;y79+=v4z;var w79=o3z;w79+=C1f;var o79=l1f;o79+=v4z;o79+=I5z;var A79=K1z;A79+=v4z;var D79=Y7z;D79+=d7z;var h79=K7z;h79+=j3z;h79+=d3z;h79+=x7z;var E79=P7z;E79+=d7z;E79+=X7z;var j79=v7z;j79+=r9D;j79+=x7z;var T79=K7z;T79+=j3z;T79+=G1z;var J79=F1v;J79+=O1f;var that=this;var multiI18n=host[Z1f]()[k6D];var opts=$[f6z](S0z,{},Field[J79],options);if(!Editor[u1f][opts[T79]]){throw new Error(G1f + opts[C3D]);}this[z7z]={classes:classes,host:host,multiIds:[],multiValue:g0z,multiValues:{},name:opts[j79],opts:opts,processing:g0z,type:Editor[E79][opts[h79]]};if(!opts[D79]){var Q79=Y7z;Q79+=d7z;opts[Q79]=B1f + opts[D5z];}if(opts[A79] === c0z){var K79=d7z;K79+=v4z;K79+=K7z;K79+=v4z;opts[K79]=opts[D5z];}this[o79]=function(d){H2t.a2t();var U1f='editor';var H79=K1z;H79+=v4z;return dataGet(opts[H79])(d,U1f);};this[w79]=dataSet(opts[y79]);var template=$(j5v + classes[z79] + y2v + classes[R79] + opts[L79] + y2v + classes[t1f] + opts[W79] + y2v + opts[w2v] + E5v + q1f + classes[q8v] + c79 + Editor[m4f](opts[C79]) + E5v + opts[q8v] + l79 + classes[O79] + E5v + opts[i1f] + Z79 + u79 + G79 + classes[C9f] + B79 + S1f + classes[g1f] + h5v + U79 + classes[r1f] + t79 + multiI18n[H5v] + k81 + classes[q79] + i79 + multiI18n[J2f] + d5f + n3v + S79 + classes[F81] + E5v + multiI18n[g79] + r79 + e81 + classes[P81] + h5v + k49 + classes[F49] + E5v + opts[I7D] + n3v + e49 + classes[d81] + E5v + opts[P49] + d49 + X49 + X81 + classes[D1D] + x49 + n3v);var input=this[m49](V49,opts);var side=q0z;if(input && input[x81]){var a49=z7z;a49+=Y7z;a49+=d7z;a49+=x7z;side=input[a49];input=input[C9f];}if(input !== q0z){el(m81,template)[K5v](input);}else {var I49=v7z;I49+=i9z;I49+=x7z;var b49=d7z;b49+=V81;b49+=j3z;var M49=S9QQ[465530];M49+=C9z;template[M49](b49,I49);}this[h4v]={container:template,inputControl:el(m81,template),label:el(v49,template)[N9v](side),fieldInfo:el(d81,template),labelInfo:el(a81,template),fieldError:el(p49,template),fieldMessage:el(Y49,template),multi:el(N49,template),multiReturn:el(f49,template),multiInfo:el(n49,template),processing:el(s49,template)};this[h4v][J49][T49](u5v,function(){var v81='readonly';var M81="ha";var b81="sCla";var E49=X9z;E49+=E7z;E49+=d7z;var j49=M81;j49+=b81;j49+=C9z;if(that[z7z][x1v][I81] && !template[j49](classes[E49]) && opts[C3D] !== v81){var h49=o3z;h49+=v4z;h49+=X0z;that[h49](c0z);that[b4D]();}});this[D49][p81][i9z](u5v,function(){H2t.a2t();that[F81]();});$[Q5z](this[z7z][Q49],function(name,fn){var Y81="fu";var N81="nc";var A49=Y81;A49+=N81;H2t.l2t();A49+=V9v;A49+=i9z;if(typeof fn === A49 && that[name] === undefined){that[name]=function(){var f81="shi";var o49=T3z;o49+=f81;o49+=I7z;o49+=K7z;var K49=t2f;K49+=j3z;K49+=d3z;K49+=x7z;var args=Array[K49][b2D][S1z](arguments);args[o49](name);var ret=that[n81][s5v](that,args);return ret === undefined?that:ret;};}});}Field[S7D][F1v]=function(set){var s81="functi";var J81="au";var T81='default';H2t.l2t();var z49=V1z;z49+=I7z;var opts=this[z7z][x1v];if(set === undefined){var y49=s81;y49+=i9z;var w49=d7z;w49+=k6v;var H49=F1v;H49+=J81;H49+=X7D;var def=opts[H49] !== undefined?opts[T81]:opts[w49];return typeof def === y49?def():def;}opts[z49]=set;return this;};Field[R49][j81]=function(){var E81="sabl";var c49=d7z;c49+=Y7z;c49+=E81;c49+=x7z;var W49=l6f;W49+=P4v;W49+=x9z;var L49=d7z;L49+=h81;this[L49][Z5f][x5z](this[z7z][i0v][W49]);this[n81](c49);return this;};Field[C49][x8D]=function(){var G49=v7z;G49+=S9QQ[383646];G49+=v7z;G49+=x7z;var u49=X0z;u49+=e2v;u49+=K7z;u49+=V3z;var Z49=S9QQ[624975];Z49+=S9QQ[383646];Z49+=d7z;Z49+=j3z;var O49=r8v;O49+=K3z;O49+=o4v;O49+=z7z;var l49=d7z;l49+=S9QQ[383646];l49+=m9z;var container=this[l49][Z5f];return container[O49](Z49)[u49] && container[s0v](H2D) != G49?S0z:g0z;};Field[B49][Y8D]=function(toggle){var D81='enable';var q49=f7z;q49+=H1z;q49+=b3D;var t49=v2z;t49+=b2f;t49+=f7z;var U49=d7z;U49+=S9QQ[383646];U49+=m9z;if(toggle === void Y8z){toggle=S0z;}if(toggle === g0z){return this[j81]();}this[U49][t49][q49](this[z7z][i0v][f9f]);this[n81](D81);return this;};Field[i49][Q81]=function(){var A81="has";var K81="Cl";var o81="ainer";var k99=K3f;k99+=o3f;var r49=A81;r49+=K81;r49+=P9f;r49+=z7z;var g49=H9v;g49+=K7z;g49+=o81;var S49=d7z;S49+=S9QQ[383646];S49+=m9z;return this[S49][g49][r49](this[z7z][i0v][k99]) === g0z;};Field[F99][p5z]=function(msg,fn){var y81="ontaine";var H81="dError";var R81="nta";H2t.l2t();var z81="removeCla";var w81="_typeF";var L81='errorMessage';var I99=P7z;I99+=H81;var b99=w81;b99+=v7z;var e99=m0z;e99+=p3D;e99+=x7z;e99+=z7z;var classes=this[z7z][e99];if(msg){var x99=x7z;x99+=f7z;x99+=J9z;var X99=v4z;X99+=c3v;X99+=b3D;var d99=S9QQ[465530];d99+=y81;d99+=f7z;var P99=d7z;P99+=S9QQ[383646];P99+=m9z;this[P99][d99][X99](classes[x99]);}else {var M99=v3z;M99+=J9z;var a99=z81;a99+=C9z;var V99=v2z;V99+=R81;V99+=Q6f;var m99=N8D;m99+=m9z;this[m99][V99][a99](classes[M99]);}this[b99](L81,msg);return this[W81](this[h4v][I99],msg,fn);};Field[v99][p99]=function(msg){var N99=P7z;N99+=e1f;N99+=I7z;N99+=S9QQ[383646];H2t.l2t();var Y99=d7z;Y99+=S9QQ[383646];Y99+=m9z;return this[W81](this[Y99][N99],msg);};Field[S7D][c81]=function(){H2t.a2t();return this[z7z][r1f] && this[z7z][M6D][C6z] !== N8z;};Field[f99][c8D]=function(){var C81="ntai";var J99=x7z;J99+=f7z;J99+=Z9z;J99+=f7z;var s99=S9QQ[465530];s99+=S9QQ[383646];s99+=C81;s99+=d5v;var n99=d7z;n99+=S9QQ[383646];n99+=m9z;return this[n99][s99][X3v](this[z7z][i0v][J99]);};Field[S7D][C9f]=function(){var O81=" t";var u81="_t";var l81="put, select,";H2t.a2t();var G81="ypeFn";var E99=H9v;E99+=I5z;E99+=Q6f;var j99=F1z;j99+=l81;j99+=O81;j99+=Z81;var T99=u81;T99+=G81;return this[z7z][C3D][C9f]?this[T99](z4f):$(j99,this[h4v][E99]);};Field[h99][b4D]=function(){var t81=" select, t";var U81="input,";if(this[z7z][C3D][b4D]){this[n81](t0z);}else {var Q99=B81;Q99+=v3z;var D99=U81;D99+=t81;D99+=Z81;$(D99,this[h4v][Q99])[b4D]();}return this;};Field[A99][m2v]=function(){var g81="getFormatter";var i81="Value";var q81="isMulti";var H99=S9QQ[383646];H99+=d3z;H99+=U1z;var o99=I0z;o99+=x7z;o99+=K7z;var K99=q81;K99+=i81;if(this[K99]()){return undefined;}return this[S81](this[n81](o99),this[z7z][H99][g81]);};Field[w99][o0f]=function(animate){var r81="slideUp";var R99=I7z;R99+=v7z;var z99=V3z;z99+=S9QQ[383646];z99+=z7z;z99+=K7z;var y99=N8D;y99+=m9z;var el=this[y99][Z5f];if(animate === undefined){animate=S0z;}if(this[z7z][z99][e4D]() && animate && $[R99][r81]){el[r81]();}else {var L99=m7z;L99+=I7v;el[s0v](L99,t6z);}H2t.a2t();return this;};Field[S7D][W99]=function(str){var O99=V3z;O99+=h8v;O99+=X0z;var C99=X0z;C99+=P4v;C99+=h9z;var c99=d7z;c99+=S9QQ[383646];c99+=m9z;var label=this[c99][C99];var labelInfo=this[h4v][i1f][W4v]();if(str === undefined){var l99=V3z;l99+=K7z;l99+=m9z;l99+=X0z;return label[l99]();}label[O99](str);label[N9v](labelInfo);return this;};Field[S7D][Z99]=function(msg){H2t.a2t();return this[W81](this[h4v][i1f],msg);};Field[S7D][I7D]=function(msg,fn){H2t.l2t();var k71="fieldMessage";return this[W81](this[h4v][k71],msg,fn);};Field[u99][G99]=function(id){var F71="sMultiValu";var U99=Y7z;U99+=F71;U99+=x7z;var B99=r2v;B99+=u2D;B99+=z7z;var value;H2t.l2t();var multiValues=this[z7z][B99];var multiIds=this[z7z][M6D];var isMultiValue=this[U99]();if(id === undefined){var t99=o3z;t99+=Y1z;var fieldVal=this[t99]();value={};for(var i=Y8z;i < multiIds[C6z];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else {value=this[W1v]();}return value;};Field[q99][F81]=function(){H2t.a2t();this[z7z][r1f]=S0z;this[e71]();};Field[i99][e6v]=function(id,val){var d71="multiVa";var P71="ultiValueCheck";var X71="Valu";var F39=H2f;F39+=P71;var k39=d71;k39+=C4D;var S99=d7D;S99+=a5f;S99+=X71;S99+=m8v;var that=this;var multiValues=this[z7z][S99];var multiIds=this[z7z][M6D];H2t.l2t();if(val === undefined){val=id;id=undefined;}var set=function(idSrc,val){var x71="etFormatter";var r99=z7z;r99+=x71;if($[f1z](idSrc,multiIds) === -N8z){var g99=d3z;g99+=P3z;g99+=z7z;g99+=V3z;multiIds[g99](idSrc);}H2t.a2t();multiValues[idSrc]=that[S81](val,that[z7z][x1v][r99]);};if($[A6v](val) && id === undefined){$[Q5z](val,function(idSrc,innerVal){set(idSrc,innerVal);});}else if(id === undefined){$[Q5z](multiIds,function(i,idSrc){set(idSrc,val);});}else {set(id,val);}this[z7z][k39]=S0z;this[F39]();return this;};Field[e39][P39]=function(){var X39=v7z;X39+=v4z;X39+=m9z;X39+=x7z;var d39=S9QQ[383646];H2t.l2t();d39+=d3z;d39+=K7z;d39+=z7z;return this[z7z][d39][X39];};Field[x39][N5z]=function(){var m39=d7z;H2t.a2t();m39+=S9QQ[383646];m39+=m9z;return this[m39][Z5f][Y8z];};Field[V39][a39]=function(){var m71="lDefaul";var M39=v7z;M39+=V9z;M39+=m71;M39+=K7z;return this[z7z][x1v][M39];};Field[b39][D1D]=function(set){var b71='processing-field';var M71="process";var a71="hos";var V71="inter";var f39=V71;f39+=v7z;f39+=v4z;f39+=N4f;var N39=a71;N39+=K7z;var Y39=d5z;Y39+=t2z;var p39=S9QQ[465530];p39+=z7z;p39+=z7z;var v39=M71;v39+=l9z;if(set === undefined){var I39=c9z;I39+=x7z;I39+=f1v;return this[z7z][I39];}this[h4v][v39][p39](H2D,set?G9v:Y39);this[z7z][D1D]=set;this[z7z][N39][f39](b71,[set]);H2t.a2t();return this;};Field[S7D][n39]=function(val,multiCheck){var E71='set';var j71="setFormatter";var I71="enti";var p71="iVa";var v71="tyDecode";var D39=I71;D39+=v71;var h39=F2v;h39+=U1z;var E39=b9z;E39+=p71;E39+=C4D;if(multiCheck === void Y8z){multiCheck=S0z;}var decodeFn=function(d){var f71="strin";var Y71="ep";var s71='£';var T71='\n';var J71='\'';var n71='"';var N71="lac";var j39=R5D;j39+=k5z;H2t.a2t();j39+=S9QQ[465530];j39+=x7z;var T39=f7z;T39+=Y71;T39+=N71;T39+=x7z;var J39=R5D;J39+=X0z;J39+=i8v;J39+=x7z;var s39=f71;s39+=I0z;return typeof d !== s39?d:d[J39](/&gt;/g,k2D)[T39](/&lt;/g,R5f)[K6z](/&amp;/g,e0D)[j39](/&quot;/g,n71)[K6z](/&#163;/g,s71)[K6z](/&#39;/g,J71)[K6z](/&#10;/g,T71);};this[z7z][E39]=g0z;var decode=this[z7z][h39][D39];if(decode === undefined || decode === S0z){if(Array[a7v](val)){var Q39=E7z;Q39+=v7z;Q39+=c5z;for(var i=Y8z,ien=val[Q39];i < ien;i++){val[i]=decodeFn(val[i]);}}else {val=decodeFn(val);}}if(multiCheck === S0z){var K39=z7z;K39+=x7z;K39+=K7z;var A39=A9z;A39+=W0f;val=this[A39](val,this[z7z][x1v][j71]);this[n81](K39,val);this[e71]();}else {this[n81](E71,val);}return this;};Field[S7D][o39]=function(animate,toggle){var D71="slideDown";var y39=d7z;y39+=U1v;var w39=B81;w39+=v3z;if(animate === void Y8z){animate=S0z;}if(toggle === void Y8z){toggle=S0z;}if(toggle === g0z){var H39=V3z;H39+=Y7z;H39+=d7z;H39+=x7z;return this[H39](animate);}var el=this[h4v][w39];if(this[z7z][h71][y39]() && animate && $[F4v][D71]){el[D71]();}else {var z39=S9QQ[465530];z39+=z7z;z39+=z7z;el[z39](H2D,c0z);;}return this;};Field[S7D][Q71]=function(options,append){var A71="typ";var K71="eF";var o71='update';var R39=Y9D;R39+=q6z;R39+=l7z;if(append === void Y8z){append=g0z;}if(this[z7z][C3D][R39]){var L39=A9z;L39+=A71;L39+=K71;L39+=v7z;this[L39](o71,options,append);}return this;};Field[S7D][W39]=function(val){var C39=z7z;H2t.l2t();C39+=x7z;C39+=K7z;var c39=r9z;c39+=K7z;return val === undefined?this[c39]():this[C39](val);};Field[l39][O39]=function(value,original){var H71="compare";var compare=this[z7z][x1v][H71] || deepCompare;return compare(value,original);};Field[S7D][Z39]=function(){var u39=d7z;u39+=P9D;return this[z7z][x1v][u39];};Field[S7D][G39]=function(){var t39=V1z;t39+=W9v;t39+=c2f;var U39=f7z;U39+=v8f;U39+=o3z;U39+=x7z;var B39=d7z;B39+=h81;H2t.l2t();this[B39][Z5f][U39]();this[n81](t39);return this;};Field[q39][I81]=function(){H2t.a2t();var w71="multiE";var i39=w71;i39+=B2D;return this[z7z][x1v][i39];};Field[S7D][M6D]=function(){return this[z7z][M6D];};Field[S39][g39]=function(show){var k09=k6D;k09+=t1z;k09+=C9v;k09+=S9QQ[383646];var r39=d7z;r39+=S9QQ[383646];r39+=m9z;H2t.l2t();this[r39][k09][s0v]({display:show?G9v:t6z});};Field[S7D][F09]=function(){H2t.a2t();var y71="multiValues";this[z7z][M6D]=[];this[z7z][y71]={};};Field[S7D][z71]=function(){var e09=z7z;e09+=P3z;e09+=j4D;return this[z7z][x1v][e09];};Field[S7D][P09]=function(){var R71="fieldError";H2t.a2t();return this[h4v][R71];};Field[S7D][d09]=function(val,formatter){var c71="shift";H2t.l2t();var L71="ho";var W71="Ar";if(formatter){var V09=L71;V09+=z7z;V09+=K7z;var m09=S9QQ[465530];m09+=v4z;m09+=X0z;m09+=X0z;var X09=b2z;X09+=W71;X09+=E3f;if(Array[X09](formatter)){var x09=e9v;x09+=d3z;x09+=X0z;x09+=j3z;var args=formatter[b2D]();var name=args[c71]();formatter=Field[C71][name][x09](this,args);}return formatter[m09](this[z7z][V09],val,this);}return val;};Field[S7D][a09]=function(el,msg,fn){var l71="internalSettin";var Z71=":visible";var O71="parent";var G71="Up";var B71="bloc";var u71="slideDow";H2t.a2t();var p09=Y7z;p09+=z7z;if(msg === undefined){var M09=g6z;M09+=z2D;return el[M09]();}if(typeof msg === S9QQ.k7z){var v09=K7z;v09+=P4v;v09+=E7z;var I09=l71;I09+=I0z;I09+=z7z;var b09=w4D;b09+=Y7z;var editor=this[z7z][h71];msg=msg(editor,new DataTable$1[b09](editor[I09]()[v09]));}if(el[O71]()[p09](Z71) && $[F4v][H4v]){el[o2D](msg);if(msg){var Y09=u71;Y09+=v7z;el[Y09](fn);;}else {var N09=i7D;N09+=d7z;N09+=x7z;N09+=G71;el[N09](fn);}}else {var s09=v7z;s09+=i9z;s09+=x7z;var n09=B71;n09+=H2z;var f09=d1D;f09+=j3z;el[o2D](msg || c0z)[s0v](f09,msg?n09:s09);if(fn){fn();}}return this;};Field[S7D][J09]=function(){var g71="I18n";var q71="eCl";var k41="ultiEdi";var x41="noMulti";var P41="iId";var t71="togg";var r71="multiRetu";var d41="nputContr";var U71="NoEdit";var i71="In";var F41="multiV";var e41="lues";var S71="internal";var X41="ol";var u09=d7D;u09+=a5f;u09+=U71;var Z09=t71;Z09+=X0z;Z09+=q71;Z09+=p3D;var O09=Y7z;O09+=v7z;O09+=I7z;O09+=S9QQ[383646];var l09=V3z;l09+=K7z;l09+=m9z;l09+=X0z;var C09=k6D;C09+=i71;C09+=p9z;var c09=S71;c09+=g71;var W09=X0z;W09+=t9z;W09+=P2v;W09+=V3z;var L09=r71;L09+=c4D;var R09=d7z;R09+=S9QQ[383646];R09+=m9z;var h09=b2z;h09+=l2D;h09+=O2D;var E09=m9z;E09+=k41;E09+=r7v;E09+=x7z;var j09=F41;j09+=v4z;j09+=e41;var T09=b9z;T09+=P41;T09+=z7z;var last;var ids=this[z7z][T09];var values=this[z7z][j09];var isMultiValue=this[z7z][r1f];var isMultiEditable=this[z7z][x1v][E09];var val;var different=g0z;if(ids){for(var i=Y8z;i < ids[C6z];i++){val=values[ids[i]];if(i > Y8z && !deepCompare(val,last)){different=S0z;break;}last=val;}}if(different && isMultiValue || !isMultiEditable && this[h09]()){var K09=P1z;K09+=x1D;K09+=H2z;var A09=S9QQ[465530];A09+=z7z;A09+=z7z;var Q09=v7z;Q09+=S9QQ[383646];Q09+=v7z;Q09+=x7z;var D09=S9QQ[465530];D09+=z7z;D09+=z7z;this[h4v][g1f][D09]({display:Q09});this[h4v][k6D][A09]({display:K09});}else {var z09=O1z;z09+=x7z;var y09=m9z;y09+=V9z;y09+=K7z;y09+=Y7z;var w09=M4v;w09+=z7z;var H09=Y7z;H09+=d41;H09+=X41;var o09=d7z;o09+=S9QQ[383646];o09+=m9z;this[o09][H09][w09]({display:G9v});this[h4v][y09][s0v]({display:z09});if(isMultiValue && !different){this[e1v](last,g0z);}}this[R09][L09][s0v]({display:ids && ids[W09] > N8z && different && !isMultiValue?G9v:t6z});var i18n=this[z7z][h71][c09]()[k6D];this[h4v][C09][l09](isMultiEditable?i18n[O09]:i18n[x41]);this[h4v][k6D][Z09](this[z7z][i0v][u09],!isMultiEditable);this[z7z][h71][m41]();return S0z;};Field[G09][B09]=function(name){var V41="unshi";var q09=K7z;q09+=j3z;q09+=G1z;var t09=h2D;t09+=z7z;var U09=V41;U09+=x2v;var args=[];for(var _i=N8z;_i < arguments[C6z];_i++){args[_i - N8z]=arguments[_i];}args[U09](this[z7z][t09]);var fn=this[z7z][q09][name];if(fn){return fn[s5v](this[z7z][h71],args);}};Field[a41]=defaults;Field[C71]={};return Field;})();var button={action:q0z,className:q0z,tabIndex:Y8z,text:q0z};var displayController={close:function(){},init:function(){},open:function(){},node:function(){}};var DataTable=$[F4v][O0z];var apiRegister=DataTable[U9z][M41];function __getInst(api){var I41="ntext";var b41="_ed";var g09=b41;g09+=Y7z;g09+=N7z;g09+=f7z;var S09=S9QQ[383646];S09+=t1z;S09+=v7z;S09+=M7z;var i09=S9QQ[465530];i09+=S9QQ[383646];i09+=I41;var ctx=api[i09][Y8z];return ctx[S09][H9f] || ctx[g09];}function __setBasic(inst,opts,type,plural){var p41="asi";var v41="_b";var f41=/%d/;var Y41="tl";var n41="ag";var r09=S9QQ[624975];r09+=a0D;r09+=t6f;H2t.l2t();r09+=z7z;if(!opts){opts={};}if(opts[r09] === undefined){var F69=v41;F69+=p41;F69+=S9QQ[465530];var k69=Z7z;k69+=j5z;k69+=e2D;opts[k69]=F69;}if(opts[H5v] === undefined){var P69=K7z;P69+=Y7z;P69+=G6D;var e69=K7z;e69+=Y7z;e69+=Y41;e69+=x7z;opts[e69]=inst[T0v][type][P69];}if(opts[I7D] === undefined){if(type === R3D){var X69=E6z;X69+=i8v;X69+=x7z;var d69=S9QQ[465530];d69+=S9QQ[383646];d69+=C9v;d69+=N41;var confirm=inst[T0v][type][d69];opts[I7D]=plural !== N8z?confirm[A9z][X69](f41,plural):confirm[t9v];}else {var x69=K2z;x69+=C9z;x69+=n41;x69+=x7z;opts[x69]=c0z;}}return opts;}apiRegister(s41,function(){return __getInst(this);});apiRegister(J41,function(opts){var m69=w1z;m69+=x7z;m69+=p7v;m69+=x7z;var inst=__getInst(this);inst[m69](__setBasic(inst,opts,X4v));return this;});apiRegister(T41,function(opts){var V69=x7z;V69+=m7z;V69+=K7z;var inst=__getInst(this);inst[H7z](this[Y8z][Y8z],__setBasic(inst,opts,V69));return this;});apiRegister(j41,function(opts){var a69=x7z;a69+=W7z;var inst=__getInst(this);inst[H7z](this[Y8z],__setBasic(inst,opts,a69));return this;});apiRegister(M69,function(opts){var b69=f7z;b69+=v8f;H2t.a2t();b69+=D7v;var inst=__getInst(this);inst[b69](this[Y8z][Y8z],__setBasic(inst,opts,R3D,N8z));return this;});apiRegister(I69,function(opts){var p69=X0z;p69+=t9z;p69+=I0z;H2t.l2t();p69+=j1z;var v69=h7v;v69+=o6f;var inst=__getInst(this);inst[i2z](this[Y8z],__setBasic(inst,opts,v69,this[Y8z][p69]));return this;});apiRegister(E41,function(type,opts){var N69=Y7z;N69+=T7D;N69+=j7D;N69+=E7D;if(!type){var Y69=F1z;Y69+=C8D;type=Y69;}else if($[N69](type)){var f69=F1z;f69+=X0z;f69+=f2D;opts=type;type=f69;}H2t.a2t();__getInst(this)[type](this[Y8z][Y8z],opts);return this;});apiRegister(n69,function(opts){var s69=Y5v;s69+=E7z;__getInst(this)[s69](this[Y8z],opts);return this;});apiRegister(h41,file);apiRegister(J69,files);$(document)[T69](j69,function(e,ctx,json){var D41="namespace";var Q41='dt';H2t.l2t();if(e[D41] !== Q41){return;}if(json && json[Q8D]){var h69=I7z;h69+=Y7z;h69+=X0z;h69+=m8v;var E69=x7z;E69+=v4z;E69+=S9QQ[465530];E69+=V3z;$[E69](json[h69],function(name,files){var Q69=m4z;Q69+=V4z;if(!Editor[Q8D][name]){var D69=I7z;D69+=R4f;D69+=m8v;Editor[D69][name]={};}$[Q69](Editor[Q8D][name],files);});}});var _buttons=$[A69][K69][o69][H69];$[w69](_buttons,{create:{text:function(dt,node,config){var A41="tons.creat";var z69=S9QQ[624975];z69+=a0D;z69+=t6f;var y69=n2v;y69+=A41;y69+=x7z;return dt[T0v](y69,config[H9f][T0v][m7D][z69]);},className:K41,editor:q0z,formButtons:{text:function(editor){H2t.a2t();var L69=S9QQ[465530];L69+=f7z;L69+=x7z;L69+=S1v;var R69=Y7z;R69+=x9v;R69+=S9QQ[405994];R69+=v7z;return editor[R69][L69][I6v];},action:function(e){H2t.l2t();this[I6v]();}},formMessage:q0z,formOptions:{},formTitle:q0z,action:function(e,dt,node,config){var H41="eate";var w41="Titl";var R41="formMessage";var o41="rmOptions";var q69=p9z;q69+=o41;var t69=K7z;t69+=M7z;t69+=X0z;t69+=x7z;var U69=w1z;U69+=H41;var B69=Y7z;B69+=x9v;B69+=S9QQ[405994];B69+=v7z;var G69=p9z;G69+=L9z;G69+=w41;G69+=x7z;var u69=K2z;u69+=z7z;u69+=J0D;var Z69=S9QQ[465530];Z69+=K3z;Z69+=v4z;Z69+=l7z;var O69=Y7z;O69+=x9v;O69+=S9QQ[405994];O69+=v7z;var l69=o7z;l69+=x7z;l69+=V4z;var C69=L6v;C69+=p1D;C69+=v5v;var c69=S9QQ[383646];c69+=v7z;c69+=x7z;var W69=f4D;W69+=y41;W69+=F1z;W69+=I0z;var that=this;var editor=config[H9f];this[W69](S0z);editor[c69](C69,function(){that[D1D](g0z);})[m7D]($[l69]({buttons:config[z41],message:config[R41] || editor[O69][Z69][u69],title:config[G69] || editor[B69][U69][t69],nest:S0z},config[q69]));}},createInline:{text:function(dt,node,config){var c41='buttons.create';var L41="18";var r69=w1z;r69+=x7z;r69+=v4z;r69+=l7z;var g69=Y7z;g69+=L41;g69+=v7z;var S69=H7z;S69+=S9QQ[383646];S69+=f7z;var i69=Y7z;H2t.a2t();i69+=W41;return dt[i69](c41,config[S69][g69][r69][H2v]);},className:k59,editor:q0z,formButtons:{text:function(editor){H2t.a2t();var F59=S9QQ[465530];F59+=K3z;F59+=v4z;F59+=l7z;return editor[T0v][F59][I6v];},action:function(e){H2t.l2t();var e59=N5D;e59+=S9QQ[624975];e59+=C41;this[e59]();}},formOptions:{},action:function(e,dt,node,config){config[H9f][l41](config[y8f],config[V7D]);},position:O41},edit:{extend:Z41,text:function(dt,node,config){var B41="s.e";var G41="tton";var u41="ito";var m59=n2v;m59+=N7z;m59+=v7z;var x59=x7z;x59+=d7z;x59+=Y7z;x59+=K7z;var X59=i6v;X59+=m9v;var d59=O6z;d59+=u41;d59+=f7z;var P59=Z7z;P59+=G41;P59+=B41;P59+=W7z;return dt[T0v](P59,config[d59][X59][x59][m59]);},className:V59,editor:q0z,formButtons:{text:function(editor){var M59=N5D;M59+=j4D;var a59=i6v;a59+=m9v;return editor[a59][H7z][M59];},action:function(e){var b59=p0D;b59+=K7z;this[b59]();}},formMessage:q0z,formOptions:{},formTitle:q0z,action:function(e,dt,node,config){var t41="Buttons";var i41="cells";var q41="essing";H2t.l2t();var S41='preOpen';var E59=U41;E59+=E7z;var j59=x7z;j59+=m7z;j59+=K7z;var T59=J6v;T59+=a3z;T59+=x7z;T59+=R6v;var J59=I7z;J59+=S9QQ[383646];J59+=L9z;J59+=t41;var s59=x7z;s59+=t7z;s59+=D7z;s59+=d7z;var n59=i9z;n59+=x7z;var f59=L6v;f59+=x1D;f59+=q41;var N59=X0z;N59+=e2v;N59+=j1z;var Y59=z8v;Y59+=j1z;var p59=Y7z;p59+=j2z;p59+=t7z;p59+=m8v;var v59=v2z;v59+=X1z;v59+=x1z;var I59=N2f;I59+=m8v;var that=this;var editor=config[H9f];var rows=dt[M5z]({selected:S0z})[I59]();var columns=dt[v59]({selected:S0z})[p59]();var cells=dt[i41]({selected:S0z})[b5z]();var items=columns[Y59] || cells[N59]?{rows:rows,columns:columns,cells:cells}:rows;this[f59](S0z);editor[n59](S41,function(){that[D1D](g0z);})[H7z](items,$[s59]({buttons:config[J59],message:config[T59] || editor[T0v][j59][I7D],title:config[E59] || editor[T0v][H7z][H5v],nest:S0z},config[V7D]));}},remove:{extend:h59,limitTo:[g41],text:function(dt,node,config){var r41='buttons.remove';H2t.a2t();var Q59=n2v;Q59+=t6f;var D59=f7z;D59+=x7z;D59+=m9z;D59+=o6f;return dt[T0v](r41,config[H9f][T0v][D59][Q59]);},className:k91,editor:q0z,formButtons:{text:function(editor){var F91="mov";var o59=e7f;o59+=C41;var K59=K3z;K59+=F91;K59+=x7z;var A59=Y7z;A59+=W41;return editor[A59][K59][o59];},action:function(e){this[I6v]();}},formMessage:function(editor,dt){var e91="onfirm";var P91="confi";var C59=W5z;C59+=I0z;C59+=K7z;C59+=V3z;var c59=T4v;c59+=Y7z;c59+=L9z;var W59=T4v;W59+=N41;var L59=W5z;L59+=I0z;L59+=K7z;L59+=V3z;var R59=S9QQ[465530];R59+=e91;var z59=T4v;z59+=Y7z;z59+=L9z;var y59=A6z;y59+=l9z;var w59=P91;w59+=f7z;w59+=m9z;var H59=Y7z;H59+=x9v;H59+=m9v;var rows=dt[M5z]({selected:S0z})[b5z]();var i18n=editor[H59][i2z];var question=typeof i18n[w59] === y59?i18n[z59]:i18n[R59][rows[L59]]?i18n[W59][rows[C6z]]:i18n[c59][A9z];return question[K6z](/%d/g,rows[C59]);},formOptions:{},formTitle:q0z,action:function(e,dt,node,config){var X91="age";var x91="preO";var d91="ormMe";var t59=K3z;t59+=N2v;t59+=o3z;t59+=x7z;var U59=Y7z;U59+=x9v;U59+=m9v;var B59=U41;B59+=E7z;var G59=I7z;G59+=d91;G59+=C9z;G59+=X91;H2t.l2t();var u59=Z9z;u59+=w1v;var Z59=f7z;Z59+=q1v;Z59+=o6f;var O59=x91;O59+=v5v;var l59=L6v;l59+=S9QQ[383646];l59+=n4D;var that=this;var editor=config[H9f];this[l59](S0z);editor[K7D](O59,function(){that[D1D](g0z);})[Z59](dt[u59]({selected:S0z})[b5z](),$[f6z]({buttons:config[z41],message:config[G59],title:config[B59] || editor[U59][t59][H5v],nest:S0z},config[V7D]));}}});_buttons[q59]=$[i59]({},_buttons[S59]);_buttons[m91][f6z]=g59;_buttons[V91]=$[r59]({},_buttons[i2z]);_buttons[k29][f6z]=F29;var Editor=(function(){var Y91="totyp";var a91="fe";var v91="internalSetti";var p91="ngs";var M91="ai";var P01="internalEvent";var o31="models";var I91="versio";var b91="2.0.";var d8z=l6f;d8z+=l9v;var P8z=R9D;P8z+=L9D;var e8z=z7z;e8z+=v4z;e8z+=a91;e8z+=N1z;var F8z=d3z;F8z+=M91;F8z+=f7z;F8z+=z7z;var k8z=v3z;k8z+=Z9z;k8z+=f7z;var r19=x3z;r19+=n2z;r19+=S8v;var g19=Q2v;g19+=A2v;g19+=z7z;var S19=b91;S19+=S9QQ[638361];var i19=I91;i19+=v7z;var q19=v91;q19+=p91;var B19=f4D;B19+=Y91;B19+=x7z;function Editor(init){var R31='<div data-dte-e="body_content" class="';var z31="body";var x31="_clos";var T91="nit.dt.dte";var h91="\"><div clas";var n31="ids";var c91="\"></";var m31="eR";var j31="_optionsUpdate";var p31="od";var H31='<div data-dte-e="processing" class="';var G31="nTable";var J91="iq";var M31="_asse";var i91="si";var A31="w' instance";var j91="nts";var l91="ta-dte-e=\"body\" class=\"";var J31="_blur";var E31="_multiInfo";var P31="_f";var S31='xhr.dt.dte';var s91="playController";var k01="Cannot ";var B31='i18n.dt.dte';var K91="m_info\" class=\"";var u91="mTable";var c31='<div data-dte-e="form_content" class="';var S91="estedOp";var R91="<div data-dte-e=\"foot\" ";var N91="ini";var w91="or\" class=";var Q91="></di";var b31="mbleM";var O31='<div data-dte-e="form_buttons" class="';var r91="dC";var E91="body_";var Z31='form_content';var v31="ov";var N31="splayN";var T31="_inline";var G91="tionNa";var L31='<form data-dte-e="form" class="';var z91="oter";var l31='"></div></div>';var U91="ucc";var f31="bubblePosition";var Y31="ifi";var f91="tEdi";var Z91="detac";var W31="tag";var F31="_for";var e31="_foc";var B91="_submitEr";var D91="s=\"";var y91="/form";var q91="proces";var F01="find display controller ";var C31='<div data-dte-e="head" class="';var A91="<div data-dte-e=\"for";var o91="<div data-dte-e";var Q31="sed as a 'ne";var V31="_clearD";var I31="ubm";var d31="ieldNames";var O91="uniq";var K31="idSrc";var k31="_messa";var y31='"><span></span></div>';var W91="</di";var L91="class=\"";var n91="gger";var H91="=\"form_err";var a31="ynam";var C91="<div da";var t91="_noProc";var X31="_dataSo";var s31="_ajax";var e01='initComplete';var D31="aTables Editor must be initiali";var g91="_neste";var h31="_weakInArray";var w31="indicator";var u19=N91;u19+=f91;u19+=N7z;u19+=f7z;var Z19=r1D;Z19+=n91;var O19=F9D;O19+=x7z;O19+=v7z;O19+=K7z;var l19=d7z;l19+=Y7z;l19+=m8D;l19+=j3z;var C19=l6f;C19+=s91;var z19=S9QQ[383646];z19+=v7z;var o19=T3z;o19+=J91;o19+=P3z;o19+=x7z;var Q19=Y7z;Q19+=T91;var D19=S9QQ[383646];D19+=v7z;var h19=i5z;h19+=d8D;h19+=z7z;var E19=d7z;E19+=S9QQ[383646];E19+=m9z;var s19=x7z;s19+=o3z;s19+=x7z;s19+=j91;var n19=f4D;n19+=y41;n19+=l9z;var f19=E91;f19+=S9QQ[465530];f19+=K4v;f19+=J9v;var N19=M0D;N19+=K7z;var Y19=y7f;Y19+=T4z;Y19+=Z6v;Y19+=q6v;var p19=n2v;p19+=v4D;var v19=I7z;v19+=S9QQ[383646];v19+=f7z;v19+=m9z;var I19=h91;I19+=D91;var b19=F9v;b19+=M9D;b19+=x7z;b19+=f7z;var M19=J6z;M19+=Q91;M19+=o3z;M19+=l6v;var a19=Y7z;a19+=v7z;a19+=I7z;a19+=S9QQ[383646];var V19=I7z;V19+=b7z;V19+=m9z;var m19=A91;m19+=K91;var x19=L5D;x19+=Z6v;x19+=d7z;x19+=G6v;var X19=v3z;X19+=f7z;X19+=b7z;var d19=o91;d19+=H91;d19+=w91;d19+=J6z;var P19=T4z;P19+=y91;P19+=l6v;var e19=T4z;e19+=W5D;e19+=Y7z;e19+=E4z;var F19=J6z;F19+=l6v;var k19=F0v;k19+=P9v;var r29=p9z;r29+=z91;var g29=R91;g29+=L91;var S29=W91;S29+=o3z;S29+=l6v;var i29=c91;i29+=d7z;i29+=G6v;var q29=S9QQ[465530];q29+=V0D;q29+=v7z;q29+=K7z;var t29=C91;t29+=l91;var U29=O91;U29+=P3z;U29+=x7z;var B29=Z91;B29+=V3z;var G29=l7z;G29+=O3D;G29+=X0z;G29+=S1v;var u29=v4z;u29+=b1v;u29+=v4z;u29+=t7z;var Z29=N8D;Z29+=u91;var O29=i8v;O29+=G91;O29+=m9z;O29+=x7z;var l29=n7z;l29+=K7z;l29+=V9v;l29+=p91;var C29=N2v;C29+=d7z;C29+=h9z;C29+=z7z;var c29=x7z;c29+=v5f;var L29=B91;L29+=J9z;var R29=c6f;R29+=c8f;R29+=U91;R29+=T1D;var z29=t91;z29+=T1D;z29+=l9z;var y29=A9z;y29+=q91;y29+=i91;y29+=F4D;var w29=A9z;w29+=v7z;w29+=S91;w29+=t9z;var H29=g91;H29+=r91;H29+=E0v;var o29=k31;o29+=r9z;var K29=F31;K29+=m9z;K29+=p3f;var A29=e31;A29+=P3z;A29+=z7z;var Q29=P31;Q29+=d31;var D29=F9D;D29+=J9v;D29+=Z2v;D29+=K2z;var h29=X31;h29+=p6v;h29+=q7D;var E29=x31;E29+=m31;E29+=x7z;E29+=I0z;var j29=V31;j29+=a31;j29+=d6v;j29+=k1D;var T29=M31;T29+=b31;T29+=w7D;var J29=o3z;J29+=v4z;J29+=X0z;var s29=z7z;s29+=I31;s29+=M7z;var n29=N4D;n29+=S9QQ[383646];n29+=d0z;var f29=n7z;f29+=K7z;var N29=K3z;N29+=m9z;N29+=v31;N29+=x7z;var Y29=S9QQ[383646];Y29+=G1z;Y29+=v7z;var p29=S9QQ[383646];p29+=I7z;p29+=I7z;var v29=m9z;v29+=p31;v29+=Y31;v29+=v3z;var I29=m9z;I29+=S9QQ[383646];I29+=d7z;I29+=x7z;var b29=N2D;b29+=f2D;var M29=V3z;M29+=R1z;M29+=x7z;var a29=I0z;a29+=x7z;a29+=K7z;var V29=i5z;V29+=h9z;V29+=q1z;var m29=I7z;m29+=Y7z;m29+=x7z;m29+=S8v;var x29=m7z;x29+=N31;x29+=q5z;var X29=T3z;X29+=d7z;X29+=x7z;X29+=a1v;var d29=S9QQ[624975];d29+=P3z;d29+=x7f;d29+=x7z;var P29=S9QQ[624975];P29+=X0z;P29+=P3z;P29+=f7z;var e29=v4z;e29+=d7z;e29+=d7z;var _this=this;this[e29]=add;this[J1z]=ajax;this[l4v]=background;this[P29]=blur;this[d29]=bubble;this[f31]=bubblePosition;this[z5v]=buttons;this[t1v]=clear;this[g9v]=close;this[m7D]=create;this[X29]=undependent;this[p1v]=dependent;this[C2v]=destroy;this[j81]=disable;this[e4D]=display;this[x8D]=displayed;this[x29]=displayNode;this[H7z]=edit;this[Y8D]=enable;this[p5z]=error$1;this[m29]=field;this[V29]=fields;this[H8D]=file;this[Q8D]=files;this[a29]=get;this[M29]=hide;this[n31]=ids;this[c8D]=inError;this[b29]=inline;this[l41]=inlineCreate;this[I7D]=message;this[I29]=mode;this[v29]=modifier;this[J7D]=multiGet;this[e6v]=multiSet;this[N5z]=node;this[p29]=off;this[i9z]=on;this[K7D]=one;this[Y29]=open;this[l0v]=order;this[N29]=remove;this[f29]=set;this[n29]=show;this[s29]=submit;this[q2z]=table;this[A4D]=template;this[H5v]=title;this[J29]=val;this[g2v]=_actionClass;this[s31]=_ajax;this[u3v]=_animate;this[T29]=_assembleMain;this[J31]=_blur;this[j29]=_clearDynamicInfo;this[B2v]=_close;this[E29]=_closeReg;this[S2v]=_crudArgs;this[h29]=_dataSource;this[C0v]=_displayReorder;this[a8D]=_edit;this[C5v]=_event;this[D29]=_eventName;this[x5D]=_fieldFromNode;this[Q29]=_fieldNames;this[A29]=_focus;this[K29]=_formOptions;this[T31]=_inline;this[j31]=_optionsUpdate;this[o29]=_message;this[E31]=_multiInfo;this[H29]=_nestedClose;this[w29]=_nestedOpen;this[B5v]=_postopen;this[y5D]=_preopen;this[y29]=_processing;this[z29]=_noProcessing;this[o1D]=_submit;this[b8f]=_submitTable;this[R29]=_submitSuccess;this[L29]=_submitError;this[D6v]=_tidy;this[h31]=_weakInArray;if(!(this instanceof Editor)){var W29=p5f;W29+=D31;W29+=Q31;W29+=A31;alert(W29);}init=$[c29](S0z,{},Editor[a41],init);this[z7z]=$[f6z](S0z,{},Editor[C29][l29],{actionName:init[O29],table:init[Z29] || init[q2z],ajax:init[u29],idSrc:init[K31],formOptions:init[V7D],template:init[G29]?$(init[A4D])[B29]():q0z});this[i0v]=$[f6z](S0z,{},Editor[i0v]);this[T0v]=init[T0v];Editor[o31][G6z][U29]++;var that=this;var classes=this[i0v];var wrapper=$(j5v + classes[n4v] + E5v + H31 + classes[D1D][w31] + y31 + t29 + classes[z31][n4v] + E5v + R31 + classes[z31][q29] + i29 + S29 + g29 + classes[r29][k19] + F19 + j5v + classes[E5f][f9v] + h5v + n3v + e19);var form=$(L31 + classes[J6v][W31] + E5v + c31 + classes[J6v][f9v] + h5v + P19);this[h4v]={wrapper:wrapper[Y8z],form:form[Y8z],formError:$(d19 + classes[J6v][X19] + x19)[Y8z],formInfo:$(m19 + classes[V19][a19] + M19)[Y8z],header:$(C31 + classes[d4v][b19] + I19 + classes[d4v][f9v] + l31)[Y8z],buttons:$(O31 + classes[v19][p19] + Y19)[Y8z],formContent:el(Z31,form)[Y8z],footer:el(N19,wrapper)[Y8z],body:el(Y9v,wrapper)[Y8z],bodyContent:el(f19,wrapper)[Y8z],processing:el(n19,wrapper)[Y8z]};$[Q5z](init[s19],function(evt,fn){var J19=S9QQ[383646];H2t.l2t();J19+=v7z;that[J19](evt,function(){var u31="ift";var j19=N4D;H2t.l2t();j19+=u31;var T19=z7z;T19+=X0z;T19+=v6D;var args=Array[S7D][T19][S1z](arguments);args[j19]();fn[s5v](that,args);});});this[E19];var table$1=this[z7z][q2z];if(init[h19]){this[r6z](init[C2z]);}$(document)[D19](Q19 + this[z7z][k8D],function(e,settings,json){var A19=K7z;A19+=P4v;H2t.a2t();A19+=E7z;if(_this[z7z][A19] && settings[G31] === $(table$1)[Y8z]){var K19=t9f;K19+=Z9f;settings[K19]=_this;}})[i9z](B31 + this[z7z][o19],function(e,settings){var i31="oLanguage";var U31="nT";var t31="oL";H2t.a2t();var q31="guage";var w19=U31;w19+=v4z;w19+=S9QQ[624975];w19+=E7z;var H19=I5z;H19+=Y2z;if(_this[z7z][H19] && settings[w19] === $(table$1)[Y8z]){var y19=t31;y19+=h6v;y19+=q31;if(settings[y19][H9f]){$[f6z](S0z,_this[T0v],settings[i31][H9f]);}}})[z19](S31 + this[z7z][k8D],function(e,settings,json){var r31="tionsUpdate";var g31="_op";var R19=E1z;R19+=X0z;R19+=x7z;if(json && _this[z7z][R19] && settings[G31] === $(table$1)[Y8z]){var L19=g31;L19+=r31;_this[L19](json);}});if(!Editor[e4D][init[e4D]]){var c19=d7z;c19+=Y7z;c19+=z7z;c19+=l9v;var W19=k01;W19+=F01;throw new Error(W19 + init[c19]);}this[z7z][C19]=Editor[e4D][init[l19]][X4D](this);this[O19](e01,[]);$(document)[Z19](u19,[this]);}Editor[S7D][P01]=function(name,args){var G19=A9z;G19+=t5v;G19+=t9z;G19+=K7z;this[G19](name,args);};Editor[B19][Z1f]=function(){var U19=Y7z;U19+=x9v;U19+=S9QQ[405994];U19+=v7z;return this[U19];};Editor[S7D][m41]=function(){H2t.a2t();var d01="ultiInfo";var t19=H2f;t19+=d01;return this[t19]();};Editor[S7D][q19]=function(){H2t.l2t();return this[z7z];};Editor[u1f]={checkbox:checkbox,datatable:datatable,datetime:datetime,hidden:hidden,password:password,radio:radio,readonly:readonly,select:select,text:text,textarea:textarea,upload:upload,uploadMany:uploadMany};Editor[Q8D]={};Editor[i19]=S19;Editor[g19]=classNames;Editor[r19]=Field;Editor[E0f]=q0z;Editor[k8z]=error;Editor[F8z]=pairs;Editor[e8z]=function(id){return safeDomId(id,c0z);};Editor[P8z]=upload$1;Editor[a41]=defaults$1;Editor[o31]={button:button,displayController:displayController,fieldType:fieldType,formOptions:formOptions,settings:settings};Editor[c0D]={dataTable:dataSource$1,html:dataSource};Editor[d8z]={envelope:envelope,lightbox:self};return Editor;})();DataTable[X8z]=Editor;$[x8z][i6z][m8z]=Editor;if(DataTable[E0f]){var a8z=p5f;a8z+=x7z;a8z+=X01;var V8z=p5f;V8z+=x7z;V8z+=X01;Editor[V8z]=DataTable[a8z];}if(DataTable[o7z][M8z]){var v8z=O6z;v8z+=x01;v8z+=t5z;var I8z=x7z;I8z+=t7z;I8z+=K7z;var b8z=i5z;b8z+=h9z;b8z+=m01;b8z+=z7z;$[f6z](Editor[b8z],DataTable[I8z][v8z]);}DataTable[o7z][V01]=Editor[p8z];return Editor;});

/*! DataTables styling integration for DataTables' Editor
 * ©SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';

return $.fn.dataTable.Editor;

}));


/*! Buttons for DataTables 2.0.1
 * ©2016-2021 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Used for namespacing events added to the document by each instance, so they
// can be removed on destroy
var _instCounter = 0;

// Button namespacing counter for namespacing events on individual buttons
var _buttonCounter = 0;

var _dtButtons = DataTable.ext.buttons;

// Allow for jQuery slim
function _fadeIn(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeIn( duration, fn );

	}
	else {
		el.css('display', 'block');

		if (fn) {
			fn.call(el);
		}
	}
}

function _fadeOut(el, duration, fn) {
	if ($.fn.animate) {
		el
			.stop()
			.fadeOut( duration, fn );
	}
	else {
		el.css('display', 'none');
		
		if (fn) {
			fn.call(el);
		}
	}
}

/**
 * [Buttons description]
 * @param {[type]}
 * @param {[type]}
 */
var Buttons = function( dt, config )
{
	// If not created with a `new` keyword then we return a wrapper function that
	// will take the settings object for a DT. This allows easy use of new instances
	// with the `layout` option - e.g. `topLeft: $.fn.dataTable.Buttons( ... )`.
	if ( !(this instanceof Buttons) ) {
		return function (settings) {
			return new Buttons( settings, dt ).container();
		};
	}

	// If there is no config set it to an empty object
	if ( typeof( config ) === 'undefined' ) {
		config = {};	
	}
	
	// Allow a boolean true for defaults
	if ( config === true ) {
		config = {};
	}

	// For easy configuration of buttons an array can be given
	if ( Array.isArray( config ) ) {
		config = { buttons: config };
	}

	this.c = $.extend( true, {}, Buttons.defaults, config );

	// Don't want a deep copy for the buttons
	if ( config.buttons ) {
		this.c.buttons = config.buttons;
	}

	this.s = {
		dt: new DataTable.Api( dt ),
		buttons: [],
		listenKeys: '',
		namespace: 'dtb'+(_instCounter++)
	};

	this.dom = {
		container: $('<'+this.c.dom.container.tag+'/>')
			.addClass( this.c.dom.container.className )
	};

	this._constructor();
};


$.extend( Buttons.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public methods
	 */

	/**
	 * Get the action of a button
	 * @param  {int|string} Button index
	 * @return {function}
	 *//**
	 * Set the action of a button
	 * @param  {node} node Button element
	 * @param  {function} action Function to set
	 * @return {Buttons} Self for chaining
	 */
	action: function ( node, action )
	{
		var button = this._nodeToButton( node );

		if ( action === undefined ) {
			return button.conf.action;
		}

		button.conf.action = action;

		return this;
	},

	/**
	 * Add an active class to the button to make to look active or get current
	 * active state.
	 * @param  {node} node Button element
	 * @param  {boolean} [flag] Enable / disable flag
	 * @return {Buttons} Self for chaining or boolean for getter
	 */
	active: function ( node, flag ) {
		var button = this._nodeToButton( node );
		var klass = this.c.dom.button.active;
		var jqNode = $(button.node);

		if ( flag === undefined ) {
			return jqNode.hasClass( klass );
		}

		jqNode.toggleClass( klass, flag === undefined ? true : flag );

		return this;
	},

	/**
	 * Add a new button
	 * @param {object} config Button configuration object, base string name or function
	 * @param {int|string} [idx] Button index for where to insert the button
	 * @return {Buttons} Self for chaining
	 */
	add: function ( config, idx )
	{
		var buttons = this.s.buttons;

		if ( typeof idx === 'string' ) {
			var split = idx.split('-');
			var base = this.s;

			for ( var i=0, ien=split.length-1 ; i<ien ; i++ ) {
				base = base.buttons[ split[i]*1 ];
			}

			buttons = base.buttons;
			idx = split[ split.length-1 ]*1;
		}

		this._expandButton(
			buttons,
			config,
			config !== undefined ? config.split : undefined,
			(config === undefined || config.split === undefined || config.split.length === 0) && base !== undefined,
			false,
			idx );
		this._draw();

		return this;
	},

	/**
	 * Clear buttons from a collection and then insert new buttons
	 */
	collectionRebuild: function ( node, newButtons )
	{
		var button = this._nodeToButton( node );
		
		if(newButtons !== undefined) {
			var i;
			// Need to reverse the array
			for (i=button.buttons.length-1; i>=0; i--) {
				this.remove(button.buttons[i].node);
			}
	
			for (i=0; i<newButtons.length; i++) {
				this._expandButton(
					button.buttons,
					newButtons[i],
					newButtons[i] !== undefined && newButtons[i].config !== undefined && newButtons[i].config.split !== undefined,
					true,
					newButtons[i].parentConf !== undefined && newButtons[i].parentConf.split !== undefined,
					i,
					newButtons[i].parentConf
				);
			}
		}

		this._draw(button.collection, button.buttons);
	},

	/**
	 * Get the container node for the buttons
	 * @return {jQuery} Buttons node
	 */
	container: function ()
	{
		return this.dom.container;
	},

	/**
	 * Disable a button
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	disable: function ( node ) {
		var button = this._nodeToButton( node );

		$(button.node)
			.addClass( this.c.dom.button.disabled )
			.attr('disabled', true);

		return this;
	},

	/**
	 * Destroy the instance, cleaning up event handlers and removing DOM
	 * elements
	 * @return {Buttons} Self for chaining
	 */
	destroy: function ()
	{
		// Key event listener
		$('body').off( 'keyup.'+this.s.namespace );

		// Individual button destroy (so they can remove their own events if
		// needed). Take a copy as the array is modified by `remove`
		var buttons = this.s.buttons.slice();
		var i, ien;
		
		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.remove( buttons[i].node );
		}

		// Container
		this.dom.container.remove();

		// Remove from the settings object collection
		var buttonInsts = this.s.dt.settings()[0];

		for ( i=0, ien=buttonInsts.length ; i<ien ; i++ ) {
			if ( buttonInsts.inst === this ) {
				buttonInsts.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	/**
	 * Enable / disable a button
	 * @param  {node} node Button node
	 * @param  {boolean} [flag=true] Enable / disable flag
	 * @return {Buttons} Self for chaining
	 */
	enable: function ( node, flag )
	{
		if ( flag === false ) {
			return this.disable( node );
		}

		var button = this._nodeToButton( node );
		$(button.node)
			.removeClass( this.c.dom.button.disabled )
			.removeAttr('disabled');

		return this;
	},

	/**
	 * Get the instance name for the button set selector
	 * @return {string} Instance name
	 */
	name: function ()
	{
		return this.c.name;
	},

	/**
	 * Get a button's node of the buttons container if no button is given
	 * @param  {node} [node] Button node
	 * @return {jQuery} Button element, or container
	 */
	node: function ( node )
	{
		if ( ! node ) {
			return this.dom.container;
		}

		var button = this._nodeToButton( node );
		return $(button.node);
	},

	/**
	 * Set / get a processing class on the selected button
	 * @param {element} node Triggering button node
	 * @param  {boolean} flag true to add, false to remove, undefined to get
	 * @return {boolean|Buttons} Getter value or this if a setter.
	 */
	processing: function ( node, flag )
	{
		var dt = this.s.dt;
		var button = this._nodeToButton( node );

		if ( flag === undefined ) {
			return $(button.node).hasClass( 'processing' );
		}

		$(button.node).toggleClass( 'processing', flag );

		$(dt.table().node()).triggerHandler( 'buttons-processing.dt', [
			flag, dt.button( node ), dt, $(node), button.conf
		] );

		return this;
	},

	/**
	 * Remove a button.
	 * @param  {node} node Button node
	 * @return {Buttons} Self for chaining
	 */
	remove: function ( node )
	{
		var button = this._nodeToButton( node );
		var host = this._nodeToHost( node );
		var dt = this.s.dt;

		// Remove any child buttons first
		if ( button.buttons.length ) {
			for ( var i=button.buttons.length-1 ; i>=0 ; i-- ) {
				this.remove( button.buttons[i].node );
			}
		}

		button.conf.destroying = true;

		// Allow the button to remove event handlers, etc
		if ( button.conf.destroy ) {
			button.conf.destroy.call( dt.button(node), dt, $(node), button.conf );
		}

		this._removeKey( button.conf );

		$(button.node).remove();

		var idx = $.inArray( button, host );
		host.splice( idx, 1 );

		return this;
	},

	/**
	 * Get the text for a button
	 * @param  {int|string} node Button index
	 * @return {string} Button text
	 *//**
	 * Set the text for a button
	 * @param  {int|string|function} node Button index
	 * @param  {string} label Text
	 * @return {Buttons} Self for chaining
	 */
	text: function ( node, label )
	{
		var button = this._nodeToButton( node );
		var buttonLiner = this.c.dom.collection.buttonLiner;
		var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
			buttonLiner.tag :
			this.c.dom.buttonLiner.tag;
		var dt = this.s.dt;
		var jqNode = $(button.node);
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, jqNode, button.conf ) :
				opt;
		};

		if ( label === undefined ) {
			return text( button.conf.text );
		}

		button.conf.text = label;

		if ( linerTag ) {
			jqNode
				.children( linerTag )
				.filter(':not(.dt-down-arrow)')
				.html( text(label) );
		}
		else {
			jqNode.html( text(label) );
		}

		return this;
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Buttons constructor
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtSettings = dt.settings()[0];
		var buttons =  this.c.buttons;

		if ( ! dtSettings._buttons ) {
			dtSettings._buttons = [];
		}

		dtSettings._buttons.push( {
			inst: this,
			name: this.c.name
		} );

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			this.add( buttons[i] );
		}

		dt.on( 'destroy', function ( e, settings ) {
			if ( settings === dtSettings ) {
				that.destroy();
			}
		} );

		// Global key event binding to listen for button keys
		$('body').on( 'keyup.'+this.s.namespace, function ( e ) {
			if ( ! document.activeElement || document.activeElement === document.body ) {
				// SUse a string of characters for fast lookup of if we need to
				// handle this
				var character = String.fromCharCode(e.keyCode).toLowerCase();

				if ( that.s.listenKeys.toLowerCase().indexOf( character ) !== -1 ) {
					that._keypress( character, e );
				}
			}
		} );
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Add a new button to the key press listener
	 * @param {object} conf Resolved button configuration object
	 * @private
	 */
	_addKey: function ( conf )
	{
		if ( conf.key ) {
			this.s.listenKeys += $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;
		}
	},

	/**
	 * Insert the buttons into the container. Call without parameters!
	 * @param  {node} [container] Recursive only - Insert point
	 * @param  {array} [buttons] Recursive only - Buttons array
	 * @private
	 */
	_draw: function ( container, buttons )
	{
		if ( ! container ) {
			container = this.dom.container;
			buttons = this.s.buttons;
		}

		container.children().detach();

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			container.append( buttons[i].inserter );
			container.append( ' ' );

			if ( buttons[i].buttons && buttons[i].buttons.length ) {
				this._draw( buttons[i].collection, buttons[i].buttons );
			}
		}
	},

	/**
	 * Create buttons from an array of buttons
	 * @param  {array} attachTo Buttons array to attach to
	 * @param  {object} button Button definition
	 * @param  {boolean} inCollection true if the button is in a collection
	 * @private
	 */
	_expandButton: function ( attachTo, button, split, inCollection, inSplit, attachPoint, parentConf )
	{
		var dt = this.s.dt;
		var buttonCounter = 0;
		var isSplit = false;
		var buttons = ! Array.isArray( button ) ?
			[ button ] :
			button;
		
		if(button === undefined ) {
			buttons = !Array.isArray(split) ?
				[ split ] :
				split;
		}

		if (button !== undefined && button.split !== undefined) {
			isSplit = true;
		}
			
		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			var conf = this._resolveExtends( buttons[i] );

			if ( ! conf ) {
				continue;
			}

			if( conf.config !== undefined && conf.config.split) {
				isSplit = true;
			}
			else {
				isSplit = false;
			}
			
			// If the configuration is an array, then expand the buttons at this
			// point
			if ( Array.isArray( conf ) ) {
				this._expandButton( attachTo, conf, built !== undefined && built.conf !== undefined ? built.conf.split : undefined, inCollection, parentConf !== undefined && parentConf.split !== undefined, attachPoint, parentConf );
				continue;
			}

			var built = this._buildButton( conf, inCollection, conf.split !== undefined || (conf.config !== undefined && conf.config.split !== undefined), inSplit );
			if ( ! built ) {
				continue;
			}

			if ( attachPoint !== undefined && attachPoint !== null ) {
				attachTo.splice( attachPoint, 0, built );
				attachPoint++;
			}
			else {
				attachTo.push( built );
			}

			
			if ( built.conf.buttons || built.conf.split ) {
				built.collection = $('<'+(isSplit ? this.c.dom.splitCollection.tag : this.c.dom.collection.tag)+'/>');

				built.conf._collection = built.collection;

				if(built.conf.split) {
					for(var j = 0; j < built.conf.split.length; j++) {
						if(typeof built.conf.split[j] === "object") {
							built.conf.split[i].parent = parentConf;
							if(built.conf.split[j].collectionLayout === undefined) {
								built.conf.split[j].collectionLayout = built.conf.collectionLayout;
							}
							if(built.conf.split[j].dropup === undefined) {
								built.conf.split[j].dropup = built.conf.dropup;
							}
							if(built.conf.split[j].fade === undefined) {
								built.conf.split[j].fade = built.conf.fade;
							}
						}
					}
				}
				else {
					$(built.node).append($('<span class="dt-down-arrow">'+this.c.dom.splitDropdown.text+'</span>'))
				}

				this._expandButton( built.buttons, built.conf.buttons, built.conf.split, !isSplit, isSplit, attachPoint, built.conf );
			}
			built.conf.parent = parentConf;

			// init call is made here, rather than buildButton as it needs to
			// be selectable, and for that it needs to be in the buttons array
			if ( conf.init ) {
				conf.init.call( dt.button( built.node ), dt, $(built.node), conf );
			}

			buttonCounter++;
		}
	},

	/**
	 * Create an individual button
	 * @param  {object} config            Resolved button configuration
	 * @param  {boolean} inCollection `true` if a collection button
	 * @return {jQuery} Created button node (jQuery)
	 * @private
	 */
	_buildButton: function ( config, inCollection, isSplit, inSplit )
	{
		var buttonDom = this.c.dom.button;
		var linerDom = this.c.dom.buttonLiner;
		var collectionDom = this.c.dom.collection;
		var splitDom = this.c.dom.split;
		var splitCollectionDom = this.c.dom.splitCollection;
		var splitDropdownButton = this.c.dom.splitDropdownButton;
		var dt = this.s.dt;
		var text = function ( opt ) {
			return typeof opt === 'function' ?
				opt( dt, button, config ) :
				opt;
		};

		if ( !isSplit && inSplit && splitCollectionDom ) {
			buttonDom = splitDropdownButton;
		}
		else if ( !isSplit && inCollection && collectionDom.button ) {
			buttonDom = collectionDom.button;
		} 

		if ( !isSplit && inSplit && splitCollectionDom.buttonLiner ) {
			linerDom = splitCollectionDom.buttonLiner
		}
		else if ( !isSplit && inCollection && collectionDom.buttonLiner ) {
			linerDom = collectionDom.buttonLiner;
		}

		// Make sure that the button is available based on whatever requirements
		// it has. For example, PDF button require pdfmake
		if ( config.available && ! config.available( dt, config ) && !config.hasOwnProperty('html') ) {
			return false;
		}

		var button;
		if(!config.hasOwnProperty('html')) {
			var action = function ( e, dt, button, config ) {
				config.action.call( dt.button( button ), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
			};

			var tag = config.tag || buttonDom.tag;
			var clickBlurs = config.clickBlurs === undefined ? false : config.clickBlurs
			button = $('<'+tag+'/>')
				.addClass( buttonDom.className )
				.addClass( inSplit ? this.c.dom.splitDropdownButton.className : '')
				.attr( 'tabindex', this.s.dt.settings()[0].iTabIndex )
				.attr( 'aria-controls', this.s.dt.table().node().id )
				.on( 'click.dtb', function (e) {
					e.preventDefault();
	
					if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
						action( e, dt, button, config );
					}
					if( clickBlurs ) {
						button.trigger('blur');
					}
				} )
				.on( 'keyup.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						if ( ! button.hasClass( buttonDom.disabled ) && config.action ) {
							action( e, dt, button, config );
						}
					}
				} );
	
			// Make `a` tags act like a link
			if ( tag.toLowerCase() === 'a' ) {
				button.attr( 'href', '#' );
			}
	
			// Button tags should have `type=button` so they don't have any default behaviour
			if ( tag.toLowerCase() === 'button' ) {
				button.attr( 'type', 'button' );
			}
	
			if ( linerDom.tag ) {
				var liner = $('<'+linerDom.tag+'/>')
					.html( text( config.text ) )
					.addClass( linerDom.className );
	
				if ( linerDom.tag.toLowerCase() === 'a' ) {
					liner.attr( 'href', '#' );
				}
	
				button.append( liner );
			}
			else {
				button.html( text( config.text ) );
			}
	
			if ( config.enabled === false ) {
				button.addClass( buttonDom.disabled );
			}
	
			if ( config.className ) {
				button.addClass( config.className );
			}
	
			if ( config.titleAttr ) {
				button.attr( 'title', text( config.titleAttr ) );
			}
	
			if ( config.attr ) {
				button.attr( config.attr );
			}
	
			if ( ! config.namespace ) {
				config.namespace = '.dt-button-'+(_buttonCounter++);
			}

			if  ( config.config !== undefined && config.config.split ) {
				config.split = config.config.split;
			}
		}
		else {
			button = $(config.html)
		}
	
		var buttonContainer = this.c.dom.buttonContainer;
		var inserter;
		if ( buttonContainer && buttonContainer.tag ) {
			inserter = $('<'+buttonContainer.tag+'/>')
				.addClass( buttonContainer.className )
				.append( button );
		}
		else {
			inserter = button;
		}

		this._addKey( config );

		// Style integration callback for DOM manipulation
		// Note that this is _not_ documented. It is currently
		// for style integration only
		if( this.c.buttonCreated ) {
			inserter = this.c.buttonCreated( config, inserter );
		}

		var splitDiv;
		if(isSplit) {
			splitDiv = $('<div/>').addClass(this.c.dom.splitWrapper.className)
			splitDiv.append(button);
			var dropButtonConfig = $.extend(config, {
				text: this.c.dom.splitDropdown.text,
				className: this.c.dom.splitDropdown.className,
				attr: {
					'aria-haspopup': true,
					'aria-expanded': false
				},
				align: this.c.dom.splitDropdown.align,
				splitAlignClass: this.c.dom.splitDropdown.splitAlignClass
				
			})

			this._addKey(dropButtonConfig);

			var splitAction = function ( e, dt, button, config ) {
				_dtButtons.split.action.call( dt.button($('div.dt-btn-split-wrapper')[0] ), e, dt, button, config );
	
				$(dt.table().node()).triggerHandler( 'buttons-action.dt', [
					dt.button( button ), dt, button, config 
				] );
				button.attr('aria-expanded', true)
			};
			
			var dropButton = $('<button class="' + this.c.dom.splitDropdown.className + ' dt-button"><span class="dt-btn-split-drop-arrow">'+this.c.dom.splitDropdown.text+'</span></button>')
				.on( 'click.dtb', function (e) {
					e.preventDefault();
					e.stopPropagation();

					if ( ! dropButton.hasClass( buttonDom.disabled ) && dropButtonConfig.action ) {
						splitAction( e, dt, dropButton, dropButtonConfig );
					}
					if ( clickBlurs ) {
						dropButton.trigger('blur');
					}
				} )
				.on( 'keyup.dtb', function (e) {
					if ( e.keyCode === 13 ) {
						if ( ! dropButton.hasClass( buttonDom.disabled ) && dropButtonConfig.action ) {
							splitAction( e, dt, dropButton, dropButtonConfig );
						}
					}
				} );

			if(config.split.length === 0) {
				dropButton.addClass('dtb-hide-drop');
			}

			splitDiv.append(dropButton).attr(dropButtonConfig.attr);
		}

		return {
			conf:         config,
			node:         isSplit ? splitDiv.get(0) : button.get(0),
			inserter:     isSplit ? splitDiv : inserter,
			buttons:      [],
			inCollection: inCollection,
			isSplit:	  isSplit,
			inSplit:	  inSplit,
			collection:   null
		};
	},

	/**
	 * Get the button object from a node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {object} Button object
	 * @private
	 */
	_nodeToButton: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons[i];
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToButton( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Get container array for a button from a button node (recursive)
	 * @param  {node} node Button node
	 * @param  {array} [buttons] Button array, uses base if not defined
	 * @return {array} Button's host array
	 * @private
	 */
	_nodeToHost: function ( node, buttons )
	{
		if ( ! buttons ) {
			buttons = this.s.buttons;
		}

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			if ( buttons[i].node === node ) {
				return buttons;
			}

			if ( buttons[i].buttons.length ) {
				var ret = this._nodeToHost( node, buttons[i].buttons );

				if ( ret ) {
					return ret;
				}
			}
		}
	},

	/**
	 * Handle a key press - determine if any button's key configured matches
	 * what was typed and trigger the action if so.
	 * @param  {string} character The character pressed
	 * @param  {object} e Key event that triggered this call
	 * @private
	 */
	_keypress: function ( character, e )
	{
		// Check if this button press already activated on another instance of Buttons
		if ( e._buttonsHandled ) {
			return;
		}

		var run = function ( conf, node ) {
			if ( ! conf.key ) {
				return;
			}

			if ( conf.key === character ) {
				e._buttonsHandled = true;
				$(node).click();
			}
			else if ( $.isPlainObject( conf.key ) ) {
				if ( conf.key.key !== character ) {
					return;
				}

				if ( conf.key.shiftKey && ! e.shiftKey ) {
					return;
				}

				if ( conf.key.altKey && ! e.altKey ) {
					return;
				}

				if ( conf.key.ctrlKey && ! e.ctrlKey ) {
					return;
				}

				if ( conf.key.metaKey && ! e.metaKey ) {
					return;
				}

				// Made it this far - it is good
				e._buttonsHandled = true;
				$(node).click();
			}
		};

		var recurse = function ( a ) {
			for ( var i=0, ien=a.length ; i<ien ; i++ ) {
				run( a[i].conf, a[i].node );

				if ( a[i].buttons.length ) {
					recurse( a[i].buttons );
				}
			}
		};

		recurse( this.s.buttons );
	},

	/**
	 * Remove a key from the key listener for this instance (to be used when a
	 * button is removed)
	 * @param  {object} conf Button configuration
	 * @private
	 */
	_removeKey: function ( conf )
	{
		if ( conf.key ) {
			var character = $.isPlainObject( conf.key ) ?
				conf.key.key :
				conf.key;

			// Remove only one character, as multiple buttons could have the
			// same listening key
			var a = this.s.listenKeys.split('');
			var idx = $.inArray( character, a );
			a.splice( idx, 1 );
			this.s.listenKeys = a.join('');
		}
	},

	/**
	 * Resolve a button configuration
	 * @param  {string|function|object} conf Button config to resolve
	 * @return {object} Button configuration
	 * @private
	 */
	_resolveExtends: function ( conf )
	{
		var dt = this.s.dt;
		var i, ien;
		var toConfObject = function ( base ) {
			var loop = 0;

			// Loop until we have resolved to a button configuration, or an
			// array of button configurations (which will be iterated
			// separately)
			while ( ! $.isPlainObject(base) && ! Array.isArray(base) ) {
				if ( base === undefined ) {
					return;
				}

				if ( typeof base === 'function' ) {
					base = base( dt, conf );

					if ( ! base ) {
						return false;
					}
				}
				else if ( typeof base === 'string' ) {
					if ( ! _dtButtons[ base ] ) {
						return {html: base}
					}

					base = _dtButtons[ base ];
				}

				loop++;
				if ( loop > 30 ) {
					// Protect against misconfiguration killing the browser
					throw 'Buttons: Too many iterations';
				}
			}

			return Array.isArray( base ) ?
				base :
				$.extend( {}, base );
		};

		conf = toConfObject( conf );

		while ( conf && conf.extend ) {
			// Use `toConfObject` in case the button definition being extended
			// is itself a string or a function
			if ( ! _dtButtons[ conf.extend ] ) {
				throw 'Cannot extend unknown button type: '+conf.extend;
			}

			var objArray = toConfObject( _dtButtons[ conf.extend ] );
			if ( Array.isArray( objArray ) ) {
				return objArray;
			}
			else if ( ! objArray ) {
				// This is a little brutal as it might be possible to have a
				// valid button without the extend, but if there is no extend
				// then the host button would be acting in an undefined state
				return false;
			}

			// Stash the current class name
			var originalClassName = objArray.className;

			if (conf.config !== undefined && objArray.config !== undefined) {
				conf.config = $.extend({}, objArray.config, conf.config)
			}

			conf = $.extend( {}, objArray, conf );

			// The extend will have overwritten the original class name if the
			// `conf` object also assigned a class, but we want to concatenate
			// them so they are list that is combined from all extended buttons
			if ( originalClassName && conf.className !== originalClassName ) {
				conf.className = originalClassName+' '+conf.className;
			}

			// Buttons to be added to a collection  -gives the ability to define
			// if buttons should be added to the start or end of a collection
			var postfixButtons = conf.postfixButtons;
			if ( postfixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=postfixButtons.length ; i<ien ; i++ ) {
					conf.buttons.push( postfixButtons[i] );
				}

				conf.postfixButtons = null;
			}

			var prefixButtons = conf.prefixButtons;
			if ( prefixButtons ) {
				if ( ! conf.buttons ) {
					conf.buttons = [];
				}

				for ( i=0, ien=prefixButtons.length ; i<ien ; i++ ) {
					conf.buttons.splice( i, 0, prefixButtons[i] );
				}

				conf.prefixButtons = null;
			}

			// Although we want the `conf` object to overwrite almost all of
			// the properties of the object being extended, the `extend`
			// property should come from the object being extended
			conf.extend = objArray.extend;
		}

		return conf;
	},

	/**
	 * Display (and replace if there is an existing one) a popover attached to a button
	 * @param {string|node} content Content to show
	 * @param {DataTable.Api} hostButton DT API instance of the button
	 * @param {object} inOpts Options (see object below for all options)
	 */
	_popover: function ( content, hostButton, inOpts, e ) {
		var dt = hostButton;
		var buttonsSettings = this.c;
		var closed = false;
		var options = $.extend( {
			align: 'button-left', // button-right, dt-container, split-left, split-right
			autoClose: false,
			background: true,
			backgroundClassName: 'dt-button-background',
			contentClassName: buttonsSettings.dom.collection.className,
			collectionLayout: '',
			collectionTitle: '',
			dropup: false,
			fade: 400,
			popoverTitle: '',
			rightAlignClassName: 'dt-button-right',
			splitRightAlignClassName: 'dt-button-split-right',
			splitLeftAlignClassName: 'dt-button-split-left',
			tag: buttonsSettings.dom.collection.tag
		}, inOpts );

		var hostNode = hostButton.node();

		var close = function () {
			closed = true;

			_fadeOut(
				$('.dt-button-collection'),
				options.fade,
				function () {
					$(this).detach();
				}
			);

			$(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes())
				.attr('aria-expanded', 'false');

			$('div.dt-button-background').off( 'click.dtb-collection' );
			Buttons.background( false, options.backgroundClassName, options.fade, hostNode );

			$('body').off( '.dtb-collection' );
			dt.off( 'buttons-action.b-internal' );
			dt.off( 'destroy' );
		};

		if (content === false) {
			close();
		}

		var existingExpanded = $(dt.buttons( '[aria-haspopup="true"][aria-expanded="true"]' ).nodes());
		if ( existingExpanded.length ) {
			hostNode = existingExpanded.eq(0);

			close();
		}

		var display = $('<div/>')
			.addClass('dt-button-collection')
			.addClass(options.collectionLayout)
			.addClass(options.splitAlignClass)
			.css('display', 'none');

		content = $(content)
			.addClass(options.contentClassName)
			.attr('role', 'menu')
			.appendTo(display);

		hostNode.attr( 'aria-expanded', 'true' );

		if ( hostNode.parents('body')[0] !== document.body ) {
			hostNode = document.body.lastChild;
		}

		if ( options.popoverTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.popoverTitle+'</div>');
		}
		else if ( options.collectionTitle ) {
			display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');
		}

		_fadeIn( display.insertAfter( hostNode ), options.fade );

		var tableContainer = $( hostButton.table().container() );
		var position = display.css( 'position' );

		if ( options.align === 'dt-container' ) {
			hostNode = hostNode.parent();
			display.css('width', tableContainer.width());
		}

		// Align the popover relative to the DataTables container
		// Useful for wide popovers such as SearchPanes
		if (position === 'absolute') {
			// Align relative to the host button
			var hostPosition = hostNode.position();
			var buttonPosition = $(hostButton.node()).position();

			display.css( {
				top: $($(hostButton[0].node).parent()[0]).hasClass('dt-buttons')
					? buttonPosition.top + hostNode.outerHeight()
					: hostPosition.top + hostNode.outerHeight(),
				left: hostPosition.left
			} );

			// calculate overflow when positioned beneath
			var collectionHeight = display.outerHeight();
			var tableBottom = tableContainer.offset().top + tableContainer.height();
			var listBottom = buttonPosition.top + hostNode.outerHeight() + collectionHeight;
			var bottomOverflow = listBottom - tableBottom;

			// calculate overflow when positioned above
			var listTop = buttonPosition.top - collectionHeight;
			var tableTop = tableContainer.offset().top;
			var topOverflow = tableTop - listTop;

			// if bottom overflow is larger, move to the top because it fits better, or if dropup is requested
			var moveTop = buttonPosition.top - collectionHeight - 5;
			if ( (bottomOverflow > topOverflow || options.dropup) && -moveTop < tableTop ) {
				display.css( 'top', moveTop);
			}

			// Get the size of the container (left and width - and thus also right)
			var tableLeft = tableContainer.offset().left;
			var tableWidth = tableContainer.width();
			var tableRight = tableLeft + tableWidth;

			// Get the size of the popover (left and width - and ...)
			var popoverLeft = display.offset().left;
			var popoverWidth = display.outerWidth();

			// Foundations display dom element has a width of 0 - the true width is within the child
			if (popoverWidth === 0) {
				if (display.children().length > 0) {
					popoverWidth = $(display.children()[0]).outerWidth();
				}
			}
			
			var popoverRight = popoverLeft + popoverWidth;

			// Get the size of the host buttons (left and width - and ...)
			var buttonsLeft = hostNode.offset().left;
			var buttonsWidth = hostNode.outerWidth()
			var buttonsRight = buttonsLeft + buttonsWidth;

			if (
				display.hasClass( options.rightAlignClassName ) ||
				display.hasClass( options.leftAlignClassName ) ||
				display.hasClass( options.splitAlignClass ) ||
				options.align === 'dt-container'
			){
				// default to the other buttons values
				var splitButtonLeft = buttonsLeft;
				var splitButtonWidth = buttonsWidth;
				var splitButtonRight = buttonsRight;

				// If the button is a split button then need to calculate some more values
				if (hostNode.hasClass('dt-btn-split-wrapper') && hostNode.children('button.dt-btn-split-drop').length > 0) {
					splitButtonLeft = hostNode.children('button.dt-btn-split-drop').offset().left;
					splitButtonWidth = hostNode.children('button.dt-btn-split-drop').outerWidth();
					splitButtonRight = splitButtonLeft + splitButtonWidth;
				}
				// You've then got all the numbers you need to do some calculations and if statements,
				//  so we can do some quick JS maths and apply it only once
				// If it has the right align class OR the buttons are right aligned OR the button container is floated right,
				//  then calculate left position for the popover to align the popover to the right hand
				//  side of the button - check to see if the left of the popover is inside the table container.
				// If not, move the popover so it is, but not more than it means that the popover is to the right of the table container
				var popoverShuffle = 0;
				if ( display.hasClass( options.rightAlignClassName )) {
					popoverShuffle = buttonsRight - popoverRight;
					if(tableLeft > (popoverLeft + popoverShuffle)){
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);
		
						if(leftGap > rightGap){
							popoverShuffle += rightGap; 
						}
						else {
							popoverShuffle += leftGap;
						}
					}
				}
				else if ( display.hasClass( options.splitRightAlignClassName )) {
					popoverShuffle = splitButtonRight - popoverRight;
					if(tableLeft > (popoverLeft + popoverShuffle)){
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);
		
						if(leftGap > rightGap){
							popoverShuffle += rightGap; 
						}
						else {
							popoverShuffle += leftGap;
						}
					}
				}
				else if ( display.hasClass( options.splitLeftAlignClassName )) {
					popoverShuffle = splitButtonLeft - popoverLeft;

					if(tableRight < (popoverRight + popoverShuffle) || tableLeft > (popoverLeft + popoverShuffle)){
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);
	
						if(leftGap > rightGap ){
							popoverShuffle += rightGap;
						}
						else {
							popoverShuffle += leftGap;
						}
	
					}
				}
				// else attempt to left align the popover to the button. Similar to above, if the popover's right goes past the table container's right,
				//  then move it back, but not so much that it goes past the left of the table container
				else {
					popoverShuffle = tableLeft - popoverLeft;
	
					if(tableRight < (popoverRight + popoverShuffle)){
						var leftGap = tableLeft - (popoverLeft + popoverShuffle);
						var rightGap = tableRight - (popoverRight + popoverShuffle);
	
						if(leftGap > rightGap ){
							popoverShuffle += rightGap;
						}
						else {
							popoverShuffle += leftGap;
						}
	
					}
				}
	
				display.css('left', display.position().left + popoverShuffle);
			}
			else {
				var top = hostNode.offset().top
				var popoverShuffle = 0;

				popoverShuffle = options.align === 'button-right'
					? buttonsRight - popoverRight
					: buttonsLeft - popoverLeft;

				display.css('left', display.position().left + popoverShuffle);
			}
			
			
		}
		else {
			// Fix position - centre on screen
			var top = display.height() / 2;
			if ( top > $(window).height() / 2 ) {
				top = $(window).height() / 2;
			}

			display.css( 'marginTop', top*-1 );
		}

		if ( options.background ) {
			Buttons.background( true, options.backgroundClassName, options.fade, hostNode );
		}

		// This is bonkers, but if we don't have a click listener on the
		// background element, iOS Safari will ignore the body click
		// listener below. An empty function here is all that is
		// required to make it work...
		$('div.dt-button-background').on( 'click.dtb-collection', function () {} );

		if ( options.autoClose ) {
			setTimeout( function () {
				dt.on( 'buttons-action.b-internal', function (e, btn, dt, node) {
					if ( node[0] === hostNode[0] ) {
						return;
					}
					close();
				} );
			}, 0);
		}
		
		$(display).trigger('buttons-popover.dt');


		dt.on('destroy', close);

		setTimeout(function() {
			closed = false;
			$('body')
				.on( 'click.dtb-collection', function (e) {
					if (closed) {
						return;
					}

					// andSelf is deprecated in jQ1.8, but we want 1.7 compat
					var back = $.fn.addBack ? 'addBack' : 'andSelf';
					var parent = $(e.target).parent()[0];
	
					if (( ! $(e.target).parents()[back]().filter( content ).length  && !$(parent).hasClass('dt-buttons')) || $(e.target).hasClass('dt-button-background')) {
						close();
					}
				} )
				.on( 'keyup.dtb-collection', function (e) {
					if ( e.keyCode === 27 ) {
						close();
					}
				} );
		}, 0);
	}
} );



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 */

/**
 * Show / hide a background layer behind a collection
 * @param  {boolean} Flag to indicate if the background should be shown or
 *   hidden 
 * @param  {string} Class to assign to the background
 * @static
 */
Buttons.background = function ( show, className, fade, insertPoint ) {
	if ( fade === undefined ) {
		fade = 400;
	}
	if ( ! insertPoint ) {
		insertPoint = document.body;
	}

	if ( show ) {
		_fadeIn(
			$('<div/>')
				.addClass( className )
				.css( 'display', 'none' )
				.insertAfter( insertPoint ),
			fade
		);
	}
	else {
		_fadeOut(
			$('div.'+className),
			fade,
			function () {
				$(this)
					.removeClass( className )
					.remove();
			}
		);
	}
};

/**
 * Instance selector - select Buttons instances based on an instance selector
 * value from the buttons assigned to a DataTable. This is only useful if
 * multiple instances are attached to a DataTable.
 * @param  {string|int|array} Instance selector - see `instance-selector`
 *   documentation on the DataTables site
 * @param  {array} Button instance array that was attached to the DataTables
 *   settings object
 * @return {array} Buttons instances
 * @static
 */
Buttons.instanceSelector = function ( group, buttons )
{
	if ( group === undefined || group === null ) {
		return $.map( buttons, function ( v ) {
			return v.inst;
		} );
	}

	var ret = [];
	var names = $.map( buttons, function ( v ) {
		return v.name;
	} );

	// Flatten the group selector into an array of single options
	var process = function ( input ) {
		if ( Array.isArray( input ) ) {
			for ( var i=0, ien=input.length ; i<ien ; i++ ) {
				process( input[i] );
			}
			return;
		}

		if ( typeof input === 'string' ) {
			if ( input.indexOf( ',' ) !== -1 ) {
				// String selector, list of names
				process( input.split(',') );
			}
			else {
				// String selector individual name
				var idx = $.inArray( input.trim(), names );

				if ( idx !== -1 ) {
					ret.push( buttons[ idx ].inst );
				}
			}
		}
		else if ( typeof input === 'number' ) {
			// Index selector
			ret.push( buttons[ input ].inst );
		}
	};
	
	process( group );

	return ret;
};

/**
 * Button selector - select one or more buttons from a selector input so some
 * operation can be performed on them.
 * @param  {array} Button instances array that the selector should operate on
 * @param  {string|int|node|jQuery|array} Button selector - see
 *   `button-selector` documentation on the DataTables site
 * @return {array} Array of objects containing `inst` and `idx` properties of
 *   the selected buttons so you know which instance each button belongs to.
 * @static
 */
Buttons.buttonSelector = function ( insts, selector )
{
	var ret = [];
	var nodeBuilder = function ( a, buttons, baseIdx ) {
		var button;
		var idx;

		for ( var i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( button ) {
				idx = baseIdx !== undefined ?
					baseIdx+i :
					i+'';

				a.push( {
					node: button.node,
					name: button.conf.name,
					idx:  idx
				} );

				if ( button.buttons ) {
					nodeBuilder( a, button.buttons, idx+'-' );
				}
			}
		}
	};

	var run = function ( selector, inst ) {
		var i, ien;
		var buttons = [];
		nodeBuilder( buttons, inst.s.buttons );

		var nodes = $.map( buttons, function (v) {
			return v.node;
		} );

		if ( Array.isArray( selector ) || selector instanceof $ ) {
			for ( i=0, ien=selector.length ; i<ien ; i++ ) {
				run( selector[i], inst );
			}
			return;
		}

		if ( selector === null || selector === undefined || selector === '*' ) {
			// Select all
			for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
				ret.push( {
					inst: inst,
					node: buttons[i].node
				} );
			}
		}
		else if ( typeof selector === 'number' ) {
			// Main button index selector
			ret.push( {
				inst: inst,
				node: inst.s.buttons[ selector ].node
			} );
		}
		else if ( typeof selector === 'string' ) {
			if ( selector.indexOf( ',' ) !== -1 ) {
				// Split
				var a = selector.split(',');

				for ( i=0, ien=a.length ; i<ien ; i++ ) {
					run( a[i].trim(), inst );
				}
			}
			else if ( selector.match( /^\d+(\-\d+)*$/ ) ) {
				// Sub-button index selector
				var indexes = $.map( buttons, function (v) {
					return v.idx;
				} );

				ret.push( {
					inst: inst,
					node: buttons[ $.inArray( selector, indexes ) ].node
				} );
			}
			else if ( selector.indexOf( ':name' ) !== -1 ) {
				// Button name selector
				var name = selector.replace( ':name', '' );

				for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
					if ( buttons[i].name === name ) {
						ret.push( {
							inst: inst,
							node: buttons[i].node
						} );
					}
				}
			}
			else {
				// jQuery selector on the nodes
				$( nodes ).filter( selector ).each( function () {
					ret.push( {
						inst: inst,
						node: this
					} );
				} );
			}
		}
		else if ( typeof selector === 'object' && selector.nodeName ) {
			// Node selector
			var idx = $.inArray( selector, nodes );

			if ( idx !== -1 ) {
				ret.push( {
					inst: inst,
					node: nodes[ idx ]
				} );
			}
		}
	};


	for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
		var inst = insts[i];

		run( selector, inst );
	}

	return ret;
};

/**
 * Default function used for formatting output data.
 * @param {*} str Data to strip
 */
Buttons.stripData = function ( str, config ) {
	if ( typeof str !== 'string' ) {
		return str;
	}

	// Always remove script tags
	str = str.replace( /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '' );

	// Always remove comments
	str = str.replace( /<!\-\-.*?\-\->/g, '' );

	if ( ! config || config.stripHtml ) {
		str = str.replace( /<[^>]*>/g, '' );
	}

	if ( ! config || config.trim ) {
		str = str.replace( /^\s+|\s+$/g, '' );
	}

	if ( ! config || config.stripNewlines ) {
		str = str.replace( /\n/g, ' ' );
	}

	if ( ! config || config.decodeEntities ) {
		_exportTextarea.innerHTML = str;
		str = _exportTextarea.value;
	}

	return str;
};


/**
 * Buttons defaults. For full documentation, please refer to the docs/option
 * directory or the DataTables site.
 * @type {Object}
 * @static
 */
Buttons.defaults = {
	buttons: [ 'copy', 'excel', 'csv', 'pdf', 'print' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: ''
		},
		button: {
			tag: 'button',
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled'
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		},
		split: {
			tag: 'div',
			className: 'dt-button-split',
		},
		splitWrapper: {
			tag: 'div',
			className: 'dt-btn-split-wrapper',
		},
		splitDropdown: {
			tag: 'button',
			text: '&#x25BC;',
			className: 'dt-btn-split-drop',
			align: 'split-right',
			splitAlignClass: 'dt-button-split-left'
		},
		splitDropdownButton: {
			tag: 'button',
			className: 'dt-btn-split-drop-button dt-button',
		},
		splitCollection: {
			tag: 'div',
			className: 'dt-button-split-collection',
		}
	}
};

/**
 * Version information
 * @type {string}
 * @static
 */
Buttons.version = '2.0.1';


$.extend( _dtButtons, {
	collection: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.collection', 'Collection' );
		},
		className: 'buttons-collection',
		init: function ( dt, button, config ) {
			button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			if ( config._collection.parents('body').length ) {
				this.popover(false, config);
			}
			else {
				this.popover(config._collection, config);
			}
		},
		attr: {
			'aria-haspopup': true
		}
		// Also the popover options, defined in Buttons.popover
	},
	split: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.split', 'Split' );
		},
		className: 'buttons-split',
		init: function ( dt, button, config ) {
			return button.attr( 'aria-expanded', false );
		},
		action: function ( e, dt, button, config ) {
			this.popover(config._collection, config);
		},
		attr: {
			'aria-haspopup': true
		}
		// Also the popover options, defined in Buttons.popover
	},
	copy: function ( dt, conf ) {
		if ( _dtButtons.copyHtml5 ) {
			return 'copyHtml5';
		}
	},
	csv: function ( dt, conf ) {
		if ( _dtButtons.csvHtml5 && _dtButtons.csvHtml5.available( dt, conf ) ) {
			return 'csvHtml5';
		}
	},
	excel: function ( dt, conf ) {
		if ( _dtButtons.excelHtml5 && _dtButtons.excelHtml5.available( dt, conf ) ) {
			return 'excelHtml5';
		}
	},
	pdf: function ( dt, conf ) {
		if ( _dtButtons.pdfHtml5 && _dtButtons.pdfHtml5.available( dt, conf ) ) {
			return 'pdfHtml5';
		}
	},
	pageLength: function ( dt ) {
		var lengthMenu = dt.settings()[0].aLengthMenu;
		var vals = [];
		var lang = [];
		var text = function ( dt ) {
			return dt.i18n( 'buttons.pageLength', {
				"-1": 'Show all rows',
				_:    'Show %d rows'
			}, dt.page.len() );
		};

		// Support for DataTables 1.x 2D array
		if (Array.isArray( lengthMenu[0] )) {
			vals = lengthMenu[0];
			lang = lengthMenu[1];
		}
		else {
			for (var i=0 ; i<lengthMenu.length ; i++) {
				var option = lengthMenu[i];

				// Support for DataTables 2 object in the array
				if ($.isPlainObject(option)) {
					vals.push(option.value);
					lang.push(option.label);
				}
				else {
					vals.push(option);
					lang.push(option);
				}
			}
		}

		return {
			extend: 'collection',
			text: text,
			className: 'buttons-page-length',
			autoClose: true,
			buttons: $.map( vals, function ( val, i ) {
				return {
					text: lang[i],
					className: 'button-page-length',
					action: function ( e, dt ) {
						dt.page.len( val ).draw();
					},
					init: function ( dt, node, conf ) {
						var that = this;
						var fn = function () {
							that.active( dt.page.len() === val );
						};

						dt.on( 'length.dt'+conf.namespace, fn );
						fn();
					},
					destroy: function ( dt, node, conf ) {
						dt.off( 'length.dt'+conf.namespace );
					}
				};
			} ),
			init: function ( dt, node, conf ) {
				var that = this;
				dt.on( 'length.dt'+conf.namespace, function () {
					that.text( conf.text );
				} );
			},
			destroy: function ( dt, node, conf ) {
				dt.off( 'length.dt'+conf.namespace );
			}
		};
	}
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Buttons group and individual button selector
DataTable.Api.register( 'buttons()', function ( group, selector ) {
	// Argument shifting
	if ( selector === undefined ) {
		selector = group;
		group = undefined;
	}

	this.selector.buttonGroup = group;

	var res = this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			return Buttons.buttonSelector(
				Buttons.instanceSelector( group, ctx._buttons ),
				selector
			);
		}
	}, true );

	res._groupSelector = group;
	return res;
} );

// Individual button selector
DataTable.Api.register( 'button()', function ( group, selector ) {
	// just run buttons() and truncate
	var buttons = this.buttons( group, selector );

	if ( buttons.length > 1 ) {
		buttons.splice( 1, buttons.length );
	}

	return buttons;
} );

// Active buttons
DataTable.Api.registerPlural( 'buttons().active()', 'button().active()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.active( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.active( set.node, flag );
	} );
} );

// Get / set button action
DataTable.Api.registerPlural( 'buttons().action()', 'button().action()', function ( action ) {
	if ( action === undefined ) {
		return this.map( function ( set ) {
			return set.inst.action( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.action( set.node, action );
	} );
} );

// Collection control
DataTable.Api.registerPlural( 'buttons().collectionRebuild()', 'button().collectionRebuild()', function ( buttons ) {
	return this.each( function ( set ) {
		for(var i = 0; i < buttons.length; i++) {
			if(typeof buttons[i] === 'object') {
				buttons[i].parentConf = set;
			}
		}
		set.inst.collectionRebuild( set.node, buttons );
	} );
} );

// Enable / disable buttons
DataTable.Api.register( ['buttons().enable()', 'button().enable()'], function ( flag ) {
	return this.each( function ( set ) {
		set.inst.enable( set.node, flag );
	} );
} );

// Disable buttons
DataTable.Api.register( ['buttons().disable()', 'button().disable()'], function () {
	return this.each( function ( set ) {
		set.inst.disable( set.node );
	} );
} );

// Get button nodes
DataTable.Api.registerPlural( 'buttons().nodes()', 'button().node()', function () {
	var jq = $();

	// jQuery will automatically reduce duplicates to a single entry
	$( this.each( function ( set ) {
		jq = jq.add( set.inst.node( set.node ) );
	} ) );

	return jq;
} );

// Get / set button processing state
DataTable.Api.registerPlural( 'buttons().processing()', 'button().processing()', function ( flag ) {
	if ( flag === undefined ) {
		return this.map( function ( set ) {
			return set.inst.processing( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.processing( set.node, flag );
	} );
} );

// Get / set button text (i.e. the button labels)
DataTable.Api.registerPlural( 'buttons().text()', 'button().text()', function ( label ) {
	if ( label === undefined ) {
		return this.map( function ( set ) {
			return set.inst.text( set.node );
		} );
	}

	return this.each( function ( set ) {
		set.inst.text( set.node, label );
	} );
} );

// Trigger a button's action
DataTable.Api.registerPlural( 'buttons().trigger()', 'button().trigger()', function () {
	return this.each( function ( set ) {
		set.inst.node( set.node ).trigger( 'click' );
	} );
} );

// Button resolver to the popover
DataTable.Api.register( 'button().popover()', function (content, options) {
	return this.map( function ( set ) {
		return set.inst._popover( content, this.button(this[0].node), options );
	} );
} );

// Get the container elements
DataTable.Api.register( 'buttons().containers()', function () {
	var jq = $();
	var groupSelector = this._groupSelector;

	// We need to use the group selector directly, since if there are no buttons
	// the result set will be empty
	this.iterator( true, 'table', function ( ctx ) {
		if ( ctx._buttons ) {
			var insts = Buttons.instanceSelector( groupSelector, ctx._buttons );

			for ( var i=0, ien=insts.length ; i<ien ; i++ ) {
				jq = jq.add( insts[i].container() );
			}
		}
	} );

	return jq;
} );

DataTable.Api.register( 'buttons().container()', function () {
	// API level of nesting is `buttons()` so we can zip into the containers method
	return this.containers().eq(0);
} );

// Add a new button
DataTable.Api.register( 'button().add()', function ( idx, conf ) {
	var ctx = this.context;

	// Don't use `this` as it could be empty - select the instances directly
	if ( ctx.length ) {
		var inst = Buttons.instanceSelector( this._groupSelector, ctx[0]._buttons );

		if ( inst.length ) {
			inst[0].add( conf, idx );
		}
	}

	return this.button( this._groupSelector, idx );
} );

// Destroy the button sets selected
DataTable.Api.register( 'buttons().destroy()', function () {
	this.pluck( 'inst' ).unique().each( function ( inst ) {
		inst.destroy();
	} );

	return this;
} );

// Remove a button
DataTable.Api.registerPlural( 'buttons().remove()', 'buttons().remove()', function () {
	this.each( function ( set ) {
		set.inst.remove( set.node );
	} );

	return this;
} );

// Information box that can be used by buttons
var _infoTimer;
DataTable.Api.register( 'buttons.info()', function ( title, message, time ) {
	var that = this;

	if ( title === false ) {
		this.off('destroy.btn-info');
		_fadeOut(
			$('#datatables_buttons_info'),
			400,
			function () {
				$(this).remove();
			}
		);
		clearTimeout( _infoTimer );
		_infoTimer = null;

		return this;
	}

	if ( _infoTimer ) {
		clearTimeout( _infoTimer );
	}

	if ( $('#datatables_buttons_info').length ) {
		$('#datatables_buttons_info').remove();
	}

	title = title ? '<h2>'+title+'</h2>' : '';

	_fadeIn(
		$('<div id="datatables_buttons_info" class="dt-button-info"/>')
			.html( title )
			.append( $('<div/>')[ typeof message === 'string' ? 'html' : 'append' ]( message ) )
			.css( 'display', 'none' )
			.appendTo( 'body' )
	);

	if ( time !== undefined && time !== 0 ) {
		_infoTimer = setTimeout( function () {
			that.buttons.info( false );
		}, time );
	}

	this.on('destroy.btn-info', function () {
		that.buttons.info(false);
	});

	return this;
} );

// Get data from the table for export - this is common to a number of plug-in
// buttons so it is included in the Buttons core library
DataTable.Api.register( 'buttons.exportData()', function ( options ) {
	if ( this.context.length ) {
		return _exportData( new DataTable.Api( this.context[0] ), options );
	}
} );

// Get information about the export that is common to many of the export data
// types (DRY)
DataTable.Api.register( 'buttons.exportInfo()', function ( conf ) {
	if ( ! conf ) {
		conf = {};
	}

	return {
		filename: _filename( conf ),
		title: _title( conf ),
		messageTop: _message(this, conf.message || conf.messageTop, 'top'),
		messageBottom: _message(this, conf.messageBottom, 'bottom')
	};
} );



/**
 * Get the file name for an exported file.
 *
 * @param {object}	config Button configuration
 * @param {boolean} incExtension Include the file name extension
 */
var _filename = function ( config )
{
	// Backwards compatibility
	var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
		config.title :
		config.filename;

	if ( typeof filename === 'function' ) {
		filename = filename();
	}

	if ( filename === undefined || filename === null ) {
		return null;
	}

	if ( filename.indexOf( '*' ) !== -1 ) {
		filename = filename.replace( '*', $('head > title').text() ).trim();
	}

	// Strip characters which the OS will object to
	filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");

	var extension = _stringOrFunction( config.extension );
	if ( ! extension ) {
		extension = '';
	}

	return filename + extension;
};

/**
 * Simply utility method to allow parameters to be given as a function
 *
 * @param {undefined|string|function} option Option
 * @return {null|string} Resolved value
 */
var _stringOrFunction = function ( option )
{
	if ( option === null || option === undefined ) {
		return null;
	}
	else if ( typeof option === 'function' ) {
		return option();
	}
	return option;
};

/**
 * Get the title for an exported file.
 *
 * @param {object} config	Button configuration
 */
var _title = function ( config )
{
	var title = _stringOrFunction( config.title );

	return title === null ?
		null : title.indexOf( '*' ) !== -1 ?
			title.replace( '*', $('head > title').text() || 'Exported data' ) :
			title;
};

var _message = function ( dt, option, position )
{
	var message = _stringOrFunction( option );
	if ( message === null ) {
		return null;
	}

	var caption = $('caption', dt.table().container()).eq(0);
	if ( message === '*' ) {
		var side = caption.css( 'caption-side' );
		if ( side !== position ) {
			return null;
		}

		return caption.length ?
			caption.text() :
			'';
	}

	return message;
};




var _exportTextarea = $('<textarea/>')[0];
var _exportData = function ( dt, inOpts )
{
	var config = $.extend( true, {}, {
		rows:           null,
		columns:        '',
		modifier:       {
			search: 'applied',
			order:  'applied'
		},
		orthogonal:     'display',
		stripHtml:      true,
		stripNewlines:  true,
		decodeEntities: true,
		trim:           true,
		format:         {
			header: function ( d ) {
				return Buttons.stripData( d, config );
			},
			footer: function ( d ) {
				return Buttons.stripData( d, config );
			},
			body: function ( d ) {
				return Buttons.stripData( d, config );
			}
		},
		customizeData: null
	}, inOpts );

	var header = dt.columns( config.columns ).indexes().map( function (idx) {
		var el = dt.column( idx ).header();
		return config.format.header( el.innerHTML, idx, el );
	} ).toArray();

	var footer = dt.table().footer() ?
		dt.columns( config.columns ).indexes().map( function (idx) {
			var el = dt.column( idx ).footer();
			return config.format.footer( el ? el.innerHTML : '', idx, el );
		} ).toArray() :
		null;
	
	// If Select is available on this table, and any rows are selected, limit the export
	// to the selected rows. If no rows are selected, all rows will be exported. Specify
	// a `selected` modifier to control directly.
	var modifier = $.extend( {}, config.modifier );
	if ( dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined ) {
		if ( dt.rows( config.rows, $.extend( { selected: true }, modifier ) ).any() ) {
			$.extend( modifier, { selected: true } )
		}
	}

	var rowIndexes = dt.rows( config.rows, modifier ).indexes().toArray();
	var selectedCells = dt.cells( rowIndexes, config.columns );
	var cells = selectedCells
		.render( config.orthogonal )
		.toArray();
	var cellNodes = selectedCells
		.nodes()
		.toArray();

	var columns = header.length;
	var rows = columns > 0 ? cells.length / columns : 0;
	var body = [];
	var cellCounter = 0;

	for ( var i=0, ien=rows ; i<ien ; i++ ) {
		var row = [ columns ];

		for ( var j=0 ; j<columns ; j++ ) {
			row[j] = config.format.body( cells[ cellCounter ], i, j, cellNodes[ cellCounter ] );
			cellCounter++;
		}

		body[i] = row;
	}

	var data = {
		header: header,
		footer: footer,
		body:   body
	};

	if ( config.customizeData ) {
		config.customizeData( data );
	}

	return data;
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables interface
 */

// Attach to DataTables objects for global access
$.fn.dataTable.Buttons = Buttons;
$.fn.DataTable.Buttons = Buttons;



// DataTables creation - check if the buttons have been defined for this table,
// they will have been if the `B` option was used in `dom`, otherwise we should
// create the buttons instance here so they can be inserted into the document
// using the API. Listen for `init` for compatibility with pre 1.10.10, but to
// be removed in future.
$(document).on( 'init.dt plugin-init.dt', function (e, settings) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var opts = settings.oInit.buttons || DataTable.defaults.buttons;

	if ( opts && ! settings._buttons ) {
		new Buttons( settings, opts ).container();
	}
} );

function _init ( settings, options ) {
	var api = new DataTable.Api( settings );
	var opts = options
		? options
		: api.init().buttons || DataTable.defaults.buttons;

	return new Buttons( api, opts ).container();
}

// DataTables `dom` feature option
DataTable.ext.feature.push( {
	fnInit: _init,
	cFeature: "B"
} );

// DataTables 2 layout feature
if ( DataTable.ext.features ) {
	DataTable.ext.features.register( 'buttons', _init );
}


return Buttons;
}));


/*! DataTables styling wrapper for Buttons
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));

/*! Responsive 2.2.9
 * 2014-2021 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     2.2.9
 * @file        dataTables.responsive.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014-2021 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/**
 * Responsive is a plug-in for the DataTables library that makes use of
 * DataTables' ability to change the visibility of columns, changing the
 * visibility of columns so the displayed columns fit into the table container.
 * The end result is that complex tables will be dynamically adjusted to fit
 * into the viewport, be it on a desktop, tablet or mobile browser.
 *
 * Responsive for DataTables has two modes of operation, which can used
 * individually or combined:
 *
 * * Class name based control - columns assigned class names that match the
 *   breakpoint logic can be shown / hidden as required for each breakpoint.
 * * Automatic control - columns are automatically hidden when there is no
 *   room left to display them. Columns removed from the right.
 *
 * In additional to column visibility control, Responsive also has built into
 * options to use DataTables' child row display to show / hide the information
 * from the table that has been hidden. There are also two modes of operation
 * for this child row display:
 *
 * * Inline - when the control element that the user can use to show / hide
 *   child rows is displayed inside the first column of the table.
 * * Column - where a whole column is dedicated to be the show / hide control.
 *
 * Initialisation of Responsive is performed by:
 *
 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
 *   Responsive will automatically be initialised with the default configuration
 *   options when the DataTable is created.
 * * Using the `responsive` option in the DataTables configuration options. This
 *   can also be used to specify the configuration options, or simply set to
 *   `true` to use the defaults.
 *
 *  @class
 *  @param {object} settings DataTables settings object for the host table
 *  @param {object} [opts] Configuration options
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.3+
 *
 *  @example
 *      $('#example').DataTable( {
 *        responsive: true
 *      } );
 *    } );
 */
var Responsive = function ( settings, opts ) {
	// Sanity check that we are using DataTables 1.10 or newer
	if ( ! DataTable.versionCheck || ! DataTable.versionCheck( '1.10.10' ) ) {
		throw 'DataTables Responsive requires DataTables 1.10.10 or newer';
	}

	this.s = {
		dt: new DataTable.Api( settings ),
		columns: [],
		current: []
	};

	// Check if responsive has already been initialised on this table
	if ( this.s.dt.settings()[0].responsive ) {
		return;
	}

	// details is an object, but for simplicity the user can give it as a string
	// or a boolean
	if ( opts && typeof opts.details === 'string' ) {
		opts.details = { type: opts.details };
	}
	else if ( opts && opts.details === false ) {
		opts.details = { type: false };
	}
	else if ( opts && opts.details === true ) {
		opts.details = { type: 'inline' };
	}

	this.c = $.extend( true, {}, Responsive.defaults, DataTable.defaults.responsive, opts );
	settings.responsive = this;
	this._constructor();
};

$.extend( Responsive.prototype, {
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Constructor
	 */

	/**
	 * Initialise the Responsive instance
	 *
	 * @private
	 */
	_constructor: function ()
	{
		var that = this;
		var dt = this.s.dt;
		var dtPrivateSettings = dt.settings()[0];
		var oldWindowWidth = $(window).innerWidth();

		dt.settings()[0]._responsive = this;

		// Use DataTables' throttle function to avoid processor thrashing on
		// resize
		$(window).on( 'resize.dtr orientationchange.dtr', DataTable.util.throttle( function () {
			// iOS has a bug whereby resize can fire when only scrolling
			// See: http://stackoverflow.com/questions/8898412
			var width = $(window).innerWidth();

			if ( width !== oldWindowWidth ) {
				that._resize();
				oldWindowWidth = width;
			}
		} ) );

		// DataTables doesn't currently trigger an event when a row is added, so
		// we need to hook into its private API to enforce the hidden rows when
		// new data is added
		dtPrivateSettings.oApi._fnCallbackReg( dtPrivateSettings, 'aoRowCreatedCallback', function (tr, data, idx) {
			if ( $.inArray( false, that.s.current ) !== -1 ) {
				$('>td, >th', tr).each( function ( i ) {
					var idx = dt.column.index( 'toData', i );

					if ( that.s.current[idx] === false ) {
						$(this).css('display', 'none');
					}
				} );
			}
		} );

		// Destroy event handler
		dt.on( 'destroy.dtr', function () {
			dt.off( '.dtr' );
			$( dt.table().body() ).off( '.dtr' );
			$(window).off( 'resize.dtr orientationchange.dtr' );
			dt.cells('.dtr-control').nodes().to$().removeClass('dtr-control');

			// Restore the columns that we've hidden
			$.each( that.s.current, function ( i, val ) {
				if ( val === false ) {
					that._setColumnVis( i, true );
				}
			} );
		} );

		// Reorder the breakpoints array here in case they have been added out
		// of order
		this.c.breakpoints.sort( function (a, b) {
			return a.width < b.width ? 1 :
				a.width > b.width ? -1 : 0;
		} );

		this._classLogic();
		this._resizeAuto();

		// Details handler
		var details = this.c.details;

		if ( details.type !== false ) {
			that._detailsInit();

			// DataTables will trigger this event on every column it shows and
			// hides individually
			dt.on( 'column-visibility.dtr', function () {
				// Use a small debounce to allow multiple columns to be set together
				if ( that._timer ) {
					clearTimeout( that._timer );
				}

				that._timer = setTimeout( function () {
					that._timer = null;

					that._classLogic();
					that._resizeAuto();
					that._resize(true);

					that._redrawChildren();
				}, 100 );
			} );

			// Redraw the details box on each draw which will happen if the data
			// has changed. This is used until DataTables implements a native
			// `updated` event for rows
			dt.on( 'draw.dtr', function () {
				that._redrawChildren();
			} );

			$(dt.table().node()).addClass( 'dtr-'+details.type );
		}

		dt.on( 'column-reorder.dtr', function (e, settings, details) {
			that._classLogic();
			that._resizeAuto();
			that._resize(true);
		} );

		// Change in column sizes means we need to calc
		dt.on( 'column-sizing.dtr', function () {
			that._resizeAuto();
			that._resize();
		});

		// On Ajax reload we want to reopen any child rows which are displayed
		// by responsive
		dt.on( 'preXhr.dtr', function () {
			var rowIds = [];
			dt.rows().every( function () {
				if ( this.child.isShown() ) {
					rowIds.push( this.id(true) );
				}
			} );

			dt.one( 'draw.dtr', function () {
				that._resizeAuto();
				that._resize();

				dt.rows( rowIds ).every( function () {
					that._detailsDisplay( this, false );
				} );
			} );
		});

		dt
			.on( 'draw.dtr', function () {
				that._controlClass();
			})
			.on( 'init.dtr', function (e, settings, details) {
				if ( e.namespace !== 'dt' ) {
					return;
				}

				that._resizeAuto();
				that._resize();

				// If columns were hidden, then DataTables needs to adjust the
				// column sizing
				if ( $.inArray( false, that.s.current ) ) {
					dt.columns.adjust();
				}
			} );

		// First pass - draw the table for the current viewport size
		this._resize();
	},


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Private methods
	 */

	/**
	 * Calculate the visibility for the columns in a table for a given
	 * breakpoint. The result is pre-determined based on the class logic if
	 * class names are used to control all columns, but the width of the table
	 * is also used if there are columns which are to be automatically shown
	 * and hidden.
	 *
	 * @param  {string} breakpoint Breakpoint name to use for the calculation
	 * @return {array} Array of boolean values initiating the visibility of each
	 *   column.
	 *  @private
	 */
	_columnsVisiblity: function ( breakpoint )
	{
		var dt = this.s.dt;
		var columns = this.s.columns;
		var i, ien;

		// Create an array that defines the column ordering based first on the
		// column's priority, and secondly the column index. This allows the
		// columns to be removed from the right if the priority matches
		var order = columns
			.map( function ( col, idx ) {
				return {
					columnIdx: idx,
					priority: col.priority
				};
			} )
			.sort( function ( a, b ) {
				if ( a.priority !== b.priority ) {
					return a.priority - b.priority;
				}
				return a.columnIdx - b.columnIdx;
			} );

		// Class logic - determine which columns are in this breakpoint based
		// on the classes. If no class control (i.e. `auto`) then `-` is used
		// to indicate this to the rest of the function
		var display = $.map( columns, function ( col, i ) {
			if ( dt.column(i).visible() === false ) {
				return 'not-visible';
			}
			return col.auto && col.minWidth === null ?
				false :
				col.auto === true ?
					'-' :
					$.inArray( breakpoint, col.includeIn ) !== -1;
		} );

		// Auto column control - first pass: how much width is taken by the
		// ones that must be included from the non-auto columns
		var requiredWidth = 0;
		for ( i=0, ien=display.length ; i<ien ; i++ ) {
			if ( display[i] === true ) {
				requiredWidth += columns[i].minWidth;
			}
		}

		// Second pass, use up any remaining width for other columns. For
		// scrolling tables we need to subtract the width of the scrollbar. It
		// may not be requires which makes this sub-optimal, but it would
		// require another full redraw to make complete use of those extra few
		// pixels
		var scrolling = dt.settings()[0].oScroll;
		var bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0;
		var widthAvailable = dt.table().container().offsetWidth - bar;
		var usedWidth = widthAvailable - requiredWidth;

		// Control column needs to always be included. This makes it sub-
		// optimal in terms of using the available with, but to stop layout
		// thrashing or overflow. Also we need to account for the control column
		// width first so we know how much width is available for the other
		// columns, since the control column might not be the first one shown
		for ( i=0, ien=display.length ; i<ien ; i++ ) {
			if ( columns[i].control ) {
				usedWidth -= columns[i].minWidth;
			}
		}

		// Allow columns to be shown (counting by priority and then right to
		// left) until we run out of room
		var empty = false;
		for ( i=0, ien=order.length ; i<ien ; i++ ) {
			var colIdx = order[i].columnIdx;

			if ( display[colIdx] === '-' && ! columns[colIdx].control && columns[colIdx].minWidth ) {
				// Once we've found a column that won't fit we don't let any
				// others display either, or columns might disappear in the
				// middle of the table
				if ( empty || usedWidth - columns[colIdx].minWidth < 0 ) {
					empty = true;
					display[colIdx] = false;
				}
				else {
					display[colIdx] = true;
				}

				usedWidth -= columns[colIdx].minWidth;
			}
		}

		// Determine if the 'control' column should be shown (if there is one).
		// This is the case when there is a hidden column (that is not the
		// control column). The two loops look inefficient here, but they are
		// trivial and will fly through. We need to know the outcome from the
		// first , before the action in the second can be taken
		var showControl = false;

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( ! columns[i].control && ! columns[i].never && display[i] === false ) {
				showControl = true;
				break;
			}
		}

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( columns[i].control ) {
				display[i] = showControl;
			}

			// Replace not visible string with false from the control column detection above
			if ( display[i] === 'not-visible' ) {
				display[i] = false;
			}
		}

		// Finally we need to make sure that there is at least one column that
		// is visible
		if ( $.inArray( true, display ) === -1 ) {
			display[0] = true;
		}

		return display;
	},


	/**
	 * Create the internal `columns` array with information about the columns
	 * for the table. This includes determining which breakpoints the column
	 * will appear in, based upon class names in the column, which makes up the
	 * vast majority of this method.
	 *
	 * @private
	 */
	_classLogic: function ()
	{
		var that = this;
		var calc = {};
		var breakpoints = this.c.breakpoints;
		var dt = this.s.dt;
		var columns = dt.columns().eq(0).map( function (i) {
			var column = this.column(i);
			var className = column.header().className;
			var priority = dt.settings()[0].aoColumns[i].responsivePriority;
			var dataPriority = column.header().getAttribute('data-priority');

			if ( priority === undefined ) {
				priority = dataPriority === undefined || dataPriority === null?
					10000 :
					dataPriority * 1;
			}

			return {
				className: className,
				includeIn: [],
				auto:      false,
				control:   false,
				never:     className.match(/\bnever\b/) ? true : false,
				priority:  priority
			};
		} );

		// Simply add a breakpoint to `includeIn` array, ensuring that there are
		// no duplicates
		var add = function ( colIdx, name ) {
			var includeIn = columns[ colIdx ].includeIn;

			if ( $.inArray( name, includeIn ) === -1 ) {
				includeIn.push( name );
			}
		};

		var column = function ( colIdx, name, operator, matched ) {
			var size, i, ien;

			if ( ! operator ) {
				columns[ colIdx ].includeIn.push( name );
			}
			else if ( operator === 'max-' ) {
				// Add this breakpoint and all smaller
				size = that._find( name ).width;

				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].width <= size ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
			else if ( operator === 'min-' ) {
				// Add this breakpoint and all larger
				size = that._find( name ).width;

				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].width >= size ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
			else if ( operator === 'not-' ) {
				// Add all but this breakpoint
				for ( i=0, ien=breakpoints.length ; i<ien ; i++ ) {
					if ( breakpoints[i].name.indexOf( matched ) === -1 ) {
						add( colIdx, breakpoints[i].name );
					}
				}
			}
		};

		// Loop over each column and determine if it has a responsive control
		// class
		columns.each( function ( col, i ) {
			var classNames = col.className.split(' ');
			var hasClass = false;

			// Split the class name up so multiple rules can be applied if needed
			for ( var k=0, ken=classNames.length ; k<ken ; k++ ) {
				var className = classNames[k].trim();

				if ( className === 'all' ) {
					// Include in all
					hasClass = true;
					col.includeIn = $.map( breakpoints, function (a) {
						return a.name;
					} );
					return;
				}
				else if ( className === 'none' || col.never ) {
					// Include in none (default) and no auto
					hasClass = true;
					return;
				}
				else if ( className === 'control' || className === 'dtr-control' ) {
					// Special column that is only visible, when one of the other
					// columns is hidden. This is used for the details control
					hasClass = true;
					col.control = true;
					return;
				}

				$.each( breakpoints, function ( j, breakpoint ) {
					// Does this column have a class that matches this breakpoint?
					var brokenPoint = breakpoint.name.split('-');
					var re = new RegExp( '(min\\-|max\\-|not\\-)?('+brokenPoint[0]+')(\\-[_a-zA-Z0-9])?' );
					var match = className.match( re );

					if ( match ) {
						hasClass = true;

						if ( match[2] === brokenPoint[0] && match[3] === '-'+brokenPoint[1] ) {
							// Class name matches breakpoint name fully
							column( i, breakpoint.name, match[1], match[2]+match[3] );
						}
						else if ( match[2] === brokenPoint[0] && ! match[3] ) {
							// Class name matched primary breakpoint name with no qualifier
							column( i, breakpoint.name, match[1], match[2] );
						}
					}
				} );
			}

			// If there was no control class, then automatic sizing is used
			if ( ! hasClass ) {
				col.auto = true;
			}
		} );

		this.s.columns = columns;
	},

	/**
	 * Update the cells to show the correct control class / button
	 * @private
	 */
	_controlClass: function ()
	{
		if ( this.c.details.type === 'inline' ) {
			var dt = this.s.dt;
			var columnsVis = this.s.current;
			var firstVisible = $.inArray(true, columnsVis);

			// Remove from any cells which shouldn't have it
			dt.cells(
				null,
				function(idx) {
					return idx !== firstVisible;
				},
				{page: 'current'}
			)
				.nodes()
				.to$()
				.filter('.dtr-control')
				.removeClass('dtr-control');

			dt.cells(null, firstVisible, {page: 'current'})
				.nodes()
				.to$()
				.addClass('dtr-control');
		}
	},

	/**
	 * Show the details for the child row
	 *
	 * @param  {DataTables.Api} row    API instance for the row
	 * @param  {boolean}        update Update flag
	 * @private
	 */
	_detailsDisplay: function ( row, update )
	{
		var that = this;
		var dt = this.s.dt;
		var details = this.c.details;

		if ( details && details.type !== false ) {
			var res = details.display( row, update, function () {
				return details.renderer(
					dt, row[0], that._detailsObj(row[0])
				);
			} );

			if ( res === true || res === false ) {
				$(dt.table().node()).triggerHandler( 'responsive-display.dt', [dt, row, res, update] );
			}
		}
	},


	/**
	 * Initialisation for the details handler
	 *
	 * @private
	 */
	_detailsInit: function ()
	{
		var that    = this;
		var dt      = this.s.dt;
		var details = this.c.details;

		// The inline type always uses the first child as the target
		if ( details.type === 'inline' ) {
			details.target = 'td.dtr-control, th.dtr-control';
		}

		// Keyboard accessibility
		dt.on( 'draw.dtr', function () {
			that._tabIndexes();
		} );
		that._tabIndexes(); // Initial draw has already happened

		$( dt.table().body() ).on( 'keyup.dtr', 'td, th', function (e) {
			if ( e.keyCode === 13 && $(this).data('dtr-keyboard') ) {
				$(this).click();
			}
		} );

		// type.target can be a string jQuery selector or a column index
		var target   = details.target;
		var selector = typeof target === 'string' ? target : 'td, th';

		if ( target !== undefined || target !== null ) {
			// Click handler to show / hide the details rows when they are available
			$( dt.table().body() )
				.on( 'click.dtr mousedown.dtr mouseup.dtr', selector, function (e) {
					// If the table is not collapsed (i.e. there is no hidden columns)
					// then take no action
					if ( ! $(dt.table().node()).hasClass('collapsed' ) ) {
						return;
					}

					// Check that the row is actually a DataTable's controlled node
					if ( $.inArray( $(this).closest('tr').get(0), dt.rows().nodes().toArray() ) === -1 ) {
						return;
					}

					// For column index, we determine if we should act or not in the
					// handler - otherwise it is already okay
					if ( typeof target === 'number' ) {
						var targetIdx = target < 0 ?
							dt.columns().eq(0).length + target :
							target;

						if ( dt.cell( this ).index().column !== targetIdx ) {
							return;
						}
					}

					// $().closest() includes itself in its check
					var row = dt.row( $(this).closest('tr') );

					// Check event type to do an action
					if ( e.type === 'click' ) {
						// The renderer is given as a function so the caller can execute it
						// only when they need (i.e. if hiding there is no point is running
						// the renderer)
						that._detailsDisplay( row, false );
					}
					else if ( e.type === 'mousedown' ) {
						// For mouse users, prevent the focus ring from showing
						$(this).css('outline', 'none');
					}
					else if ( e.type === 'mouseup' ) {
						// And then re-allow at the end of the click
						$(this).trigger('blur').css('outline', '');
					}
				} );
		}
	},


	/**
	 * Get the details to pass to a renderer for a row
	 * @param  {int} rowIdx Row index
	 * @private
	 */
	_detailsObj: function ( rowIdx )
	{
		var that = this;
		var dt = this.s.dt;

		return $.map( this.s.columns, function( col, i ) {
			// Never and control columns should not be passed to the renderer
			if ( col.never || col.control ) {
				return;
			}

			var dtCol = dt.settings()[0].aoColumns[ i ];

			return {
				className:   dtCol.sClass,
				columnIndex: i,
				data:        dt.cell( rowIdx, i ).render( that.c.orthogonal ),
				hidden:      dt.column( i ).visible() && !that.s.current[ i ],
				rowIndex:    rowIdx,
				title:       dtCol.sTitle !== null ?
					dtCol.sTitle :
					$(dt.column(i).header()).text()
			};
		} );
	},


	/**
	 * Find a breakpoint object from a name
	 *
	 * @param  {string} name Breakpoint name to find
	 * @return {object}      Breakpoint description object
	 * @private
	 */
	_find: function ( name )
	{
		var breakpoints = this.c.breakpoints;

		for ( var i=0, ien=breakpoints.length ; i<ien ; i++ ) {
			if ( breakpoints[i].name === name ) {
				return breakpoints[i];
			}
		}
	},


	/**
	 * Re-create the contents of the child rows as the display has changed in
	 * some way.
	 *
	 * @private
	 */
	_redrawChildren: function ()
	{
		var that = this;
		var dt = this.s.dt;

		dt.rows( {page: 'current'} ).iterator( 'row', function ( settings, idx ) {
			var row = dt.row( idx );

			that._detailsDisplay( dt.row( idx ), true );
		} );
	},


	/**
	 * Alter the table display for a resized viewport. This involves first
	 * determining what breakpoint the window currently is in, getting the
	 * column visibilities to apply and then setting them.
	 *
	 * @param  {boolean} forceRedraw Force a redraw
	 * @private
	 */
	_resize: function (forceRedraw)
	{
		var that = this;
		var dt = this.s.dt;
		var width = $(window).innerWidth();
		var breakpoints = this.c.breakpoints;
		var breakpoint = breakpoints[0].name;
		var columns = this.s.columns;
		var i, ien;
		var oldVis = this.s.current.slice();

		// Determine what breakpoint we are currently at
		for ( i=breakpoints.length-1 ; i>=0 ; i-- ) {
			if ( width <= breakpoints[i].width ) {
				breakpoint = breakpoints[i].name;
				break;
			}
		}
		
		// Show the columns for that break point
		var columnsVis = this._columnsVisiblity( breakpoint );
		this.s.current = columnsVis;

		// Set the class before the column visibility is changed so event
		// listeners know what the state is. Need to determine if there are
		// any columns that are not visible but can be shown
		var collapsedClass = false;
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			if ( columnsVis[i] === false && ! columns[i].never && ! columns[i].control && ! dt.column(i).visible() === false ) {
				collapsedClass = true;
				break;
			}
		}

		$( dt.table().node() ).toggleClass( 'collapsed', collapsedClass );

		var changed = false;
		var visible = 0;

		dt.columns().eq(0).each( function ( colIdx, i ) {
			if ( columnsVis[i] === true ) {
				visible++;
			}

			if ( forceRedraw || columnsVis[i] !== oldVis[i] ) {
				changed = true;
				that._setColumnVis( colIdx, columnsVis[i] );
			}
		} );

		if ( changed ) {
			this._redrawChildren();

			// Inform listeners of the change
			$(dt.table().node()).trigger( 'responsive-resize.dt', [dt, this.s.current] );

			// If no records, update the "No records" display element
			if ( dt.page.info().recordsDisplay === 0 ) {
				$('td', dt.table().body()).eq(0).attr('colspan', visible);
			}
		}

		that._controlClass();
	},


	/**
	 * Determine the width of each column in the table so the auto column hiding
	 * has that information to work with. This method is never going to be 100%
	 * perfect since column widths can change slightly per page, but without
	 * seriously compromising performance this is quite effective.
	 *
	 * @private
	 */
	_resizeAuto: function ()
	{
		var dt = this.s.dt;
		var columns = this.s.columns;

		// Are we allowed to do auto sizing?
		if ( ! this.c.auto ) {
			return;
		}

		// Are there any columns that actually need auto-sizing, or do they all
		// have classes defined
		if ( $.inArray( true, $.map( columns, function (c) { return c.auto; } ) ) === -1 ) {
			return;
		}

		// Need to restore all children. They will be reinstated by a re-render
		if ( ! $.isEmptyObject( _childNodeStore ) ) {
			$.each( _childNodeStore, function ( key ) {
				var idx = key.split('-');

				_childNodesRestore( dt, idx[0]*1, idx[1]*1 );
			} );
		}

		// Clone the table with the current data in it
		var tableWidth   = dt.table().node().offsetWidth;
		var columnWidths = dt.columns;
		var clonedTable  = dt.table().node().cloneNode( false );
		var clonedHeader = $( dt.table().header().cloneNode( false ) ).appendTo( clonedTable );
		var clonedBody   = $( dt.table().body() ).clone( false, false ).empty().appendTo( clonedTable ); // use jQuery because of IE8

		clonedTable.style.width = 'auto';

		// Header
		var headerCells = dt.columns()
			.header()
			.filter( function (idx) {
				return dt.column(idx).visible();
			} )
			.to$()
			.clone( false )
			.css( 'display', 'table-cell' )
			.css( 'width', 'auto' )
			.css( 'min-width', 0 );

		// Body rows - we don't need to take account of DataTables' column
		// visibility since we implement our own here (hence the `display` set)
		$(clonedBody)
			.append( $(dt.rows( { page: 'current' } ).nodes()).clone( false ) )
			.find( 'th, td' ).css( 'display', '' );

		// Footer
		var footer = dt.table().footer();
		if ( footer ) {
			var clonedFooter = $( footer.cloneNode( false ) ).appendTo( clonedTable );
			var footerCells = dt.columns()
				.footer()
				.filter( function (idx) {
					return dt.column(idx).visible();
				} )
				.to$()
				.clone( false )
				.css( 'display', 'table-cell' );

			$('<tr/>')
				.append( footerCells )
				.appendTo( clonedFooter );
		}

		$('<tr/>')
			.append( headerCells )
			.appendTo( clonedHeader );

		// In the inline case extra padding is applied to the first column to
		// give space for the show / hide icon. We need to use this in the
		// calculation
		if ( this.c.details.type === 'inline' ) {
			$(clonedTable).addClass( 'dtr-inline collapsed' );
		}
		
		// It is unsafe to insert elements with the same name into the DOM
		// multiple times. For example, cloning and inserting a checked radio
		// clears the chcecked state of the original radio.
		$( clonedTable ).find( '[name]' ).removeAttr( 'name' );

		// A position absolute table would take the table out of the flow of
		// our container element, bypassing the height and width (Scroller)
		$( clonedTable ).css( 'position', 'relative' )
		
		var inserted = $('<div/>')
			.css( {
				width: 1,
				height: 1,
				overflow: 'hidden',
				clear: 'both'
			} )
			.append( clonedTable );

		inserted.insertBefore( dt.table().node() );

		// The cloned header now contains the smallest that each column can be
		headerCells.each( function (i) {
			var idx = dt.column.index( 'fromVisible', i );
			columns[ idx ].minWidth =  this.offsetWidth || 0;
		} );

		inserted.remove();
	},

	/**
	 * Get the state of the current hidden columns - controlled by Responsive only
	 */
	_responsiveOnlyHidden: function ()
	{
		var dt = this.s.dt;

		return $.map( this.s.current, function (v, i) {
			// If the column is hidden by DataTables then it can't be hidden by
			// Responsive!
			if ( dt.column(i).visible() === false ) {
				return true;
			}
			return v;
		} );
	},

	/**
	 * Set a column's visibility.
	 *
	 * We don't use DataTables' column visibility controls in order to ensure
	 * that column visibility can Responsive can no-exist. Since only IE8+ is
	 * supported (and all evergreen browsers of course) the control of the
	 * display attribute works well.
	 *
	 * @param {integer} col      Column index
	 * @param {boolean} showHide Show or hide (true or false)
	 * @private
	 */
	_setColumnVis: function ( col, showHide )
	{
		var dt = this.s.dt;
		var display = showHide ? '' : 'none'; // empty string will remove the attr

		$( dt.column( col ).header() ).css( 'display', display );
		$( dt.column( col ).footer() ).css( 'display', display );
		dt.column( col ).nodes().to$().css( 'display', display );

		// If the are child nodes stored, we might need to reinsert them
		if ( ! $.isEmptyObject( _childNodeStore ) ) {
			dt.cells( null, col ).indexes().each( function (idx) {
				_childNodesRestore( dt, idx.row, idx.column );
			} );
		}
	},


	/**
	 * Update the cell tab indexes for keyboard accessibility. This is called on
	 * every table draw - that is potentially inefficient, but also the least
	 * complex option given that column visibility can change on the fly. Its a
	 * shame user-focus was removed from CSS 3 UI, as it would have solved this
	 * issue with a single CSS statement.
	 *
	 * @private
	 */
	_tabIndexes: function ()
	{
		var dt = this.s.dt;
		var cells = dt.cells( { page: 'current' } ).nodes().to$();
		var ctx = dt.settings()[0];
		var target = this.c.details.target;

		cells.filter( '[data-dtr-keyboard]' ).removeData( '[data-dtr-keyboard]' );

		if ( typeof target === 'number' ) {
			dt.cells( null, target, { page: 'current' } ).nodes().to$()
				.attr( 'tabIndex', ctx.iTabIndex )
				.data( 'dtr-keyboard', 1 );
		}
		else {
			// This is a bit of a hack - we need to limit the selected nodes to just
			// those of this table
			if ( target === 'td:first-child, th:first-child' ) {
				target = '>td:first-child, >th:first-child';
			}

			$( target, dt.rows( { page: 'current' } ).nodes() )
				.attr( 'tabIndex', ctx.iTabIndex )
				.data( 'dtr-keyboard', 1 );
		}
	}
} );


/**
 * List of default breakpoints. Each item in the array is an object with two
 * properties:
 *
 * * `name` - the breakpoint name.
 * * `width` - the breakpoint width
 *
 * @name Responsive.breakpoints
 * @static
 */
Responsive.breakpoints = [
	{ name: 'desktop',  width: Infinity },
	{ name: 'tablet-l', width: 1024 },
	{ name: 'tablet-p', width: 768 },
	{ name: 'mobile-l', width: 480 },
	{ name: 'mobile-p', width: 320 }
];


/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.display = {
	childRow: function ( row, update, render ) {
		if ( update ) {
			if ( $(row.node()).hasClass('parent') ) {
				row.child( render(), 'child' ).show();

				return true;
			}
		}
		else {
			if ( ! row.child.isShown()  ) {
				row.child( render(), 'child' ).show();
				$( row.node() ).addClass( 'parent' );

				return true;
			}
			else {
				row.child( false );
				$( row.node() ).removeClass( 'parent' );

				return false;
			}
		}
	},

	childRowImmediate: function ( row, update, render ) {
		if ( (! update && row.child.isShown()) || ! row.responsive.hasHidden() ) {
			// User interaction and the row is show, or nothing to show
			row.child( false );
			$( row.node() ).removeClass( 'parent' );

			return false;
		}
		else {
			// Display
			row.child( render(), 'child' ).show();
			$( row.node() ).addClass( 'parent' );

			return true;
		}
	},

	// This is a wrapper so the modal options for Bootstrap and jQuery UI can
	// have options passed into them. This specific one doesn't need to be a
	// function but it is for consistency in the `modal` name
	modal: function ( options ) {
		return function ( row, update, render ) {
			if ( ! update ) {
				// Show a modal
				var close = function () {
					modal.remove(); // will tidy events for us
					$(document).off( 'keypress.dtr' );
				};

				var modal = $('<div class="dtr-modal"/>')
					.append( $('<div class="dtr-modal-display"/>')
						.append( $('<div class="dtr-modal-content"/>')
							.append( render() )
						)
						.append( $('<div class="dtr-modal-close">&times;</div>' )
							.click( function () {
								close();
							} )
						)
					)
					.append( $('<div class="dtr-modal-background"/>')
						.click( function () {
							close();
						} )
					)
					.appendTo( 'body' );

				$(document).on( 'keyup.dtr', function (e) {
					if ( e.keyCode === 27 ) {
						e.stopPropagation();

						close();
					}
				} );
			}
			else {
				$('div.dtr-modal-content')
					.empty()
					.append( render() );
			}

			if ( options && options.header ) {
				$('div.dtr-modal-content').prepend(
					'<h2>'+options.header( row )+'</h2>'
				);
			}
		};
	}
};


var _childNodeStore = {};

function _childNodes( dt, row, col ) {
	var name = row+'-'+col;

	if ( _childNodeStore[ name ] ) {
		return _childNodeStore[ name ];
	}

	// https://jsperf.com/childnodes-array-slice-vs-loop
	var nodes = [];
	var children = dt.cell( row, col ).node().childNodes;
	for ( var i=0, ien=children.length ; i<ien ; i++ ) {
		nodes.push( children[i] );
	}

	_childNodeStore[ name ] = nodes;

	return nodes;
}

function _childNodesRestore( dt, row, col ) {
	var name = row+'-'+col;

	if ( ! _childNodeStore[ name ] ) {
		return;
	}

	var node = dt.cell( row, col ).node();
	var store = _childNodeStore[ name ];
	var parent = store[0].parentNode;
	var parentChildren = parent.childNodes;
	var a = [];

	for ( var i=0, ien=parentChildren.length ; i<ien ; i++ ) {
		a.push( parentChildren[i] );
	}

	for ( var j=0, jen=a.length ; j<jen ; j++ ) {
		node.appendChild( a[j] );
	}

	_childNodeStore[ name ] = undefined;
}


/**
 * Display methods - functions which define how the hidden data should be shown
 * in the table.
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.renderer = {
	listHiddenNodes: function () {
		return function ( api, rowIdx, columns ) {
			var ul = $('<ul data-dtr-index="'+rowIdx+'" class="dtr-details"/>');
			var found = false;

			var data = $.each( columns, function ( i, col ) {
				if ( col.hidden ) {
					var klass = col.className ?
						'class="'+ col.className +'"' :
						'';
	
					$(
						'<li '+klass+' data-dtr-index="'+col.columnIndex+'" data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
							'<span class="dtr-title">'+
								col.title+
							'</span> '+
						'</li>'
					)
						.append( $('<span class="dtr-data"/>').append( _childNodes( api, col.rowIndex, col.columnIndex ) ) )// api.cell( col.rowIndex, col.columnIndex ).node().childNodes ) )
						.appendTo( ul );

					found = true;
				}
			} );

			return found ?
				ul :
				false;
		};
	},

	listHidden: function () {
		return function ( api, rowIdx, columns ) {
			var data = $.map( columns, function ( col ) {
				var klass = col.className ?
					'class="'+ col.className +'"' :
					'';

				return col.hidden ?
					'<li '+klass+' data-dtr-index="'+col.columnIndex+'" data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
						'<span class="dtr-title">'+
							col.title+
						'</span> '+
						'<span class="dtr-data">'+
							col.data+
						'</span>'+
					'</li>' :
					'';
			} ).join('');

			return data ?
				$('<ul data-dtr-index="'+rowIdx+'" class="dtr-details"/>').append( data ) :
				false;
		}
	},

	tableAll: function ( options ) {
		options = $.extend( {
			tableClass: ''
		}, options );

		return function ( api, rowIdx, columns ) {
			var data = $.map( columns, function ( col ) {
				var klass = col.className ?
					'class="'+ col.className +'"' :
					'';

				return '<tr '+klass+' data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
						'<td>'+col.title+':'+'</td> '+
						'<td>'+col.data+'</td>'+
					'</tr>';
			} ).join('');

			return $('<table class="'+options.tableClass+' dtr-details" width="100%"/>').append( data );
		}
	}
};

/**
 * Responsive default settings for initialisation
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
Responsive.defaults = {
	/**
	 * List of breakpoints for the instance. Note that this means that each
	 * instance can have its own breakpoints. Additionally, the breakpoints
	 * cannot be changed once an instance has been creased.
	 *
	 * @type {Array}
	 * @default Takes the value of `Responsive.breakpoints`
	 */
	breakpoints: Responsive.breakpoints,

	/**
	 * Enable / disable auto hiding calculations. It can help to increase
	 * performance slightly if you disable this option, but all columns would
	 * need to have breakpoint classes assigned to them
	 *
	 * @type {Boolean}
	 * @default  `true`
	 */
	auto: true,

	/**
	 * Details control. If given as a string value, the `type` property of the
	 * default object is set to that value, and the defaults used for the rest
	 * of the object - this is for ease of implementation.
	 *
	 * The object consists of the following properties:
	 *
	 * * `display` - A function that is used to show and hide the hidden details
	 * * `renderer` - function that is called for display of the child row data.
	 *   The default function will show the data from the hidden columns
	 * * `target` - Used as the selector for what objects to attach the child
	 *   open / close to
	 * * `type` - `false` to disable the details display, `inline` or `column`
	 *   for the two control types
	 *
	 * @type {Object|string}
	 */
	details: {
		display: Responsive.display.childRow,

		renderer: Responsive.renderer.listHidden(),

		target: 0,

		type: 'inline'
	},

	/**
	 * Orthogonal data request option. This is used to define the data type
	 * requested when Responsive gets the data to show in the child row.
	 *
	 * @type {String}
	 */
	orthogonal: 'display'
};


/*
 * API
 */
var Api = $.fn.dataTable.Api;

// Doesn't do anything - work around for a bug in DT... Not documented
Api.register( 'responsive()', function () {
	return this;
} );

Api.register( 'responsive.index()', function ( li ) {
	li = $(li);

	return {
		column: li.data('dtr-index'),
		row:    li.parent().data('dtr-index')
	};
} );

Api.register( 'responsive.rebuild()', function () {
	return this.iterator( 'table', function ( ctx ) {
		if ( ctx._responsive ) {
			ctx._responsive._classLogic();
		}
	} );
} );

Api.register( 'responsive.recalc()', function () {
	return this.iterator( 'table', function ( ctx ) {
		if ( ctx._responsive ) {
			ctx._responsive._resizeAuto();
			ctx._responsive._resize();
		}
	} );
} );

Api.register( 'responsive.hasHidden()', function () {
	var ctx = this.context[0];

	return ctx._responsive ?
		$.inArray( false, ctx._responsive._responsiveOnlyHidden() ) !== -1 :
		false;
} );

Api.registerPlural( 'columns().responsiveHidden()', 'column().responsiveHidden()', function () {
	return this.iterator( 'column', function ( settings, column ) {
		return settings._responsive ?
			settings._responsive._responsiveOnlyHidden()[ column ] :
			false;
	}, 1 );
} );


/**
 * Version information
 *
 * @name Responsive.version
 * @static
 */
Responsive.version = '2.2.9';


$.fn.dataTable.Responsive = Responsive;
$.fn.DataTable.Responsive = Responsive;

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'preInit.dt.dtr', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	if ( $(settings.nTable).hasClass( 'responsive' ) ||
		 $(settings.nTable).hasClass( 'dt-responsive' ) ||
		 settings.oInit.responsive ||
		 DataTable.defaults.responsive
	) {
		var init = settings.oInit.responsive;

		if ( init !== false ) {
			new Responsive( settings, $.isPlainObject( init ) ? init : {}  );
		}
	}
} );


return Responsive;
}));


/*! DataTables styling wrapper for Responsive
 * ©2018 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-dt', 'datatables.net-responsive'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-dt')(root, $).$;
			}

			if ( ! $.fn.dataTable.Responsive ) {
				require('datatables.net-responsive')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {

return $.fn.dataTable;

}));

