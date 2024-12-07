export default function SubmitButton({
  children,
  extraClass,
  disabled,
  isPending = false,
  pendingLabel = 'Loading...',
}) {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={`w-full px-4 py-3 text-lg text-light font-medium bg-primary rounded-lg  ${extraClass} hover:bg-[#1F47B4] transition-all`}>
      {isPending ? pendingLabel : children}
    </button>
  );
}
