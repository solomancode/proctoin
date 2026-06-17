interface Props {
  name: string;
  desaturate?: boolean;
}

export const Icon = (props: Props) => {
  return <>
  <style jsx>
  {`
    .icon {
      width: var(--base-unit);
      height: var(--base-unit);
      border-radius: var(--base-radius);
      overflow: hidden;
    }

    .desaturate {
      filter: grayscale(1);
    }
    `}
  </style>
  <img className={'icon' + (props.desaturate?' desaturate':'')} src={'assets/icons/' + props.name + '.png'} />
  </>
}
