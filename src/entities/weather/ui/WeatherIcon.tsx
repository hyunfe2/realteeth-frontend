interface WeatherIconProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  alt?: string;
}

export const WeatherIcon = ({ icon, size = 'md', alt = '날씨 아이콘' }: WeatherIconProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={alt}
      className={sizeClasses[size]}
    />
  );
};
