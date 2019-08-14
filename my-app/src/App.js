import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #D3D1BC;
`;

const Alert = styled.div`
  background: red;
  text-align: center;
`;

const BrandTextContainer = styled.h1`
  margin: 0;
  color: white;
  padding-left: 24px;
  text-transform: lowercase;
`;

const NavHeader = styled.div`
  background: #EBCC9D;
  height: 300px;
`;

const HeaderText = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const DoctorCard = styled.div`
  height:700px;
  width: auto;
  border: 10px;
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
`

const InputSearch = styled.input`
  width: 500px;
  height: 35px;
  border: 0;
`;

const Result = styled.div`
  width: 100%;
  margin: 0 40%;
  padding: 10px 0px 10px;
`;

const getExistingDoctors = () => {
  return  fetch("https://testapi.io/api/akirayoglu/0/reference/getDoctors").then((res) =>
  res.json()
  );
}

const getExistingTasks = () => {
  return  fetch("https://testapi.io/api/akirayoglu/0/tasks/getTasks").then((res) =>
  res.json()
  );
}

const App = () => {

  const [doctorData, setDoctorData] = useState();
  const [taskInfo, setTaskInfo] = useState();
  const [searchInfo, setSearchInfo] = useState();
  const [foundDoctors, setFoundDoctor] = useState([]);
  const [alert, setAlert] = useState(false);


  useEffect(() => {
    async function fetchDoctorData() {
      const response = await getExistingDoctors();
      setDoctorData(response)
    }
    fetchDoctorData();
  }, []);

  useEffect(() => {
    async function fetchTaskInfo() {
      const response = await getExistingTasks();
      setTaskInfo(response)
    }
    fetchTaskInfo();
  }, []);

  const findDoctor = (e) => {
    e.preventDefault();
    const foundValue = doctorData.filter((doctor) => 
      searchInfo.includes(doctor.first_name) || searchInfo.includes(doctor.last_name)
    );

    if (foundValue.length > 0 && foundDoctors.find(data => data.doctor_id === foundValue[0].doctor_id)) {
      return setAlert(true)
    }

    if (foundValue.length > 0) {
      setFoundDoctor(foundDoctors ? foundDoctors.concat(foundValue) : foundValue)
      setAlert(false);
    }

    if (!foundValue.length) {
      setAlert(true);
    }
  }

  const showCurrentTasks = (doctor_id) => {
    return (<><h3>Tasks</h3>{taskInfo.map((task) => {
      if (task.owner === doctor_id ) {
        return <div key={task.task_id}>{`Task: ${task.task_id} Priority: ${task.priority}`}</div>
      }
    })}</>);

  }

  if (!doctorData) {
    return(<div>loading now</div>)
  }

  return (
    <AppContainer>
      {alert && <Alert>The doctor is not in our system or is already listed below</Alert>}
      <NavHeader>
        <BrandTextContainer>Galileo</BrandTextContainer>
        <HeaderText> Manage your schedule with ease. </HeaderText>
      </NavHeader>
      <FormContainer id="submit">
          <InputSearch data-testid="search-input" type="text" onChange={(e) => setSearchInfo(e.target.value)} placeholder="Search" name="name" id="name" required/>
          <button data-testid="submit" id="submit" onClick={findDoctor}>Find Doctor</button>
      </FormContainer>
      <DoctorCard>{foundDoctors ? foundDoctors.map(
        (doctor) => {
      return(<Result key={doctor.doctor_id}>
      <h3>{`${doctor.first_name} ${doctor.last_name} `}</h3>
      <div>{`DoB: ${doctor.dob} `}</div>
      <div>{`Degree: ${doctor.degree} `}</div>
      {showCurrentTasks(doctor.doctor_id)}
      </Result>
      )}) : null}</DoctorCard>
    </AppContainer>
  );

  }


export default App;
