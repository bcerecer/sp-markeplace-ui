import { useEffect, useState } from 'react';

// Fades in and out a component given a timeout threshold (Make sure that abracadabra animation timing used in component matches the timeout)
export const useAbracadabra = (timoeut: number) => {
  const [isVisible, setIsVisible] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After timoeut seconds set the show value to false
      setIsVisible(false);
    }, timoeut);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return [isVisible];
};
