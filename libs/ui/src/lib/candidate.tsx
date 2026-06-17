import { Icon  } from "./icon";

interface Tag {
  name: string;
}

interface Props {
  name: string
  tags: Tag[]
  onSelect: () => void
}

export const Candidate = (props: Props) => {
  return (
    <>
    <style jsx>
      {
        `
        .candidate {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .candidate .info {
          display: flex;
          align-items: center;
          gap: var(--base-padding);
        }

        .tags {
          display: flex;
          text-indent: calc(var(--base-padding) * 2);
          gap: var(--base-padding)
        }
        `
      }
    </style>
    <section onClick={props.onSelect} className="candidate">
      <section className="info">
        <Icon name="candidate" />
        <span className="name">{props.name}</span>
      </section>
      <section className="tags">
        {props.tags.map(tag => {
          return <Icon key={tag.name} name={tag.name} />
        })}
      </section>
    </section>
    </>
  )
}
