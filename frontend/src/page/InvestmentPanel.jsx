import { ArrowUp } from "lucide-react";
import Chart from "../ui/Chart";

function InvestmentPanel() {
  return (
    <section className="p-7">
      <h1 className=" text-2xl font-semibold mb-3">Panel de inversión</h1>
      <p className="mb-7">
        Consulta y analiza el rendimiento de tus inversiones
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-7">
        <div className="bg-[#F1F5F9] p-2  rounded-md text-center">
          <small className=" text-xs">Total invertido</small>
          <p className=" text-lg font-semibold">10.000 USD</p>
        </div>

        <div className="bg-[#F1F5F9] p-2 text-center rounded-md ">
          <small className=" text-xs">ROI estimado (%)</small>
          <p className=" text-lg font-semibold">33%</p>
        </div>

        <div className="bg-[#F1F5F9] p-2 text-center rounded-md ">
          <small className=" text-xs">Ganancias estimadas</small>
          <p className=" text-lg font-semibold">13.000 USD</p>
        </div>

        <div className="bg-[#F1F5F9] p-2 text-center rounded-md">
          <small className=" text-xs">Financiamientos</small>
          <p className=" text-lg font-semibold">5</p>
        </div>
      </div>

      <div className="mb-7 pb-7 border-b-[1px] border-lightGrey">
        <h2 className=" text-lg font-semibold mb-3">Histograma de ROI</h2>
        <p>
          Evaluar el historial de tu retorno a la inversión en el ultimo año.
        </p>
      </div>

      <div className="mb-7 ">
        <p className=" font-medium  text-sm mb-1">2024</p>
        <p className=" font-semibold text-xl mb-1">$13.300 USD</p>
        <p className="flex gap-2">
          <span className="text-[#027A48] flex gap-1">
            <ArrowUp className="w-[20px]" />
            15%
          </span>
          en el ultimo año
        </p>
      </div>

      <Chart />
    </section>
  );
}

export default InvestmentPanel;
