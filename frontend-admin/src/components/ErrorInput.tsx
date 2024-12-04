export default function ErrorInput({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='text-red-500 font-bold'>{children}</div>;
}
