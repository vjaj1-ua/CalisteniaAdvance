export type VisualSummaryFrame = {
  label: string;
  timestamp: number;
  image_base64: string;
};

export type PushupMetrics = {
  depth: {
    average_bottom_elbow_angle: number;
    best_bottom_elbow_angle: number;
    range_degrees: number;
    score: number;
    status: string;
  };
  body_position: {
    average_alignment_deviation_degrees: number;
    average_shoulder_wrist_offset: number;
    score: number;
    status: string;
  };
  repetitions: {
    total: number;
    valid: number;
    confidence: string;
  };
};

export type AnalysisResult = {
  status: "success";
  frames_analyzed: number;
  fps: number;
  duration_seconds: number | null;
  sampled_every_n_frames: number;
  pose_detected_ratio: number;
  visual_summary: VisualSummaryFrame[];
  metrics: PushupMetrics;
};
