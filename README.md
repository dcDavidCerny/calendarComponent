 # 📅 CalendarComponent

Welcome to my Calendar Component project! This lightweight, responsive calendar application is designed to simplify date selection and range picking, demonstrating my expertise in React development.

🚀 Experience it here: [Live Demo](https://dcDavidCerny.github.io/calendarComponent/)

## 📋 Prop Settings

| **Prop Name**       | **Description**                                                                                                                                     | **Default Value**     | **Example Values**      |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|--------------------------|
| **locale**           | The language/locale used for date formatting in the calendar.                                                                                      | `"cs-CZ"`             | `"en-US"`, `"sk-SK"`    |
| **maxDays**          | The maximum number of days a user can select for a range.                               | `30`           | `7`, `14`, `undefined`         |
| **minDate**          | The earliest date that can be selected in the calendar. Users cannot pick a date before this value.                                                | `new Date() - "today's date"`           | `new Date(2025, 0, 1)`  |
| **favouriteDateRanges** | Predefined ranges of dates that users can select with a single click. Each range includes a name, start date, and end date.                        | `undefined`           | `{ name: "Last Minute", from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 7)) } - "ranged from today to 7 days later"` |

## 🚀 Features

- **Range Selection:** Select a range of dates or a single date based on your preferences.
- **Locale Support:** Change the language/locale dynamically.
- **Predefined Ranges:** Use predefined date ranges for quick selection.
- **Customization:** Adjust settings like the maximum selectable range and minimum date.

## 📊 Tech Stack

- **React:** Core framework for building the component and handling dynamic rendering.
- **CSS:** Provides a clean, modern, and responsive user interface.
- **TypeScript:** Ensures type safety, improved maintainability, and robust development practices.
