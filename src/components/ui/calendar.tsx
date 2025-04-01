"use client";

import * as React from "react";

interface CalendarProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  showOutsideDays?: boolean;
}

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function Calendar({
  className,
  value,
  onChange,
  showOutsideDays = true,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState<Date>(
    value instanceof Date ? value : new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  const isSameDay = (
    date1: Date | undefined,
    date2: Date | undefined
  ): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const today = new Date();

  const days: {
    day: number | null;
    outside: boolean;
    month: number;
    year: number;
  }[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    if (showOutsideDays) {
      const prevMonthDays = getDaysInMonth(year, month - 1);
      days.push({
        day: prevMonthDays - firstDayOfMonth + i + 1,
        outside: true,
        month: month - 1,
        year: year,
      });
    } else {
      days.push({ day: null, outside: true, month: month, year: year }); // Añadido month y year
    }
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, outside: false, month: month, year: year });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    if (showOutsideDays) {
      days.push({ day: i, outside: true, month: month + 1, year: year });
    } else {
      days.push({ day: null, outside: true, month: month, year: year }); // Añadido month y year
    }
  }

  const rows: {
    day: number | null;
    outside: boolean;
    month: number;
    year: number;
  }[][] = [];
  for (let i = 0; i < 6; i++) {
    rows.push(days.slice(i * 7, (i + 1) * 7));
  }

  return (
    <div className={`p-3 ${className}`}>
      <div className="flex justify-center items-center relative pt-1">
        <button
          onClick={prevMonth}
          className="absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          {"<"}
        </button>
        <span className="text-sm font-medium">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={nextMonth}
          className="absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        >
          {">"}
        </button>
      </div>

      <table className="w-full border-collapse space-y-1 mt-4">
        <thead>
          <tr className="flex">
            {daysOfWeek.map((day) => (
              <th
                key={day}
                className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="flex w-full mt-2">
              {row.map((dayData, dayIndex) => (
                <td
                  key={dayIndex}
                  className="h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20"
                >
                  {dayData.day !== null && (
                    <button
                      onClick={() => handleDayClick(dayData.day as number)}
                      className={`h-9 w-9 p-0 font-normal ${
                        isSameDay(
                          value,
                          new Date(dayData.year, dayData.month, dayData.day)
                        )
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                          : ""
                      } ${
                        isSameDay(
                          today,
                          new Date(dayData.year, dayData.month, dayData.day)
                        ) &&
                        !isSameDay(
                          value,
                          new Date(dayData.year, dayData.month, dayData.day)
                        )
                          ? "bg-accent text-accent-foreground"
                          : ""
                      } ${
                        dayData.outside
                          ? "text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground"
                          : ""
                      } ${dayData.day === null ? "invisible" : ""}`}
                    >
                      {dayData.day}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
