import React from 'react';
import { render, wait, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';
import fetchMock from 'fetch-mock';

const doctorResponse = [ { "doctor_id": "doctor1", "first_name": "Martha", "last_name": "Powell", "dob": "04/08/1966", "degree": "MD" }, { "doctor_id": "doctor2", "first_name": "Jessica", "last_name": "Williamson", "dob": "03/07/1977", "degree": "MD" }, { "doctor_id": "doctor3", "first_name": "Scott", "last_name": "Dunn", "dob": "11/23/1978", "degree": "GP" }, { "doctor_id": "doctor4", "first_name": "Cynthia", "last_name": "Lopez", "dob": "02/19/1974", "degree": "MD" } ];
const taskResponse = [ { "task_id": "task1", "owner": "doctor1", "priority": "1" }, { "task_id": "task2", "owner": "doctor1", "priority": "2" }, { "task_id": "task3", "owner": "doctor2", "priority": "1" }, { "task_id": "task4", "owner": "doctor2", "priority": "2" }, { "task_id": "task5", "owner": "doctor2", "priority": "3" }, { "task_id": "task6", "owner": "doctor3", "priority": "1" }, { "task_id": "task7", "owner": "doctor3", "priority": "2" }, { "task_id": "task8", "owner": "doctor3", "priority": "3" }, { "task_id": "task9", "owner": "doctor3", "priority": "4" }, { "task_id": "task10", "owner": "doctor4", "priority": "3" }, { "task_id": "task11", "owner": "doctor4", "priority": "4" }, { "task_id": "task12", "owner": "doctor4", "priority": "5" } ];

it(`renders loading screen if data isn't loaded`, () => {
  const { getByText } = render(<App />);
  expect(getByText('loading now')).toBeInTheDocument();
});

it(`renders initial screen`, async () => {
  fetchMock.get('https://testapi.io/api/akirayoglu/0/reference/getDoctors', doctorResponse)
  fetchMock.get(`https://testapi.io/api/akirayoglu/0/tasks/getTasks`, taskResponse)
  const { getByText } = render(<App />);
  await wait(() => getByText('Galileo'))
});

it(`renders doctors`, async () => {
  const { getByTestId, getByText } = render(<App />);
  const input = await waitForElement(() => getByTestId('search-input'));
  const submit = getByTestId('submit');
  fireEvent.change(input, { target: { value: 'Martha' } });
  fireEvent.click(submit);
  expect(getByText('Martha Powell')).toBeInTheDocument();
});

