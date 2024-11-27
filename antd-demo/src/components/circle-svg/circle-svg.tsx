import styles from "./index.module.css";
import { useCircleProgress } from "./useCircleProgress";

const id1 = "circle-1";
const id2 = "circle-2";
const id3 = "circle-3";

export const CircleSvg = ({ soc, soh }: { soc: string; soh: string }) => {
  useCircleProgress({
    circleDomId: id1,
    targetProgress: parseFloat(soc || "0"),
  });

  useCircleProgress({
    circleDomId: id2,
    targetProgress: parseFloat(soh || "0"),
  });

  useCircleProgress({
    circleDomId: id3,
    targetProgress: parseFloat(soh || "0"),
    defaultProgress: 1,
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 130"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100% ", height: "100%" }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#17889E" />
          <stop offset="100%" stopColor="#2DBA42" />
        </linearGradient>
      </defs>

      <circle
        cx="65"
        cy="65"
        r="64"
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      <circle
        id={id3}
        className={styles["circle-progress"]}
        cx="65"
        cy="65"
        r="54"
        fill="none"
        stroke="#2f3"
        strokeWidth="6"
        strokeDasharray="339.292"
        strokeDashoffset="339.292"
      />

      <circle
        id={id2}
        className={styles["circle-progress"]}
        cx="65"
        cy="65"
        r="54"
        fill="none"
        stroke="#255356"
        strokeWidth="6"
        strokeDasharray="339.292"
        strokeDashoffset="339.292"
      />

      <circle
        id={id1}
        className={styles["circle-progress"]}
        cx="65"
        cy="65"
        r="54"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="12"
        strokeDasharray="339.292"
        strokeDashoffset="339.292"
        strokeOpacity="0.5"
      />
    </svg>
  );
};
