module.exports = {

	/**
	 * 手指点击
	 * @param {
	 *    e  带手指点击的参数
	 *    busPos   购物车位置
	 *    amount  计算获取点的数目
	 * }
	 * @returns 小球运动轨迹坐标点
	 */
	touchOnGoods: function(e, busPos, amount) {
		this.finger = {};
		var topPoint = {};
		this.finger['x'] = e.x; //点击的位置，增加偏移位置改变小球出现的位置
		this.finger['y'] = e.y;

		if (this.finger['y'] < busPos['y']) {
			topPoint['y'] = this.finger['y'] - 150;
		} else {
			topPoint['y'] = busPos['y'] - 150;
		}
		topPoint['x'] = Math.abs(this.finger['x'] - busPos['x']) / 2;

		if (this.finger['x'] > busPos['x']) {
			topPoint['x'] = (this.finger['x'] - busPos['x']) / 2 + busPos['x'];
		} else { //
			topPoint['x'] = (busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
		}

		return this.bezier([busPos, topPoint, this.finger], amount);
	},

	/**
	 * 获取小球运动的轨迹点
	 * @param 
	 * @returns 
	 */
	bezier: function(pots, amount) {
		var pot;
		var lines;
		var ret = [];
		var points;
		for (var i = 0; i <= amount; i++) {
			points = pots.slice(0);
			lines = [];
			while (pot = points.shift()) {
				if (points.length) {
					lines.push(pointLine([pot, points[0]], i / amount));
				} else if (lines.length > 1) {
					points = lines;
					lines = [];
				} else {
					break;
				}
			}
			ret.push(lines[0]);
		}

		function pointLine(points, rate) {
			var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
			var ret = [];
			pointA = points[0]; //点击
			pointB = points[1]; //中间
			xDistance = pointB.x - pointA.x;
			yDistance = pointB.y - pointA.y;
			pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
			tan = yDistance / xDistance;
			radian = Math.atan(tan);
			tmpPointDistance = pointDistance * rate;
			ret = {
				x: pointA.x + tmpPointDistance * Math.cos(radian),
				y: pointA.y + tmpPointDistance * Math.sin(radian)
			};
			return ret;
		}
		return {
			'bezier_points': ret
		};
	},
};
