;GF.utils = (function (ns) {
  'use strict';
  return {
    WEEKDAYS: ['日', '一', '二', '三', '四', '五', '六'],
    formatDate: function (date, format) {
      var year = date.getFullYear(),
          month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
          day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      format = format.replace(/y+/i, year).replace(/m+/i, month).replace(/d+/i, day);
      return format;
    },
    calculateDate: function (date, offset) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset);
    }
  };
})();


