import { useEffect, useRef } from "react";

// Easing function (easeOutCubic for stronger deceleration)
function easeOut(t: number): number {
    return 1 - Math.pow(1 - t, 4);
}

interface AnimateNumberProps {
    from: number;
    to: number;
    duration: number;
}

const AnimateNumber: React.FC<AnimateNumberProps> = ({ from, to, duration }) => {
    const numberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = numberRef.current;
        let startTime: number;

        function animate(time: number) {
            if (!startTime) startTime = time;
            const timeElapsed = time - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ensure it doesn't go beyond 1

            const easedProgress = easeOut(progress); // Apply easing for deceleration
            const currentNumber = Math.floor(from + (to - from) * easedProgress);

            // Opacity is based on number progress
            const opacity = easeOut(progress);

            if (element) {
                element.textContent = currentNumber.toString();
                element.style.opacity = opacity.toString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [from, to, duration]);

    return (<div 
                ref={numberRef} 
                style={{ opacity: 0 }}>0</div>
    );
};

export default AnimateNumber;
