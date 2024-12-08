import { Link } from "react-router-dom";
import { ArrowBackIcon } from "../../components/icons/back-arrow";
import { useMemo, useState } from "react";
import { ChevronLeft } from "../../components/icons/chevron_left";
import { ChevronRight } from "../../components/icons/chevron_right";
import { usePrismicDocumentsByType } from "@prismicio/react";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "SEX", "SAB"];

export function Calendario() {
  const today = useMemo(() => new Date(), []);

  const [selectedDate, setSelectedDate] = useState(today);

  const [document] = usePrismicDocumentsByType("calendario_de_vacinas");

  const vaccinesThisMonth = useMemo((): {
    name: string;
    startAt: Date;
    endsAt: Date;
  }[] => {
    return (
      document?.results[0].data.slices.map(
        (slice: {
          primary: { nome: string; comeca_em: string; temina_em: string };
        }) => {
          const startDate = slice.primary.comeca_em.split("-");
          const endDate = slice.primary.temina_em.split("-");
          return {
            name: slice.primary.nome,
            startAt: new Date(
              Number(startDate[0]),
              Number(startDate[1]),
              Number(startDate[2])
            ),
            endsAt: new Date(
              Number(endDate[0]),
              Number(endDate[1]),
              Number(endDate[2])
            ),
          };
        }
      ) ?? []
    );
  }, [document]);

  const vaccineForThisDate = useMemo(() => {
    return vaccinesThisMonth.filter((vaccine) => {
      return (
        selectedDate.toLocaleDateString("pt-br") >=
          vaccine.startAt.toLocaleDateString("pt-br") &&
        selectedDate.toLocaleDateString("pt-br") <=
          vaccine.endsAt.toLocaleDateString("pt-br")
      );
    });
  }, [selectedDate, vaccinesThisMonth]);


  const monthDays = useMemo(() => {
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );

    const lastDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );

    const dates = [] as { day: number; fullDate: Date }[];

    for (let i = Math.abs(firstDayOfMonth.getDay()) - 1; i >= 0; i--) {
      const complementaryDate = new Date(firstDayOfMonth);
      complementaryDate.setDate(-i);
      dates.push({
        day: complementaryDate.getDate(),
        fullDate: complementaryDate,
      });
    }

    for (
      let i = firstDayOfMonth.getDate();
      i != lastDayOfMonth.getDate();
      i++
    ) {
      const date = new Date(firstDayOfMonth);
      date.setDate(i);

      dates.push({ day: date.getDate(), fullDate: date });
    }

    let j = 0;
    for (let i = lastDayOfMonth.getDay(); i < 7; i++) {
      const complementaryDate = new Date(lastDayOfMonth);
      complementaryDate.setDate(complementaryDate.getDate() + j);
      dates.push({
        day: complementaryDate.getDate(),
        fullDate: complementaryDate,
      });
      j++;
    }

    return dates;
  }, [selectedDate]);

  const isCurrentDate = (aDateString: string) => {
    const todayDate = new Date(aDateString);
    return (
      todayDate.getDate() === today.getDate() &&
      todayDate.getMonth() === today.getMonth() &&
      todayDate.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const addMonth = (orientation: "increment" | "decrement") => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(
      selectedDate.getMonth() + (orientation === "increment" ? 1 : -1)
    );
    setSelectedDate(newDate);
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
        <div className="col-span-7 flex justify-between items-center mb-2">
          <button
            onClick={() => addMonth("decrement")}
            className="text-sm text-gray-500"
            type="button"
          >
            <ChevronLeft />
          </button>
          <h1 className="text-sm font-medium text-gray-500">
            {selectedDate
              .toLocaleString("pt-BR", { month: "long" })
              .toLocaleUpperCase()}
          </h1>
          <button
            onClick={() => addMonth("increment")}
            className="text-sm text-gray-500"
            type="button"
          >
            <ChevronRight />
          </button>
        </div>
        {daysOfWeek.map((day) => (
          <label key={day} className="text-sm p-2 text-center text-gray-500">
            {day.toUpperCase()}
          </label>
        ))}

        {monthDays?.map((date, index) => (
          <button
            key={index}
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
            {date.day}
          </button>
        ))}
      </form>

      {vaccineForThisDate.length > 0 ? (
        vaccineForThisDate.map((vaccine, i) => (
          <div key={i} className="flex gap-4 px-4 mt-4 items-baseline">
            <div className="flex items-center justify-center flex-col bg-[#AC85D0] min-w-[57px] rounded-md p-2 text-white">
              <span>
                {selectedDate.toLocaleDateString("pt-BR", { weekday: "short" })}
              </span>
              <span className="text-center">{selectedDate.getDate()}</span>
            </div>
            <div>{vaccine.name}</div>
          </div>
        ))
      ) : (
        <div className="flex gap-4 px-4 mt-4 items-baseline">
          <div className="flex items-center justify-center flex-col bg-[#AC85D0] min-w-[57px] rounded-md p-2 text-white">
            <span>
              {selectedDate.toLocaleDateString("pt-BR", { weekday: "short" })}
            </span>
            <span className="text-center">{selectedDate.getDate()}</span>
          </div>
          <div>Nenhuma vacina agendada. Toque para adicionar.</div>
        </div>
      )}

      <div className="flex gap-4 px-4 mt-4 items-baseline">
        <div className="flex items-center justify-center flex-col bg-[#713EA2] min-w-[57px] rounded-md p-2 text-white">
          <span>{today.toLocaleDateString("pt-BR", { weekday: "short" })}</span>
          <span className="text-center">{today.getDate()}</span>
        </div>
        <div>Nenhuma vacina agendada. Toque para adicionar.</div>
      </div>

      <div className="mt-4 flex px-5 sticky bottom-16">
        <button className="p-4 rounded-full text-xl bg-purple-700 text-white aspect-square w-[64px] shadow-lg ml-auto">
          +
        </button>
      </div>
    </>
  );
}
