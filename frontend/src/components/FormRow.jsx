function FormRow({ label, error, children, expand, extraClass }) {
  return (
    <div className={`flex gap-3 ${extraClass}`}>
      {label && (
        <label htmlFor={children.props.id} className="">
          {label}
        </label>
      )}

      {children}

      {error && <p className="">{error}</p>}
    </div>
  );
}

export default FormRow;
