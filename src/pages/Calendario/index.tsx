import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";
import { useMemo, useState } from "react";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "SEX", "SAB"];

export function Calendario() {
  const today = useMemo(() => new Date(), []);

  const [month, setMonth] = useState(today.getMonth());

  const [selectedDate, setSelectedDate] = useState(today);
  console.log(selectedDate);
  const monthDays = useMemo(() => {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    const dates = [] as { day: number; fullDate: Date }[];

    if (firstDayOfMonth.getDay() !== 1) {
      for (let i = firstDayOfMonth.getDay() - 1; i > 1; i--) {
        const complementaryDate = new Date(firstDayOfMonth);
        complementaryDate.setDate(-i);
        dates.push({
          day: complementaryDate.getDate(),
          fullDate: complementaryDate,
        });
      }

      console.log("last day", lastDayOfMonth);

      for (let i = 0; i != lastDayOfMonth.getDate(); i++) {
        const date = new Date(firstDayOfMonth);
        date.setDate(i);

        dates.push({ day: date.getDate(), fullDate: date });
      }

      if (lastDayOfMonth.getDay() !== 7) {
        let j = 0;
        for (let i = lastDayOfMonth.getDay(); i < 6; i++) {
          const complementaryDate = new Date(lastDayOfMonth);
          complementaryDate.setDate(complementaryDate.getDate() + j);
          dates.push({
            day: complementaryDate.getDate(),
            fullDate: complementaryDate,
          });
          j++;
        }
      }

      return dates;
    }
  }, [today]);

  const isCurrentDate = (aDateString: string) => {
    return new Date(aDateString).getDate() === today.getDate();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === today.getMonth();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const selectDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedDate(new Date(event.target.value));
  };
  return (
    <>
      <header className="gradient-purple p-4 h-[256px]">
        <div className="flex gap-2 items-center text-white">
          <Link to="/" className="pa-2">
            <ArrowBackIcon />
          </Link>
          Datas de vacinação
        </div>
      </header>
      <form className="bg-white -mt-[172px] rounded-t-[52px] pt-12 gap-2 px-4 grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <label key={day} className="text-sm p-2 text-center text-gray-500">
            {day.toUpperCase()}
          </label>
        ))}

        {monthDays?.map((date) => (
          <button
            key={date.fullDate.toDateString()}
            // htmlFor={date.fullDate.toDateString()}
            className={`text-sm p-2 relative max-w-[36px] max-h-[36px] aspect-square flex items-center justify-center mx-auto ${
              isCurrentDate(date.fullDate.toString()) &&
              !isSelectedDate(date.fullDate)
                ? "border-[#713EA2] border-b-4 rounded-sm"
                : ""
            } ${
              isSelectedDate(date.fullDate)
                ? "bg-[#AC85D0] text-white rounded-full"
                : ""
            } ${!isCurrentMonth(date.fullDate) ? "text-gray-300" : ""}`}
            onClick={() => setSelectedDate(date.fullDate)}
            type="button"
          >
            {/* <input
              id={date.fullDate.toDateString()}
              className="absolute inset-0 appearance-none"
              type="radio"
              value={date.fullDate.toDateString()}
              disabled={!isCurrentMonth(date.fullDate)}
              onChange={selectDate}
            /> */}
            {date.day}
          </button>
        ))}
      </form>
    </>
  );
}
