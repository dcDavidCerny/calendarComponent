import { useState } from "react";
import "./App.css";
import CalendarComponent from "./Calendar";
import styled from "@emotion/styled";

function App() {
  const [locale, setLocale] = useState<
    "cs-CZ" | "en-US" | "es-ES" | "sk-SK" | "de-DE"
  >("cs-CZ");
  const [maxDays, setMaxDays] = useState<number | undefined>(30);
  const [minDate, setMinDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });

  const favouriteDateRangesTranslations = {
    "cs-CZ": {
      lastMinute: "Poslední šance",
      janFeb: "Leden / Únor 2025",
      summerHolidays: "Letní prázdniny 2025",
      winterHolidays: "Zimní prázdniny 2025",
    },
    "en-US": {
      lastMinute: "Last Minute",
      janFeb: "January / February 2025",
      summerHolidays: "Summer Holidays 2025",
      winterHolidays: "Winter Holidays 2025",
    },
    "es-ES": {
      lastMinute: "Última Hora",
      janFeb: "Enero / Febrero 2025",
      summerHolidays: "Vacaciones de Verano 2025",
      winterHolidays: "Vacaciones de Invierno 2025",
    },
    "sk-SK": {
      lastMinute: "Posledná šanca",
      janFeb: "Január / Február 2025",
      summerHolidays: "Letné prázdniny 2025",
      winterHolidays: "Zimné prázdniny 2025",
    },
    "de-DE": {
      lastMinute: "Last Minute",
      janFeb: "Januar / Februar 2025",
      summerHolidays: "Sommerferien 2025",
      winterHolidays: "Winterferien 2025",
    },
  };

  return (
    <AppWrapper>
      <div>
        <div className=" bg-gray-500">
          <h2 className="text-2xl font-bold flex justify-center p-2 mb-2 text-gray-200">
            PROPS SETTINGS:
          </h2>
          <div className="propsSettings flex flex-row justify-center">
            <div className="languageBox mr-7">
              <h3 className="text-2xl font-bold flex justify-center">
                language:
              </h3>
              <div className="languagesContainer flex flex-row justify-center">
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setLocale("cs-CZ")}
                  data-selected={locale === "cs-CZ"}
                >
                  Czech
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setLocale("en-US")}
                  data-selected={locale === "en-US"}
                >
                  English
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setLocale("es-ES")}
                  data-selected={locale === "es-ES"}
                >
                  Spanish
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setLocale("sk-SK")}
                  data-selected={locale === "sk-SK"}
                >
                  Slovak
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setLocale("de-DE")}
                  data-selected={locale === "de-DE"}
                >
                  German
                </button>
              </div>
            </div>

            <div className="daysBox ml-7 mr-7">
              <h3 className="text-2xl font-bold flex justify-center">
                Maximum Days to Pick:
              </h3>
              <div className="daysContainer flex flex-row justify-center">
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setMaxDays(7)}
                  data-selected={maxDays === 7}
                >
                  7
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setMaxDays(14)}
                  data-selected={maxDays === 14}
                >
                  14
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setMaxDays(30)}
                  data-selected={maxDays === 30}
                >
                  30
                </button>
                <button
                  className="p-3 m-5 w-12.5 rounded-lg bg-gray-200 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setMaxDays(undefined)}
                  data-selected={maxDays === undefined}
                >
                  undefined
                </button>
              </div>
            </div>

            <div className="minDateBox flex flex-col ml-7">
              <h3 className="text-2xl font-bold flex justify-center">
                Min Date to Pick:
              </h3>
              <input
                className="flex justify-center text-xl mt-5"
                type="date"
                onChange={(e) => setMinDate(new Date(e.target.value))}
                onClick={(e) => {
                  const input = e.target as HTMLInputElement;
                  input?.showPicker();
                }}
              />
            </div>
          </div>
          {selectedDates.from && selectedDates.to && (
            <span className="flex justify-center text-white font-semibold text-xl p-2">
              selected dates:{" "}
              {`${selectedDates.from?.toLocaleDateString()} - ${selectedDates.to?.toLocaleDateString()}`}
            </span>
          )}
        </div>
        <CalendarComponent
          locale={locale}
          maxDays={maxDays}
          minDate={minDate}
          favouriteDateRanges={[
            {
              name:
                favouriteDateRangesTranslations[locale]?.lastMinute ||
                "Poslední šance",
              from: new Date(),
              to: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
            {
              name:
                favouriteDateRangesTranslations[locale]?.janFeb ||
                "Leden / Únor 2025",
              from: new Date("2025-01-01"),
              to: new Date("2025-02-28"),
            },
            {
              name:
                favouriteDateRangesTranslations[locale]?.summerHolidays ||
                "Letní prázdniny 2025",
              from: new Date("2025-06-01"),
              to: new Date("2025-08-31"),
            },
            {
              name:
                favouriteDateRangesTranslations[locale]?.winterHolidays ||
                "Zimní prázdniny 2025",
              from: new Date("2025-12-19"),
              to: new Date("2026-01-02"),
            },
          ]}
          onChange={(dates) => setSelectedDates(dates)}
        />
        ;
      </div>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  .daysContainer button[data-selected="true"] {
    border: 2px solid black;
  }
  .languagesContainer button[data-selected="true"] {
    border: 2px solid black;
  }
  @media (max-width: 600px) {
    .propsSettings {
      flex-direction: column;
      align-items: center;
    }

    .languageBox,
    .daysBox,
    .minDateBox {
      margin: 10px 0;
      width: 100%;
      text-align: center;
    }

    .languagesContainer,
    .daysContainer {
      flex-wrap: wrap;
    }

    .languagesContainer button,
    .daysContainer button {
      padding: 8px;
      margin: 5px;
      width: auto;
    }

    input[type="date"] {
      width: 50vw;
      font-size: 16px;
      margin-left: 25vw;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }
`;

export default App;
