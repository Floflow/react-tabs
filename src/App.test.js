import React from 'react';
import { render, act, screen, fireEvent } from "@testing-library/react";
import App from './App';
import "@testing-library/jest-dom/extend-expect";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{
        id: "123",
        order: 1,
        title: "Front-end developer",
        dates: "December-until now",
        duties: ['Hello','You', 'Me'],
        company: "Apple"
      },
      {
        id: "124",
        order: 2,
        title: "Back-end developer",
        dates: "February - December",
        duties: ['This is','Me', 'Again'],
        company: "Google"
      },
      {
        id: "125",
        order: 3,
        title: "Engineering Intern",
        dates: "June - February",
        duties: ['Good afternoon','Me', 'Again'],
        company: "Facebook"
      }
      ]),
  })
);

beforeEach(async()=>{
  await act(async() => render(<App/>));
})

test('Should fetch the data', () => {

  expect(global.fetch).toHaveBeenCalledTimes(1);
  screen.getByText('experiences');
  screen.getByText('Front-end developer');
});

test('Header renders with correct text', () => {
  const headerEl = screen.getByTestId("header");

  expect(headerEl.textContent).toBe('experiences')
});

<<<<<<< HEAD
test('If I click on the Google experience button on the left, I should see its description',()=>{
  const experienceGoogleButtonEl = screen.getByText('Google');
  const experienceFacebookButtonEl = screen.getByText('Facebook');
=======
test('If I click on the Google experience button, its clasName should be active-btn and I should see its description',()=>{
  const experienceButtonEl = screen.getByText('Google');
>>>>>>> da043a222f226c3c845b51d64f87bd6898cda925

  fireEvent.click(experienceGoogleButtonEl);

  expect(experienceButtonEl.className).toBe('job-btn active-btn');
  screen.getByText('Back-end developer');
  screen.getByText('February - December');
  screen.getByText('This is');

  fireEvent.click(experienceFacebookButtonEl);

  screen.getByText('Engineering Intern');
  screen.getByText('June - February');
  screen.getByText('Good afternoon');
})


