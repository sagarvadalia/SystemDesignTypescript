## Use-Cases
## TODO: handle multiple password attempts and forgotten passwords
## DONE:
Administrators want to create, change, and update accounts for all users.
## DONE: use admin buttons
## TODO: Attendance

## TODO:
Researcher wants to view anonymous data about the college.
## DONE
User wants to view the homepage

Entry Condition

User enters in localhost:3000 to the address bar

Actors

Visitor, student, administrator, or researcher

Exit Condition

Landing page loads

## Done
User wants to view the current semester master schedule

Entry Condition

Visitor, student, administrator, or researcher navigates to the landing page

Actors

Visitor, student, administrator, or researcher

Exit Conditions
## DONE
User scrolls down to the current semester master schedule

User wants to view the next semester master schedule

Entry Condition

Visitor, student, administrator, or researcher navigates to the landing page.

Actors

Visitor, student, administrator, or researcher

Basic Flow

User scrolls down to the current semester master schedule

User clicks a breadcrumb that displays the next semester’s master schedule.

Exit Conditions

User views the next semester’s master schedule.
## DONE

User wants to view the academic calendar

Entry Condition

Visitor, student, administrator, or researcher navigates to the landing page

Actors

Visitor, student, administrator, or researcher

Exit Conditions

User scrolls down to the academic catalog.
## DONE
User wants to search for the course catalog

Entry condition

Visitor, student, administrator, or researcher navigates to the landing page

Actors

Visitor, student, administrator, or researcher

Basic Flow
## DONE

User scrolls down to the Course Catalog

User clicks on the search button

User enters relevant parameters (department, major, course name)

Exit Condition

User finds course based on parameters entered
## DONE

User wants to search for a class

Entry Condition

Visitor, student, administrator, or researcher navigates to the landing page

Actors

Visitor, Student, Administrator, or Researcher

Basic Flow

User scrolls down to the master schedule

User clicks on search for classes button

User enters relevant parameters (course name, professor name, department, day, and period).

Exit Conditions

User finds classes based on parameters entered
## DONE

User wants to login

Entry Condition

Student, administrator, or researcher navigates to the landing page

Actors

Student, Administrator, or researcher

Basic Flow

User clicks on the login button located in the navbar of the landing page

User enters valid email address and password

System verifies account

Error Condition

The user enters an invalid username or password

The System will display the corresponding message in red

Exit Condition

System logs in user and navigates back to homepage
## DONE

Student wants to view their current semester schedule.

Entry Condition

 Student Logs in

Actors

Student

Exit conditions

Homepage gets populated with current semester schedule
## DONE

Student wants to view their next semester schedule

Entry Condition

Student Logs in

Actors

Student

Basic Flow

Homepage gets populated with current semester schedule

Student clicks on a breadcrumb that displays the next semester schedule

Exit condition

Student views the next semester schedule

## DONE

Student wants to view their holds

Entry Condition

Student Logs in

Actors

Student

Basic Flow

System populates hold information to a table on the right side of the homepage

Exit Condition

Student views hold information
## DONE

Student wants to view their transcript

Entry Condition

Student Logs In

Actors

Student

Basic Flow

System populates homepage with a link in the navbar that navigates to the transcript

Student clicks the link

Exit condition

System displays transcript
## DONE

Student wants to view their advisors

Entry Condition

Student Logs in

Actors

Student

Basic Flow

System populates homepage with a link in the navbar that navigates to the advisor information

Student clicks the link

Exit condition


System displays their advisor information
## DONE

Student wants to view their degree audit

Entry Condition

Student Logs In

Actors

Student

Basic Flow

System populates homepage with a link in the navbar that navigates to the degree audit

Student clicks the link

Exit condition

System displays their degree audit
## DONE

Student wants to declare/change a major/minor

Entry Condition

Student Logs in

Actors

Student

Basic Flow

System populates homepage with a table that displays major/minor information and has links for changing major/minor below hold information

Student clicks link for changing major/minor

Student selects major/minor from a dropdown and hits submit

Exit Condition

Information is sent to department head for approval
## DONE
Student wants to view major/minor requirements

Entry Condition

Student Logs In

Actors

Student

Basic Flow

System populates homepage with a table that displays major/minor information and has links for viewing requirements

Student clicks link for viewing major/minor requirements

Exit Condition

System displays requirements left to be completed for major/minor
## DONE

Student wants to add a class

Entry Condition

Student Logs In

Actors

Student

Basic Flow

System populates homepage with a link in the navbar labeled registration

Student clicks on link

System populates following navbar with a link for adding classes

Student clicks link

System displays select dropdowns for various course parameters such as course name, professor name, department, day, and period.

Student hits submit button

System displays a list of courses that match the parameters

Student clicks the add button on a course

System verifies that student can add the course by checking if it fits in the student’s schedule, if the prerequisites are met, if the student has no holds, if the class has an open seat, and if student is allowed to add classes during this time period.

Error Condition

## TODO:

Student does not have prerequisite requirements met

Student does not have required grade

Student is already taking max amount of credits

The system will display an error message as an alert to the student and then navigate back to the student’s current list of classes

Exit Condition

If student can add the course, relevant database tables are updated. If not, system displays the reason the course was not added

Student wants to drop a class
## DONE

Entry Condition

Student Logs In

Actors

Student

Basic Flow

System populates homepage with a link in the navbar labeled registration

Student clicks on link

System populates following navbar with a link for dropping classes

Student clicks link

System populates view with a student’s current list of classes.

Student clicks a drop button next to the class they want to drop.

System verifies that student can drop the course by verifying that students can drop courses at the current time period.

Error Condition
## TODO:

If the student is not allowed to drop the course because it is not the drop time period

The System will display an error message as an alert to the student and then navigate back to the student’s current list of classes

Exit Condition

If the student can drop the course, relevant database tables are updated. If not, system displays the reason the course was not dropped


## DONE
Faculty wants to view their current semester schedule.

Entry Condition

Faculty Logs in

Actors

Faculty

Exit conditions

Homepage gets populated with current semester schedule

Faculty wants to view their next semester schedule

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

Homepage gets populated with current semester schedule

Faculty clicks on a button that displays the next semester schedule

Exit condition

Faculty views the next semester schedule
## DONE
Faculty wants to view class roster for each class they are teaching

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

There will be a link that takes faculty to a list of the classes they are teaching

Each class will have a roster along with it

Exit condition

Faculty views class rosters for each class they are teaching
## DONE

Faculty wants to view necessary student information including their course history

Entry condition

Faculty logs in and navigates to their class rosters

Actors

Faculty

Basic Flow

Within the class roster will be a link including student information, and will provide the faculty with things such as course history

Exit condition

Faculty has full view of specific student information
## DONE
Faculty wants to see a list of their advisees

Entry condition

Faculty logs in

Actors

Faculty

Basic Flow

Faculty has a link that takes them to a list of their advisees

Exit condition

Faculty has view of all their advisees including a link to their information
## DONE

Faculty wants to upload midterm grades for a class

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

Faculty will navigate the homepage to a link for their gradebook
## TODO:

If midterm grade submission is allowed (only allowed during certain dates), the system will display a form for the faculty to fill out

Once there they will be able to submit grades

Error Condition

If the current time is not within the grade submission time period, the faculty will get an alert pop up explaining the error and navigate it back to the gradebook

Exit condition

Faculty uploads student’s midterm grades
## DONE

Faculty wants to upload final grades for a class

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

Faculty will navigate the homepage to a link for their gradebook
## TODO:

If final grade submission is allowed (only allowed during certain dates), the system will display a form for the faculty to fill out

Once there they will be able to submit grades

Error Condition

If the current time is not within the grade submission time period, the faculty will get an alert pop up explaining the error and navigate it back to the gradebook

Exit condition

Faculty uploads student’s final grades
## DONE
Faculty wants to search the master schedule

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

Faculty is prompted at the homepage with the master schedule

Breadcrumb available to see current or next semester

Exit condition

Faculty has full view of master schedule
## TODO:
Faculty wants to take attendance of a class

Entry Condition

Faculty logs in

Actors

Faculty

Basic Flow

Faculty visits the homepage and navigates to their class roster

From the class roster they can take attendance of which students were present in the class

Exit condition

Faculty can check off attendance for students present in the class


## DONE
Administrators want to prepare and update the master schedule.

Entry Condition

Administrator logs in

Actors

Administrator

Basic Flow

System populates homepage with a link in the navbar labeled Master Schedule Modification

Administrator clicks on the link

Administrator inputs relevant course information (crn, date, time)

System populates the database

Exit condition

System displays updated master schedule
##  DONE

Administrators want to cancel or change times of classes

Entry Condition

Administrator logs in

Actors

Administrator

Basic Flow

Administrator visits homepage, navigates to a link that brings them to “Class Modifications”

 Here the administrator can cancel or change the times of classes

Administrator then must inform students and faculty about these changes

Error Conditions

Administrator changes schedule making two classes at the same date and time

The system will display an alert to the administrator, then it will revert any changes made that caused the error.

Exit condition

Administrator successfully cancels or changes a class/classes schedule
## DONE
Administrators want to inform students of schedule/class changes

Entry Condition

Administrator edits schedule or classes

Actors

Administrator

Basic Flow

Administrator clicks on a button labeled view class roster

System displays class roster as well as a button for emailing all students

Administrator clicks email all students

System displays email form for administrator to fill out

Exit condition

Administrator clicks send email
## DONE

Administrators want to add/edit the holds on a student’s account.

Entry Condition

Administrator logs in

Actors

Administrator

Basic Flow

System populates navbar with a link labeled Student Modifications

Administrator clicks the link

System displays an edit text field where administrator enters in a user id for the student, they want to modify

System populates a link in the navbar labeled holds

Administrator clicks the link

Administrator fills out a hold change form

Exit condition

Administrator submits form
## DONE
Administrators want to update student’s grades upon faculty request

Entry Condition

Administrator logs in

Actors

Administrator

Basic Flow

Administrator visits homepage, then navigates to a link “Student Modifications”

While viewing this page the Administrator can change a student’s grade depending on what the faculty has submitted

Exit condition

Student’s grades are approved and updated
## DONE

Administrators want to add/remove students from classes upon faculty request

Entry Condition

 Administrator logs in

Actors

Administrator

Basic Flow

 Administrator visits homepage, then navigates to a link “Student Modifications”

Once one this page an administrator can add/or a remove a student to a specific class, if necessary, requirements are met.

Exit condition

Student gets added or dropped from a class
## TODO:
Administrators want to create, change, and update accounts for all users.

Entry Condition

Administrator logs in

Actors

Administrator

Basic Flow

System populates navbar with a link for account modification

Administrator clicks on the link

System displays various buttons for crud operations

Administrator clicks on relevant button

Administrator then fills out a form for the crud operation

Exit condition

Administrator hits submit on form
## TODO:
Researcher wants to view anonymous data about the college.

Entry condition

Researcher logs in

Actors

Researcher

Basic Flow

Navbar populates with a link labeled data

Researcher clicks the link

Exit condition

System displays anonymous data.
