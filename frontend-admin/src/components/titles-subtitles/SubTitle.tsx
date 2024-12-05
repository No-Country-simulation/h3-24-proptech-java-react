interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SubTitle = ({ children, className }: SubTitleProps) => {
  return <p className={`text-sm font-semibold ${className}`}>{children}</p>;
};
