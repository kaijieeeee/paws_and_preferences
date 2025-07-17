import { motion, useAnimation } from "framer-motion";

export default function CardStack({ cats, onSwipe, currentIndex, onIndexChange }) {
  const controls = useAnimation();

  const handleDragEnd = async (_, info) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0 });
      onSwipe(cats[currentIndex], 'like');
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0 });
      onSwipe(cats[currentIndex], 'dislike');
    } else {
      await controls.start({ x: 0 });
      return;
    }
    const newIndex = currentIndex + 1;
    onIndexChange(newIndex);
    if (newIndex < cats.length) {
      await controls.start({ x: 0, opacity: 1, scale: 0.95 });
    }
  };

  if (currentIndex >= cats.length) return null;
  
  return (
    <div className="relative h-[80vh] w-full max-w-md mx-auto">
      <motion.div
        key={cats[currentIndex]?.id}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ scale: 0.95, opacity: 1 }}
        className="absolute w-full h-full"
      >
        <img
          src={`https://cataas.com/cat/${cats[currentIndex]?.id}`}
          className="w-full h-full object-cover rounded-xl shadow-lg"
          alt="Cat"
          draggable="false"
        />
      </motion.div>
    </div>
  );
}