import { useEffect } from "react";

/**
 * 控制圆形进度条
 */
export function useCircleProgress({
  circleDomId,
  targetProgress = 100,
  defaultProgress = 0,
}: {
  circleDomId: string;
  targetProgress?: number;
  defaultProgress?: number;
}) {
  useEffect(() => {
    if (!circleDomId) return;

    const dom = document.querySelector<SVGCircleElement>(`#${circleDomId}`);

    if (!dom) return;

    /**
     * 半径
     */
    const radius = dom.r.baseVal.value;

    /**
     * 周长
     */
    const circumference = radius * 2 * Math.PI;

    // 设置进度
    const offset =
      circumference -
      ((targetProgress + defaultProgress) / 100) * circumference;

    dom.style.strokeDashoffset = offset.toString();
  }, [circleDomId, targetProgress, defaultProgress]);
}
