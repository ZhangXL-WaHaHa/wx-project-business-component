module.exports = {
	/**
	 * 判断传过来的数据是否是数字
	 * @param {} data
	 * @returns {Boolean}
	 */
	isNumber(data) {
    return typeof data === 'number' && !isNaN(data)
	},

	/**
	 * 从小到大排序
	 * @param {} date
	 * @returns {Number}
	 */
	getFirstDayWeek(date) {
		return new Date(date.year, date.month - 1, 1).getDay()
	},
};
