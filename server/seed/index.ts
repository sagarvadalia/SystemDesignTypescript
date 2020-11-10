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

import administrator = require('./administrator')


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

};
