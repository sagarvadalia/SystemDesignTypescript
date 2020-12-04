import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { LoginContext } from '../../LoginContext';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';

function TabPanel(props) {
  const [state, setState] = useContext(LoginContext);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const [state, setState] = useContext(LoginContext);
  async function addClass(classCRN) {

    let result = await axios(`/api/enroll/${state.user.userID}/${classCRN}`)
    let currSched = await axios.get(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/9`)
    setSched(currSched.data);
  }
  async function dropClass(enrollmentID) {
    // console.log(enrollmentID);
    let result = await axios.delete(`/api/enrollment/delete/${enrollmentID}`)
    let currSched = await axios.get(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/9`)
    setSched(currSched.data);
  }
  const classes = useStyles();

  const [data, setData] = useState([{ courseID: { deptID: {} }, fID: {}, roomID: { buildings: {} } }]);
  const [sched, setSched] = useState([{ classCRN: { courseID: {} }, fID: {}, slotID: { days: '', periodID: {} } }]);
  useEffect(() => {
    const fetchData = async () => {
      const classList = await axios(`/api/classes/semester/9`);
      console.log(classList.data);
      const currSched = await axios(`/api/enrollment/studentHistoryBySemester/${state.user.userID}/9`);
      // console.log(currSched.data[0]);

      setData(classList.data);

      setSched(currSched.data);
    };

    fetchData();
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Add a Class" {...a11yProps(0)} />
          <Tab label="Drop a Class" {...a11yProps(1)} />
          <Tab label="Add a Major" {...a11yProps(2)} />
          <Tab label="Drop a Major" {...a11yProps(3)} />
          <Tab label="Add a Minor" {...a11yProps(4)} />
          <Tab label="Drop a Minor" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MaterialTable
          title={<div>Class List</div>}
          columns={[
            { title: 'Class CRN', field: 'classCRN' },
            { title: 'Course Name', field: 'courseID.courseName' },
            { title: 'Course Description', field: 'courseID.courseDesc' },
            { title: 'Credits', field: 'courseID.numOfCredits' },
            { title: 'Department', field: 'courseID.deptID.deptName' },
            { title: 'Teacher', field: 'fID.userName' },
            { title: 'Building Name', field: 'roomID.buildings.buildingName' },
            { title: 'Room Number', field: 'roomID.roomNum' },
            { title: 'Link to Add', field: '', render: (rowData) => <Button onClick={() => addClass(rowData.classCRN)}>Add this Class</Button>, }
          ]}
          data={data}
          options={{
            sorting: true,
            searching: true,
            exportButton: true,
          }}
        />






      </TabPanel>
      <TabPanel value={value} index={1}>

        <div>
          <div style={{ maxWidth: '100%' }}>
            <MaterialTable
              title="Current Semester Schedule"
              columns={[
                { title: 'Course ID', field: 'classCRN.courseID.courseID' },
                { title: 'Course Name', field: 'classCRN.courseID.courseName' },
                { title: 'Course Description', field: 'classCRN.courseID.courseDescription' },
                { title: 'Credits', field: 'classCRN.courseID.numOfCredits' },
                { title: 'Teacher Name', field: 'classCRN.fID.userName' },
                { title: 'Days of the Week', field: 'classCRN.slotID.days' },
                { title: 'Start Time', field: 'classCRN.slotID.periodID.startTime' },
                { title: 'End Time', field: 'classCRN.slotID.periodID.endTime' },
                { title: 'Drop this Class here', field: '', render: (rowData) => <Button onClick={() => dropClass(rowData.enrollmentID)}>Drop this Class</Button>, }
              ]}
              data={sched}
              options={{
                sorting: true,
              }}
            />
          </div>
        </div>

      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Three
      </TabPanel>
    </div>
  );
}
