'use client'

import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
    targetValue: number;  // The value you want to animate to
    duration: number;      // The duration for the animation in milliseconds
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ targetValue, duration }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        const startTime = performance.now();
        const animateNumber = (currentTime: number) => {
            // Calculate the elapsed time
            const elapsedTime = currentTime - startTime;
            // Calculate the progress of the animation
            const progress = Math.min(elapsedTime / duration, 1); // Ensure it doesn't exceed 1
            // Update the number based on progress
            setCurrentValue(Math.floor(progress * targetValue));

            // If the progress is less than 1, keep animating
            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            } else {
                setCurrentValue(targetValue);  // Set the exact target value once animation ends
            }
        };

        // Start the animation
        requestAnimationFrame(animateNumber);

    }, [targetValue, duration]);

    return (
        <div className="text-4xl font-bold">
            {currentValue}
        </div>
    );
};

export default AnimatedNumber;
