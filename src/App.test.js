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
      }
      ]),
  })
);

beforeEach(async()=>{
  await act(async() => render(<App/>));
})

test('Should fetch the data', () => {

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(screen.getByText("Front-end developer")).toBeInTheDocument();
});

test('Header renders with correct text', () => {
  const headerEl = screen.getByTestId("header");

  expect(headerEl.textContent).toBe('experiences')
});

test('If I click on the Google experience button, its clasName should be active-btn and I should see its description',()=>{
  const experienceButtonEl = screen.getByText('Google');

  fireEvent.click(experienceButtonEl);

  expect(experienceButtonEl.className).toBe('job-btn active-btn');
  screen.getByText('Back-end developer');
  screen.getByText('February - December');
  screen.getByText('This is');
})


