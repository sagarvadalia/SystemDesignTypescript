import graduatePartTime = require('./graduatePartTime');
import undergraduatePartTime = require('./undergraduatePartTime');
import partTimeFaculty = require('./partTimeFaculty');
import fullTimeFaculty = require('./fullTimeFaculty');
import graduateFullTime = require('./graduateFullTime');
import undergraduateFullTime = require('./undergraduateFullTime');
import semester = require('./semester');
export const seeds = {
	partTimeFaculty,
	fullTimeFaculty,
	graduateFullTime,
	undergraduatePartTime,
	graduatePartTime,
	undergraduateFullTime,
	semester,
};
