import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;
      size: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 2; // Faster explosion
        this.vx = Math.cos(angle) * velocity;
        this.vy = Math.sin(angle) * velocity;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.01 + 0.005; // Slower fade
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08; // Gravity
        this.alpha -= this.decay;
        this.vx *= 0.96; // Friction
        this.vy *= 0.96;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Rocket {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = -(Math.random() * 5 + 12); // Higher launch
        // More vibrant colors
        const hue = Math.floor(Math.random() * 360);
        this.color = `hsl(${hue}, 100%, 60%)`;
        this.exploded = false;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15;
        if (this.vy >= -1.5 && !this.exploded) { // Explode near peak
          this.explode();
          this.exploded = true;
        }
      }

      explode() {
        // Massive explosion
        for (let i = 0; i < 150; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
        // Bright flash
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.exploded) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x - this.vx * 2, this.y - this.vy * 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const loop = () => {
      // Darker trails for more contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Increase spawn rate
      if (Math.random() < 0.1) {
        rockets.push(new Rocket());
      }
      if (Math.random() < 0.05) {
        rockets.push(new Rocket());
      }

      rockets.forEach((r, i) => {
        r.update();
        r.draw(ctx);
        if (r.exploded) rockets.splice(i, 1);
      });

      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default Fireworks;
