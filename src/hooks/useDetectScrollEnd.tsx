import { useState, useEffect } from "react";

type ScrollEndOptions = {
  onScrollEndX?: () => void;
  onScrollEndY?: () => void;
  scrollOffset?: number;
};

const useDetectScrollEnd = (
  containerRef: React.RefObject<HTMLElement>,
  options: ScrollEndOptions = {}
) => {
  const { onScrollEndX, onScrollEndY, scrollOffset } = options;
  const [isXScrolledToEnd, setIsXScrolledToEnd] = useState(false);
  const [isYScrolledToEnd, setIsYScrolledToEnd] = useState(false);
  const scrollThreshold = scrollOffset || 25;

  const handleScroll = () => {
    if (!containerRef.current) return;
    const {
      scrollLeft,
      scrollTop,
      clientWidth,
      clientHeight,
      scrollWidth,
      scrollHeight,
    } = containerRef.current;

    const scrollEndX =
      Math.ceil(scrollLeft + clientWidth + scrollThreshold) >= scrollWidth;
    const scrollEndY =
      Math.ceil(scrollTop + clientHeight + scrollThreshold) >= scrollHeight;

    if (scrollEndX) {
      if (!isXScrolledToEnd) {
        setIsXScrolledToEnd(true);
        onScrollEndX?.();
      }
    } else {
      setIsXScrolledToEnd(false);
    }

    if (scrollEndY) {
      if (!isYScrolledToEnd) {
        setIsYScrolledToEnd(true);
        onScrollEndY?.();
      }
    } else {
      setIsYScrolledToEnd(false);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    console.log(container);
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef.current, onScrollEndX, onScrollEndY]);

  return { isXScrolledToEnd, isYScrolledToEnd };
};

export default useDetectScrollEnd;
