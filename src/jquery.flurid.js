/**
 * jQuery.flurid
 *
 * Helper functions for the Flurid CSS Grid Framework
 *
 * @author Kyle Florence <kyle[dot]florence[at]gmail[dot]com>
 * @version 2.0.20110330
 */
;(function($, window) {
  /**
   * $.fn.flurid: Allows this function to be chained to a jQuery Object
   * selection.
   *
   * @example $(".grid").flurid({...});
   *
   * @param {Object} [options]
   *    An Object containing key/value pairs that will overwrite the default
   *    options of the plugin.
   *
   * @return {jQuery}
   *    The jQuery Object(s) that were passed to this function.
   */
  $.fn.flurid = function(options) {
    options = $.extend({}, $.fn.flurid.options, options);

    return this.each(function() {
      var $rows = $(this).find(".row"),
        rows = ($rows.length - 1);

      $rows.each(function(r, row) {
        var $row = $(row),
          $columns = $row.find(".column"),
          columns = ($columns.length - 1),
          tallest_column = 0;

        $columns.each(function(c, col) {
          var $col = $(col),
            column_height = $col.height(),
            shifted_column = $col.hasClass("shift")
              || $col.parents(".shift").length > 0;

          // alternating columns
          if (options.alternate == "columns") {
            $col.addClass(c % 2 === 0 ? "even" : "odd");
          }

          // first / last column
          if (c === 0) {
            $col.addClass("first");
          } else if (c === columns && !shifted_column) {
            $col.addClass("last");
          }

          // store tallest column height
          if (column_height > tallest_column) {
            tallest_column = column_height;
          }
        });

        // alternating rows
        if (options.alternate == "rows") {
          $row.addClass(r % 2 == 0 ? "even" : "odd");
        }

        // first / last row
        if (r === 0) {
          $row.addClass("first");
        } else if (r === rows) {
          $row.addClass("last");
        }

        // make columns have equal heights
        if (options.equal_height_columns) {
          $columns.css("height", tallest_column);
        }
      });
    });
  };

  /**
   * @namespace Holds the default options for the jQuery.flurid plugin
   */
  $.fn.flurid.options = {
    /**
     * What to alternate (class-wise), if anything.  Basically
     * determines where to apply the "odd" and "even" classes. Can
     * be set to "rows", "columns" or "neither".
     *
     * @default "columns"
     * @type String
     */
    alternate: "columns",

    /**
     * Whether or not to make all of the columns in a row the same
     * height.  Can be true or false.
     *
     * @default false
     * @type Boolean
     */
    equal_height_columns: false
  };

})(jQuery, this);
