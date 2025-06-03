// Snow effect configuration
const snowConfig = {
    count: 50, // Reduced number of snowflakes for better performance
    speed: 0.3,
    size: { min: 2, max: 5 },
    color: '#ffffff',
    opacity: { min: 0.3, max: 0.8 }
};

// Create snow container
const snowContainer = document.createElement('div');
Object.assign(snowContainer.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '1000'
});
document.body.appendChild(snowContainer);

// Mouse movement tracking
let mouseDirection = { x: 0, y: 0 };
let lastMouseX = 0;
let lastMouseY = 0;
let globalDirection = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    // Update global direction with smoothing
    globalDirection.x = globalDirection.x * 0.98 + dx * 0.02;
    globalDirection.y = globalDirection.y * 0.98 + dy * 0.02;
});

// Create snowflakes
const snowflakes = Array.from({ length: snowConfig.count }, (_, i) => {
    const snowflake = document.createElement('div');
    const size = Math.random() * (snowConfig.size.max - snowConfig.size.min) + snowConfig.size.min;
    
    Object.assign(snowflake.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: snowConfig.color,
        borderRadius: '50%',
        opacity: Math.random() * (snowConfig.opacity.max - snowConfig.opacity.min) + snowConfig.opacity.min,
        pointerEvents: 'none'
    });
    
    // Initialize position and velocity
    snowflake.x = (window.innerWidth / snowConfig.count) * i;
    snowflake.y = Math.random() * (window.innerHeight + window.innerHeight) - window.innerHeight;
    snowflake.speed = Math.random() * snowConfig.speed + 0.2;
    snowflake.vx = 0;
    snowflake.vy = 0;
    
    snowContainer.appendChild(snowflake);
    return snowflake;
});

// Animation loop
function animateSnow() {
    snowflakes.forEach((snowflake, index) => {
        // Apply global direction influence
        snowflake.vx += globalDirection.x * 0.01;
        snowflake.vy += snowflake.speed * 0.02;
        
        // Update position
        snowflake.x += snowflake.vx;
        snowflake.y += snowflake.vy;
        snowflake.vx *= 0.99;
        snowflake.vy *= 0.99;
        
        // Reset position if out of bounds
        if (snowflake.y > window.innerHeight + 100) {
            snowflake.y = -10;
            snowflake.x = (window.innerWidth / snowConfig.count) * index;
            snowflake.vx = globalDirection.x * 0.05;
            snowflake.vy = 0;
        }
        if (snowflake.x < -10) snowflake.x = window.innerWidth + 10;
        if (snowflake.x > window.innerWidth + 10) snowflake.x = -10;
        
        // Apply position
        snowflake.style.transform = `translate(${snowflake.x}px, ${snowflake.y}px)`;
    });
    
    requestAnimationFrame(animateSnow);
}

// Start animation
animateSnow(); 