import graduatePartTime = require('./graduatePartTime');
import undergraduatePartTime = require('./undergraduatePartTime');
import partTimeFaculty = require('./partTimeFaculty');
import fullTimeFaculty = require('./fullTimeFaculty');
import graduateFullTime = require('./graduateFullTime');
import undergraduateFullTime = require('./undergraduateFullTime');

export const seeds = {
	partTimeFaculty,
	fullTimeFaculty,
	graduateFullTime,
	undergraduatePartTime,
	graduatePartTime,
	undergraduateFullTime,
};
