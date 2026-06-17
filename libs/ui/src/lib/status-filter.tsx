import { Icon  } from "./icon";

interface Props {
  status: string
}

export const StatusFilter = (props: Props) => {
  return (
    <>
    <style jsx>
      {
        `
        .status-filter {
          height: var(--base-unit);
          display: flex;
          justify-content: space-between;
          background-color: color-mix(in srgb, var(--secondary-color), white 90%);
          align-items: center;
        }

        .status {
          text-indent: calc(var(--base-padding) * 2);
        }
        `
      }
    </style>
    <section className="status-filter">
      <span className="status">{props.status}</span>
      <Icon name="filter" />
    </section>
    </>
  )
}
