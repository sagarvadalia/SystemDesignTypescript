import graduatePartTime = require('./graduatePartTime');
import undergraduatePartTime = require('./undergraduatePartTime');
import partTimeFaculty = require('./partTimeFaculty');
import fullTimeFaculty = require('./fullTimeFaculty');
import graduateFullTime = require('./graduateFullTime');
import undergraduateFullTime = require('./undergraduateFullTime');
import semester = require('./semester');
import researcher = require('./researcher');
import course = require('./course');
import administrator = require('./administrator');
import building = require('./building');
import department = require('./department');
import major = require('./major');
import minor = require('./minor');
import day = require('./day');
export const seeds = {
	partTimeFaculty,
	fullTimeFaculty,
	graduateFullTime,
	undergraduatePartTime,
	graduatePartTime,
	undergraduateFullTime,
	semester,
	researcher,
	course,
	administrator,
	building,
	department,
	major,	
	minor,
	day,
};
