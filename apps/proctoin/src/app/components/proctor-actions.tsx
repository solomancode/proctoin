import { useProctorActions } from "../hooks/useProctorActions";
import { Text } from "@proctoin/ui";

interface Props {
  selectedCandidateId: string
}

export const ProctorActions = (props: Props) => {
  const { pauseCandidateExam, suspendCandidateExam } = useProctorActions();

  return (
    <>
    <style jsx>
    {`
      .action {
        padding: var(--base-padding);
        margin: var(--base-padding);
        background: var(--primary-color);
      }

      `}
    </style>
    <section>
      <button className="action" type="button" onClick={(e) => {
          e.stopPropagation();
          pauseCandidateExam(props.selectedCandidateId);
      }}>
        <Text text="Pause Candidate Exam" invert/>
      </button>
      <button className="action" type="button" onClick={(e) => {
        e.stopPropagation();
        suspendCandidateExam(props.selectedCandidateId)
      }}>
        <Text text="Suspend Candidate Exam" invert/>
      </button>
    </section>
    </>
  )
}
