import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

export default function CalendarComponent() {
  const [leftMonth, setLeftMonth] = useState(new Date(2025, 0, 1));
  const [rightMonth, setRightMonth] = useState(new Date(2025, 1, 1));

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleLeftMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date;
  }) => {
    setLeftMonth(activeStartDate);
    setRightMonth(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1)
    );
  };

  const handleRightMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date;
  }) => {
    setRightMonth(activeStartDate);
    setLeftMonth(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1)
    );
  };

  const handleDateChange = (date: Date) => {
    if (!fromDate && !toDate) {
      // If both fromDate and toDate are null, set first clicked date as fromDate
      setFromDate(date);
    } else if (!toDate) {
      // If toDate is null, set it as toDate if the clicked date is later than fromDate
      if (date > fromDate) {
        setToDate(date);
      } else {
        // Swap the dates if clicked date is earlier than fromDate
        setToDate(fromDate);
        setFromDate(date);
      }
    } else {
      // If both dates are already set, reset the range
      setFromDate(date);
      setToDate(null);
    }
  };

  return (
    <div className="flex">
      <div className="mr-5">
        <ReactCalendar
          onActiveStartDateChange={handleLeftMonthChange}
          onChange={handleDateChange}
          value={leftMonth}
          view="month"
        />
      </div>
      <div>
        <ReactCalendar
          onActiveStartDateChange={handleRightMonthChange}
          onChange={handleDateChange}
          value={rightMonth}
          view="month"
        />
      </div>
      <div>
        <h2>Selected Dates</h2>
        <p>
          From: {fromDate ? fromDate.toDateString() : "None"}
          <br />
          To: {toDate ? toDate.toDateString() : "None"}
        </p>
      </div>
    </div>
  );
}

// installed tailwind and so much more
// so many commands to verify the installation
// everything looks okay
// but tailwind is not working
// what is wrong?
// other stuff too...

// useState for from date and to date
// if both are empty the first clicked date will be from date
// if second clicked will be later than the first clicked date, the second clicked date will be the to date
// if second clicked will be earlier than the first clicked date, the second date will replace the from date and the first date will be the to date
