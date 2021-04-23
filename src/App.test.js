import React from 'react';
import { render, act, screen } from "@testing-library/react";
import App from './App';
import "@testing-library/jest-dom/extend-expect";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{
        id: "123",
        order: 1,
        title: "Front end developer",
        dates: "December-until now",
        duties: ['Hello','You', 'Me'],
        company: "Apple"
      },
      {
        id: "124",
        order: 2,
        title: "Back end developer",
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

  expect(screen.getByText("Front end developer")).toBeInTheDocument();
});

test('Header renders with correct text', () => {
  const headerEl = screen.getByTestId("header");

  expect(headerEl.textContent).toBe('experiences')
});


