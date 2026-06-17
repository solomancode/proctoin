export enum CandidateEventType {
      EXAM_START,
      EXAM_PAUSED,
      EXAM_STOPPED,
      EXAM_TIMEOUT,
      SUBMIT_ANSWER,
      ACTIVITY_TAB_SWITCH,
      ACTIVITY_COPY_PASTE,
      ACTIVITY_SCREENSHOT,
      ACTIVITY_CAMERA_SNAPSHOT,
      ACTIVITY_AUDIO_RECORDING,
}

export class CandidateEvent {
  constructor(
    public candidate_id: string,
    public datetime: string,
    public event_type: CandidateEventType,
    public payload: CandidateEventPayload
  ) {}
}

type CandidateEventPayload = CandidateTabSwitchEventPayload | CandidateCopyPasteEventPayload | CandidateMediaEventPayload

export class CandidateTabSwitchEventPayload {
  constructor(
    public target_url: string
  ) {}
}

export class CandidateCopyPasteEventPayload {
  constructor(
    public clipboard_contents: string
  ) {}
}

export class CandidateMediaEventPayload {
  constructor(
    public file: File,
    public file_type: string
  ) {}
}

export enum ProctorEventType {
        PAUSE_EXAM,
        SUSPEND_EXAM
}

export class ProctorEvent {
  constructor(
    public proctor_id: string,
    public datetime: string,
    public event_type: ProctorEventType,
    public payload: ProctorEventPayload
  ) {}
}

type ProctorEventPayload = ProctorPauseExamEventPayload | ProctorSuspendExamPayload;

export class ProctorPauseExamEventPayload {
  constructor(
    public candidate_id: string,
    public pause_duration: number,
    public note: string
  ) {}
}

export class ProctorSuspendExamPayload {
  constructor(
    public candidate_id: string,
    public reason: string
  ) {}
}

export enum AnomalyDetectionEventType {
        AUDIO_RECORDING_ANOMALY,
        CAMERA_SNAPSHOT_ANOMALY
}

export class AnomalyDetectionEvent {
  constructor(
    public datetime: string,
    public event_type: AnomalyDetectionEventType,
    public payload: AnomalyDetectionEventPayload
  ) {}
}

export class AnomalyDetectionEventPayload {
  constructor(
    public candidate_id: string,
    public file: File,
    public file_type: string
  ) {}
}
