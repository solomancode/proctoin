import { useContext } from "react";
import { ProctorEvent, ProctorPauseExamEventPayload, ProctorSuspendExamPayload, ProctorEventType } from "@proctoin/events";
import { GlobalState } from "../context";

export const useProctorActions = () => {
  const globalState = useContext(GlobalState);

  const pauseCandidateExam = (candidateId: string) => {
    const payload = new ProctorPauseExamEventPayload(
      candidateId,
      10,
      'Warning: Exam rules violation!'
    );
    const event = new ProctorEvent(
      globalState.proctorId,
      new Date().toISOString(),
      ProctorEventType.PAUSE_EXAM,
      payload
    );
    if (globalState.ws !== null) {
      globalState.ws.emit('event', event);
    }
    alert('Event Sent...');
  }

  const suspendCandidateExam = (candidateId: string) => {
    const payload = new ProctorSuspendExamPayload(
      candidateId,
      'Exam Suspended due to rules violation.'
    );
    const event = new ProctorEvent(
      globalState.proctorId,
      new Date().toISOString(),
      ProctorEventType.SUSPEND_EXAM,
      payload
    )
    if (globalState.ws !== null) {
      globalState.ws.emit('event', event);
    }
    alert('Event Sent...');
  }

  return {
    pauseCandidateExam,
    suspendCandidateExam
  }
}
