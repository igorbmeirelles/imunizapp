import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";
import { useMemo } from "react";

export function Calendario() {
  const monthDays = useMemo(() => {
    const today = new Date(Date.now());
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    console.log("today", today);

    const dates = [];

    if (firstDayOfMonth.getDay() !== 1) {
      for (let i = firstDayOfMonth.getDay() - 1; i > 1; i--) {
        const complementaryDate = new Date(firstDayOfMonth);
        complementaryDate.setDate(-i);
        dates.push(complementaryDate.getDate());
      }

      console.log("last day", lastDayOfMonth);

      for (let i = 0; i != lastDayOfMonth.getDate(); i++) {
        const date = new Date(firstDayOfMonth);
        date.setDate(i);

        dates.push(date.getDate());
      }

      if (lastDayOfMonth.getDay() !== 7) {
        console.log(lastDayOfMonth.getDay())
        let j = 0;
        for (let i = lastDayOfMonth.getDay(); i < 8; i++) {
          const complementaryDate = new Date(lastDayOfMonth);
          complementaryDate.setDate(complementaryDate.getDate() + j);
          dates.push(complementaryDate.getDate());
          j++;
        }
      }

      return dates;
    }
  }, []);
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
      <div className="bg-white -mt-[172px] gap-4 rounded-t-[52px] pt-12 px-4 grid grid-cols-7">
        {monthDays?.map((date, index) => (
          <div key={index} className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        ))}
      </div>
    </>
  );
}
