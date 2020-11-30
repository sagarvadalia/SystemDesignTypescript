import graduatePartTime = require('./graduatePartTime');
import undergraduatePartTime = require('./undergraduatePartTime');
import partTimeFaculty = require('./partTimeFaculty');
import fullTimeFaculty = require('./fullTimeFaculty');
import graduateFullTime = require('./graduateFullTime');
import undergraduateFullTime = require('./undergraduateFullTime');
import semester = require('./semester');
import researcher = require('./researcher');
import period = require('./period');
import course = require('./course');
import administrator = require('./administrator');
import building = require('./building');
import department = require('./department');
import major = require('./major');
import minor = require('./minor');
import day = require('./day');
import lecture = require('./lecture')
import lab = require('./lab')
import office = require('./office');
import timeslots = require('./timeslot2');
import holds = require('./hold');
import classes = require('./class');


export const seeds = {
	partTimeFaculty,
	fullTimeFaculty,
	graduateFullTime,
	undergraduatePartTime,
	graduatePartTime,
	undergraduateFullTime,
	semester,
	researcher,
	period,
	course,
	administrator,
	building,
	department,
	major,
	minor,
	day,
	lecture,
	lab,
	office,
	holds,
	timeslots,
	classes

};
