import React from "react";

import axios from "axios";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

import { waitForElement } from "@testing-library/react";

import { fireEvent } from "@testing-library/react";

import { getByText } from "@testing-library/react";

import { queryByText } from "@testing-library/react";

import { prettyDOM } from "@testing-library/react";

import { getAllByTestId } from "@testing-library/react";

import { getByAltText } from "@testing-library/react";

import { getByPlaceholderText } from "@testing-library/react";

import { queryByAltText } from "@testing-library/react";

import { queryAllByText } from "@testing-library/react";

afterEach(cleanup);



describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Find an existing interview
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. With the existing interview we want to find the edit button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4.  Enter the student name and save interview
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click the interviewer  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Wait to see the SAVING 
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    // 7.  Wait to see the appointment displayed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 8. Check that the DayListItem with the text "Monday" and keeps the spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // insert the rejection
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // 3.  Click on the Add button
    fireEvent.click(getByAltText(appointment, "Add"));
    //4. Enter student name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5.  Click on interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //6. Click on save
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Display SAVING
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    // 8. Wait for error to be displayed 
    await waitForElement(() => getByText(appointment, "Error Saving Appointment"));
    expect(getByText(appointment, "Error Saving Appointment")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    //insert the rejection
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    // 7. Wait for error to be displayed.
    await waitForElement(() => getByText(appointment, "Error Deleting Appointment"));
    expect(getByText(appointment, "Error Deleting Appointment")).toBeInTheDocument();
  });
});
