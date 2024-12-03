function FormRow({ label, error, children, expand, extraClass }) {
  return (
    <div className={`formrow flex flex-col gap-2   ${extraClass}`}>
      {label && (
        <label htmlFor={children.props.id} className=" text-lg font-semibold">
          {label}
        </label>
      )}

      {children}

      {error && <p className=" text-sm font-medium text-primary">{error}</p>}
    </div>
  );
}

export default FormRow;
