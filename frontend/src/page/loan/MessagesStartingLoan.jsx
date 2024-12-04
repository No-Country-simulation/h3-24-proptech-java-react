import Button from "../../ui/Button";

function MessagesStartingLoan() {
  return (
    <div className="  min-h-[86vh] flex items-center justify-center">
      <div>
        <Button type="secondary" to="/loan-simulation">
          Iniciar Solicitud
        </Button>
      </div>
    </div>
  );
}

export default MessagesStartingLoan;
