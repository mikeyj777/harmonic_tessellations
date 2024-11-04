import React, { useState, useEffect } from 'react';

const HooksTester = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This effect is called when the component mounts and whenever the count changes
    console.log(`The count is now ${count}`);

    // Simulate a loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function to cancel the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div>
      <h2>Hooks Tester</h2>
      <p>Count: {count}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={() => setCount(count + 1)}>Increment</button>
      )}
    </div>
  );
};

export default HooksTester;