import { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import styled from "@emotion/styled";

export interface CalendarProps {
  locale?: string;
  maxDays?: number;
  minDate?: Date;
  maxDate?: Date;
  favouriteDateRanges?: { name: string; from: Date; to: Date }[];
}
export default function CalendarComponent({
  locale,
  minDate,
  favouriteDateRanges,
  maxDays,
}: CalendarProps) {
  const [leftMonth, setLeftMonth] = useState(new Date(2025, 0, 1));
  const rightMonth = new Date(
    leftMonth.getFullYear(),
    leftMonth.getMonth() + 1,
    1
  );

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleLeftMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (!activeStartDate) return;
    setLeftMonth(activeStartDate);
  };

  const handleRightMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (!activeStartDate) return;
    setLeftMonth(
      new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1)
    );
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      alert("Date is null");
      return;
    }
    if (!fromDate && !toDate) {
      setFromDate(date);
    } else if (fromDate === date) {
      setFromDate(null);
      setToDate(null);
    } else if (!toDate) {
      if (date > fromDate!) {
        setToDate(date);
      } else {
        setToDate(fromDate);
        setFromDate(date);
      }
    } else {
      setFromDate(date);
      setToDate(null);
    }
  };

  return (
    <div className="flex flex-col mt-20">
      <FavouriteDatesWrapper className="flex justify-center">
        {favouriteDateRanges &&
          favouriteDateRanges.map((range) => (
            <button
              key={range.name}
              className="m-2 text-sky-400 text-lg font-semibold"
              onClick={() => {
                setFromDate(range.from);
                setToDate(range.to);
              }}
            >
              {range.name}
            </button>
          ))}
      </FavouriteDatesWrapper>
      <BothCalendarWrapper className="flex justify-center mt-5 ">
        <CalendarComponentWrapper>
          <ReactCalendar
            className="mr-5"
            onActiveStartDateChange={handleLeftMonthChange}
            onChange={handleDateChange}
            activeStartDate={leftMonth}
            view="month"
            value={!toDate ? fromDate : [fromDate, toDate]}
            locale={locale}
            minDate={minDate}
            nextLabel={null}
            next2Label={null}
            prev2Label={null}
            formatDay={(_, date) => date.getDate().toString()}
            maxDate={
              fromDate && maxDays
                ? new Date(fromDate.getTime() + maxDays * 24 * 60 * 60 * 1000)
                : undefined
            }
          />
        </CalendarComponentWrapper>
        <CalendarComponentWrapper>
          <ReactCalendar
            onActiveStartDateChange={handleRightMonthChange}
            onChange={handleDateChange}
            activeStartDate={rightMonth}
            view="month"
            value={!toDate ? fromDate : [fromDate, toDate]}
            locale={locale}
            minDate={minDate}
            prevLabel={null}
            next2Label={null}
            prev2Label={null}
            formatDay={(_, date) => date.getDate().toString()}
            maxDate={
              fromDate && maxDays
                ? new Date(fromDate.getTime() + maxDays * 24 * 60 * 60 * 1000)
                : undefined
            }
          />
        </CalendarComponentWrapper>
      </BothCalendarWrapper>
    </div>
  );
}

const CalendarComponentWrapper = styled.div`
  .react-calendar {
    border: none;
  }
  .react-calendar__navigation__label__labelText,
  .react-calendar__navigation__arrow {
    color: rgb(0, 0, 255);
  }

  .react-calendar__navigation__arrow {
    background-color: transparent !important;
  }
  .react-calendar__navigation__label {
    background-color: transparent !important;
    cursor: default !important;
    pointer-events: none !important;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    color: grey;
    font-weight: 100;
  }

  .react-calendar__month-view__days__day abbr {
    color: black;
    font-weight: 100;
  }

  .react-calendar__month-view__days__day--weekend abbr {
    color: black;
    font-weight: bold;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: #6fc9ec !important;
  }

  .react-calendar__tile--range {
    background-color: #f0f0f0;
  }

  .react-calendar__month-view__days__day[disabled] {
    background-color: transparent;
    cursor: not-allowed;
  }

  .react-calendar__tile--now {
    background: #bababa;
  }

  @media (max-width: 600px) {
    .favouriteDateRangesDiv {
      flex-direction: column;
      flex-wrap: wrap;
    }
    &:first-child {
      border-bottom: 1px solid #afafaf99;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  }
`;

const BothCalendarWrapper = styled.div`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-left: 4vw;
  }
`;

const FavouriteDatesWrapper = styled.div`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
