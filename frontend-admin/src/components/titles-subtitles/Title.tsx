interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title = ({ children, className }: TitleProps) => {
  return <p className={`text-xl font-bold ${className}`}>{children}</p>;
};
